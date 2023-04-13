from django.shortcuts import render
import requests


# This method is useless because I can do the same request using JS
# The reason why I'm not doing is because in the time I created this pokedex
# I was trying to learn as much django I could, so I choose to send a context to the html
# And then insert there

def make_request(id):
    data = requests.get(f'https://pokeapi.co/api/v2/pokemon/{id}').json()
    return data


# Create your views here.
def index(request):
    request.ola = 'teste'
    print(request.ola)
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
