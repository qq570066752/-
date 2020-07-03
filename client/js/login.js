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


    let imgCode;
    /*不传值，统一走默认值*/
    let captcha = new Captcha({
        lineWidth: 1, //线条宽度
        lineNum: 2, //线条数量
        // dotR: 200, //点的半径
        // dotNum: 1000, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 40, //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
        fontStyle: 'stroke', //字体绘制方法，有fill和stroke
        content: '0123456789', //验证码内容
        length: 4 //验证码长度
    });

    captcha.draw(document.querySelector('#captcha'), r => {
        // console.log('验证码', r);
        imgCode = r;

        /* 自动触发标签的事件 */
        $("#imageCode").trigger("blur");
    });

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
            $(this).parents(".suggest-wrapper").siblings().text("请检测您的邮箱格式").addClass("error");
        } else {
            $(this).parents(".suggest-wrapper").siblings().removeClass("error");
        }
    }).keyup(function (e) {
        // console.log(this)
        $(this).parents(".suggest-wrapper").siblings().text("").removeClass("error");
    });

    // 密码栏检测
    $(".bview-input").eq(1).blur(function () {
        let val = $.trim($(this).val());
        let king = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        // console.log(val)
        if (!king.test(val)) {
            $(this).parents(".pwd-wrapper").siblings().text("请输入8-16位密码").addClass("error");

        } else {
            // console.log("++++")
            $(this).parents(".pwd-wrapper").siblings().text("").removeClass("error");
        }

    });

    // 给后端传数据MD5密码加密处理
    // let data = {
    //     useremail:$.trim($(".bview-input").eq(0).val()),
    //     password: md5($.trim($(".bview-input").eq(1))).slice(0,15)
    // }
    // 检查邮箱和密码是否有错误
    $(".step0-btn").click(function () {
        $("#nameemail,#password").trigger("blur");
        // console.log($(".error").length)
        if ($("error").length != 0) {
            return;
        }
        // 检查是否被勾选
        let ischeck = $("#infont").is(":checked");
        // console.log($("#infont"))
        if (!ischeck) {
            alert("请阅读并同意用户的注册协议!!!");
            return;
        }

        $(".step").eq(1).addClass("stepcurrent");

        $(".box1").attr("id", "step0-btn").siblings().removeAttr("id", "step0-btn");
    });

    // 注册第二步实名认证检验
    $(".name-input").blur(function () {
        let val = $.trim($(this).val());
        let real = /^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E80-\uFE4F](\·)*$/;
        if (!real.test(val)) {
            $(this).parent().next().text("姓名输入不合法").addClass("error")
            return;
        } else {
            $(this).parent().next().text("").removeClass("error")
        }
    })
    $(".inner-input").blur(function () {

        let val = $.trim($(this).val());
        let status = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!status.test(val)) {
            $(this).parent().siblings(".item-tip").text("身份证号码输入不合法").addClass("error")
        } else {
            $(this).parent().siblings(".item-tip").text("").removeClass("error")
        }
    })

    $(".m-btn").click(function () {
        $("#real-inpu,#status-input").trigger("blur");
        if ($("error").length != 0) {
            return;
        }
        $(".step").eq(2).addClass("stepcurrent");
        $(".box2").attr("id", "step0-btn").siblings().removeAttr("id", "step0-btn");

    });

    // 手机号码验证
    $(".pnone-time").blur(function () {
        let val = $.trim($(this).val());
        let coke = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!val.length == 0) {
            if (!coke.test(val)) {
                $(this).parent().siblings(".item-tip").text("请检测你的手机号码格式").addClass("error")
            } else {
                $(this).parent().siblings(".item-tip").text("").removeClass("error")
            }
        }
    })
    $(".code-itme").blur(function () {
        let val = $.trim($(this).val());

        if (val != imgCode && val.length != 0) {

            $(this).parent().siblings(".item-tip").text("请输入正确的验证码").addClass("error")
        } else {
            $(this).parent().siblings(".item-tip").text("").removeClass("error")
        }

    })
    $(".s-btn").click(function () {
        $("#r-inpu,#s-input").trigger("blur");
        if ($("error").length != 0) {
            return;
        }

        let data = {
            useremail: $.trim($("#nameemail").val()),
            password: md5($.trim($("#password").val())).slice(0, 15),
            name: $.trim($("#real-inpu").val()),
            identity: $.trim($("#status-input").val()),
            phone: $.trim($("#r-inpu").val())
        }
        $.ajax({
            type: "post",
            url: "../../server/enroll.php",
            data,
            dataType: "json"

        }).done(data => {
            console.log(data)
            if (data.status == "注册成功") {
                console.log("+++++++")
                alert("注册成功!");
                location.href = "../index.html";
            } else {
                alert(data.msg);
            }
        })
    })
})