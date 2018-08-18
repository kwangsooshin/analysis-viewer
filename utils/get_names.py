import requests
from Module_Manager.models import Modules


def read_modules():
	url = 'http://mlcoconut.sogang.ac.kr:8000/module/group/'
	response = requests.get(url)

	jsonDatas = response.json()['results']
	names = []
	for jsonData in jsonDatas:
		names.append(jsonData['name'])
	return names



def read_modules_model():
	items = Modules.objects.all()
	modules = dict()
	for i in items:
		modules[i.module_name] = i.module_korname
	print(modules)
	return modules