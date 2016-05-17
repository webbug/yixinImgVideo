﻿
//根据QueryString参数名称获取值<
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
//添加pv
function addPv(note) {
    var paras = $.param({
        note: note
    });
    var src = getQueryStringByName("src");
    $.ajax({
        type: "post",
        data: paras,
        url: "../Api/AddPV.ashx?src="+src+"&m=" + Math.random(),
        success: function (result) {
            console.log(result)
        }
    });
}

//分享
function share(type) {
    var paras = $.param({
        type: type
    });
    var src = getQueryStringByName("src");
    $.ajax({
        type: "post",
        data: paras,
        url: "../Api/share.ashx?src=" + src + "&m=" + Math.random(),
        success: function (result) {
            console.log(result)
        }
    });
}

//记录海报信息
function addPoster(name, age1, description1, age2, description2, imgString, note) {
    //上传base64图片，返回imgurl
    var paras = $.param({
        imgString: imgString
    });
    $.ajax({
        type: "post",
        data: paras,
        url: "../Api/UpLoadImg.ashx?m=" + Math.random(),
        success: function (result) {
            console.log(result)
            //alert(result);
            img = result;
            //保存用户海报信息
            var paras = $.param({
                name: name,
                age1: age1,
                description1: description1,
                age2: age2,
                description2: description2,
                img: img,
                note: note
            });
            $.ajax({
                type: "post",
                data: paras,
                url: "../Api/AddPoster.ashx?m=" + Math.random(),
                success: function (result) {
                    console.log(result)
                    //alert(result);
                    //用户上传海报的id;
                    posterid = result;
                    //微信重新加载

                    wxtitle = "我是"+name+","+note;
                    wxdesc = wxtitle;
                    wxlink = "http://wx.fractalist.com.cn/yixin/h5/index.html?poterid=" + posterid;
                    //alert("wxlink:" + wxlink);
                    wximgUrl = img;
                    //alert("wximgUrl:" + img);
                    wx_share(wxtitle, wxdesc, wxlink, wximgUrl);

                }
            });


        }
    });
}
//////////// function END

//我也要制作，跳转到首页
function toIndex() {
    var from = getQueryStringByName("from");
    location.href = "http://wx.fractalist.com.cn/yixin/h5/index.html?from="+from;
}