

$(function() {
    var currentPage = 1;
    var pageSize = 5;

    //1. 一进入页面就发送请求
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

    // 2. 点击添加按钮，显示添加模态框
    $('#addBtn').click(function() {

        // 显示添加模态框
        $('#addModal').modal("show");
    });

    // 3. 表单校验功能
    $('#form').bootstrapValidator({
        //   配置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 配置字段列表
        fields: {
            categoryName: {
                // 校验规则：
                validators: {
                    // 非空：
                    notEmpty: {
                        message: "请输入一级分类"
                    }
                }
            }
        }
    });


    // 4. 阻止默认的提交，通过ajax提交
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/category/addTopCategory",
            data: $('#form').serialize(),
            success: function( info ) {
                if( info.success ){
                    // 添加成功,关闭模态框，重新渲染第一页
                    $('#addModal').modal("hide");
                    currentPage = 1;
                    render( currentPage );

                    // 重置表单内容和状态
                    $('#form').data("bootstrapValidator").resetForm(true);

                }
            }
        });
    });

})