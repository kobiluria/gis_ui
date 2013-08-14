# Create your views here.
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.template.response import TemplateResponse


def index(request):
    template = TemplateResponse(request,'map/index.html',{})
    return HttpResponse(template.render())