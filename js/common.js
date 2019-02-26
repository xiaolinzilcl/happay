//在发送第一个ajax请求的时候开始进度条
$(document).ajaxStart(function(){
    NProgress.start();
 
});

//在页面所以的ajax都停止的时候，结束进度条的转态
$(document).ajaxStop(function(){
    //为了模拟看到效果
 setTimeout(function(){
    NProgress.done();

 },500)

})
