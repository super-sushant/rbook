import os
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
def file_name(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (instance.user.username,ext)
    return os.path.join('dp', filename)
class TimeStampedModel(models.Model):
	"""
	An abstract base class model that provides self-
	updating ``created`` and ``modified`` fields.
	"""
	created = models.DateTimeField(auto_now_add=True)
	modified = models.DateTimeField(auto_now=True)
	class Meta:
		abstract = True
class Category(models.Model):
	pic=models.ImageField(upload_to='thumbs')
	name=models.CharField(max_length=30)

class Community(models.Model):
	pic=models.ImageField(upload_to='thumbs')
	name=models.CharField(max_length=30)
	category=models.ManyToManyField(Category)


class UserProfile(models.Model):
	user =models.OneToOneField(User,blank =False,on_delete=models.CASCADE)
	dp = models.ImageField(upload_to=file_name,blank=True,null=True)
	dob = models.DateField(blank=True,null=True)
	community=models.ManyToManyField(Community)
	starred=models.ManyToManyField(User,related_name='favourites')

class Post(TimeStampedModel):
	user=models.ForeignKey(User,blank =False,on_delete=models.CASCADE)
	text=models.CharField(max_length=300,blank=True)
	community=models.ForeignKey(Community,null=True,default=None,on_delete=models.CASCADE)
	likes=models.IntegerField(default=0)

class Comment(TimeStampedModel):
	post=models.ForeignKey(Post,blank=True,on_delete=models.CASCADE)
	user=models.ForeignKey(User,blank =False,on_delete=models.CASCADE)
	text=models.CharField(max_length=300,blank=True)
	image=models.ImageField(upload_to='media/images/',null=True)
	likes=models.IntegerField(default=0)

class Image(TimeStampedModel):
	post=models.ForeignKey(Post,null=True,blank=True,on_delete=models.CASCADE)
	image=models.ImageField(upload_to='images/')


class PostLikes(TimeStampedModel):
	post=models.ForeignKey(Post,null=False,blank=False,on_delete=models.CASCADE)
	user=models.ForeignKey(User,on_delete=models.CASCADE)
	class Meta:
		unique_together=('post','user')

class CommentLikes(TimeStampedModel):
	comment=models.ForeignKey(Comment,null=False,blank=False,on_delete=models.CASCADE)
	user=models.ForeignKey(User,on_delete=models.CASCADE)
	class Meta:
		unique_together=('comment','user')



