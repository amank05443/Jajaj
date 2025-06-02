# from django.test import TestCase
#
# # Create your tests here.


from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import UserProfile  # Import the UserProfile model
import json


class UserAuthenticationTests(TestCase):

    def setUp(self):
        # Create a test user
        self.username = 'testuser'
        self.password = 'testpassword'
        self.pno = '123456'  # Example PNO
        self.user = get_user_model().objects.create_user(
            username=self.username,
            password=self.password,
        )
        self.user_profile = UserProfile.objects.create(
            name='Test User',
            rank='Rank A',
            pno=self.pno,
            password=self.password
        )

    def test_get_csrf_token(self):
        """Test the CSRF token view."""
        response = self.client.get(reverse('csrf'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('csrftoken', response.cookies)  # Check if CSRF token is in cookies

    def test_login_view_success(self):
        """Test the login view with valid credentials."""
        response = self.client.post(reverse('login'), {
            'pno': self.pno,
            'password': self.password,
        }, HTTP_X_CSRFTOKEN='csrftoken')  # Include CSRF token in headers

        # Check if login was successful
        self.assertEqual(response.status_code, 200)  # Expect 200 OK
        response_data = response.json()
        self.assertTrue(response_data['success'])
        self.assertIn('user', response_data)
        self.assertEqual(response_data['user']['name'], 'Test User')
        self.assertEqual(response_data['user']['pno'], self.pno)
        self.assertEqual(response_data['user']['rank'], 'Rank A')

    def test_login_view_invalid_credentials(self):
        """Test the login view with invalid credentials."""
        response = self.client.post(reverse('login'), {
            'pno': 'invalidpno',
            'password': 'wrongpassword',
        }, HTTP_X_CSRFTOKEN='csrftoken')  # Include CSRF token in headers

        # Check for invalid credentials response
        self.assertEqual(response.status_code, 401)  # Expect 401 Unauthorized
        response_data = response.json()
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['message'], 'Invalid credentials')