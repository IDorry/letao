

// 将用户数据渲染到页面
$(function() {

    var currentPage = 1; 
    var pageSize = 5;

    var currentId;    //被点击按钮的用户id
    var isDelete;     //需要修改的状态

    // 一进入页面就调用一次render，渲染当前页面
    render();

    // 发送ajax请求
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function( info ){
                // console.log(info);
                // 生成 htmlStr, 将来进行渲染
                // 参数1: 模板id, 参数2: 数据对象
                // 在模板中, 可以直接访问传进去对象中的所有属性
                var htmlStr = template("tmp", info);
                // console.log(htmlStr);
                $('tbody').html( htmlStr );
    
                // 进行分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil( info.total / info.size ),//总页数
                    onPageClicked:function(a, b, c, page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      currentPage = page;
                    //   重新渲染当前页
                    
                        render();
                    }
                  });
            }
        })
    }

    // 给启用禁用按钮, 添加点击事件 (通过事件委托)
    // 事件委托: $('父元素').on("事件名称", "子元素", function() { .... })

    // 优点: 1. 可以给动态生成的元素, 绑定事件
    //       2. 可以进行批量注册事件, 性能效率更高
    $('.lt_content tbody').on("click", ".btn", function(){
        $('#userModal').modal("show");
        // 获取当前被点击按钮所在的数据的id
        currentId = $(this).parent().data("id");
        // console.log(currentId);
        // 根据id更改状态（根据按钮的类名判断）
        // 禁用按钮 ? 0 : 1;
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    });

    // 确认按钮被点击，发送ajax请求，改变用户状态
    $('#confirmBtn').click(function() {
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: "json",
            success: function( info ){
                if( info.success ){
                    // 修改成功
                    // 关闭模态框
                    // 页面重新渲染
                    $('#userModal').modal("hide");
                    render();
                }
            }
        });
    });



})