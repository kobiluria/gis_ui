# Create your views here.
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.template.response import TemplateResponse
import requests


def index(request):
    file = open('/home/kobi/projects/open_gis/the_map/THEMAP.geojson','r+')
    #result = requests.get('http://kobiluria.github.io/open_entity_gis/maps/israel/the_south/arad.geojson')
    result = file.read()
    #context = {'geo_data':result.text}
    context = {'geo_data':result}
    template = TemplateResponse(request,'map/index.html',context)
    return HttpResponse(template.render())