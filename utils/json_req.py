import requests


def read_modules():
	url = 'http://mlcoconut.sogang.ac.kr:8000/modules/group/'
	response = requests.get(url)

	jsonDatas = response.json()
	print(jsonDatas)

	names = []
	for jsonData in jsonDatas:
		names.append(jsonData['name'])
	return names
