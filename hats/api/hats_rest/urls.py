from django.urls import path
from .views import api_hat_details, api_hats_list



urlpatterns = [
    path('hats/', api_hats_list, name="api_hats_list"),
    path('hats/<int:pk>/', api_hat_details, name="api_hat_details"),
]
