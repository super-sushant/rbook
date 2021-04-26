from rest_auth.registration.views import (SocialAccountListView, SocialAccountDisconnectView)
from django.urls import path,include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'users',UserViewSet)

urlpatterns =[
	path('',include(router.urls)),
	]

urlpatterns += [
    path('/', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    path('facebook/$', FacebookLogin.as_view(), name='fb_login'),
    path('twitter/$', TwitterLogin.as_view(), name='twitter_login'),

    path(
        'socialaccounts/$',
        SocialAccountListView.as_view(),
        name='social_account_list'
    ),
    path(
        'socialaccounts/(?P<pk>\d+)/disconnect/$',
        SocialAccountDisconnectView.as_view(),
        name='social_account_disconnect'
    )
]
