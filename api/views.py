from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import scraper

# Create your views here.
@api_view(['GET'])
def categories(request):
    info = {
        'categories': [
                'movies',
                'tv',
                'games',
                'music',
                'apps',
                'anime',
                'documentaries',
                'xxx',
            ]
    }
    return Response(info)

@api_view(['GET'])
def search(request, name, page):
    print(request.META.get("REMOTE_ADDR"))
    return Response(scraper.py1337x().search(f'{name}', page=page))

@api_view(['GET'])
def trending(request, category):
    print(request.META.get("REMOTE_ADDR"))
    return Response(scraper.py1337x().trending(category=f'{category}'))

@api_view(['GET'])
def top(request, category):
    print(request.META.get("REMOTE_ADDR"))
    return Response(scraper.py1337x().top(category=f'{category}'))

@api_view(['GET'])
def popular(request, category):
    print(request.META.get("REMOTE_ADDR"))
    return Response(scraper.py1337x().popular(category=f'{category}'))

@api_view(['GET'])
def browse(request, category):
    print(request.META.get("REMOTE_ADDR"))
    return Response(scraper.py1337x().browse(category=f'{category}'))

@api_view(['GET'])
def info(request, torid):
    print(request.META.get("REMOTE_ADDR"))
    return Response(scraper.py1337x().info(torrentId=torid))