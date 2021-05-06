from rest_framework_jwt import views as jwt_views
from django.urls import path,include,re_path
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
	path('',include(router.urls)),
	path('token/', jwt_views.obtain_jwt_token, name='token_obtain_pair'),
	path('refresh/', jwt_views.refresh_jwt_token, name='token_refresh'),
	path('verify/',jwt_views.verify_jwt_token),
	path('rest-auth/', include('rest_auth.urls')),
	path('rest-auth/registration/', include('rest_auth.registration.urls')),
	]
