from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ['pk','url', 'username','first_name','last_name', 'email', 'groups']

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
	#user = UserSerializer(read_only = True)
	class Meta:
		model = UserProfile
		fields ='__all__'

class PostSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model= Post
		fields ='__all__'
class CommentSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model=Comment
		fields ='__all__'

class ImageSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model=Image
		fields='__all__'

class PostLikeSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model=PostLikes
		fields=['post','user']

class CommentLikeSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model=CommentLikes
		fields=['comment','user']


class CommunitySerializer(serializers.ModelSerializer):
	class Meta:
		model=Community
		fields='__all__'

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model=Category
		fields='__all__'
