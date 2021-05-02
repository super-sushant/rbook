from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets,permissions
from .serializers import *
from .models import *
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer
	#permission_classes = [permissions.IsAuthenticated]

class UserProfileViewSet(viewsets.ModelViewSet):
	queryset = UserProfile.objects.all().order_by('-pk')
	serializer_class = UserProfileSerializer
	#permission_classes = [permissions.IsAuthenticated]


class PostViewSet(viewsets.ModelViewSet):
	queryset =Post.objects.all().order_by('-pk')
	filterset_fields =['user']
	serializer_class = PostSerializer
	#permission_classes = [permissions.IsAuthenticated]


class CommentViewSet(viewsets.ModelViewSet):
	queryset=Comment.objects.all().order_by('-pk')
	serializer_class =CommentSerializer
	filterset_fields=['post']
	#permission_classes = [permissions.IsAuthenticated]

class ImageViewSet(viewsets.ModelViewSet):
	queryset = Image.objects.all().order_by('-pk')
	serializer_class = ImageSerializer
	filterset_fields=['post']
	#permission_classes = [permissions.IsAuthenticated]

class PostLikeViewSet(viewsets.ModelViewSet):
	queryset=PostLikes.objects.all().order_by('-pk')
	serializer_class = PostLikeSerializer
	#permission_classes = [permissions.IsAuthenticated]

class CommentLikeViewSet(viewsets.ModelViewSet):
	queryset=CommentLikes.objects.all().order_by('-pk')
	serializer_class = CommentLikeSerializer
	#permission_classes = [permissions.IsAuthenticated]
