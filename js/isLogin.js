//登陆拦截
//发送ajax 给服务器, /employee/checkRootLogin
$.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    dataType:'json',
    success:function(res){
      if(res.error===400){
          //用户未登陆，进行拦截
          location.href="login.html";
      }

    }

})