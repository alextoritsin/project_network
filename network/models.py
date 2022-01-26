from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField('self', symmetrical=False)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='subs')

    def __str__(self) -> str:
        return self.username    

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    content = models.TextField()
    likes = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"#{self.id} from {self.author}"

    

