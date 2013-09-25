# Create your views here.
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.template.response import TemplateResponse
import requests


def index(request):
    haifa = open('/home/kobi/projects/open_gis/maps/israel/haifa.geojson','r+')
    the_center = open('/home/kobi/projects/open_gis/maps/israel/the_center.geojson','r+')
    #result = requests.get('http://kobiluria.github.io/open_entity_gis/maps/israel/the_south/arad.geojson')
    #context = {'geo_data':result.text}
    context = {'haifa':haifa.read(),'the_center':the_center.read()}
    template = TemplateResponse(request,'map/index.html',context)
    return HttpResponse(template.render())