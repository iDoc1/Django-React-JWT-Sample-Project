from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from profiles.models import UserProfile


class UserAccountManager(BaseUserManager):
    """
    Defines a custom manager for UserAccount. Required when AbstractBaseIser is used to
    create custom User classes.
    """
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Users must have an email")
        
        # Create the UserAccount
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)  # Create hashed version of password
        user.save()

        # Create a UserProfile for this UserAccount
        user = UserAccount.objects.get(id=user.id)
        UserProfile.objects.create(
            first_name = '',
            last_name = '',
            user=user,
            city='',
            state='',
            phone=''
        )

        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email=email,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """
    Defines a custom User model using AbstractBaseUser
    """
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'  # Make email the username

    def get_username(self):
        return self.email

    def __str__(self):
        return self.email
