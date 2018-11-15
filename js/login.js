$(function() {
    /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $("#form").bootstrapValidator({
    //   设置小图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

    // 设置校验规则
    fields: {

        username: {
            validators: {
                // 用户名是否为空
                notEmpty: {
                    message: "用户名不能为空"
                },
                // 长度限制
                stringLength: {
                    min: 2,
                    max: 6,
                    message: "用户名长度在2-6位"
                },
                callback: {
                    message: "用户名不存在"
                }
            }
            
        },
        password: {
            validators: {
                // 用户名是否为空
                notEmpty: {
                    message: "密码不能为空"
                },
                // 长度限制
                stringLength: {
                    min: 6,
                    max: 12,
                    message: "密码长度在6-12位"
                },
                callback: {
                    message: "密码错误"
                }
            }
        }

    }
  });

//   点击登录按钮提交校验
  $("#form").on("success.form.bv", function(e){
    // var validator = $("#form").data('bootstrapValidator');
    // console.log(validator);
    //阻止表单的默认提交
    e.preventDefault();
    //使用ajax进行提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      // $('#form').serialize() 表单序列化, 快速收集 设置了 name 属性的表单元素值      
      data: $("#form").serialize(),
      dataType:"json",
      success:function( info ){
        console.log(info);

        if ( info.success ) {
            location.href = "index.html";
        }
        if ( info.error === 1000) {
          // 调用插件提供的方法, 将用户名input状态 更新成校验失败状态
          // updateStatus
          // 参数1: 校验字段  username/password
          // 参数2: 校验状态  NOT_VALIDATED(未校验), VALIDATING(校验中), INVALID(失败) or VALID(成功)
          // 参数3: 校验规则, 用来配置错误时的提示信息
            $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
        }
        if ( info.error === 1001) {
            // alert("密码错误");
            $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
        }

      }
    });
  })

//   重置(reset按钮只能重置表单数据)
$('[type="reset"]').click(function() {
    $("#form").data('bootstrapValidator').resetForm();
    
});



});