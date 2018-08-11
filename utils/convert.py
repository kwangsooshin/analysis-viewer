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
