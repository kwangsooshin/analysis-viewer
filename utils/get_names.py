import requests
from Module_Manager.models import Modules


def read_modules():
	url = 'http://mlcoconut.sogang.ac.kr:8000/modules/group/'
	response = requests.get(url)
	print("response: "+str(response))
	# jsonDatas = response.json()
	# print(jsonDatas)

	names = ['initial']
	# for jsonData in jsonDatas:
	# 	names.append(jsonData['name'])
	return names


def read_modules_model():
	items = Modules.objects.all()
	modules = dict()
	for i in items:
		modules[i.module_name] = i.module_korname

	return modules