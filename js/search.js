


$(function(){
//     var arr = ["耐克", "阿迪", "耐克王", "阿迪王", "老北京" ];
//   var jsonStr = JSON.stringify( arr );
//   localStorage.setItem( "search_list", jsonStr )


render();
    // 1. 根据搜索历史，渲染展示
        // 从本地存储中，历史记录
        // 将读出来的json字符串。转成数组
        // 用模板引擎渲染
    function getHistory(){
        var jsonStr = localStorage.getItem("search_list") || "[]";
        // console.log(jsonStr);
        var arr = JSON.parse( jsonStr );
        // console.log(arr);
        return arr;
    }
    function render(){
        var arr = getHistory();
        var htmlStr = template("history_tpl", { list: arr });
        $('.lt_history').html( htmlStr );
    }
    


    // 2. 清空所有历史
        // 给清空记录添加点击事件
        // 清空所有历史记录  localStorage.removeItem("search_list");
        // 页面重新渲染
    $('.lt_history').on("click", ".btn_empty", function(){
        mui.confirm("你确定要清空历史记录吗？", "温馨提示", ["取消", "确认"], function( e ){
        
        if( e.index === 1 ){
            localStorage.removeItem("search_list");
            render();
        }
        });
        
    })



    // 3. 清空单个
        // 给所有的删除按钮，添加点击事件
        // 点击的时候要获取对应的下标
        // 根据下标，删除数据
        // 将修改后的数组转成jsonStr,存储到本地
    $('.lt_history').on("click", ".btn_delete", function(){
        var index = $(this).data("index");
        var arr = getHistory();
        
        arr.splice(index, 1);
        localStorage.setItem("search_list", JSON.stringify( arr ));

         render();
    });



    // 4. 添加数据
        // 给搜索按钮添加点击事件
        // 获取搜索框的内容
        // 添加到数组的最前面------unshift
        // 转成jsonStr，存储到本地
        // 重新渲染页面
    $('.search_btn').click(function(){

        var key = $('.search_input').val().trim();
        
        if( key.length === "" ){
            console.log("空");
            mui.toast("请输入搜索关键字");
            return;
        }

        var arr = getHistory();

        var index = arr.indexOf(key);

        if( index != -1 ){
            arr.splice(index, 1);
        }

        if( arr.length >= 10 ){
            arr.pop();
        }

        arr.unshift( key );

        localStorage.setItem("search_list", JSON.stringify( arr ));

        render();

        $('.search_input').val("");

        // location.href = "searchList.html";
    });



    
});