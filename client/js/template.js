$(() => {
    $.ajax({
        url: "../server/cart.php",
        data: "data",
        dataType: "json",
    }).done(data => {

        let html = data.map(item => {
            return `<li>
            <a href="" data-index = "${item.data_index}">
                <img src="${item.img}" alt="">
                <h3 class="tit">${item.name}</h3>
                <p class="desc">${item.title}</p>
                <p class="price">${item.price}</p>
            </a>
        </li>`
        }).join("")
        $(".m-selectInfo").html(html);

    })
    // 头部渲染
    $.ajax({
        url: "../server/nav_cart.php",
        dataType: "json",
    }).done(data => {
        let box = document.querySelector("topbar-list")
        let oul = document.querySelectorAll(".card-list");
        $.getJSON("../server/data.json", (pock) => {
            let song = pock.map((item, index) => {
                let html = item.map(ong => {
                    return ` <li>
                                <img src="${ong.img}" alt="">
                                <p class="name">${ong.name}</p>
                                <p class="price">${ong.price}</p>
                            </li>`
                }).join("")
                oul[index].innerHTML = html;
            }).join("")

        })
    });
    // 头部划入效果
    $(".topbar-list > li").hover(function () {
        $(this).children(".nav-dropdown").css("display", "block").parent().siblings().children(".nav-dropdown").css("display", "none");
        // $(this).children(".nav-dropdown").css("display", "none")
        // console.log($(this).children(".nav-dropdown").parent().siblings().children(".nav-dropdown"))

    }, function () {
        $(this).children(".nav-dropdown").css("display", "none")
    });

    // 登录和注册

    $(".icon-index").hover(function () {
        $(this).children(".index-pop").stop().slideToggle(500);
    })
    $(".icon-index").hover(function () {
        $(this).children("i").css("color", "#2c82ff")
    }, function () {
        $(this).children("i").css("color", "")
    })

    $(".index-pop >li").hover(function () {
        $(this).css("background", "#F4F4F4").siblings().css("background", "#fff");

    }, function () {
        $(this).css("background", "#fff")
    })
    // console.log($(".icon-index"))

    // 注册登录


})