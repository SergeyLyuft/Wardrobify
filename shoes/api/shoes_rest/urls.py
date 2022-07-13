from django.urls import path
from .views import api_show_shoe, api_list_shoes, api_list_bins

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_list_shoes"),
    path("bins/", api_list_bins, name="api_list_bins"),
    path(
        "shoes/<int:pk>/",
        api_show_shoe,
        name="api_show_shoe",
    ),
]