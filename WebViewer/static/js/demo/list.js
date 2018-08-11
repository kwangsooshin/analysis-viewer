function create_list(root) {
    var result = d3.select("#resultArea")
    return result
}

function create_row(root, title, descript) {
    var row = root.append("div").attr("class", "row")
    var dTitle = row.append("div").attr("class", "col-lg-3")
        .append("div").append("strong").text(title)
    var dDescript = row.append("div").attr("class", "col-lg-9")
        .append("div").text(descript)
}