from django.db import models
from backend.settings import AUTH_USER_MODEL


class UserProfile(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    city = models.CharField(max_length=255, default='')
    state = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=255, default='')

    def __str__(self):
        return str(self.user) + " " + self.first_name + " " + self.last_name
