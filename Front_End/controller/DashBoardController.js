//.........................SPA.................................................
// $("#loginContent").css("display", 'block');
// $("#navBar").css("display", 'none');
// $("#homeContent").css("display", 'block');
// $("#customerContent").css("display", 'none');
// $("#itemContent").css("display", 'none');
// $("#orderContent").css("display", 'none');
//
// // $("#loginContent").click(function () {
// //     $("#loginContent").css("display", 'none');
// //     $("#navBar").css("display", 'block');
// //     $("#homeContent").css("display", 'block');
// //     $("#customerContent").css("display", 'none');
// //     $("#itemContent").css("display", 'none');
// //     $("#orderContent").css("display", 'none');
// //
// // });
// $("#homeContent").click(function () {
//     $("#homeContent").css("display", 'block');
//     $("#customerContent").css("display", 'none');
//     $("#itemContent").css("display", 'none');
//     $("#orderContent").css("display", 'none');
//
// });
// $("#customerContent").click(function () {
//     $("#homeContent").css("display", 'none');
//     $("#customerContent").css("display", 'block');
//     $("#itemContent").css("display", 'none');
//     $("#orderContent").css("display", 'none');
//
// });
// $("#itemContent").click(function () {
//     $("#homeContent").css("display", 'none');
//     $("#customerContent").css("display", 'none');
//     $("#itemContent").css("display", 'block');
//     $("#orderContent").css("display", 'none');
//
// });
// $("#orderContent").click(function () {
//     $("#homeContent").css("display", 'none');
//     $("#customerContent").css("display", 'none');
//     $("#itemContent").css("display", 'none');
//     $("#orderContent").css("display", 'block');
//
// });


// $("#logoutbtn").click(function () {
//     $("#loginContent").css("display", 'block');
//     $("#navBar").css("display", 'none');
//     $("#homeContent").css("display", 'none');
//     $("#customerContent").css("display", 'none');
//     $("#itemContent").css("display", 'none');
//     $("#orderContent").css("display", 'none');
//
// });
document.getElementById("homeContent").style.display = 'block';
document.getElementById("customerContent").style.display = 'none';
document.getElementById("itemContent").style.display = 'none';
document.getElementById("orderContent").style.display = 'none';

setCustomerCount();
setItemCount();
setOrderCount();

document.getElementById("home").addEventListener("click", function () {
    document.getElementById("homeContent").style.display = 'block';
    document.getElementById("customerContent").style.display = 'none';
    document.getElementById("itemContent").style.display = 'none';
    document.getElementById("orderContent").style.display = 'none';
    setCustomerCount();
    setItemCount();
    setOrderCount();
})
document.getElementById("customer").addEventListener("click", function () {
    document.getElementById("homeContent").style.display = 'none';
    document.getElementById("customerContent").style.display = 'block';
    document.getElementById("itemContent").style.display = 'none';
    document.getElementById("orderContent").style.display = 'none';
})
document.getElementById("items").addEventListener("click", function () {
    document.getElementById("homeContent").style.display = 'none';
    document.getElementById("customerContent").style.display = 'none';
    document.getElementById("itemContent").style.display = 'block';
    document.getElementById("orderContent").style.display = 'none';
})
document.getElementById("orders").addEventListener("click", function () {
    document.getElementById("homeContent").style.display = 'none';
    document.getElementById("customerContent").style.display = 'none';
    document.getElementById("itemContent").style.display = 'none';
    document.getElementById("orderContent").style.display = 'block';
    setDate();
    setOrderId();
    loadCustomerIds();
    loadItemCodes();
})