from allauth.account.views import ConfirmEmailView
from rest_framework_jwt import views as jwt_views
from django.urls import path,include,re_path
from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'users',UserProfileViewSet)
router.register(r'us',UserViewSet)
router.register(r'cat',CategoryViewSet)
router.register(r'com',CommunityViewSet)
router.register(r'posts',PostViewSet)
router.register(r'postsl',PostLikeViewSet)
router.register(r'comments',CommentViewSet)
router.register(r'commentsl',CommentLikeViewSet)
router.register(r'images',ImageViewSet)
urlpatterns =[
	path('rest-auth/registration/account-email-verification-sent/', null_view, name='account_email_verification_sent'),
	url(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
	url(r'^rest-auth/registration/complete/$', complete_view, name='account_confirm_complete'),
	url(r'^reast-auth/password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', null_view, name='password_reset_confirm'),	path('',include(router.urls)),
	path('token/', jwt_views.obtain_jwt_token, name='token_obtain_pair'),
	path('refresh/', jwt_views.refresh_jwt_token, name='token_refresh'),
	path('verify/',jwt_views.verify_jwt_token),
	path('rest-auth/', include('rest_auth.urls')),
	path('rest-auth/registration/', include('rest_auth.registration.urls')),
	]
