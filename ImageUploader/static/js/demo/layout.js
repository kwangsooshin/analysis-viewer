
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
    var checkbox_field = root.append("div").attr("id", "form_field") // check box 영역 생성
    checkbox_field .append("label").attr("for", "checkboxx").text("modules: ")

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

function create_selectbox_field(root) {
    var selbox = root.append("div").attr("id","form_field") // select box 영역 생성
    // https://bootsnipp.com/snippets/oVZ0B
    selbox.append("label").attr("for","threshold").text("score threshold: ")

    var element = selbox.append("select").attr("class", "form-control").attr("id","threshold")
    element.append("option").attr("value",0.0).attr("selected", "selected").text("0.0 이상")
    element.append("option").attr("value",0.1).text("0.1 이상")
    element.append("option").attr("value",0.2).text("0.2 이상")
    element.append("option").attr("value",0.3).text("0.3 이상")
    element.append("option").attr("value",0.4).text("0.4 이상")
    element.append("option").attr("value",0.5).text("0.5 이상")
    element.append("option").attr("value",0.6).text("0.6 이상")
    element.append("option").attr("value",0.7).text("0.7 이상")
    element.append("option").attr("value",0.8).text("0.8 이상")
    element.append("option").attr("value",0.9).text("0.9 이상")
    return element
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

    return form
}

function create_file_form(root) {
    var form = root.append("div").attr("id","form_field") // file form 영역 생성
    form.append("label").attr("for", "ImageUpload").text("Image: ")
    form.append("div").append("input")
        .attr("type", "file")
        .attr("placeholder", "Photo")
        .attr("name", 'photo')
        .attr("id","ImageUpload")

    return form
}

function create_imageArea(root, img, img_id) {
    root.append("img")
        .attr("src", img)
        .attr("id",img_id)
}

function create_descriptionRow(root, title, desc) {
    var col_title = create_column(root, "col-sm-3")
    col_title.append("span").attr("class", "title").attr("id", "_title")
    col_title.append("strong").text(title)
    var col_desc = create_column(root, "col-sm-9")
    col_desc.append("span").attr("class", "desc").attr("id", "_desc").text(desc)
}

function create_InitialDescArea(root, id, cls) {
    var description = root.append("div").attr("id", id).attr("class",cls)
        // .append("h4")
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

// function create_hr_tag(root) {
//     console.log("test")
//     var line = root.append("div")
//     line.append("hr").attr("width", "50%").attr("align","left")
// }

// function print_desc(root, title, desc) {
//     var ImageSize= root.append("div").text(title+desc)
// }

// function print_module_name(root, name){
//     var temp = root.append("div")
//         .append("h5").text(name)
// }

function create_real_result(root){
    var temp = root.append("div")
        .append("ul")
        .append("li")

    return temp
}

function print_desc(root, text, id, cls){
    var temp = root.append("div").attr("id", id).attr("class",cls).text(text)
}

function add_hr_tag(root,cls){
    var hr = root.append("div").attr("class","row").attr("id", "one")
    hr.append("hr").attr("class", cls)
}

function create_canvasTag(root, id, width, height, style){
    var temp = root.append("div")
    temp.append("canvas").attr("id", id).attr("width",width).attr("height",height).attr("style",style)
}

function create_tab (root){
    var temp = root.append("div").attr("class", "panel with-nav-tabs panel-default").attr("id", "tab_field")
    return temp
}

function create_tab_detail(root, cls, id){
    var temp = root.append("div").attr("class",cls).attr("id",id)
    return temp
}

function create_tab_title (root, id, text){
    var temp = root.append("li")
    temp.append("a").attr("href", id).attr("data-toggle", "tab").text(text)
}

function printcolor(root, color, tx, module){
    var text = root.append("div").text(module + " color: ")
    text.append("span").attr("style", "color:"+color).text(tx)
}