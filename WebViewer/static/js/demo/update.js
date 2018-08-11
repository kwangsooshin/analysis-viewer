var checkbox_list = [];
$.ajax({
    url: ".",
    data: {
        "id": "init"
    },
    dataType: "json",
    type: "POST",
    success: function (msg) {
        for (var i = 0; i < msg['names'].length; i++) {
            create_checkbox(checkbox_field, msg['names'][i], msg['names'][i])
            checkbox_list.push(String(msg['names'][i]))
        }
    }
})

$('#form_upload').submit(function(e){
    e.preventDefault();
    $form = $(this)
    checkbox_result = []
    for(var i = 0 ; i < checkbox_list.length; i++) {
        checkbox_result.push(String(checkbox_list[i]))
        checkbox_result.push(String($("#" + checkbox_list[i]).prop("checked")))
    }
    var formData = new FormData(this);
    formData.append("checkbox", checkbox_result)

    $.ajax({
        url: window.location.pathname,
        type: 'POST',
        data: formData,
        success: function (response) {
            $('.error').remove();
            if(response.error){
                $.each(response.errors, function(name, error){
                    error = '<small class="text-muted error">' + error + '</small>'
                    $form.find('[name=' + name + ']').after(error);
                })
            }
            else{

                $('#image').remove();
                $('#image_size').remove();
                $('#module').remove();
                create_imageArea(imageField, response['img_id'])

                var desc_imagesize_Field = create_InitialDescArea(descField, "image_size")
                print_desc(desc_imagesize_Field, "image size: ", String(response['width'])+" * "+String(response['height']))

                var desc_result_Field = create_InitialDescArea(descField, "module")
                for (var module_num in response['json_data']) {
                    desc_result_Field.append("hr")
                    print_module_name(desc_result_Field, "model_name: " + response['json_data'][module_num]['module_name'])
                    var result_ok = false

                    for (var result_num in response['json_data'][module_num]['module_result']) {
                        result_ok = true
                        var real_result = create_real_result(desc_result_Field)
                        var position = ""
                        var label = ""
                        if (response['json_data'][module_num]['module_result'][result_num]['position']['y'] == 0 &&
                            response['json_data'][module_num]['module_result'][result_num]['position']['x'] == 0)
                            console.log("place")
                        else {
                            position = "{ " + "y: " + String(response['json_data'][module_num]['module_result'][result_num]['position']['y']) + "\n" +
                                "h: " + String(response['json_data'][module_num]['module_result'][result_num]['position']['h']) + "\n" +
                                "w: " + String(response['json_data'][module_num]['module_result'][result_num]['position']['w']) + "\n" +
                                "x: " + String(response['json_data'][module_num]['module_result'][result_num]['position']['x']) + " }"
                            print_desc(real_result, "position: ", position)
                        }

                        for (var label_num in response['json_data'][module_num]['module_result'][result_num]['label']) {
                            label = label+ String(response['json_data'][module_num]['module_result'][result_num]['label'][label_num]['description'] +
                                "(" + response['json_data'][module_num]['module_result'][result_num]['label'][label_num]['score'] + ")" + ",\n")
                        }

                        print_desc(real_result, "label: ", label);
                    }
                    if (!result_ok)
                        print_desc(desc_result_Field, "No result", "");
                }
                desc_result_Field.append("hr")

            }},
        beforeSend:function(){
            $('.wrap-loading').removeClass('display-none');
        },
        complete:function(){
            $('.wrap-loading').addClass('display-none');
        },
        // timeout:100000 ms

        cache: false,
        contentType: false,
        processData: false
    });
});