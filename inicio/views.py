from django.shortcuts import render
import requests


def make_request(id):
    data = requests.get(f'https://pokeapi.co/api/v2/pokemon/{id}').json()
    return data


# Create your views here.
def index(request):
    return render(request, 'inicio_templates/index.html')


def pokemon_info(request):
    return render(request, 'inicio_templates/ver_pokemon.html')


def detailed_info(request, nome):
    data = make_request(nome)
    sprites = data['sprites']
    types = data['types']
    context = {'nome': nome,
               'front_default': sprites['front_default'],
               'shiny_default': sprites['front_shiny'],
               'types': types}
    return render(request, 'inicio_templates/detailed_info.html', context=context)
