__author__ = 'kobi'

from django.conf.urls import patterns, url

from map import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index')
)