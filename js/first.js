

$(function() {
    var currentPage = 1;
    var pageSize = 5;

    // 一进入页面就发送请求
    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function( info ) {
                console.log(info);
                var htmlStr = template("firstTpl", info );
                $('tbody').html( htmlStr );    //数据渲染到页面
    
                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil( info.total/info.size ),//总页数
                    onPageClicked:function(a, b, c, page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //   更新当前页，重新渲染
                        currentPage = page;
                        render();
                    }
                  });
            }
        })
    }
})