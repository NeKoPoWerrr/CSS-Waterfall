var items = document.getElementsByClassName('item');
var gap = 10;


window.onload = function () {
    waterFall();
}


function waterFall() {
    var pageWidth = getClient().width;
    var itemWidth = items[0].offsetWidth;
    var columns = parseInt(pageWidth / (itemWidth + gap));
    var arr = []; //array for minheight
    for (var i = 0; i < items.length; i++) {
        if (i < columns) {
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + gap) * i + 'px';
            arr.push(items[i].offsetHeight);
        } else {
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
           
            items[i].style.top = arr[index] + gap + 'px';
            items[i].style.left = items[index].offsetLeft + 'px';
            arr[index] = arr[index] + items[i].offsetHeight + gap;
        }
    }
}


window.onresize = function () {
    waterFall();
}

function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}

function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}


/*https://zhuanlan.zhihu.com/p/55575862*/