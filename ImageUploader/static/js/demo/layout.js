
function create_layout(clsorid) {
    var upload_contents = d3.select(clsorid)
    return upload_contents
}

function create_row(root, id, style) {
    var row = root.append("div")
        .attr("class", "row")
        .attr("id", id)
        .attr("style", style)

    return row
}
function create_column(root, cls, id, style) {
    var column = root.append('div')
        .attr("class", cls)
        .attr("id", id)
        .attr("style", style)

    return column
}

function create_title(root, cls, id, style, text, tag){
    var title = root.append("div")
        .attr("class", cls)
        .attr("id", id)
        .attr("style", style)
    title.append(tag)
        .append("strong").text(text)
}

function create_checkbox_field(root, id) {
    var checkbox_field = root.append("div").attr("id", "checkboxx")
    return checkbox_field
}

function create_checkbox(root, id, name) {
    var chkbox = root.append("div").attr("class", "checkbox")
    chkbox.append("input")
        .attr("type", "checkbox")
        .attr("id",id)
    chkbox.append("label")
        .attr("for", id)
        .text(name)
}

function create_button(root, type, cls, id, name) {
    var button = root.append("div").attr("class", "upload_box").append("button").attr("type", type)
        .attr("class", cls)
        .attr("id", id)
        .text(name)
}

function create_form(root, enctype, id, method) {
    var form = root.append("form")
        .attr("enctype", enctype)
        .attr("id", id)
        .attr("method", method)
        .attr("novalidate"," ")
    form.append("div").append("input")
        .attr("type", "file")
        .attr("placeholder", "Photo")
        .attr("name", 'photo')

    return form
}

function create_imageArea(root, img_id) {
    root.append("img")
        .attr("src", "/media/boxing/img_boxing_" + String(img_id) + '.png')
        .attr("id","image")
}

function create_descriptionRow(root, title, desc) {
    var col_title = create_column(root, "col-sm-3")
    col_title.append("span").attr("class", "title").attr("id", "_title")
    col_title.append("strong").text(title)
    var col_desc = create_column(root, "col-sm-9")
    col_desc.append("span").attr("class", "desc").attr("id", "_desc").text(desc)
}

function create_InitialDescArea(root, id) {
    var description = root.append("div").attr("id", id)
        .append("h4")
    return description
}

function create_darkfield(root, cls, src, alt){
    var loading = root.append("div").attr("class", cls)
    return loading
}

function create_loading_gif_image(root, src){
    var loading = root.append("div")
    loading.append("img").attr("src", src)
}

function create_hr_tag(root) {
    var line = root.append("hr").attr("width", "50%").attr("align","left")
}

function print_desc(root, title, desc) {
    var ImageSize= root.append("div").text(title+desc)
}

function print_module_name(root, name){
    var temp = root.append("div")
        .append("h5").text(name)
}

function create_real_result(root){
    var temp = root.append("div")
        .append("ul")
        .append("li")

    return temp
}