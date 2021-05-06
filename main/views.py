from django.shortcuts import render
from django.http import HttpResponse
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
	filterset_fields =['user']
	serializer_class = UserProfileSerializer
	#permission_classes = [permissions.IsAuthenticated]

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

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
	#permission_classes = [permissions.IsAuthenticated]
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
	filterset_fields =['category']
