from django.contrib import admin
from .models import UserProfile

class UserProfileAdmin(admin.ModelAdmin):
    fields = ['user', 'first_name', 'last_name', 'city', 'state', 'phone']

admin.site.register(UserProfile, UserProfileAdmin)

