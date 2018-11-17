

$(function() {

    // 一进页面就渲染
    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {

        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function( info ) {
                console.log(info);
                // 绑定数据模板
                var htmlStr = template("secondTpl", info);
                // 添加给tbody
                $('tbody').html( htmlStr );


                // 分页实现
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil( info.total/info.size ),
                    onPageClicked: function(a, b, c, page){
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }
});