from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from accounts.models import UserAccount
from .models import UserProfile
from .serializers import UserProfileSerializer


class UserProfileView(APIView):
    """
    Simple views to get and update profile of authenticated user
    """
    permission_classes = (IsAuthenticated,)  # Request must be authenticated

    def get(self, request, format=None):
        try:
            user = request.user
            email = user.email

            user = UserAccount.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response({'profile': user_profile.data, 'email': str(email)})
        except:
            return Response({'error': 'Error occurred while getting user profile'})

    def put(self, request, format=None):
        try:
            user = request.user
            email = user.email

            data = request.data
            first_name = data['first_name']
            last_name = data['last_name']
            phone = data['phone']
            city = data['city']
            state = data['state']

            UserProfile.objects.filter(user=user).update(
                first_name=first_name,
                last_name=last_name,
                phone=phone,
                city=city,
                state=state
            )

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response({'profile': user_profile.data, 'email': str(email)})
        except:
            return Response({'error': 'Error occurred while updating user profile'})

