from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('pokemon_info', views.pokemon_info, name='pokemon_info')
]