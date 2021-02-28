# leaderboard = soup.find('table', { 'id': 'leaderboard-table' })
# tbody = leaderboard.find('tbody')

# for tr in tbody.find_all('tr'):
# 	place = tr.find_all('td')[0].text.strip()
# 	username = tr.find_all('td')[1].find_all('a')[1].text.strip()
# 	xp = tr.find_all('td')[3].text.strip()
# 	print(place, username, xp)

import requests
from bs4 import BeautifulSoup as bs

data = requests.get('https://twitter.com/elonmusk/status/1364826301027115008')

soup = bs(data.text, 'html.parser')

print(soup) 
