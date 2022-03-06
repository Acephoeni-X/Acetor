from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories),
    path('search/<str:name>/<int:page>', views.search),
    path('trending/<str:category>', views.trending),
    path('top/<str:category>', views.top),
    path('popular/<str:category>', views.popular),
    path('browse/<str:category>', views.browse),
    path('info/<int:torid>', views.info),

]
