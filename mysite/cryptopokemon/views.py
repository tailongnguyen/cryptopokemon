from django.shortcuts import render
from django.http import HttpResponse
from .models import *

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def detail(request, id, name):
    try:
        des = Description.objects.get(name = name).description
        return render(request, 'detail.html', {'idx': id, "description": des})
    except:
        return render(request, 'detail.html', {'idx': id, "description": 'no description yet'})
