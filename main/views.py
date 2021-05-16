from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import viewsets,permissions,filters
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *


@api_view()
def null_view(request):
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view()
def complete_view(request):
    return Response("Email account is activated")
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer
	filter_backends = [filters.SearchFilter]
	search_fields =['username','first_name']
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserProfileViewSet(viewsets.ModelViewSet):
	filterset_fields =['user']
	queryset = UserProfile.objects.all().order_by('-pk')
	serializer_class = UserProfileSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
class PostViewSet(viewsets.ModelViewSet):
	queryset =Post.objects.all().order_by('-pk')
	filterset_fields =['user']
	serializer_class = PostSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CommentViewSet(viewsets.ModelViewSet):
	queryset=Comment.objects.all().order_by('-pk')
	serializer_class =CommentSerializer
	filterset_fields=['post']
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ImageViewSet(viewsets.ModelViewSet):
	queryset = Image.objects.all().order_by('-pk')
	serializer_class = ImageSerializer
	filterset_fields=['post']
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PostLikeViewSet(viewsets.ModelViewSet):
	queryset=PostLikes.objects.all().order_by('-pk')
	serializer_class = PostLikeSerializer
	permission_classes = [permissions.IsAuthenticated]
	def create(self,request):
		serializer=PostLikeSerializer(data=request.data)
		if serializer.is_valid():
			return super().create(request)
		else :
			postlike=PostLikes.objects.get(post_id=request.data['post'].split('/')[-2], user_id=request.data['user'].split('/')[-2]).delete()
		return HttpResponse({"deleted"})
class CommentLikeViewSet(viewsets.ModelViewSet):
	queryset=CommentLikes.objects.all().order_by('-pk')
	serializer_class = CommentLikeSerializer
	permission_classes = [permissions.IsAuthenticated]
	def create(self,request):
		serializer=CommentLikeSerializer(data=request.data)
		if serializer.is_valid():
			return super().create(request)
		else :
			commentlike=CommentLikes.objects.get(comment_id=request.data['comment'].split('/')[-2], user_id=request.data['user'].split('/')[-2]).delete()
		return HttpResponse({"deleted"})
class CategoryViewSet(viewsets.ModelViewSet):
	queryset=Category.objects.all().order_by('-pk')
	serializer_class=CategorySerializer

class CommunityViewSet(viewsets.ModelViewSet):
	queryset=Community.objects.all().order_by('-pk')
	serializer_class=CommunitySerializer
	filter_backends = [DjangoFilterBackend,filters.SearchFilter]
	filterset_fields =['category']
	search_fields=['name']
