from rest_framework_simplejwt import views as jwt_views
from django.urls import path,include,re_path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'users',UserProfileViewSet)
router.register(r'us',UserViewSet)
router.register(r'posts',PostViewSet)
router.register(r'postsl',PostLikeViewSet)
router.register(r'comments',CommentViewSet)
router.register(r'commentsl',CommentLikeViewSet)
router.register(r'images',ImageViewSet)
urlpatterns =[
	path('',include(router.urls)),
	path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
	path('refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
	]
