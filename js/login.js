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
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_\.]+$/,
                    //     message: '用户名由数字字母下划线和.组成'
                    // },
                    callback:{
                       message:"用户名错误" 
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
                    },
                    callback:{
                        message:"密码错误" 
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
                if (res.error === 1001) {
                    //方法updateStatus('字段名'，'状态VALID成功，INVALID失败'，参数3)
                  $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                     // 参数1: 字段名称
          // 参数2: 校验状态
          // 参数3: 校验规则, 可以设置提示文本
         
                }
                if (res.error === 1000) {
                    // console.log('用户名不存在');
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');


                }
                if (res.success) {
                    location.href = "index.html";
                }



            },
            error: function () {
                console.log('出错了');

            }


        })




    });


    //3.重置
    $("[type='reset']").on('click',function(){
        console.log('111');
       // $('#form').data('bootstrapValidator').resetForm();  重置状态
       // $('#form').data('bootstrapValidator').resetForm(true);   重置状态和内容
        $('#form').data('bootstrapValidator').resetForm();  

    })

})