// 区域滚动
mui('.mui-scroll-wrapper').scroll({
    indicators: false, 
	deceleration: 0.0005 
});


function getSearch ( k ) {
    // 先获取地址栏信息
    var str = location.search;
    // console.log(str);
    // 将str解码成中文字符
    str = decodeURI( str );
    // console.log(str);
    
    // 截取?后面的信息-----slice( start, end )----包括start不包括end
    // 如果只传一个，表示从它开始，直到结束
    str = str.slice( 1 );
    // console.log(str);
    // 根据&进行分割---split( 字符 )-----将字符串切割成数组
    var arr = str.split("&");
    // console.log(arr);   // ["key=李易峰", "age=18", "desc=帅"]
    // 遍历数组，取得键值对,存到对象里
    var obj = {};
    arr.forEach(function( v, i ){    // v----age=18
        var key = v.split("=")[0];    // age
        var value = v.split("=")[1];    // 18
        // 添加到对象里
        obj[key] = value;
    });

    // 将需要获取的对应属性返回
    return obj[ k ];
}