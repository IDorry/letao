// 图表部分
$(function() {

  // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector('.echarts_left')); 
    // 指定图标的配置项和数据
    var option1 = {
        // 大标题
        title: {
          // 文本
          text: '2018年注册人数'
        },
        // 提示框组件
        tooltip: {
          // 表示坐标轴触发
          //trigger: "axis"
          trigger: "item"
        },
        // 图例
        legend: {
          data:['人数', "销量"]
        },
        // x轴的数据
        xAxis: {
          data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        // y轴的刻度, y轴刻度不进行设置, y轴会自动根据数据最大值生成合适的刻度
        yAxis: {},
        // 数据
        series: [{
          name: '人数',
          // bar 表示柱状图,  line 表示折线图,  pie 表示饼图
          type: 'bar',
          data: [500, 1200, 390, 580, 800, 1000]
        },{
          name: '销量',
          type: 'bar',
          data: [700, 1300, 490, 680, 700, 800]
        }]
      };
      echarts_left.setOption(option1);

      var echarts_right = echarts.init(document.querySelector('.echarts_right'));
      var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2018年11月',
            x:'center',
            textStyle: {
                color: '#e92322'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','阿迪王','回力','解放', "老北京"]
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'阿迪王'},
                    {value:135, name:'回力'},
                    {value:1548, name:'解放'},
                    {value:253, name:'老北京'}
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
    echarts_right.setOption(option2);
})