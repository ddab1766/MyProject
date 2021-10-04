from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class SmokeTest(TestCase):
    def test_bad_maths(self):
        self.assertEqual(1 + 1, 3)


# class UserTestCase(APITestCase):
#     def setUp(self):
#         self.user = User.objects.create(
#             email='test@test.com',
#             password='1111'
#         )
#
#     def test_create_user(self):
#         data = {
#             'email': 'test@test.com',
#             'password': 'test'
#         }
#         response = self.client.post('/users', data=data)
#
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
