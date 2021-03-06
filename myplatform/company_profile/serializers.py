from rest_framework import serializers
from django.db import transaction, DatabaseError
from myplatform.settings import URL_FRONT

from sms.models import InfoSms
from sendmail.sendmail import SendMail

from backend.slack import slack_notify
from .models import (
    CompanyProfile, Sugub, JobAdvertise, JobApplicant, SugubReview, \
    CompanyProfileCoWorker, JobQuestion, JobAnswer, ImportPaymentHistory,
    Interview, Estimate, EstimateFile, SugubSign, SugubSuccess)
from backend.models import (
    ComIdx, ComCode, User, Point, Alarm
)
from backend.serializers import ComCodeSerializer, UserSimpleSerializer
from user_profile.models import (
    UserProfile, Resume, UserSpecial, UserPoint
)
from user_profile.serializers import (
    ResumeSerializer
)
from hr_profile.models import (
    HrProfile
)
from employee.models import (
    Employee, Contract, ContractFile, Fee
)


class CompanyProfileSimpleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    custname = serializers.CharField()
    custid = serializers.CharField()
    gross_total = serializers.IntegerField()
    homepage = serializers.CharField()
    introduce = serializers.CharField()
    status_cd = ComCodeSerializer()
    cmp_manager = UserSimpleSerializer()
    upjong = serializers.CharField()
    stock_gubun = serializers.CharField()
    group_company = serializers.CharField()
    load_addr_code = serializers.CharField()
    load_addr = serializers.CharField()
    load_addr_detail = serializers.CharField()
    post_addr_code = serializers.CharField()
    post_addr = serializers.CharField()
    post_addr_detail = serializers.CharField()
    nation = serializers.CharField()
    emp_count = serializers.IntegerField()
    manager_email = serializers.CharField()
    manager_phone = serializers.CharField()
    company_image = serializers.ImageField()
    company_logo = serializers.ImageField()
    ticket = serializers.IntegerField()


class CompanyProfileCoworkerSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user = serializers.CharField()
    companyprofile = serializers.CharField()
    companyprofile_auth = ComCodeSerializer()
    coworker_phone = serializers.CharField() # ???????


class CompanyProfileCoWorkerModelSerializer(serializers.ModelSerializer):
    # auth_name = serializers.CharField()
    companyprofile_auth = ComCodeSerializer(read_only=True)
    companyprofile_auth_id = serializers.PrimaryKeyRelatedField(queryset=ComCode.objects.all())
    user = UserSimpleSerializer()
    created_time = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)

    class Meta:
        model = CompanyProfileCoWorker
        fields = ['id', 'companyprofile', 'user', 'companyprofile_auth', 'coworker_phone',
                  'created_time', 'companyprofile_auth_id']

    def update(self, instance, validated_data):
        instance.companyprofile_auth = validated_data.get('companyprofile_auth_id')
        instance.save()

        return instance



class JobAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobAnswer
        fields = '__all__'

    def to_representation(self, instance):
        data = super(JobAnswerSerializer, self).to_representation(instance)
        if data['job_answer_comment']:
            data['job_answer_comment'] = data['job_answer_comment'].replace('[', '').replace(']', '').replace('\'', '').split(', ')
        return data


# ???????????? ??????
class JobQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobQuestion
        fields = '__all__'

    # jobquestion = serializers.PrimaryKeyRelatedField(read_only=True)
    job_answer_type     = serializers.CharField(source='jobanswer.job_answer_type', required=False)
    job_answer_comment  = serializers.JSONField(source='jobanswer.job_answer_comment', required=False, allow_null=True)
    # job_answer_comment = serializers.ListField(
    #     child=serializers.CharField(source='jobanswer.job_answer_comment'),
    #     allow_null=True, allow_empty=True
    # )
    jobanswers = JobAnswerSerializer(many=True, read_only=True)

    def update(self, instance, validated_data):
        instance = super(JobQuestionSerializer, self).update(instance, validated_data)
        print('JobQuestionSerializer validated_data:', validated_data)
        if 'jobanswer' in validated_data:
            jobanswer_data = validated_data.pop('jobanswer', {})
            job_answer_type = jobanswer_data.get('job_answer_type', None)
            job_answer_comment = jobanswer_data.get('job_answer_comment', None)

            # ??????????????? ?????? / ?????? ??????
            jobanswer, created = JobAnswer.objects.update_or_create(
                jobquestion=instance,
                defaults={
                    "job_answer_type": ComCode.objects.get(code_id=job_answer_type),
                    "job_answer_comment": job_answer_comment
                }
            )
            jobanswer.save()
        return instance


# ????????? List serializer
# class JobAppListSerializer(serializers.ListSerializer):
#     def create(self, validated_data):
#         jobapps = [JobApplicant(**item) for item in validated_data]
#         return JobApplicant.objects.bulk_create(jobapps)


class JobAppModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplicant
        fields = '__all__'

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    jodadvertise = serializers.PrimaryKeyRelatedField(read_only=True)
    hrprofile = serializers.PrimaryKeyRelatedField(read_only=True, required=False)
    # applied_status = ComCodeSerializer(read_only=True, required=False)

    def validate_user(self, value):
        # ?????????????????? ????????? ?????? ????????? ?????? ??????, ?????????(resume=None) ????????? ???????????????
        if self.Meta.model.objects.filter(user=value).exclude(resume=None).exclude(jobadvertise__sugub__sugub_status='CC0300000').exists():
            # print('value:', value)
            # print('???????????????', self.Meta.model.objects.filter(user=value).exclude(~Q(jobadvertise__sugub__sugub_status='CC0300000')))
            raise serializers.ValidationError('?????? ???????????? ?????????????????????.', value)
        return value

    def create(self, validated_data):
        jobapp = JobApplicant.objects.create(**validated_data)
        # print('jobapp:', jobapp)
        '''
        ????????? ????????? ??????
        '''
        alarm = Alarm(
            receiver=jobapp.jobadvertise.sugub.user,
            alarm_gubun=ComCode(code_id='ZE0100000'),
            title='[' + str(jobapp.jobadvertise.sugub.sugub_title) + ']' + '????????? ???????????? ?????? ???????????????.',
            contents='???????????? ?????? ??? ???????????? ??????(??????/?????????)??? ??????????????????.',
            link_url=URL_FRONT + 'Company/SugubInfo/' + str(jobapp.jobadvertise.sugub.id),
        )
        alarm.save()
        return jobapp

    @transaction.atomic
    def update(self, instance, validated_data):
        print('validated_data', validated_data)
        applied_status = validated_data.get('applied_status', instance.applied_status)
        instance.url_recuser = validated_data.get('url_recuser', instance.url_recuser)

        if instance.applied_status == ComCode.objects.get(code_id='BW0801000'):
            raise serializers.ValidationError('?????????????????? ????????? ??? ????????????.')

        # ????????? ????????? ????????? ??????
        if instance.applied_status != applied_status:
            if applied_status == ComCode.objects.get(code_id='BW0801000'):  # ????????????
                sugub = instance.jobadvertise.sugub
                try:
                    # ?????? ?????? ??????
                    employee, created = Employee.objects.get_or_create(
                        emp_name=instance.applied_username,
                        emp_phone=instance.applied_phone,
                        emp_birth=instance.applied_birth
                    )
                    employee.save()
                except:
                    raise serializers.ValidationError('???????????? ?????? ??????!')

                try:
                    # ???????????? ??????
                    contract = Contract.objects.create(
                        employee=employee,
                        sugub=sugub,
                        companyprofile=sugub.companyprofile,
                        hrprofile=instance.hrprofile,
                        chae_cd=sugub.chae_cd
                    )
                    contract.save()
                except:
                    raise serializers.ValidationError('???????????? ?????? ??????!')

                try:
                    # ????????????????????? ??????
                    sugub_success, created = SugubSuccess.objects.get_or_create(
                        sugub=sugub,
                        hrprofile=instance.hrprofile,
                        defaults={
                            'sugub_title': sugub.sugub_title,
                            'chae_cd': sugub.chae_cd.code_name,
                            'sugub_jikjong': sugub.sugub_jikjong_top.code_name + ' ' +
                                             sugub.sugub_jikjong_mid.code_name + ' ' +
                                             " ".join([x.code_name for x in sugub.sugub_jikjong_low.all()]),
                            'work_position': sugub.work_position,
                            'work_role': sugub.work_role,
                            'sugub_career_gb': sugub.sugub_career_gb.code_name,
                            'education_cd': sugub.education_cd.code_name,
                            'salary_gubun': sugub.salary_gubun.code_name,
                            'work_load_addr': sugub.work_load_addr,
                            'spec': sugub.spec,
                            'bokri': sugub.bokri
                        }
                    )
                    sugub_success.save()
                except:
                    raise serializers.ValidationError('?????? ??????????????? ?????? ??????!')

                '''
                ???????????????????????? ????????? ?????? ?????? ??????
                '''
                for receiver in instance.hrprofile.user.all():
                    alarm = Alarm(
                        receiver=receiver,
                        alarm_gubun=ComCode(code_id='ZE0100000'),
                        title='[' + str(instance.jobadvertise.sugub.sugub_title) + ']' + '[????????????]???????????????.',
                        contents='??????????????? ???????????? ????????? ????????? ?????? ?????? ????????? ??????????????????.',
                        link_url=URL_FRONT + 'Mng/employee/',
                    )
                    alarm.save()

            else:
                '''
                ???????????????????????? ????????? ?????? ?????? ??????
                '''
                for receiver in instance.hrprofile.user.all():
                    alarm = Alarm(
                        receiver=receiver,
                        alarm_gubun=ComCode(code_id='ZE0100000'),
                        title='[' + str(instance.jobadvertise.sugub.sugub_title) + ']' + '????????? ???????????? ????????? ?????? ???????????????.',
                        contents='????????? ????????? ???????????????.',
                        link_url=URL_FRONT + 'Mng/jobap/',
                    )
                    alarm.save()


            # ????????????(or ????????????)??? ??????????????? / URL????????? / ??????????????? ?????????
            # ????????? ??????
            # UserPoint.objects.create(
            #     user=instance.user,
            #     poi_type=ComCode.objects.get(code_id='GA0100000'),
            #     poi_content='?????? ???????????? ?????????',
            #     poi_point=instance.jobadvertise.job_reward_amt1
            # )
            #
            # if instance.url_recuser is not None:
            #     # URL ?????????
            #     UserPoint.objects.create(
            #         user=instance.url_recuser,
            #         poi_type=ComCode.objects.get(code_id='GA0200000'),
            #         poi_content='????????? URL ?????? ?????????',
            #         poi_point=instance.jobadvertise.job_reward_amt2 / 2
            #     )
            #     # ?????? ?????????
            #     UserPoint.objects.create(
            #         user=instance.user.userprofile.recuser,
            #         poi_type=ComCode.objects.get(code_id='GA0200000'),
            #         poi_content='????????? ?????? ?????? ?????????',
            #         poi_point=instance.jobadvertise.job_reward_amt2 / 2
            #     )
            # else:
            #     # ?????? ?????????
            #     UserPoint.objects.create(
            #         user=instance.user.userprofile.recuser,
            #         poi_type=ComCode.objects.get(code_id='GA0200000'),
            #         poi_content='????????? ?????? ?????? ?????????',
            #         poi_point=instance.jobadvertise.job_reward_amt2
            #     )
            instance.applied_status = applied_status
            instance.save()
        else:
            instance = super(JobAppModelSerializer, self).update(instance, validated_data)

        return instance

    def to_representation(self, instance):
        data = super(JobAppModelSerializer, self).to_representation(instance)
        if data['applied_status']:
            data['applied_status'] = ComCodeSerializer(instance.applied_status).data
        return data


