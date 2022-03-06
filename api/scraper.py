import requests
import requests_cache
from bs4 import BeautifulSoup
import cfscrape

class Parser():
    def torrentParser(self, response, baseUrl, page=1):
        soup = BeautifulSoup(response.content, 'html.parser')
        torrentList = soup.select('a[href*="/torrent/"]')
        seedersList = soup.select('td.coll-2')
        leechersList = soup.select('td.coll-3')
        sizeList = soup.select('td.coll-4')
        timeList = soup.select('td.coll-date')
        uploaderList = soup.select('td.coll-5')

        firstPage = soup.find('li', {'class': 'first'})
        lastPage = soup.find('li', {'class': 'last'})

        if not lastPage:
            pageCount = page
        else:
            pageCount = int(lastPage.findAll('a')[0]['href'].split('/')[-2])

        results = {'items': [], 'currentPage':page or 1, 'itemCount': len(torrentList), 'pageCount': pageCount}

        if torrentList:
            for count,torrent in enumerate(torrentList):
                name = torrent.getText().strip()
                torrentId = torrent['href'].split('/')[2]
                link = baseUrl+torrent['href']
                seeders = seedersList[count].getText()
                leechers = leechersList[count].getText()
                size = sizeList[count].contents[0]
                time = timeList[count].getText()
                uploader = uploaderList[count].getText().strip()
                uploaderLink = baseUrl+'/'+uploader+'/'
                results['items'].append({'name': name, 'torrentId': torrentId, 'link': link, 'seeders': seeders, 'leechers': leechers, 'size': size, 'time': time, 'uploader': uploader, 'uploaderLink': uploaderLink})

                #if len(results['items']) > 19:
                #    break
        return results

    def infoParser(self, response, baseUrl):
        soup = BeautifulSoup(response.content, 'html.parser')

        name = soup.find('div', {'class': 'box-info-heading clearfix'})
        name = name.text.strip() if name else None

        shortName =  soup.find('div', {'class': 'torrent-detail-info'})
        shortName = shortName.find('h3').getText() if shortName else None

        description = soup.find('div', {'class': 'torrent-detail-info'})
        description = description.find('p').getText().strip() if description else None

        genre = soup.find('div', {'class': 'torrent-category clearfix'})
        genre = [i.text for i in genre.find_all('span')] if genre else None

        thumbnail = soup.find('div', {'class': 'torrent-image'})
        thumbnail = thumbnail.find('img')['src'] if thumbnail else None

        if thumbnail and not ( thumbnail.startswith('http:') or thumbnail.startswith('https:')):
            thumbnail = 'https:'+thumbnail

        magnetLink = soup.select('a[href^="magnet"]')
        magnetLink = magnetLink[0]['href'] if magnetLink else None

        infoHash = soup.find('div', {'class': 'infohash-box'})
        infoHash = infoHash.find('span').getText() if infoHash else None

        images = soup.find('div', {'class': 'tab-pane active'})
        images = [i['data-original'] for i in images.find_all('img')] if images else None

        descriptionList = soup.find_all('ul', {'class': 'list'})
        if len(descriptionList) > 2:
            firstList = descriptionList[1].find_all('li')
            secondList = descriptionList[2].find_all('li')

            category = firstList[0].find('span').getText()
            species = firstList[1].find('span').getText()
            language = firstList[2].find('span').getText()
            size = firstList[3].find('span').getText()
            uploader = firstList[4].find('span').getText().strip()
            uploaderLink = baseUrl+'/'+uploader+'/'

            downloads = secondList[0].find('span').getText()
            lastChecked = secondList[1].find('span').getText()
            uploadDate = secondList[2].find('span').getText()
            seeders = secondList[3].find('span').getText()
            leechers = secondList[4].find('span').getText()

        else:
            category = species = language = size = uploader = uploaderLink = downloads = lastChecked = uploadDate = seeders = leechers = None

        return {'name': name, 'shortName': shortName, 'description': description, 'category': category, 'type': species, 'genre': genre, 'language': language, 'size': size, 'thumbnail': thumbnail, 'images': images if images else None, 'uploader': uploader, 'uploaderLink': uploaderLink, 'downloads': downloads, 'lastChecked': lastChecked, 'uploadDate': uploadDate, 'seeders': seeders, 'leechers': leechers, 'magnetLink': magnetLink, 'infoHash': infoHash}



