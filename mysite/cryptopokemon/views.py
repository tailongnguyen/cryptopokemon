from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def detail(request, id):
    print(id)
    return render(request, 'detail.html', {'idx': id})
