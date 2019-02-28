$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                var html = template('twotpl', res);
                $('#second_tbody').html(html);

                //完成页码初始化渲染点击
                $('#pagintor').bootstrapPaginator({
                    //版本
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: currentPage,
                    //总页数
                    totalPages: Math.ceil(res.total / res.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        //重新渲染页面
                        render();
                    }
                })

            }

        })

    }




    //2.点击添加按钮，模态框显示

    $('#addBtn').click(function () {
        $('#addModal').modal('show');

        //获取一级分类的所有的数据,拿来渲染page=1,pageSize:1000
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 1000
            },
            dataType: 'json',
            success: function (res) {
                var html = template('twotp2', res);
                $('#secondtp2').html(html);
            }


        })

    });

    //3.给下拉点击可选功能  点击渲染ul 后的li 的事件  注意：事件委托
    $("#secondtp2").on('click', 'li', function () {
        var txt = $(this).text();
        $(this).parents('.dropdown').find('#dropdowntext').text(txt);

      //方法updateStatus('字段名'，'状态VALID成功，INVALID失败'，参数3)
      $('#addform').data('bootstrapValidator').updateStatus('categoryId','VALID');
      $('.categoryId').val($(this).data('id'));

    });

  
 

    //4.插件引用 点击图片上传，然后发送给服务器,服务器返回的是地址
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //console.log(data.result.picAddr);
            //打印出来发送给服务器的图片地址 data.result.picAddr
            var picAddr=data.result.picAddr;
       
            $('.fileimg').attr('src', picAddr);
           //还需要把路径赋值给隐藏域 为了提交
            $("[name='brandLogo']").val( picAddr );

             //方法updateStatus('字段名'，'状态VALID成功，INVALID失败'，参数3)
      $('#addform').data('bootstrapValidator').updateStatus('brandLogo','VALID');
   

        }
    });

    //5.表单校验
    $('#addform').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandName: {
                validators: {
                    //
                    notEmpty: {
                        message: '请输入二级栏目'
                    }
                }

            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类栏目'
                    }
                }

            }

        }


    });


    //6. 点击确认提交
    $("#addform").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
    $.ajax({
        url:'/category/addSecondCategory',
        type:'post',
        data:$('#addform').serialize(),
        dataType:'json',
        success:function(res){
         if(res.success){
             //上传成功的话，关闭模态框， 并清楚form的内容和状态 
             $('#addModal').modal('hide');
             $('#addform').data('bootstrapValidator').resetForm(true);
             $('#dropdowntext').text('添加一级分类');
             $('.fileimg').attr('src','./images/default.png');
             currentPage=1;
             // 重新渲染页面，显示当前第一页的
             render();



         }

        }
    })


    });



   
});