class py1337x():
    parser = Parser()

    def __init__(self, proxy=None, cookie=None, cache=None, cacheTime=86400, backend='sqlite'):
        self.baseUrl = f'http://{proxy}' if proxy else 'http://www.1337x.to'

        self.headers = {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.5',
            'upgrade-insecure-requests': '1',
            'te': 'trailers'
        }

        if cookie:
            self.headers['cookie'] = f'cf_clearance={cookie}'

        self.requests = requests_cache.CachedSession(cache, expire_after=cacheTime, backend=backend) if cache else requests

    #: Searching torrents
    def search(self, query, page=1, category=None, sortBy=None, order='desc'):
        query = '+'.join(query.split())
        category = category.upper() if category and category.lower() in ['xxx', 'tv'] else category.capitalize() if category else None
        url = f"{self.baseUrl}/{'sort-' if sortBy else ''}{'category-' if category else ''}search/{query}/{category+'/' if category else ''}{sortBy.lower()+'/' if sortBy else ''}{order.lower()+'/' if sortBy else ''}{page}/"

        response = cfscrape.create_scraper().get(url, headers=self.headers)
        # response = self.requests.get(url, headers=self.headers)
        return self.parser.torrentParser(response, baseUrl=self.baseUrl, page=page)

    #: Trending torrents
    def trending(self, category=None, week=False):
        url = f"{self.baseUrl}/trending{'-week' if week and not category else ''}{'/w/'+category.lower()+'/' if week and category else '/d/'+category.lower()+'/' if not week and category else ''}"

        response = cfscrape.create_scraper().get(url, headers=self.headers)
        # response = self.requests.get(url, headers=self.headers)
        return self.parser.torrentParser(response, baseUrl=self.baseUrl)

    #: Top 100 torrents
    def top(self, category=None):
        category = 'applications' if category and category.lower() == 'apps' else 'television' if category and category.lower() == 'tv' else category.lower() if category else None
        url = f"{self.baseUrl}/top-100{'-'+category if category else ''}"

        response = cfscrape.create_scraper().get(url, headers=self.headers)
        # response = self.requests.get(url, headers=self.headers)
        return self.parser.torrentParser(response, baseUrl=self.baseUrl)

    #: Popular torrents
    def popular(self, category, week=False):
        url = f"{self.baseUrl}/popular-{category.lower()}{'-week' if week else ''}"

        response = cfscrape.create_scraper().get(url, headers=self.headers)
        # response = self.requests.get(url, headers=self.headers)
        return self.parser.torrentParser(response, baseUrl=self.baseUrl)

    #: Browse torrents by category type
    def browse(self, category, page=1):
        category = category.upper() if category.lower() in ['xxx', 'tv'] else category.capitalize()
        url = f'{self.baseUrl}/cat/{category}/{page}/'

        response = cfscrape.create_scraper().get(url, headers=self.headers)
        # response = self.requests.get(url, headers=self.headers)
        return self.parser.torrentParser(response, baseUrl=self.baseUrl, page=page)

    #: Info of torrent
    def info(self, link=None, torrentId=None):
        if not link and not torrentId:
            raise TypeError('Missing 1 required positional argument: link or torrentId')
        elif link and torrentId:
            raise TypeError('Got an unexpected argument: Pass either link or torrentId')

        link = f'{self.baseUrl}/torrent/{torrentId}/h9/' if torrentId else link

        response = cfscrape.create_scraper().get(link, headers=self.headers)
        # response = self.requests.get(link, headers=self.headers)
        return self.parser.infoParser(response, baseUrl=self.baseUrl)

