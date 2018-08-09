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
	result = result_data['results']

	json_image.close()

	return result