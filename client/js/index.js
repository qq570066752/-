$(() => {



    let uls = document.querySelector(".m-selectInfo");
    $.getJSON("../server/product.json", (data) => {
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
        uls.innerHTML = html

    });
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
    $(".topbar-list > li").hover(function () {
        $(this).children(".nav-dropdown").css("display", "block").parent().siblings().children(".nav-dropdown").css("display", "none");
        // $(this).children(".nav-dropdown").css("display", "none")
        // console.log($(this).children(".nav-dropdown").parent().siblings().children(".nav-dropdown"))

    }, function () {
        $(this).children(".nav-dropdown").css("display", "none")
    })

    // console.log($(".topbar-list > li").children(".nav-dropdown").parent().siblings().children()
    // )

})