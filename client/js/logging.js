

// let data = {
//     useremail: $.trim($("#nameemail").val()),
//     // password: md5($.trim($("#password").val())).slice(0, 15)
//     password: $.trim($("#password").val())
// }
$(".closebtn").click(function () {
    $("#osn").css("display", "none");
    $(".Mont").css("display", "none");

})

$(".loginbox").click(function () {
    let useremail = $.trim($("#nameemail").val());
    let password = md5($.trim($("#password").val())).slice(0, 15);

    if (useremail.length == 0) {
        alert("用户名不能为空");
        return
    }

    if (password.length == 0) {
        alert("密码不能为空");
        return;
    }
    console.log(useremail, md5(password).slice(0, 15));
    let data = {
        useremail,
        password
    }
    $.ajax({
        type: "post",
        url: "../server/lonning.php",
        data,
        dataType: "json",
    }).done(data => {
        console.log(data)
        if (data.status == "success") {
            alert(data.msg);
            location.href = "index.html";
        } else {
            alert(data.msg);
        }
    })
})