class JobAdSimpleSerializer(serializers.Serializer):
    id = serializers.CharField()
    sugub = serializers.PrimaryKeyRelatedField(queryset=Sugub.objects.all())
    jobadvertise_title = serializers.CharField()
    jobadvertise_end_dt = serializers.CharField()
    main_work = serializers.CharField()
    dpt_name = serializers.CharField()
    company_name = serializers.CharField()
    company_introduce = serializers.CharField()
    company_name_yn = serializers.BooleanField()
    main_work_yn = serializers.BooleanField()
    dpt_name_yn = serializers.BooleanField()
    salary = serializers.CharField()
    salary_yn = serializers.BooleanField()
    condition = serializers.CharField()
    condition_yn = serializers.BooleanField()
    special_condition = serializers.CharField()
    special_condition_yn = serializers.BooleanField()
    welfare = serializers.CharField()
    welfare_yn = serializers.BooleanField()
    location = serializers.CharField()
    location_yn = serializers.BooleanField()
    jobadvertise_addr_code = serializers.CharField()
    jobadvertise_addr = serializers.CharField()
    jobadvertise_addr_detail = serializers.CharField()
    jobadvertise_status = ComCodeSerializer()
    job_reward_type = ComCodeSerializer()
    job_reward_way = ComCodeSerializer()
    job_reward_amt1 = serializers.IntegerField()
    job_reward_amt2 = serializers.IntegerField()
    request_ticket = serializers.IntegerField()
    jobtag_json = serializers.JSONField()
    applicants_count = serializers.IntegerField()

class InterviewModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = ['jobapp', 'interview_dt', 'comments', 'addr_code', 'addr', 'addr_detail',
                  'interview_manager', 'interview_phone', 'interview_email'
                  ]

class JobAppSimpleSerializer(serializers.Serializer):
    """"""
    id = serializers.IntegerField()
    urlkey = serializers.CharField()
    url_recuser = serializers.CharField()
    applied_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    applied_status = ComCodeSerializer()
    applied_comment = serializers.CharField()
    resume_pdf = serializers.FileField()
    resume_filename = serializers.CharField()
    applied_username = serializers.CharField()
    applied_phone = serializers.CharField()
    applied_birth = serializers.CharField()
    job_answers_json = serializers.JSONField()

    user = serializers.SerializerMethodField()
    hrmanager = serializers.SerializerMethodField()

    def get_user(self, obj):
        from backend.serializers import UserSimpleSerializer
        return UserSimpleSerializer(obj.user).data

    def get_hrmanager(self, obj):
        from backend.serializers import UserSimpleSerializer
        return UserSimpleSerializer(obj.hrmanager).data


class JobAppHrSerializer(JobAppSimpleSerializer):
    companyprofile = serializers.SerializerMethodField()
    sugub = serializers.SerializerMethodField()
    interview_jobapp = InterviewModelSerializer(many=True, read_only=True)
    # sugub = serializers.PrimaryKeyRelatedField(read_only=True)

    def get_companyprofile(self, obj):
        # return CompanyProfileSimpleSerializer(obj.jobadvertise.sugub.companyprofile).data
        return {
            'id': obj.jobadvertise.sugub.companyprofile.id,
            'custname': obj.jobadvertise.sugub.companyprofile.custname
        }

    def get_sugub(self, obj):
        # return SugubSimpleSerializer(obj.jobadvertise.sugub).data
        return {
            'id': obj.jobadvertise.sugub.id,
            'sugub_title': obj.jobadvertise.sugub.sugub_title,
            'chae_cd':obj.jobadvertise.sugub.chae_cd.code_name,
        }


