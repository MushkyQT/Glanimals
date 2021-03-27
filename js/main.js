var mainHeight = $("#header").height() + $("#navbar").height();
$(window).scroll(function () {
    if ($(window).scrollTop() > mainHeight) {
        $("#body").css("background-position", "49% 20%");
    }
    for (var i = 0; i < $(".slider").length; i++) {
        if ($(window).scrollTop() > $(".slider:eq(" + i + ")").offset().top - $(window).height() / 1.3) {
            $(".slider:eq(" + i + ")").addClass("slid");
            $(".openCart").addClass("openCartDeploy");
        }
    }
});

$(".panneau").click(function () {
    var mainDiv = $(this);
    var subDivs = $(this).children("span, p");
    var sideDivs = $(this).siblings();
    mainDiv.toggleClass("flexMe");
    subDivs.toggleClass("hideMe");
    sideDivs.children("span, p").addClass("hideMe");
    sideDivs.removeClass("flexMe");
});

$(".fa-arrow-left").click(function () {
    var current = $(this).siblings(".visible");
    var prev = current.prev("img");
    current.removeClass("visible");
    if (prev.length > 0) {
        prev.addClass("visible");
    } else {
        current.siblings("img").last().addClass("visible");
    }
});

$(".fa-arrow-right").click(function () {
    var current = $(this).siblings(".visible");
    var next = current.next("img");
    current.removeClass("visible");
    if (next.length > 0) {
        next.addClass("visible");
    } else {
        current.siblings("img").first().addClass("visible");
    }
});

$(".cardBtn").hover(function () {
    $(this).parent().parent(".card").toggleClass("borderAnimate");
});

$(".minus").click(function () {
    var tmp = parseInt($(this).siblings(".quantInput").val());
    if (tmp > 1) {
        tmp -= 1;
    }
    $(this).next().val(tmp);
});

$(".plus").click(function () {
    var tmp = parseInt($(this).siblings(".quantInput").val());
    tmp += 1;
    $(this).prev().val(tmp);
});

var products = [
    ["your love", 2],
    ["zaba", 6],
    ["htbahb", 8],
    ["dreamland", 10],
    ["glass animals", 2],
    ["cocoa hooves", 2],
    ["tangerine tee", 24],
    ["dave casette", 11],
];

var myCart = [];

$(".addCart").each(function (i) {
    $(this).attr("id", i);
});

$(".addCart").click(function () {
    var productId = $(this).attr("id");
    var product = products[productId];
    var productName = product[0];
    var productPrice = product[1];
    var quantity = parseInt($(this).prev().prev().val());
    var subTotal = productPrice * quantity;
    var firstPurchase = true;

    var addProduct = [productName, productPrice, quantity, subTotal];

    for (i = 0; i < myCart.length; i++) {
        var current = myCart[i];
        if (current.includes(productName)) {
            firstPurchase = false;
            var oldQuant = current[2];
            var newQuant = oldQuant + quantity;
            var newSubTotal = newQuant * productPrice;
            current[2] = newQuant;
            current[3] = newSubTotal;
            myCart[i] = current;
        }
    }

    if (firstPurchase == true) {
        myCart.push(addProduct);
    }
});

function fillTable() {
    var tmp,
        grandTotal = 0;
    for (i = 0; i < myCart.length; i++) {
        grandTotal += parseInt(myCart[i][3]);
        console.log(grandTotal);
        tmp +=
            "<tr><td>" +
            myCart[i][0] +
            "</td><td>" +
            myCart[i][1] +
            "</td><td>" +
            myCart[i][2] +
            "</td><td>" +
            myCart[i][3] +
            "</td><td><button class='btn btn-danger " +
            i +
            "'>Delete</button></td></tr>";
    }
    $("#cartBody").html(tmp);
    $(".total").html("Total cost: " + grandTotal + "€");
    $(".btn-danger").click(function () {
        var pos = $(this).attr("class").split(" ").pop();
        myCart.splice(pos, 1);
        console.log(myCart);
        fillTable();
    });
}

$(".openCart").click(function () {
    fillTable();
});
