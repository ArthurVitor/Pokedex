from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'inicio_templates/index.html')


def pokemon_info(request):
    return render(request, 'inicio_templates/ver_pokemon.html')