class JobAppSerializer(JobAppSimpleSerializer):
    resume = ResumeSerializer()
    hrprofile = serializers.SerializerMethodField()
    jobadvertise = serializers.SerializerMethodField()
    sugub = serializers.SerializerMethodField()
    interview_jobapp = InterviewModelSerializer(many=True, read_only=True)

    def get_hrprofile(self, obj):
        from hr_profile.serializers import HrProfileSimpleSerializer
        return HrProfileSimpleSerializer(obj.hrprofile).data

    def get_jobadvertise(self, obj):
        return JobAdSimpleSerializer(obj.jobadvertise).data

    def get_sugub(self, obj):
        return SugubSimpleSerializer(obj.jobadvertise.sugub).data


class JobAdSerializer(JobAdSimpleSerializer):
    sugub = serializers.PrimaryKeyRelatedField(read_only=True)
    jobapplicants = JobAppSerializer(read_only=True, many=True)


class JobAdModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobAdvertise
        fields = '__all__'

    def update(self, instance, validated_data):
        jobadvertise_status = validated_data.get('jobadvertise_status', None)
        user = self.context['request'].user

        # ???????????? ?????? ???????????????
        # if not user.is_admin:
        #     raise serializers.ValidationError('???????????? ?????????????????????.')

        # ????????????????????? ????????? ????????????(?????????) ??????
        # if jobadvertise_status == ComCode.objects.get(code_id='CA0300000'):
        #     sugub = instance.sugub
        #     sugub.sugub_status = ComCode.objects.get(code_id='CC0200000')
        #     sugub.save()

        '''
        ???????????? ?????? ??? ?????? 
        '''
        if instance.jobadvertise_status != jobadvertise_status:
            # todo ??????->??????, ??????->??????
            alarm = Alarm(
                receiver=instance.sugub.user,
                alarm_gubun=ComCode(code_id='ZE0100000'),
                title='[ ' + instance.jobadvertise_title + ' ] ' + '??????????????? ?????? ???????????????.',
                contents='???????????????',
                link_url=URL_FRONT + 'Company/SugubInfo/' + str(instance.sugub.id)
            )
            alarm.save()

        instance = super(JobAdModelSerializer, self).update(instance, validated_data)

        return instance

    def create(self, validated_data):
        obj = validated_data.get('sugub', None)
        if isinstance(obj, Sugub):
            jobadvertise_title = obj.work_position
            company_name = obj.companyprofile.custname
            main_work = obj.work_role
            dpt_name = obj.work_dept
            salary = obj.salary_start + obj.salary_end
            welfare = obj.bokri
            condition = obj.wrk_condition
            special_condition = obj.spec
            location = obj.work_load_addr
        else:
            jobadvertise_title = '?????? ????????? ???????????????'
            company_name = '?????????'
            main_work = 'main_work'
            dpt_name = 'dpt_name'
            salary = 'salary'
            welfare = 'welfare'
            condition = 'wrk_condition'
            special_condition = 'special_condition'
            location = 'location'
        jobadvertise, created = JobAdvertise.objects.update_or_create(
            sugub=obj,
            defaults={
                'company_name': company_name,
                'company_name_yn': validated_data.get('company_name_yn', True),
                'main_work': main_work,
                'main_work_yn': validated_data.get('main_work_yn', True),
                'dpt_name': dpt_name,
                'dpt_name_yn': validated_data.get('dpt_name_yn', True),
                'salary': salary,
                'salary_yn': validated_data.get('salary_yn', True),
                'condition': condition,
                'condition_yn': validated_data.get('condition_yn', True),
                'special_condition': special_condition,
                'special_condition_yn': validated_data.get('special_condition_yn', True),
                'welfare': welfare,
                'welfare_yn': validated_data.get('welfare_yn', True),
                'location': location,
                'location_yn': validated_data.get('location_yn', True),
                'jobadvertise_title': jobadvertise_title
            }
        )
        '''
        info ?????? ??????
        '''
        # email_template = 'jobadvertise/jobad_register'
        # email_address = 'chaegong.info@gmail.com'
        # ctx = {
        #     "user": validated_data.get('user', None)
        # }
        # SendMail(email_template, email_address, ctx)
        """
        ?????????????????? ??????
        """
        admin_list = User.objects.filter(is_admin=True).values('id')
        for receiver in admin_list:
            alarm = Alarm(receiver=User(id=receiver['id']),
                          alarm_gubun=ComCode(code_id='ZE0100000'),
                          title='?????????????????? ?????? ?????????????????????.',
                          contents='?????????????????? ?????? ??? ??????????????? ??????????????????.\n\r',
                          )
            alarm.save()
        '''
        ????????? ?????? 
        '''
        alarm = Alarm(receiver=self.context['request'].user,
                      alarm_gubun=ComCode(code_id='ZE0100000'),
                      title='?????????????????? ?????? ?????????????????????.',
                      contents='???????????? ?????? ??? ?????????????????? ??????????????? ?????????????????????.',
                      link_url=None)
        alarm.save()
        return jobadvertise


class SugubModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sugub
        fields = '__all__'
        read_only_fields = ('user', )

    company_name_yn = serializers.BooleanField(source='jobadvertise.company_name_yn', allow_null=True, default=False, required=False)
    salary_yn = serializers.BooleanField(source='jobadvertise.salary_yn', allow_null=True, default=False, required=False)
    dpt_name_yn = serializers.BooleanField(source='jobadvertise.dpt_name_yn', allow_null=True, default=False, required=False)
    main_work_yn = serializers.BooleanField(source='jobadvertise.main_work_yn', allow_null=True, default=False, required=False)
    condition_yn = serializers.BooleanField(source='jobadvertise.condition_yn', allow_null=True, default=False, required=False)
    special_condition_yn = serializers.BooleanField(source='jobadvertise.special_condition_yn', allow_null=True, default=False, required=False)
    # jobadvertise = JobAdModelSerializer()

    def create(self, validated_data):
        jobadvertise_data = validated_data.pop('jobadvertise', {})

        sugub_jikjong_low = validated_data.pop('sugub_jikjong_low', None)
        work_position = validated_data.get('work_position', None)
        salary_start = validated_data.get('salary_start', 0)
        salary_end = validated_data.get('salary_end', 0)
        sugub_title = validated_data.pop('sugub_title', None)

        if sugub_title is None:
            sugub_title = work_position
        if salary_end == 0:
            salary_end = salary_start
        sugub = Sugub(sugub_title=sugub_title, **validated_data)
        sugub.salary_end = salary_end
        sugub.save()
        jobadvertise = JobAdvertise.objects.create(
            sugub=sugub, **jobadvertise_data
        )
        jobadvertise.save()

        '''
        Slack ??????
        '''
        text = '*[?????????????????????]* [{}] - _{}_ ??? ?????????????????????.'.format(sugub.sugub_title, sugub.companyprofile.custname)
        slack_notify(text)

        '''
        info ?????? ??????
        '''
        # admin_email_list = User.objects.filter(is_admin=True).values('email')
        # for email in admin_email_list:
        #     email_template = 'sugub/sugub_register'
        #     email_address = email['email']
        #     ctx = {
        #         "user": validated_data.get('user', None)
        #     }
        #     SendMail(email_template, email_address, ctx)
        '''
        ??????????????? ??????
        alarm = Alarm(receiver=self.context['request'].user,
                      alarm_gubun=ComCode(code_id='ZE0100000'),
                      title='[' + str(sugub.sugub_title) + ']' + '????????? ?????????????????????.',
                      contents='??????????????? ????????? ?????? ????????? ??? ???????????? ????????? ???????????????.\n\r'
                               '???????????? ????????? ?????? ?????? ??? ????????? ??????????????? ???????????????.\n\r'
                               '???????????????.',
                      link_url=URL_FRONT + 'Company/SugubDetailInfo/' + str(sugub.id))
        alarm.save()
        '''

        '''
        ?????????????????? ??????
        '''
        # admin_list = User.objects.filter(is_admin=True).values('id')
        # for receiver in admin_list:
        #     alarm = Alarm(receiver=User(id=receiver['id']),
        #                   alarm_gubun=ComCode(code_id='ZE0100000'),
        #                   title='????????? ?????????????????????.',
        #                   contents='????????? ????????? ??????????????????.\n\r',
        #                   link_url=URL_FRONT + 'Company/SugubDetailInfo/' + str(sugub.id))
        #     alarm.save()
        '''
        ?????????????????? SMS ??????
        '''
        # for receiver in admin_list:
        #     obj = User.objects.get(id=receiver['id'])
        #     if obj.phone:
        #         infosms = InfoSms.objects.create(
        #             from_number=obj.phone,
        #             to_number=obj.phone,
        #             contents='[' + str(sugub.sugub_title) + ']' + '????????? ?????????????????? ?????????????????????.'
        #         )
        #         infosms.save()

        if sugub_jikjong_low is not None:
            for list in sugub_jikjong_low:
                sugub.sugub_jikjong_low.add(list)

        return sugub

    def update(self, instance, validated_data):
        jobadvertise_data = validated_data.pop('jobadvertise', {})
        jobad_list = instance.jobadvertise.all()
        for jobad in jobad_list:
            jobad.company_name_yn = jobadvertise_data.get('company_name_yn', jobad.company_name_yn)
            jobad.salary_yn = jobadvertise_data.get('salary_yn', jobad.salary_yn)
            jobad.main_work_yn = jobadvertise_data.get('main_work_yn', jobad.main_work_yn)
            jobad.dpt_name_yn = jobadvertise_data.get('dpt_name_yn', jobad.dpt_name_yn)
            jobad.condition_yn = jobadvertise_data.get('condition_yn', jobad.condition_yn)
            jobad.special_condition_yn = jobadvertise_data.get('special_condition_yn', jobad.special_condition_yn)
            jobad.save()

        # # todo ????????? ?????? ???
        # manager = validated_data.get('manager', None)
        # if instance.manager is None and manager is not None:
        #     email_template = 'sugub/sugub_manager'
        #     email_address = manager

        # todo ?????? JD ?????? ???
        # ?????? ?????? ??????????????? ?????? ?????? ??????
        # SendMail(email_template, email_address, ctx)

        # print('sugub update validated_data:', validated_data)
        """
        ???????????? ?????? ??? ?????? 
        """
        next_status = validated_data.get('sugub_status', None)
        if instance.sugub_status != next_status:
            # ??????->??????
            if next_status == ComCode.objects.get(code_id='CC0200000'):
                # JobAd ?????? ??????????????? ??????
                for obj in instance.jobadvertise.all():
                    obj.jobadvertise_status = ComCode.objects.get(code_id='CA0300000')
                    obj.save()

                """??????????????? ??????"""
                alarm = Alarm(
                    receiver=instance.user,
                    alarm_gubun=ComCode(code_id='ZE0100000'),
                    title='[' + str(instance.sugub_title) + ']' + '??????????????? [?????????]?????? ?????? ???????????????.',
                    contents='?????? ??????????????? ???????????????.',
                    link_url=URL_FRONT + 'Company/SugubInfo/' + str(instance.id))
                alarm.save()

                """ ?????????????????? ??????"""
                hr_alarm_list = HrProfile.objects.filter(status_cd='CB0200000').exclude(user=None).values('user')
                for receiver in hr_alarm_list:
                    hr_alarm = Alarm(
                        receiver=User(id=receiver['user']),
                        alarm_gubun=ComCode(code_id='ZE0100000'),
                        title='[ ' + str(instance.sugub_title) + ' ] ' + '?????? ??????????????? ?????????????????????.',
                        contents='?????? ???????????? ?????? ??? ???????????? ?????? ????????????!',
                        link_url=URL_FRONT + 'Mng/sugub/' + str(instance.id)
                    )
                    hr_alarm.save()
            # ??????->??????
            elif next_status == ComCode.objects.get(code_id='CC0300000'):
                alarm = Alarm(
                    receiver=self.context['request'].user,
                    alarm_gubun=ComCode(code_id='ZE0100000'),
                    title='[' + str(instance.sugub_title) + ']' + '????????? ?????????????????????.',
                    contents='????????? ???????????????.',
                    link_url=URL_FRONT + 'Company/Review/' + str(instance.id))
                alarm.save()
            else:
                pass

        instance = super(SugubModelSerializer, self).update(instance, validated_data)
        return instance


class ImportPaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportPaymentHistory
        fields = '__all__'


class PointSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    sugub_review = serializers.PrimaryKeyRelatedField(queryset=SugubReview.objects.all())
    # sugub_review = serializers.PrimaryKeyRelatedField(read_only=True)
    point_gubun = ComCodeSerializer()
    point = serializers.IntegerField()


class SugubReviewSerializer(serializers.Serializer):
    user = UserSimpleSerializer(required=False)
    hrprofile = serializers.SerializerMethodField()
    review_comment = serializers.CharField(required=False)
    # review_point = serializers.CharField(required=False)
    created_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)
    modified_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)
    sugub = serializers.SerializerMethodField()
    sugubreview_point = PointSerializer(many=True, read_only=True)
    point_avg = serializers.FloatField(read_only=True)

    def get_hrprofile(self, obj):
        from hr_profile.serializers import HrProfileSimpleSerializer
        return HrProfileSimpleSerializer(obj.hrprofile).data

    def get_sugub(self, obj):
        from company_profile.serializers import SugubSimpleSerializer
        return SugubSimpleSerializer(obj.sugub).data


class SugubReviewModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SugubReview
        fields = '__all__'

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    hrprofile = serializers.PrimaryKeyRelatedField(read_only=True)
    sugubreview_point = PointSerializer(many=True, read_only=True)
    point_avg = serializers.FloatField(read_only=True)


class EstimateFileSerializer(serializers.ModelSerializer):
    estimate_file = serializers.FileField()
    estimate_filename = serializers.CharField()
    class Meta:
        model = EstimateFile
        fields = ['id', 'estimate_file', 'estimate_filename', 'created_time']


class EstimateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user = UserSimpleSerializer()
    # hrprofile = serializers.SerializerMethodField()
    estimate_file = EstimateFileSerializer(many=True, read_only=True)
    created_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    # def get_hrprofile(self, obj):
    #     from hr_profile.serializers import HrProfileSimpleSerializer
    #     return HrProfileSimpleSerializer(obj.hrprofile).data


class EstimateModelSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    hrprofile = serializers.SerializerMethodField()
    estimate_file = EstimateFileSerializer(many=True, read_only=True)
    created_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    def get_user(self, obj):
        from backend.serializers import UserSimpleSerializer
        return UserSimpleSerializer(obj.user).data

    def get_hrprofile(self, obj):
        from hr_profile.serializers import HrProfileSimpleSerializer
        return HrProfileSimpleSerializer(obj.hrprofile).data

    class Meta:
        model = Estimate
        fields = ['id', 'sugub', 'hrprofile', 'user', 'estimate_file', 'created_time', 'comments']

    def create(self, validated_data):
        estimate = Estimate.objects.create(**validated_data)
        user = self.context['request'].user
        companyprofile, hrprofile = user.check_profile(user)
        estimate.hrprofile = hrprofile
        estimate.user = user
        estimate.save()

        files = self.context['request'].FILES
        if files:
            file = files.get('estimate_file')
            EstimateFile.objects.create(estimate=estimate, estimate_file=file)

        '''
        ??????????????? ????????? ??????
        '''
        alarm = Alarm(
            receiver=estimate.sugub.user,
            alarm_gubun=ComCode(code_id='ZE0100000'),
            title='????????? ?????????????????? ?????? ???????????????.',
            contents='?????????????????? ??????????????????.',
            link_url=URL_FRONT + 'Company/SugubInfo/' + str(estimate.sugub.id),
        )
        alarm.save()

        return estimate

class SugubSimpleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    # companyprofile = CompanyProfileSimpleSerializer()
    custid = serializers.CharField()
    sugub_title = serializers.CharField()
    sugub_status = ComCodeSerializer()
    chae_cd = ComCodeSerializer()
    work_position = serializers.CharField()
    sugub_end_dt = serializers.DateField(allow_null=True, required=False)
    salary_gubun = ComCodeSerializer()
    salary_start = serializers.IntegerField()
    salary_end = serializers.IntegerField()
    chae_gigan_type = ComCodeSerializer()
    chae_gigan = serializers.IntegerField()
    spec = serializers.CharField()
    work_role = serializers.CharField()
    work_load_addr_code = serializers.CharField()
    work_load_addr = serializers.CharField()
    work_load_addr_detail = serializers.CharField()
    wrk_condition = serializers.CharField()
    bokri = serializers.CharField()
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    work_dept = serializers.CharField()
    hire_count = serializers.IntegerField()
    # hire_type = serializers.CharField()
    hire_type = ComCodeSerializer()
    # cont_chg_gb = serializers.CharField()
    cont_chg_gb = ComCodeSerializer()
    # work_type = serializers.CharField()
    work_type = ComCodeSerializer()
    work_type_comment = serializers.CharField()
    work_time_start = serializers.CharField()
    work_time_end = serializers.CharField()
    work_rest_start = serializers.CharField()
    work_rest_end = serializers.CharField()
    work_rest_comment = serializers.CharField()
    salary_term = serializers.CharField()
    work_site_gubun = serializers.CharField()
    work_house_gubun = serializers.BooleanField()
    work_near_subway = serializers.CharField()
    work_traffic = serializers.CharField()
    sugub_salary_adjust = serializers.BooleanField()
    # manager = serializers.CharField()
    manager = UserSimpleSerializer()
    age_start = serializers.IntegerField()
    age_end = serializers.IntegerField()
    sugub_career_gb = ComCodeSerializer()
    career_start = serializers.IntegerField()
    career_end = serializers.IntegerField()
    education_cd = ComCodeSerializer()
    sugub_gender = ComCodeSerializer()
    sugub_jikjong_top = ComCodeSerializer()
    sugub_jikjong_mid = ComCodeSerializer()
    sugub_jikjong_low = ComCodeSerializer(many=True)
    etc = serializers.CharField()
    ot_daily = serializers.IntegerField()
    ot_daily_yn = serializers.BooleanField()
    ot_night = serializers.IntegerField()
    ot_night_yn = serializers.BooleanField()
    ot_holiday = serializers.IntegerField()
    ot_holiday_yn = serializers.BooleanField()
    # applicants_count = serializers.SerializerMethodField()
    #
    # def get_applicants_count(self, obj):
    #     instance = obj.jobadvertise.get()
    #     count = instance.applicants_count()
    #     print('count', count)
    #     return count


class SugubSignModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SugubSign
        fields = ('id', 'sugub', 'sign_code', 'sanctioner', 'damdang', )


class SugubListSerializer(SugubSimpleSerializer):
    user = UserSimpleSerializer(read_only=True)
    jobadvertise = JobAdSimpleSerializer(read_only=True, many=True)
    sugub_reviews = SugubReviewSerializer(many=True, read_only=True)
    companyprofile = CompanyProfileSimpleSerializer()
    percentage = serializers.CharField()
    estimated_price = serializers.IntegerField(read_only=True)
    estimated_earnings = serializers.IntegerField(read_only=True)


class SugubHrListSerializer(SugubSimpleSerializer):
    user = UserSimpleSerializer(read_only=True)
    jobadvertise = JobAdSimpleSerializer(read_only=True, many=True)
    # sugub_reviews = SugubReviewSerializer(many=True, read_only=True)


class SugubSerializer(SugubSimpleSerializer):
    user = UserSimpleSerializer(read_only=True)
    manager = UserSimpleSerializer(read_only=True)
    companyprofile = CompanyProfileSimpleSerializer()
    jobadvertise = JobAdSerializer(many=True, read_only=True)
    sugub_reviews = SugubReviewSerializer(many=True, read_only=True)
    estimated_price = serializers.IntegerField(read_only=True)
    estimated_earnings = serializers.IntegerField(read_only=True)
    estimate_sugub = EstimateModelSerializer(many=True)
    # estimate_sugub = EstimateSerializer(many=True)
    # # sugub_count = serializers.IntegerField()
    interest = serializers.SerializerMethodField(read_only=True)

    def get_interest(self, obj):
        try:
            user = self.context['request'].user
        except:
            return None
        if user.is_anonymous:
            return None
        else:
            try:
                obj = user.interestsugub_user.get(sugub=obj)
                return obj.id
            except:
                return None

