$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function( info ) {
        console.log(info);
    }
});