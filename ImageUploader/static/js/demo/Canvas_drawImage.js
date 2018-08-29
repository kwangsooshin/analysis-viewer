function drawImage(url, rate, results) {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var image = new Image();
    console.log(url)
    image.src = 'media/' + url

    var canvas2 = document.getElementById('myCanvas');
    var context2 = canvas2.getContext('2d');

    image.onload = function(e) {
        context.drawImage( image, 0, 0, canvas.width, canvas.height);
        // context2.beginPath();
        // context2.rect(379*rate, 116*rate, 74*rate, 102*rate);
        // context2.fillStyle = 'yellow';
        // context2.fill();
        // context2.lineWidth = 7;
        // context2.strokeStyle = 'black';
        // context2.stroke();

        for (var key in results){
            // 2-0) 아무런 결과가 없을 시 No result 출력
            if (results[key] == "No results"){
                ;
            }
            // 2-1) Place: label 랭킹순으로 출력
            else if (results[key][0][0][0] == 0 && results[key][0][0][1] == 0) {
                ;
            }
            // 2-2) Face: 왼쪽은 cropping한 이미지, 오른쪽은 label 랭킹순으로 출력; 자바스크립트로 이미지 처리하는 방법 알아낸 뒤에 출력
            else {
                for (var labels in results[key]){
                    var x = results[key][labels][0][0]
                    var y = results[key][labels][0][1]
                    var w = results[key][labels][0][2]
                    var h = results[key][labels][0][3]
                    context2.beginPath();
                    context2.rect(x*rate, y*rate, w*rate, h*rate);
                    context2.lineWidth = 3;
                    context2.strokeStyle = "#b3b2b4";
                    context2.stroke();
                }
            }
        }
    }
}

function resize_image(width, height, maxwidth, maxheight){
    var rate = 1
    var rewidth  = width
    var reheight = height
    if (width > maxwidth){
        rewidth = maxwidth
        reheight = height * maxwidth / width
        rate = maxwidth / width
    }
    else if (height > maxheight){
        reheight = maxheight
        rewidth = width * maxheight / height
        rate = maxheight / height
    }

    return{
        rate: rate,
        reheight: reheight,
        rewidth: rewidth,
    }
}

// https://www.html5canvastutorials.com/tutorials/html5-canvas-image-crop/
function cropping_image(url, id, x, y, w, h){
    var canvas = document.getElementById(id);
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.src = 'media/' + url

    imageObj.onload = function() {
        // draw cropped image
        var sourceX = x;
        var sourceY = y;
        var sourceWidth = w;
        var sourceHeight = h;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = canvas.width / 2 - destWidth / 2;
        var destY = canvas.height / 2 - destHeight / 2;

        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    };
}