class SugubHrSerializer(SugubSimpleSerializer):
    user = UserSimpleSerializer(read_only=True)
    manager = UserSimpleSerializer(read_only=True)
    companyprofile = CompanyProfileSimpleSerializer(read_only=True)
    # jobadvertise = JobAdSerializer(read_only=True, many=True) ??????
    jobadvertise = JobAdSimpleSerializer(read_only=True, many=True)
    sugub_reviews = SugubReviewSerializer(many=True, read_only=True)
    estimated_price = serializers.IntegerField(read_only=True)
    estimated_earnings = serializers.IntegerField(read_only=True)
    interest = serializers.SerializerMethodField(read_only=True)

    def get_interest(self, obj):
        try:
            user = self.context['request'].user
        except:
            return None
        if user.is_anonymous:
            return None
        else:
            try:
                obj = user.interestsugub_user.get(sugub=obj)
                return obj.id
            except:
                return None

class CompanyProfileSerializer(CompanyProfileSimpleSerializer):
    company_coworker = CompanyProfileCoworkerSerializer(many=True, read_only=True, required=False)
    # company_sugub = SugubSerializer(many=True, read_only=True, required=False)
    sugub_count = serializers.IntegerField()


class CompanyProfileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = '__all__'

        read_only_fields = ('company_image', 'company_logo', 'stock_gubun')
    # company_form = serializers.PrimaryKeyRelatedField(read_only=True)
    # status_cd = serializers.PrimaryKeyRelatedField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    gross_total = serializers.IntegerField(required=False, allow_null=True)
    emp_count = serializers.IntegerField(required=False, allow_null=True)

    def update(self, instance, validated_data):

        next_status = validated_data.get('status_cd', None)
        if instance.status_cd != next_status:
            # ??????-> ????????????
            if next_status == ComCode.objects.get(code_id='CB0200000'):
                ''' ??????????????? ???????????? ?????? '''
                for receiver in instance.user.all():
                    cp_alarm = Alarm(
                        receiver=receiver,
                        alarm_gubun=ComCode(code_id='ZE0300000'),
                        title='?????? ?????????????????????.',
                        contents='?????? ????????? ???????????? ???????????????.',
                        link_url=URL_FRONT + 'Company/Profile/'
                    )
                    cp_alarm.save()
        instance = super(CompanyProfileModelSerializer, self).update(instance, validated_data)

        file_data = self.context['request'].FILES

        if file_data:
            company_logo = file_data.get('company_logo')
            company_image = file_data.get('company_image')
            if company_logo:
                instance.company_logo = company_logo
            if company_image:
                instance.company_image = company_image
            instance.save()

        return instance

        # return instance

    def create(self, validated_data):
        # print('validated_data', validated_data)
        user = self.context['request'].user
        custid = validated_data.get('custid', None)

        if custid is not None:
            if CompanyProfile.objects.filter(custid=custid, status_cd='CB0200000').exists():
                companyprofile = CompanyProfile.objects.get(custid=custid, status_cd='CB0200000')
                created = False
            else:
                companyprofile = CompanyProfile.objects.create(**validated_data)
                created = True
        else:
            created = True
            companyprofile = CompanyProfile.objects.create(**validated_data)

        if created:  # ?????????????????? ????????? ??????
            company_instance = CompanyProfileCoWorker.objects.create(
                user=user, companyprofile=companyprofile,
                # coworker_phone=manager_phone,
                companyprofile_auth=ComCode.objects.get(code_id='CG0200000')
            )
            print('??????', company_instance)
        else:
            company_instance = CompanyProfileCoWorker.objects.create(
                user=user, companyprofile=companyprofile,
                # coworker_phone=manager_phone,
                companyprofile_auth=ComCode.objects.get(code_id='CG0100000'))
            print('??????', company_instance)

        companyprofile.user.add(user)
        company_instance.save()

        '''
        Slack ??????
        '''
        text = '*[????????????]* [_{}_]??? ?????????????????????.'.format(companyprofile.custname)
        slack_notify(text)

        '''
        ??????????????? ?????? ??? ?????? ??????
        '''
        # admin_email_list = User.objects.filter(is_admin=True, email='admin@chaema.co.kr').values('email')
        # for email in admin_email_list:
        #     email_template = 'common/company_register'
        #     email_address = email['email']
        #     ctx = {
        #         "user": validated_data.get('user', None)
        #     }
        #     SendMail(email_template, email_address, ctx)

        '''
        ?????????????????? ??????
        '''
        # admin_list = User.objects.filter(is_admin=True).values('id')
        # for receiver in admin_list:
        #     alarm = Alarm(receiver=User(id=receiver['id']),
        #                   alarm_gubun=ComCode(code_id='ZE0300000'),
        #                   title='?????? ????????? ?????????????????????.',
        #                   contents='????????? ????????? ??????????????????.\n\r')
        #     alarm.save()
        '''
        ?????? ?????? ?????? ?????? 
        '''
        # for receiver in admin_list:
        #     obj = User.objects.get(id=receiver['id'])
        #     if obj.phone:
        #         infosms = InfoSms.objects.create(
        #             from_number=obj.phone,
        #             to_number=obj.phone,
        #             contents='?????? ????????? ?????????????????????.'
        #         )
        #         infosms.save()

        return companyprofile

    def to_representation(self, instance):
        data = super(CompanyProfileModelSerializer, self).to_representation(instance)
        if data['user']:
            data['user'] = UserProfile.objects.filter(user__in=data['user']).values()
            # data['user'] = UserProfileSerializer(instance.user).data
        return data






