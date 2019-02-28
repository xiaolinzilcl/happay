$(function(){
    var currentPage=1;
    var pageSize=10;
    render();
    function render(){
        $.ajax({
            url:'/product/queryProductDetailList',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:'json',
            success:function(res){
                console.log(res);

            }
            

        })

    }

})