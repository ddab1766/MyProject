from django.db.models import Q, Prefetch
from rest_framework import viewsets, permissions
import rest_framework_filters as filters
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from backend.models import ComCode, Point, User

from .filters import HrProfileFilter
from .models import HrProfile, HrSpecial, HrProfileCoWorker, HrAccountInfo
from .serializers import  (
    HrProfileSerializer, HrSpecialSerializer, HrSpecialModelSerializer, \
    HrProfileModelSerializer, HrProfileCoWorkerModelSerializer, HrAccountInfoSerializer, HrProfileSimpleSerializer, \
    PartnersSerializer
)

from company_profile.models import (
    Sugub, CompanyProfile, JobAdvertise, SugubReview, JobApplicant )
from company_profile.serializers import (
    SugubSerializer, SugubHrSerializer, SugubSimpleSerializer )

from user_profile.models import Resume


class HrProfileViewSet(viewsets.ModelViewSet):
    queryset = HrProfile.objects.all()
    serializer_class = HrProfileModelSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = self.queryset\
            .select_related('status_cd', 'cmp_manager')\
            .prefetch_related('user', 'services', 'service_address')

        return queryset


class HrProfileReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HrProfile.objects \
        .prefetch_related('user', 'services', 'service_address') \
        .all()
    serializer_class = HrProfileSerializer
    permission_classes = [
        permissions.AllowAny,
    ]
    filter_class = HrProfileFilter
    # filterset_fields = ['is_expose']

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def partners_list(self, request, pk=None):
        """ννΈλμ€"""
        is_partners = request.GET.get('is_partners', 'all')
        ordering = request.GET.get('ordering', '1')
        qs = self.filter_queryset(self.get_queryset())
        if is_partners == 'y':
            qs = qs.exclude(user__isnull=True)
        elif is_partners == 'n':
            qs = qs.exclude(user__isnull=False)

        if ordering == '2':
            qs = sorted(qs, key=lambda t: t.jobad_count, reverse=True)
        elif ordering == '3':
            qs = sorted(qs, key=lambda t: t.resume_count, reverse=True)

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = PartnersSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = PartnersSerializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def card(self, request, pk=None):
        """μΉ΄λν μ΅μμ λ³΄"""
        qs = self.get_queryset().exclude(user__isnull=True)
        serializer = HrProfileSerializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def simple(self, request, pk=None):
        qs = self.get_queryset().exclude(user__isnull=True)
        serializer = HrProfileSimpleSerializer(qs, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = self.queryset.all()
        user = self.request.user
        # ordering = self.request.GET.get('ordering', '1')
        #
        # conditions = {
        #     1: 'id',
        # }

        # if self.action != 'partners_list':
        queryset = queryset \
            .select_related('cmp_manager', 'status_cd') \
            .prefetch_related('hrprofile_file', 'hrprofile_image', 'hrprofile_resume', 'hrprofile_jobapp', 'service_address') \
            .prefetch_related(Prefetch('hrspecial',
                                       queryset=HrSpecial.objects
                                       .select_related('hr_jikjong_top', 'hr_jikjong_mid')
                                       .prefetch_related('hr_jikjong_low') \
                                       .all())) \
            .prefetch_related(Prefetch('hr_coworker',
                                       queryset=HrProfileCoWorker.objects
                                       .select_related('user', 'hrprofile_auth')
                                       .all())) \
            .prefetch_related(Prefetch('hr_sugub_reviews',
                                       queryset=SugubReview.objects
                                       .select_related('user')
                                       .prefetch_related('sugubreview_point__point_gubun')
                                       .prefetch_related(Prefetch('sugub',
                                                                  queryset=Sugub.objects
                                                                  .select_related('user', 'sugub_jikjong_top', 'sugub_jikjong_mid',
                                                                                  'sugub_career_gb', 'education_cd', 'chae_cd',
                                                                                  'sugub_status', 'chae_gigan_type', 'sugub_gender',
                                                                                  'companyprofile__status_cd')
                                                                  .prefetch_related('sugub_jikjong_low')
                                                                  )))) \

        try:
            if user.is_admin:
                queryset = queryset.filter(~Q(user=None)) # μμ λ μμ²΄λ§ λ³΄μ΄λλ‘
            else:
                queryset = queryset.filter(Q(is_expose=True))  # λΈμΆμΉμΈ
        except:
            queryset = queryset.filter(Q(is_expose=True))  # λΈμΆκ±°λΆ

        # queryset = queryset.order_by(conditions[int(ordering)])
        return queryset


class HrSugubReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    """
    HRνμ¬κ° μκΈμ λ³΄λ₯Ό νμΈνλ ViewSet
    1. /
    2. /simple
    """
    queryset = Sugub.objects.all()
    serializer_class = SugubSerializer
    permission_classes = [
        permissions.AllowAny,
    ]

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def simple(self, request, pk=None):
        serializer = SugubHrSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = Sugub.objects \
            .select_related('sugub_career_gb', 'education_cd', 'sugub_jikjong_top', 'sugub_jikjong_mid') \
            .select_related('sugub_status',  'chae_cd', 'chae_gigan_type', 'sugub_gender', 'salary_gubun') \
            .select_related('cont_chg_gb', 'work_type',) \
            .prefetch_related('sugub_jikjong_low', 'user') \
            .prefetch_related(Prefetch('sugub_reviews',
                                       queryset=SugubReview.objects
                                       .select_related('user')
                                       .prefetch_related(Prefetch('hrprofile',
                                                                  queryset=HrProfile.objects
                                                                  .prefetch_related('service_address')
                                                                  ))
                                       .prefetch_related(Prefetch('sugubreview_point',
                                                                  queryset=Point.objects
                                                                  .select_related('point_gubun')))))\
            .prefetch_related(Prefetch('companyprofile',
                                       queryset=CompanyProfile.objects
                                       .select_related('company_recuser', 'status_cd', 'cmp_manager')
                                       .prefetch_related('company_sugub')))\
            .prefetch_related(Prefetch('jobadvertise',
                                       queryset=JobAdvertise.objects
                                       .select_related('job_reward_way', 'job_reward_type', 'jobadvertise_status', 'job_manager')
                                       .prefetch_related(Prefetch('jobapplicants',
                                                                  queryset=JobApplicant.objects
                                                                  .select_related('applied_status', 'user')
                                                                  .prefetch_related(Prefetch('hrprofile',
                                                                                             queryset=HrProfile.objects
                                                                                             .prefetch_related('service_address')
                                                                                             ))
                                                                  .prefetch_related(Prefetch('resume',
                                                                                             queryset=Resume.objects
                                                                                             .prefetch_related('careers', 'except_company', 'educations', 'languages')
                                                                                             .all()))
                                                                  .all()))
                                       .all())) \
            .all()

        if self.request.user.is_anonymous:
            queryset = queryset.filter(~Q(sugub_status__code_id='CC0100000')
                                       & ~Q(jobadvertise__isnull=True))
        elif self.request.user.is_admin:
            queryset = queryset
        else: # μκΈκ²ν μ€, κ³΅κ³  x μ μΈ
            queryset = queryset.filter(~Q(sugub_status__code_id='CC0100000')
                                       & ~Q(jobadvertise__isnull=True))
        return queryset


class HrSpecialModelViewSet(viewsets.ModelViewSet):
    queryset = HrSpecial.objects.all()
    serializer_class = HrSpecialModelSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        # permissions.AllowAny,
    ]
    pagination_class = None

    def perform_create(self, serializer):
        user = self.request.user
        companyprofile, hrprofile = user.check_profile(user)
        serializer.save(hrprofile=hrprofile)


class HrSpecialReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HrSpecial.objects.all()
    serializer_class = HrSpecialSerializer
    permission_classes = [
        # permissions.IsAuthenticated,
        permissions.AllowAny,
    ]


class HrProfileCoWorkerViewSet(viewsets.ModelViewSet):
    """
    λ³ΈμΈμ΄ μν νμ¬μ λ³΄μ λλ£ μ‘°ν
    """
    queryset = HrProfileCoWorker.objects.all()
    serializer_class = HrProfileCoWorkerModelSerializer

    def get_queryset(self):
        queryset = HrProfileCoWorker.objects.select_related('user', 'hrprofile_auth').all()
        user = self.request.user
        if user.is_anonymous:
            return []
        else:
            companyprofile, hrprofile = user.check_profile(user)
            queryset = queryset.filter(hrprofile=hrprofile)
            return queryset


class HrAccountModelViewSet(viewsets.ModelViewSet):
    '''
    Account Info
    '''
    queryset = HrAccountInfo.objects.all()
    serializer_class = HrAccountInfoSerializer
    permission_classes = [
        # permissions.IsAuthenticated,
        permissions.AllowAny,
    ]
    pagination_class = None

    def perform_create(self, serializer):
        user = self.request.user
        companyprofile, hrprofile = user.check_profile(user)
        serializer.save(hrprofile=hrprofile)
