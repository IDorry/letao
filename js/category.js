
$(function(){

    // 进入页面，发送ajax请求，渲染数据
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        dataType: "json",
        success: function( info ){
            console.log(info);
            var htmlStr = template("left_tpl", info);
            $('.lt_category_left ul').html( htmlStr );

            // 根据返回来的第一个二级分类的 id 进行渲染
            renderById( info.rows[0].id );
        }
    });

    // 根据一级分类，渲染二级分类
    function renderById( id ) {

        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {
                id: id
            },
            dataType: "json",
            success: function( info ) {
                console.log(info);
                var htmlStr = template("right_tpl", info);
                $('.lt_category_right').html( htmlStr );
            }
        });
    };

    // 给左侧添加点击事件，通过事件委托
    $('.lt_category_left').on("click", "a", function(){

        // 高亮效果
        $(this).addClass("current").parent().siblings().find("a").removeClass("current");

        // 获取一级分类id
        var id = $(this).data("id");
        // 根据id渲染二级分类数据
        renderById( id );
    });
});