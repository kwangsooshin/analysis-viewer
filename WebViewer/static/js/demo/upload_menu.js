var upload_contents = create_layout("#upload_contents")
var main_row = create_row(upload_contents, "demo", "margin-left: 0px; margin-right: 0px;")
var upload_menu = create_column(main_row, "col-md-4 col-sm-6", "")
create_title(upload_menu, "upload_menu_title", "upload_menu_title", "", "Upload your image to test and Choose modules")

var upload_row = create_row(upload_menu, "upload_row")
var upload_form = create_form(upload_row, "multipart/form-data", "form_upload", "POST")

var checkbox_field = create_checkbox_field(upload_form, "checkbox")
create_button(upload_form, "submit", "btn btn-default", "btn_upload", "Upload")

var loadingField = create_darkfield(upload_contents, "wrap-loading display-none")
create_loading_gif_image(loadingField,  "media/ajax-loader.gif")

var imageArea = create_column(main_row, "col-md-8 col-sm-6", "result_upload")
var imageField = create_row(imageArea, "image_row")
var descField = create_row(imageArea, "desc_row")