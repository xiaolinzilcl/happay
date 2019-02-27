$(function () {
    //1.渲染页面
    var currentPage = 1;
    var pageSize = 5;
    render();
    // 发送ajax 渲染页面
    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize

            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var html = template('firsttpl', res);
                $('#first_tbody').html(html);

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

    //2.添加模态框

    $('#addBtn').click(function () {
        $('#addModal').modal('show');
    });


    //3.表单的校验
    $('#addform').bootstrapValidator({
        //配置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 指定校验字段
        fields: {
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '添加的一级分类不能为空'
                    },
                }

            }

        }

    });

    //4.ajax 的提交 
   
    $('#addform').on("success.form.bv", function( e ) {   
        //首先要阻止默认的跳转
        e.preventDefault();
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:$('#addform').serialize(),
            dataType:'json',
            success:function(res){
                  //表单重置
               
                //  只重置了内容 document.getElementById('addform').reset();
//只重置了内容$('#addform').data('bootstrapValidator').resetForm()  
                //模态框隐藏
                $('#addModal').modal('hide');
                //重置内容和状态
                $('#addform').data('bootstrapValidator').resetForm(true);  

                //刷新一下页面，默认到第一页，为了看到刚加的数据，后台是倒叙排列的。

                currentPage=1;
                render();


            }



        })


        

    })


    //进行校验
    //    var categoryName=$('.categoryName').val().trim();
    //    console.log(categoryName); 







})