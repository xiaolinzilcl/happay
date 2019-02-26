$(function () {
    //定义全局的变量
    var currentPage = 1;
    var currentSize = 5;
    var currentId; // 用一个标识记录用户点击的是哪一条数据
    var isDelete; //用一个标识点击的的这一条的数据的状态要修改为什么

    render();




    function render() {

        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: currentSize,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                //需要传入的是一个对象，然后前台就可以使用这个对象的任何属性
                var html = template('tp1', res);
                $('#tbody').html(html);

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    //当前页码
                    currentPage: res.page,
                    //总页数
                    totalPages: Math.ceil(res.total / res.size),
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        console.log(page);
                        //在一次的重新渲染
                        render();
                    }

                });



            },
            error: function () {
                console.log('出错了');
            }

        });
    }



    // //初始化页码
    // $('#paginator').bootstrapPaginator({
    //     bootstrapMajorVersion:3,
    //     //当前页码
    //     currentPage:1,
    //     //总页数
    //     totalPages:10,
    //     onPageClicked:function(event, originalEvent, type,page){
    //         //为按钮绑定点击事件 page:当前点击的按钮值
    //         console.log(page);
    //       }

    // });

    //2.实现点击每条数据的按钮，改变状态，委托事件
    $('#tbody').on('click', 'td .btn', function () {
        //获得用户点击的是哪一条数据
        currentId = $(this).parent().data('id');
        //获取的这条数据要修改为什么样的状态
        //可以通过btn 是否含有btn-danger  禁用 ，就把状态改为禁用    否则就是启用
        isDelete = $(this).hasClass('btn-danger') ? '0' : '1';

        //弹出模态框
        $('#userModal').modal('show');
        $('#comfirmBtn').on('click', function () {
            //点击确定按钮，发送ajax 请求更新后台数据
            $.ajax({
                url: '/user/updateUser',
                type: 'post',
                data: {
                    id: currentId,
                    isDelete: isDelete
                },
                dataType: 'json',
                success: function (res) {
                   if(res.success){
                       //如果成功的话
                        //关闭模态框
                    $('#userModal').modal('hide');
                    //在渲染一下页面
                    render();

                   }
                }

            })



        })




    })

})