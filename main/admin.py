from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Comment)
admin.site.register(Post)
admin.site.register(PostLikes)
admin.site.register(CommentLikes)
admin.site.register(Image)
