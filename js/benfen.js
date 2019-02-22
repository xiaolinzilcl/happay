$(function () {

    // //使用表单校验插件
    // $('#loginform').bootstrapValidator({
    //     //1. 指定校验时的图标显示，默认是bootstrap风格
    //     feedbackIcons: {
    //         valid: 'glyphicon glyphicon-ok',
    //         invalid: 'glyphicon glyphicon-remove',
    //         validating: 'glyphicon glyphicon-refresh'
    //     },
    //     // 指定校验字段
    //     fields: {
    //         username: {
    //             validators: {
    //                 //不能为空
    //                 notEmpty: {
    //                     message: '用户名不能为空'
    //                 },
    //                 //长度校验
    //                 stringLength: {
    //                     min: 2,
    //                     max: 6,
    //                     message: '用户名长度必须在2到6之间'
    //                 },
    //                 //正则校验
    //                 // regexp: {
    //                 //     regexp: /^[a-zA-Z0-9_\.]+$/,
    //                 //     message: '用户名由数字字母下划线和.组成'
    //                 // }
    //             }

    //         },
    //         password: {
    //             validators: {
    //                 //不能为空
    //                 notEmpty: {
    //                     message: '用户名不能为空'
    //                 },
    //                 //长度校验
    //                 stringLength: {
    //                     min: 2,
    //                     max: 12,
    //                     message: '用户名长度必须在2到12之间'
    //                 },
    //                 //正则校验
    //                 // regexp: {
    //                 //     regexp: /^[a-zA-Z0-9_\.]+$/,
    //                 //     message: '用户名由数字字母下划线和.组成'
    //                 // }


    //             }

    //         }

    //     }
    //     //

    // });



    $("#loginform").bootstrapValidator({

        // 显示图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //    指定校验guize
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "用户密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "户密码长度为6 - 12 位"
                    }
                }
            }
        }
    })



    $("#loginForm").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        //    $.ajax({
        //        url:'/employee/employeeLogin',
        //        type:'post',
        //        data: $('#loginform').serialize(), //表单序列化 
        //        dataType:'json',
        //        success:function(info){
        //            console.log(info);


        //        },
        //        error:function(){
        //            console.log('出错了');

        //        }


        //    })
        $.ajax({
            type: 'post',
            // 本质上会自动拼接上前面的域名端口  http://localhost:3000/employee/employeeLogin
            url: '/employee/employeeLogin',
            // 表单序列化, 自动将所有配置了 name 属性的 input 值进行拼接, 用于提交  
            data: $('#loginform').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);

                if (info.error === 1000) {
                    alert('用户名不存在');
                }
                if (info.error === 1001) {
                    alert('密码错误');
                }
                if (info.success) {
                    // 登录成功, 跳转首页
                    // location.href = 'index.html';

                }
            }
        })
        //end 使用ajax提交逻辑



    });

})