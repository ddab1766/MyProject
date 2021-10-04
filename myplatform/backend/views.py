from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from django.contrib.auth import get_user_model
from django.forms import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import requests, json
from myplatform.settings import URL_FRONT
from datetime import date
from django.views.generic.base import View
from django.db.models import Q, Prefetch
from django.shortcuts import get_object_or_404
from rest_auth.views import UserDetailsView, LoginView
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, generics, status, permissions, mixins
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from allauth.socialaccount.providers.naver.views import NaverOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from invitations.utils import get_invitation_model
from rest_framework.viewsets import GenericViewSet

from .models import (
    User, ComIdx, ComCode, User, Jikjong, CompanyBaseInfo, Qna, FAQ, Alarm,
    AlarmSetting, Demand)
from .serializers import (
    UserSerializerApi, ComIdxSerializer, ComCodeSerializer, JikjongSerializer, \
    QnaSerializer, FAQSerializer, UserSerializer, AlarmSerializer,
    AlarmModelSerializer, AlarmSettingModelSerializer, InvitationsModelSerializer, RecommendSugubSerializer,
    DemandModelSerializer)

from hr_profile.models import HrProfile, HrSpecial
from hr_profile.serializers import HrProfileSimpleSerializer

from company_profile.models import CompanyProfile, SugubReview, JobApplicant, JobApplicant, SugubSuccess
from company_profile.serializers import CompanyProfileSimpleSerializer

from user_profile.models import UserProfile, Resume, UserSpecial


