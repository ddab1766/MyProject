from backend.models import ( ComCode, )
from django.db.models import Q
import rest_framework_filters as filters
from backend.filters import EndFilter

# 수급필터
class SugubFilter(filters.FilterSet):
    sugub_title = filters.CharFilter(lookup_expr='contains')
    chae_cd = filters.ModelMultipleChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='AC') & Q(code_topcd=None)))
    sugub_career_gb = filters.ModelMultipleChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='AB') & Q(code_topcd=None)))
    sugub_status = filters.ModelMultipleChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='CC') & Q(code_topcd=None)))
    education_cd = filters.ModelChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='AO') & Q(code_topcd=None)))
    sugub_jikjong_top = filters.ModelChoiceFilter(
        queryset=ComCode.objects.filter(Q(code_topidx='AA') & Q(code_topcd=None)))
    sugub_jikjong_mid = filters.ModelChoiceFilter(
        queryset=ComCode.objects.filter(Q(code_topidx='AA') & Q(code_id__endswith='000') & ~Q(code_topcd=None)))


#  JobApp 필터
class JobAppFilter(filters.FilterSet):
    sugub_title = filters.CharFilter(field_name='jobadvertise__sugub__sugub_title', lookup_expr='contains')
    chae_cd = filters.ModelChoiceFilter(field_name='jobadvertise__sugub__chae_cd',
                                        queryset=ComCode.objects.filter(Q(code_topidx='AC') & Q(code_topcd=None)))
    company_name = filters.CharFilter(field_name='jobadvertise__company_name', lookup_expr='contains')
    applied_at_min = filters.DateFilter(field_name='applied_at', lookup_expr='gte')
    # applied_at_max = filters.DateFilter(field_name='applied_at', lookup_expr='lte')
    applied_at_max = EndFilter(field_name='applied_at', lookup_expr='lt')
    applied_username = filters.CharFilter(field_name='applied_username', lookup_expr='contains')
    applied_phone = filters.CharFilter(lookup_expr='contains')
    applied_status = filters.ModelMultipleChoiceFilter(
        queryset=ComCode.objects.filter(Q(code_topidx='BW')))
