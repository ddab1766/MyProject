import rest_framework_filters as filters
from django.db.models import Q
from backend.models import ComCode

# HRPROFILE 필터
class HrProfileFilter(filters.FilterSet):
    # is_expose = filters.BooleanFilter()
    # user = filters.BooleanFilter()
    service_address = filters.ModelMultipleChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='BE') & Q(code_topcd=None)))
    hrspecial__hr_jikjong_top = filters.ModelMultipleChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='AA') & Q(code_topcd=None)))
