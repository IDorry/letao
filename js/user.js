import { template } from "handlebars";

// 从后台获取用户信息
$(function() {
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
            page: 1,
            pageSize: 5
        },
        dataType: "json",
        success: function( info ){
            var htmlStr = template("tmp", info);
            $('tbody').html( htmlStr );
        }
    });
});