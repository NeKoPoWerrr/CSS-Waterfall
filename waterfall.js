var items = document.getElementsByClassName('item');
//定义间隙10像素
var gap = 10;
//进页面执行函数
window.onload = function () {
    waterFall();
}

function waterFall() {
    //首先确定列数 = 页面的宽度 / 图片的宽度
    var pageWidth = getClient().width;
    var itemWidth = items[0].offsetWidth;
    var columns = parseInt(pageWidth / (itemWidth + gap));
    var arr = [];//定义一个数组，用来存储元素的高度
    for (var i = 0; i < items.length; i++) {
        if (i < columns) {
            //满足这个条件则说明在第一行，文章里面有提到
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + gap) * i + 'px';
            arr.push(items[i].offsetHeight);
        } else {
            //其他行，先找出最小高度列，和索引
            //假设最小高度是第一个元素
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {//找出最小高度
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
            //设置下一行的第一个盒子的位置
            //top值就是最小列的高度+gap
            items[i].style.top = arr[index] + gap + 'px';
            items[i].style.left = items[index].offsetLeft + 'px';

            //修改最小列的高度
            //最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
            arr[index] = arr[index] + items[i].offsetHeight + gap;
        }
    }
}

//当页面尺寸发生变化时，触发函数，实现响应式
window.onresize = function () {
    waterFall();
}

// clientWidth 处理兼容性
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}
// scrollTop兼容性处理
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}


/*https://zhuanlan.zhihu.com/p/55575862*/