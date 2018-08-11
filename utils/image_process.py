import cv2
from random import *


def object_boxing(img_url, test, Id):
	img_boxing = cv2.imread(img_url)

	for idx in test:
		module_name = idx['module_name']; print("module name: "+str(module_name))
		module_result = idx['module_result']
		color = (randint(0, 255), randint(0, 255), randint(0, 255))

		for values in module_result:
			y = values['position']['y']
			h = values['position']['h']
			w = values['position']['w']
			x = values['position']['x']

			result_list = []
			for labels in values['label']:
				result_list.append(labels['description'])


			if (y!=0.0 or x!=0.0):
				cv2.putText(img_boxing, str(result_list[0]), (int(x), int(y)-2), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, thickness=2)
				cv2.rectangle(img_boxing, (int(x), int(y)), (int(x + w), int(y + h)), color, 2)
				cv2.imwrite('D:/ImageUploader_practice/media/boxing/img_boxing.png', img_boxing)

	new_url = 'D:\\ImageUploader_practice\\media\\boxing\\img_boxing_' + str(Id) + '.png'
	cv2.imwrite(new_url, img_boxing)

	return new_url