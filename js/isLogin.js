$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function( info ) {
        console.log(info);
        if( info.success ){
             // 已登录，继续访问
            console.log("已登录，继续访问");
        } 
        if( info.error == 400 ){
            location.href = "login.html";
        }       
    }
});