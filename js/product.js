

$(function(){

    var currentPage = 1;
    var pageSize = 3;
    var picArr = [];   //存储用于上传的图片

    render();

    // 1. 渲染页面表格数据
    function render(){

        $.ajax({
            type: "get",
            dataType: "json",
            url: "/product/queryProductDetailList",
            data: {
                pageSize: pageSize,
                page: currentPage
            },
            success: function(info){
                console.log(info);
                var htmlStr = template("productTpl", info);
                $('tbody').html( htmlStr );

                // 分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil( info.total/info.size ),
                    onPageClicked: function(a, b, c, page){
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    };


    // 2. 点击添加分类按钮，弹出模态框
    $('#addBtn').click(function(){
        $('#addModal').modal("show");

        // 发送ajax请求数据，进行渲染
        $.ajax({
            type: "get",
            dataType: "json",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: 100
            },
            success: function( info ){
                // console.log(info);
                // 模板引擎
                var htmlStr = template("dropdownTpl", info);

                $('.dropdown-menu').html( htmlStr );

            }
        });
    });


    // 3. 通过事件委托，给dropdown里的所有a添加点击事件
    $('.dropdown-menu').on("click", "a", function(){
        // 获取文本设置给按钮
        var txt = $(this).text();
        $('#dropdownText').text( txt );

        // 获取id，设置给隐藏域
        var id = $(this).data('id');
        $('[name="brandId"]').val( id );

        // 将校验状态改成VALID
        $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    });


    // 4. 文件上传配置
    $('#fileupload').fileupload({
        dataType: "json",
        done: function( e, data ){
            console.log(data);

            var picObj = data.result;
            // 取图片地址
            var picUrl = picObj.picAddr;

            // 往数组的最前面添加
            picArr.unshift( picObj );

            // 结构上，往最前面添加  ---prepend   往后面加---append                              
            $('#imgBox').prepend('<img src="'+ picUrl +'" style="height: 100px;" alt="">');

            // 如果长度大于3,
            if( picArr.length > 3 ){
                // 保留最前面，移除最后面
                // 移除数组最后一项
                picArr.pop();
                // 移除最后一张图片--------自杀
                $('#imgBox img:last-of-type').remove();
            }

            if( picArr.length === 3 ){
                // 图片上传满三张，将picStatus的状态改成 VALID
                $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
            }

        }
    });



    // 5. 表单校验初始化
    $('#form').bootstrapValidator({
        // 配置排序项, 默认会对隐藏域进行排除, 我们需要对隐藏域进行校验
        excluded: [],
    
        // 配置校验图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',    // 校验成功
          invalid: 'glyphicon glyphicon-remove',  // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
    
        // 配置校验字段
        fields: {
          brandId: {
            validators: {
              notEmpty: {
                message: "请选择二级分类"
              }
            }
          },
    
          proName: {
            validators: {
              notEmpty: {
                message: "请输入商品名称"
              }
            }
          },
    
          proDesc: {
            validators: {
              notEmpty: {
                message: "请输入商品描述"
              }
            }
          },
    
          num: {
            validators: {
              notEmpty: {
                message: "请输入商品库存数量"
              },
              // 正则校验, 非零开头的数字
              // \d =>  数字 0-9
              // * 表示出现 0 个 或 多个
              // ? 表示出现 0 个 或 1个
              // + 表示出现 1 个 或 多个
              // {m,n} 从 m 个 到 n 个
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '请输入非零开头的数字'
              }
            }
          },
    
          size: {
            validators: {
              notEmpty: {
                message: "请输入尺码"
              },
              // 校验需求: 必须是 xx-xx 的格式,  xx两位数字
              regexp: {
                regexp: /^\d{2}-\d{2}$/,
                message: '必须是 xx-xx 的格式,  xx两位数字'
              }
            }
          },
    
          oldPrice: {
            validators: {
              notEmpty: {
                message: "请输入商品原价"
              }
            }
          },
    
          price: {
            validators: {
              notEmpty: {
                message: "请输入商品现价"
              }
            }
          },
    
          // 专门用于标记文件上传是否满 3张 的
          picStatus: {
            validators: {
              notEmpty: {
                message: "请上传3张图片"
              }
            }
          }
    
        }


    });



    //   6. 注册表单校验成功事件，阻止表单默认提交，ajax提交
    $('#form').on('success.form.bv', function( e ){
        e.preventDefault();

        // 获取所有input中的数据
        var params = $('#form').serialize();
        // 再加上图片的数据
        params += "&picName1="+ picArr[0].picName +"&picAddr1="+ picArr[0].picAddr;
        params += "&picName2="+ picArr[1].picName +"&picAddr2="+ picArr[1].picAddr;
        params += "&picName3="+ picArr[2].picName +"&picAddr3="+ picArr[2].picAddr;

        $.ajax({
            type: "post",
            url: "/product/addProduct",
            dataType: "json",
            data: params,
            success: function( info ){
                console.log(info);
                // 添加成功，关闭模态框，渲染到第一页
                if( info.success ){

                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render( currentPage );

                    // 重置表单元素的内容和状态
                    $('#form').data('bootstrapValidator').resetForm(true);
                    // 重置下拉按钮 和 图片内容
                    $('#dropdownText').text("请选择二级分类");
                    $('#imgBox img').remove();

                    // 重置数组
                    picArr = [];
                }
            }
        });
    })









})