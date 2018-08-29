import json
import requests


def communicatior(url, image_path, modules=None):
	if modules is not None:
		json_data = {'modules': modules}
	else:
		json_data = {}

	json_image = open(image_path, 'rb')
	json_files = {'image': json_image}

	result_response = requests.post(url=url, data=json_data, files=json_files)
	result_data = json.loads(result_response.content)

	try:
		result = result_data['results']
	except:
		result = [{'module_name': 'Error', 'module_result': [{'position': {'y': 0.0, 'h': 0.0, 'w': 0.0, 'x': 0.0}, 'label': [{'score': 'ㅠ.ㅠ', 'description': 'Please contact admin'}]}]}]

	json_image.close()

	return result