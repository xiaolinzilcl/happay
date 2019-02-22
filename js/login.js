$(function () {

    // //使用表单校验插件
    $('#form').bootstrapValidator({
        //1. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 指定校验字段
        fields: {
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2到6之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }

            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 12,
                        message: '用户名长度必须在2到12之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }


                }

            }

        }
        //

    });







    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $('#form').serialize(), //表单序列化 
            dataType: 'json',
            success: function (res) {
                if (res.error === "1001") {
                    console.log('密码错误');

                };
                if (res.error === "1000") {
                    console.log('用户名不存在');
                };
                if (res.success) {
                    location.href = "index.html";
                }



            },
            error: function () {
                console.log('出错了');

            }


        })




    });

})