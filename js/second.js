

$(function() {

    // 1. 渲染数据
    var currentPage = 1;
    var pageSize = 5;
    // 一进页面就会渲染
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


    // 2. 点击添加按钮，显示模态框
    $('#addBtn').click(function() {

        $('#addModal').modal('show');

        // 发送ajax请求，获取下拉菜单的列表数据(全部的一级分类)
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            dataType: "json",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(info){
                console.log(info);
                var htmlStr = template("dropdownTpl", info);
                $('.dropdown-menu').html( htmlStr );

            }
        });

    });


    // 3. 给下拉菜单的所有数据添加点击事件
    $('.dropdown-menu').on("click", "a", function() {

        // 点击分类数据，将文本添加到按钮上
        var txt = $(this).text();
        $('#dropdownText').text( txt );

        // 获取id，设置给隐藏域
        var id = $(this).data("id");
        $('[name="categoryId"]').val( id );
        // $('[name="categoryId"]').trigger("input");        
        // 或者手动将校验状态改成校验成功
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });


    // 4. 进行文件上传初始化
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        // done  文件上传完成的回调函数
        done:function (e, data) {
          console.log(data);
        //   获取图片地址
          var result = data.result;
          var picUrl = result.picAddr;
          $('#imgBox img').attr("src", picUrl);


        //   将src路径，实时设置给隐藏域
        $('[name="brandLogo"]').val(picUrl);

        // 手动将校验状态改成校验成功
        $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });


    //   5. 配置表单校验
    $('#form').bootstrapValidator({

        // 配置排除项，默认会排出隐藏域，设置不排除
        excluded: [],

        //   设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },

            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请选择图片"
                    }
                }
            }
        }
    });



});