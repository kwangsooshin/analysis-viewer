// var checkbox_list = [];
var checkbox_list = [];
var checkbox_changed_list = []; // under bar

$.ajax({
    url: ".",
    data: {
        "id": "init"
    },
    dataType: "json",
    type: "POST",
    success: function (msg) {
        for (var i = 0; i < msg['names'].length; i++) {
            // create_checkbox(checkbox_field, msg['names'][i], msg['names'][i])
            // checkbox_list.push(String(msg['names'][i]))
            create_checkbox(checkbox_field, msg['changed_names'][i], msg['names'][i])
            checkbox_changed_list.push(String(msg['changed_names'][i]))
            checkbox_list.push(String(msg['names'][i]))
        }
    }
})

$('#form_upload').submit(function(e){
    e.preventDefault();
    $form = $(this)
    checkbox_result = []
    for(var i = 0 ; i < checkbox_changed_list.length; i++) {
        checkbox_result.push(String(checkbox_changed_list[i]))
        checkbox_result.push(String($("#" + checkbox_changed_list[i]).prop("checked")))
    }
    var th = $("#threshold option:selected").val();

    var formData = new FormData(this);
    formData.append("checkbox", checkbox_result)
    formData.append("threshold",th)

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
                // $('#image_field').remove();
                $('#myCanvas').remove();
                $('#image_size_field').remove();
                // $('#result_field').remove();
                $('#tab_field').remove();

                // ***결과 출력 부분*** //

                // 1. 이미지 출력
                // img_src = "media/boxing/img_boxing_" + response['img_id'] + ".png"
                // var image_field = create_InitialDescArea(imageField, "image_field")
                // create_imageArea(image_field, img_src, response['img_id'])

                var image_size = resize_image(response['width'], response['height'], 700, 720, "") // 이미지 리사이징
                // console.log(image_size.rate)
                // console.log(image_size.rewidth)
                // console.log(image_size.reheight)
                create_canvasTag(imageField, "myCanvas", image_size.rewidth, image_size.reheight)
                drawImage(response['image'],image_size.rate, response['results']);

                // 2. 이미지 사이즈 출력
                var desc_imagesize_Field = create_InitialDescArea(descField, "image_size_field")
                print_desc(desc_imagesize_Field, "Image size: "+String(response['width'])+" * "+String(response['height']), "")

                // // 3. 모듈별 결과 출력 (반복문)
                //     // 1) 모듈 이름 출력
                //     // 2-1) Place: label 랭킹순으로 출력
                //     // 2-2) Face: 왼쪽은 cropping한 이미지, 오른쪽은 label 랭킹순으로 출력; 자바스크립트로 이미지 처리하는 방법 알아낸 뒤에 출력
                // var desc_result_Field = create_InitialDescArea(descField, "result_field")
                // for (var key in response['results']){
                //     var desc_result_detail_Field = create_InitialDescArea(desc_result_Field, "result_detail_field", "row")
                //
                //     // 1) 모듈 이름 출력
                //     print_desc(desc_result_detail_Field, "Module names: "+String(key), "module_name")
                //
                //     // 2-0) 아무런 결과가 없을 시 No result 출력
                //     if (response['results'][key] == "No results"){
                //         var label_Field = create_InitialDescArea(desc_result_detail_Field, "label_Field")
                //         print_desc(label_Field, "No results", "first_ranking", "row")
                //     }
                //     // 2-1) Place: label 랭킹순으로 출력
                //     else if (response['results'][key][0][0][0] == 0 && response['results'][key][0][0][1] == 0) {
                //         console.log("place")
                //         var label_Field = create_InitialDescArea(desc_result_detail_Field, "label_Field", "row")
                //         print_desc(label_Field, "1. " + response['results'][key][0][1], "first_ranking")
                //         for (var i = 2; i < response['results'][key][0].length; i++) {
                //             print_desc(label_Field, String(i) + ". " + response['results'][key][0][i], "other_ranking")
                //         }
                //     }
                //     // 2-2) Face: 왼쪽은 cropping한 이미지, 오른쪽은 label 랭킹순으로 출력; 자바스크립트로 이미지 처리하는 방법 알아낸 뒤에 출력
                //     else {
                //         console.log("face")
                //         console.log(response['results'][key])
                //         for (var labels in response['results'][key]){
                //             var elements = create_InitialDescArea(desc_result_detail_Field, "element_field", "row")
                //
                //             // 왼쪽
                //             var right_side = create_column(elements, "col-md-5 col-sm-5", "label_Field", "")
                //             print_desc(right_side, "1. " + response['results'][key][labels][1], "first_ranking")
                //             for (var i = 2; i < response['results'][key][labels].length; i++) {
                //                 print_desc(right_side, String(i) + ". " + response['results'][key][labels][i], "other_ranking")
                //             }
                //             var hr_side = create_column(elements, "col-md-2 col-sm-2", "label_Field", "")
                //             add_hr_tag(hr_side, "three_1")
                //             // 오른쪽
                //             var left_side = create_column(elements, "col-md-5 col-sm-5", "label_Field", "")
                //             print_desc(left_side, "x: " + response['results'][key][labels][0][0], "other_ranking")
                //             print_desc(left_side, "y: " + response['results'][key][labels][0][1], "other_ranking")
                //             print_desc(left_side, "w: " + response['results'][key][labels][0][2], "other_ranking")
                //             print_desc(left_side, "h: " + response['results'][key][labels][0][3], "other_ranking")
                //         }
                //     }
                //
                //     add_hr_tag(desc_result_Field, "one") // http://aboooks.tistory.com/256
                // }

                // 결과 부분 tab 구현 https://bootsnipp.com/snippets/featured/panels-with-nav-tabs
                var desc_tab = create_tab(descField)
                var desc_tabheading = create_tab_detail(desc_tab, "panel-heading")
                var desc_tabheading_detail = desc_tabheading.append("ul").attr("class", "nav nav-tabs")
                var desc_tabbody = create_tab_detail(desc_tab, "panel-body")
                var desc_tabbody_detail = create_tab_detail(desc_tabbody, "tab-content")

                var cnt = 0
                for (var key in response['results']){
                    // 1) 모듈 이름 출력
                    var id = "tab" + String(cnt) + "default"
                    create_tab_title(desc_tabheading_detail, "#"+id, String(key))

                    // 2-0) 아무런 결과가 없을 시 No result 출력
                    if (response['results'][key] == "No results"){
                        var temp = create_tab_detail(desc_tabbody_detail, "tab-pane fade", id)
                        print_desc(temp, "No results", "first_ranking")
                    }
                    // 2-1) Place: label 랭킹순으로 출력
                    else if (response['results'][key][0][0][0] == 0 && response['results'][key][0][0][1] == 0) {
                        console.log("place")
                        var temp = create_tab_detail(desc_tabbody_detail, "tab-pane fade", id)
                        print_desc(temp, "1. " + response['results'][key][0][1], "first_ranking")
                        for (var i = 2; i < response['results'][key][0].length; i++) {
                            print_desc(temp, String(i) + ". " + response['results'][key][0][i], "other_ranking")
                        }
                    }
                    // 2-2) Face: 왼쪽은 cropping한 이미지, 오른쪽은 label 랭킹순으로 출력; 자바스크립트로 이미지 처리하는 방법 알아낸 뒤에 출력
                    else {
                        console.log("face")
                        var temp = create_tab_detail(desc_tabbody_detail, "tab-pane fade", id)
                        for (var labels in response['results'][key]){
                            var elements = create_InitialDescArea(temp, "element_field", "row")

                            // 왼쪽
                            var right_side = create_column(elements, "col-md-6 col-sm-6", "label_Field", "")
                            print_desc(right_side, "1. " + response['results'][key][labels][1], "first_ranking")
                            for (var i = 2; i < response['results'][key][labels].length; i++) {
                                print_desc(right_side, String(i) + ". " + response['results'][key][labels][i], "other_ranking")
                            }
                            // 오른쪽
                            var left_side = create_column(elements, "col-md-6 col-sm-6", "label_Field", "")
                            print_desc(left_side, "x: " + response['results'][key][labels][0][0], "other_ranking")
                            print_desc(left_side, "y: " + response['results'][key][labels][0][1], "other_ranking")
                            print_desc(left_side, "w: " + response['results'][key][labels][0][2], "other_ranking")
                            print_desc(left_side, "h: " + response['results'][key][labels][0][3], "other_ranking")
                        }
                    }
                    cnt += 1
                }

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