$(() => {
    // let options = {
    //     "useremail": {
    //         reg: `/\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/.test(val)`,
    //         msg: "请检测您的邮箱格式"
    //     },
    //     "password": {
    //         reg: `/^\\d{8,16}$/.test(val)`,
    //         msg: "请检测你的密码是否符合"
    //     }
    // }

    $(".bview-input").blur(function () {
        let val = $.trim($(this).val());
        let bstn = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // console.log(bstn.test(val) == true)
        if (bstn.test(val)) {
            $.ajax({
                url: "../../server/login.php",
                type: "post",
                data: "useremail=" + val,
                dataType: "json",
            }).done(data => {
                // console.log(data);
                if (data.status == "error") {
                    $(this).parents(".suggest-wrapper").siblings().text(data.msg).css("display", "block;").addClass("error");
                } else {
                    $(this).parents(".suggest-wrapper").siblings().text(data.msg).css({
                        display: "block;",
                        color: "#95D186"
                    });
                }
            })
        } else if (!val.length == 0) {
            $(this).parents(".suggest-wrapper").siblings().text("请检测您的邮箱格式").css("display", "block;").addClass("error");
        } else {
            $(this).parents(".suggest-wrapper").siblings().css("display", "block;").removeClass("error");
        }
    }).keyup(function (e) {
        // console.log(this)
        $(this).parents(".suggest-wrapper").siblings().text("").css("display", "none;").removeClass("error");
    });

    // 密码栏检测
    $(".bview-input").eq(1).blur(function () {
        let val = $.trim($(this).val());
        let king = /^\d{8,16}$/;
        // console.log(val)
        if (!king.test(val)) {
            $(this).parents(".pwd-wrapper").siblings().text("请输入8-16位密码").css("display", "block;").addClass("error");

        }
    }).keyup(function (e) {
        $(this).parents(".pwd-wrapper").siblings().css("display", "none")
    });

    // 检查是否被勾选
    let ischeck = $("#infont").is(":checked");
    // console.log($("#infont"))
    if (!ischeck) {
        alert("请阅读并同意用户的注册协议!!!");
        return;
        console.log("+++++")
    }
    // 给后端传数据MD5密码加密处理
    // let data = {
    //     useremail:$.trim($(".bview-input").eq(0).val()),
    //     password: md5($.trim($(".bview-input").eq(1))).slice(0,15)
    // }

    $(".step0-btn").click(function () {
        $("#nameemail,#password").trigger("blur");
        console.log($(".error").length)
        if ($("error").length != 0) {
            console.log("++++")
        }

    })
})