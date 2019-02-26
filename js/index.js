$(function(){

     // 基于准备好的dom，初始化echarts实例
     var echarts_left = echarts.init(document.querySelector('.echarts_1'));

     // 指定图表的配置项和数据
     var option1 = {
         title: {
             text: '2014注册人数'
         },
         //提示框组件
         tooltip: {},
         legend: {
             data:['销量','人数']
         },
         xAxis: {
             data: ["1月","2月","3月","4月","5月","6月"]
         },
         yAxis: {},
         series: [{
             name: '销量',
             type: 'bar',
             data: [50, 200, 360, 10, 100, 290]
         },
         {
            name: '人数',
            type: 'bar',
            data: [500, 200, 360, 100, 80, 290]
        }
    ]
     };

     // 使用刚指定的配置项和数据显示图表。
     echarts_left.setOption(option1);


     var echarts_right= echarts.init(document.querySelector('.echarts_2'));
     var option2= {
        title : {
            text: '热门品牌销售',
            subtext: '2015-2',
            x:'center'
        },
        //提示框信息
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','李宁','塔塔','卓诗尼','大东']
        },

        //数据项列表
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'李宁'},
                    {value:234, name:'塔塔'},
                    {value:135, name:'卓诗尼'},
                    {value:1548, name:'大东'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    
    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option2);




})