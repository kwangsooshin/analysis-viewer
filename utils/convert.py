import ast
from Module_Manager.models import Modules, EngtoKor_list


def cvtReqbody2Json(reqbody) :
	if len(reqbody) != 0 :
		datas = reqbody.split("&")
		json_data = {}
		for data in datas :
			jData = {}
			sData = data.split("=")
			key = sData[0]
			value = sData[1]
			json_data[key] = value

		return json_data

	else :
		return {}


def string2json(string) :
	data = {}
	string = string.replace("\"", "")
	splitStr = string.split(",")

	for i in range(0, len(splitStr)-1, 2) :
		if splitStr[i+1] == "true" :
			data[splitStr[i]] = True
		else :
			data[splitStr[i]] = False

	return data


def json2format(string, thr):
	json_data = ast.literal_eval(string)
	module_names = []
	final_result = {}

	id_list = Modules.objects.values_list('module_name', 'id')

	for modules in json_data:
		module_results = []
		id = 0

		try:
			module_names.append(Modules.objects.get(module_name = modules['module_name']).module_korname)
		except: # IGNORE
			final_result[modules['module_name']] = 'Error'
			return final_result

		for i in id_list:
			if (i[0] == modules['module_name']):
				id = i[1]

		for results in modules['module_result']:
			checked = False
			temp_result = []
			y = results['position']['y']
			h = results['position']['h']
			w = results['position']['w']
			x = results['position']['x']
			position = [x, y, w, h]
			temp_result.append(position)

			for labels in results['label']:
				string = ''
				temp_int = round(float(labels['score']), 3)
				if (temp_int >= thr):
					checked = True
					try:
						temp_desc = EngtoKor_list.objects.get(Eng_name=str(labels['description']), Modules_model=id).Kor_name
					except:
						labels['description'] = labels['description'].replace("_", " ")
						temp_desc = str(labels['description'])
					string += temp_desc + " ("+str(temp_int)+")"
					temp_result.append(string)

			if checked == True:
				module_results.append(temp_result)

		if module_results != []:
			final_result[Modules.objects.get(module_name = modules['module_name']).module_korname] = module_results
		else:
			final_result[Modules.objects.get(module_name = modules['module_name']).module_korname] = 'No results'

	# print(final_result)


	return final_result