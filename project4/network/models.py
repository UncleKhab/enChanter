from django.contrib.auth.models import AbstractUser, User
from django.conf import settings
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posts")
    content = models.CharField(max_length = 256)
    date_added = models.DateTimeField(auto_now_add=True)
    like = models.ManyToManyField(User, blank=True, related_name="liked_user")

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user,
            "content": self.content,
            "date_added": self.date_added.strftime("%b %-d %Y, %-I:%M %p"),
            "like": self.like
        }
    

<<<<<<< HEAD
=======
class Follower(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="following")
    follow = models.ForeignKey(User, on_delete=models.CASCADE,related_name="followers")
>>>>>>> 933885e739e76ff9b60f0f029fe2c66423dd73d9



