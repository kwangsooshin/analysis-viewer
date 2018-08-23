import cv2
from random import *
from Module_Manager.models import Modules, EngtoKor_list


def object_boxing(img_url, test, Id):
	img_boxing = cv2.imread(img_url)
	cnt = 0

	for key, value in test.items():
		color = (randint(0, 255), randint(0, 255), randint(0, 255))

		if value == 'No results':
			pass
		else:
			for results in value:
				y = results[0][1]
				h = results[0][3]
				w = results[0][2]
				x = results[0][0]

				temp_list = results[1].split(" (")
				try:
					temp_desc = EngtoKor_list.objects.filter(Kor_name=temp_list[0])[0].Eng_name # 수정필요
					temp_desc = temp_desc+" ("+temp_list[1]
				except:
					temp_desc = str(results[1])


				if (y != 0.0 or x != 0.0):
					cv2.putText(img_boxing, temp_desc, (int(x), int(y) - 2), cv2.FONT_HERSHEY_SIMPLEX, 1, color,
					            thickness=3)
					cv2.rectangle(img_boxing, (int(x), int(y)), (int(x + w), int(y + h)), color, 2)
				else:
					# place
					cv2.putText(img_boxing, temp_desc, (3,int(y+h)-10-(cnt*35)), cv2.FONT_HERSHEY_SIMPLEX, 1, color,thickness=3)
					cv2.rectangle(img_boxing, (int(x+3), int(y+3)), (int(x + w-3), int(y + h-3)), color, 2)
					cnt+=1

	new_url = 'media/boxing/img_boxing_' + str(Id) + '.png'
	cv2.imwrite(new_url, img_boxing)

	return new_url