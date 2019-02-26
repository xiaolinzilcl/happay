


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

});


$(function(){
    //入口函数 ，是等待dom 都加载完在执行的
    //1.左侧的二级菜单的切换 slideToggle 切换
    $('.lt_aside .category').click(function(){
    $(this).next().stop().slideToggle();
    })

    //2.左侧整体的菜单切换 hidemenu
$('.lt_topbar .icon_menu').click(function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    
})


    //3.弹出页面退出功能

   
    $('.lt_topbar .icon_logout').click(function(){
      $('#logoutModal').modal('toggle');
    });
    //模态框上点击显示退出按钮
    $('#logoutBtn').click(function(){
        //点击按钮，应该发送ajax 给服务器，服务器销毁用户的登陆的状态
        $.ajax({
            url:'/employee/employeeLogout',
            type:'get',
            dataType:'json',
            success:function(res){
               if(res.success){
                   location.href="login.html";
               };

            }
        })

    })


})
