from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from . import views
app_name = 'cryptopokemon'

urlpatterns = [
    path('', TemplateView.as_view(template_name = "base.html")),
    path('home/', TemplateView.as_view(template_name = "index.html"), name='home'),
    path('myteam/', TemplateView.as_view(template_name = "myteam.html"), name = 'my team'),
    # path('detail/', TemplateView.as_view(template_name = "detail.html"), name = 'detail'),
    url(r'detail/(?P<id>.*)/(?P<name>.*)/$', views.detail, name='detail'),
    path('explore/', TemplateView.as_view(template_name = "explore.html"), name = 'explore'),
    path('attack/', TemplateView.as_view(template_name = "attack.html"), name = 'attack'),
    path('getstarter/', TemplateView.as_view(template_name = "getstarter.html"), name = 'get starter'),
    path('auction/', TemplateView.as_view(template_name = "auction.html"), name = 'auction'),
]