class TestViewSet(mixins.CreateModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    # pagination_class = None


class CustomUserDetailsView(UserDetailsView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_object(self):
        queryset = User.objects \
            .prefetch_related('companyprofile', 'applicants', 'chatroom')\
            .prefetch_related(Prefetch('hrprofile',
                                       queryset=HrProfile.objects
                                       .select_related('status_cd', 'cmp_manager')
                                       .prefetch_related('user', 'hr_coworker')
                                       .prefetch_related('hrprofile_image', 'hrprofile_file', 'service_address' )
                                       .prefetch_related(Prefetch('hr_sugub_reviews',
                                                                  queryset=SugubReview.objects
                                                                  .select_related('user', 'sugub')))\
                                       .prefetch_related(Prefetch('hrspecial',
                                                                  queryset=HrSpecial.objects
                                                                  .select_related('hr_jikjong_top', 'hr_jikjong_mid')
                                                                  .prefetch_related('hr_jikjong_low')))))\
            .all()

        user = get_object_or_404(queryset, email=self.request.user)
        return user


class ComCodeViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    queryset = ComCode.objects.all()
    serializer_class = ComCodeSerializer
    pagination_class = None

    def get_queryset(self, *args, **kwargs):
        queryset = ComCode.objects.exclude(code_use=False)
        filters = {
            # 'comidx_id': self.request.query_params.get('comidx_id', ''),
            'code_topidx': self.request.query_params.get('code_topidx', ''),
            'code_topcd': self.request.query_params.get('code_topcd', ''),
            'code_topidx__in': [c for c in self.request.GET.get('code_topidx__in', '').split(',') if c],
            'code_id__in': [c for c in self.request.GET.get('code_id__in', '').split(',') if c]
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))


class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserSerializerApi
    pagination_class = None

class UserListView(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserSerializerApi
    pagination_class = None

    def get_queryset(self):
        queryset = User.objects.all()
        is_admin = self.request.query_params.get('is_admin', None)
        queryset = queryset.filter(is_admin=is_admin)
        return queryset


# 비회원 임시 회원가입
class TempRegister(APIView):
    # todo DELETE..

    def delete(self, request, format=None):
        try:
            user = User.objects.get(
                pk=request.data.get('user_id'),
                is_temp=True
            )
            user.delete()
            return Response({'messages': '성공! user.delete()'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'messages': '실패! DoesNotExist'}, status=status.HTTP_304_NOT_MODIFIED)

    def post(self, request):
        user = request.user
        current_year = date.today().year
        temp_user = User.objects.filter(is_temp=True, email__startswith='ch' + str(current_year)).last()
        birth = request.data.get('birth', None)
        username = request.data.get('username', None)
        phone = request.data.get('phone', None)
        companyprofile, hrprofile = user.check_profile(user)
        jikjong_top = get_object_or_404(ComCode, pk=request.data.get('jikjong_top', None))
        jikjong_mid = get_object_or_404(ComCode, pk=request.data.get('jikjong_mid', None))
        if temp_user is None:
            temp_email = 'ch' + str(current_year) + '1' + '@chaegong.co.kr'
        elif temp_user is not None:
            temp_email = temp_user.email
            temp_number = int(temp_email[6:temp_email.find('@chaegong.co.kr')]) + 1
            temp_email = 'ch' + str(current_year) + str(temp_number) + '@chaegong.co.kr'


        # todo 중복확인 ( 이름/연락처/생년월일 + 지원자 상태(인사전형진행중) + 서류불합격 제외)
        # if JobApplicant.objects.filter(applied_username=username,
        #                                applied_phone=phone,
        #                                applied_birth=birth,
        #                                applied_status='BW0100000').exists():
        #     return Response({'messages': '채용과정이 진행중입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # TEMP USER 모델 생성
        user_obj = User.objects.create(
            email=temp_email,
            password=birth,
            is_temp=True
        )

        # USERPROFILE 생성
        userprofile = UserProfile.objects.create(
            user=user_obj,
            username=username,
            date_of_birth=birth,
            phone=phone
        )
        # USERSPECIAL 생성
        userspecial = UserSpecial.objects.create(
            user=user_obj,
            jikjong_top=jikjong_top,
            jikjong_mid=jikjong_mid,
        )
        # RESUME 생성
        resume = Resume.objects.create(
            userspecial=userspecial,
            hrprofile=hrprofile,
            resume_username=username,
            resume_phone=phone,
            resume_birth=birth
        )

        return Response({'user_id': user_obj.id,'resume_id': resume.id}, status=status.HTTP_201_CREATED)


class JikjongViewSet(viewsets.ModelViewSet):
    queryset = Jikjong.objects.all()
    serializer_class = JikjongSerializer

    def get_queryset(self):
        queryset = Jikjong.objects.all()
        jikjong_mid = self.request.query_params.get('jikjong_mid', None)
        queryset = queryset.filter(jikjong_mid=jikjong_mid)
        return queryset


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


class NaverLogin(SocialLoginView):
    adapter_class = NaverOAuth2Adapter


class NaverLoginCallback(SocialLoginView, View):

    def get(self, request):
        url = request.build_absolute_uri()
        print(url)
        # print('self:', self)
        # print(args, kwargs)
        # print('', kwargs.get('access_token'))
        # print('request:', request.GET)
        # naver_access_token = request.GET.get('access_token')
        # print('token', naver_access_token)
        return HttpResponse('a')


class SocialLoginCallbackView(View):
    def get(self, request):
        kakao_access_code = request.GET.get('code', None)

        url = 'https://kauth.kakao.com/oauth/token/'
        headers = {
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
        body = {
            'grant_type': 'authorization_code',
            'client_id': '9167dbb75ac51661ea045e32f11f15e8',
            'redirect_uri': 'http://localhost:8000/rest-auth/kakao/login/callback/',
            'code': kakao_access_code
        }
        kakao_response = requests.post(url, headers=headers, data=body)
        return HttpResponse(kakao_response)


class KakaoLogin(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter


# 수정 필요
def SignUpCheckView(request):
    email = request.GET.get('email_address', '')
    check_profile = request.GET.get('check_profile', '')
    instance = get_object_or_404(User, email=email)

    if instance:
        companyprofile, hrprofile = instance.check_profile(instance)
        if companyprofile is not None:
            return HttpResponse(json.dumps({
                'id': instance.id,
                'email': instance.email,
                'company': CompanyProfileSimpleSerializer(companyprofile).data
                }))
        elif hrprofile is not None:
            return HttpResponse(json.dumps({
                'id': instance.id,
                'email': instance.email,
                'hr': HrProfileSimpleSerializer(hrprofile).data
            }))
        else:
            return HttpResponse(json.dumps(
                {'id': instance.id, 'email': instance.email}), 'application/json')


class QnaViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    queryset = Qna.objects.all()
    serializer_class = QnaSerializer


class FAQListView(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated, ]
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


class AlarmReadOnlyModelView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Alarm.objects.all()
    serializer_class = AlarmSerializer
    pagination_class = None

    def get_queryset(self):
        return Alarm.objects.filter(receiver=self.request.user)


class AlarmModelViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Alarm.objects.all()
    serializer_class = AlarmModelSerializer


class AlarmSettingModelViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    queryset = AlarmSetting.objects.all()
    serializer_class = AlarmSettingModelSerializer


class InvitationsModelViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    queryset = get_invitation_model().objects.all()
    serializer_class = InvitationsModelSerializer
    pagination_class = None

    def get_queryset(self):
        user = self.request.user
        # user = User.objects.get(email='sven@chaema.co.kr')
        queryset = self.queryset.filter(inviter=user)
        return queryset

    @action(methods=['POST'], detail=False, permission_classes=[permissions.AllowAny])
    def create_and_send(self, request, pk=None):
        user = request.user
        # user = User.objects.get(email='sven@chaema.co.kr')

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data['email']

        Invitation = get_invitation_model()
        invite = Invitation.create(email, inviter=user)
        invite.send_invitation(request)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RecommendSugubReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SugubSuccess.objects.all()
    serializer_class = RecommendSugubSerializer
    pagination_class = None


class DemandModelViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Demand.objects.all()
    serializer_class = DemandModelSerializer
    pagination_class = None

    def perform_create(self, serializer):
        user = self.request.user
        companyprofile, hrprofile = user.check_profile(user)
        serializer.save(paidup_user=User.objects.get(email=user), hrprofile=hrprofile)
