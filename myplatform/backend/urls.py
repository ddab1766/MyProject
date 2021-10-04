from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from .views import (
    AlarmSettingModelViewSet,
    InvitationsModelViewSet,
    RecommendSugubReadOnlyModelViewSet,
    DemandModelViewSet,
    TestViewSet)

router = routers.DefaultRouter()
router.register(r'setting/alarm', AlarmSettingModelViewSet, )
router.register(r'invitations', InvitationsModelViewSet, )
router.register(r'recommend/sugub', RecommendSugubReadOnlyModelViewSet, )
router.register(r'demand', DemandModelViewSet, )
router.register(r'test', TestViewSet, )

urlpatterns = [
    path('', include(router.urls)),
]
