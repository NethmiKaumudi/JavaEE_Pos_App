$(window).ready(function () {
    loadCusIds();
    loaditemIds()
    getOrderCount();
    $("#Discount").val(0);
})

let cartItems = [];
let orders = [];

function setOrderId(orderCount) {
    //setDate
    $("#txtDate").val(new Date().toISOString().slice(0, 10));
    if (orderCount > 0) {
        $("#orderId").val("O00" + (orderCount + 1));
    } else {
        $("#orderId").val("O001");
    }
}//this function use to set a next order id

function getOrderCount() {
    $.ajax({
        url: "http://localhost:8080/Front_End/pages/order?option=orderCount",
        method: "get",
        success: function (resp) {
            setOrderId(Number(resp.ordersCount));
        }
    });
}

//this function use to get an order count from database
//load customer ids

function loadCusIds() {
    var optionCus = '';

    $.ajax({
        url: 'http://localhost:8080/Front_End/pages/customer',
        dataType: "json",
        success: function (customers) {
            for (let c in customers) {
                let cus = customers[c];
                let id = cus.id;
                optionCus += '<option value="' + id + '">' + id + '</option>';
            }
            $('#selectCustomerId').append(optionCus);
        },
        error: function (error) {
            console.log(error);
        }
    });

}

//set Customer details according to cus id

$('#selectCustomerId').change(function () { //the event here is change
    let thisVal = $(this).val();
    $.ajax({
        url: 'http://localhost:8080/Front_End/pages/customer',
        dataType: "json",
        success: function (customers) {
            for (let c in customers) {
                let cus = customers[c];
                let id = cus.id;
                let name = cus.name;
                let address = cus.address;
                let salary = cus.salary;
                if (thisVal == id) {
                    $('#orderCustomerName').val(name)
                    $('#orderCustomerAddress').val(address)
                    $('#orderCustomerSalary').val(salary)
                    break;
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

});

//load item ids

function loaditemIds() {
    var optionItem = '';

    $.ajax({
        url: 'http://localhost:8080/Front_End/pages/item',
        dataType: "json",
        success: function (items) {
            for (let i in items) {
                let item = items[i];
                let code = item.code;
                optionItem += '<option value="' + code + '">' + code + '</option>';
            }
            $('#selectItemCode').append(optionItem);
        },
        error: function (error) {
            console.log(error);
        }
    });

}

//set item details according to item code

$('#selectItemCode').change(function () { //the event here is change
    let thisVal = $(this).val();
    $.ajax({
        url: 'http://localhost:8080/Front_End/pages/item',
        dataType: "json",
        success: function (items) {
            for (let i in items) {
                let item = items[i];
                let code = item.code;
                let desc = item.description;
                let unitPrice = item.unitPrice;
                let qty = i.qty;
                if (thisVal == id) {
                    $('#ItemDescription').val(desc)
                    $('#ItemPrice').val(unitPrice)
                    $('#QTY').val(qty)
                    break;
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

});

function clearItemSection() {
    $("#selectItemCode").val("Select Code");
    $("#ItemDescription").val("");
    $("#ItemPrice").val("");
    $("#QTY").val("");
    $("#txtQty").val("");
}

$("#txtQty").keyup(function () {
    let qty = $("#txtQty").val();
    if (Number($("#txtQty").val()) !== 0 && $("#txtQty").val() !== "") {
        if (Number(qty) <= Number($("#QTY").val())) {
            $("#txtQty").css("border", 'solid green 2px');
        } else {
            $("#txtQty").css("border", 'solid red 2px');
        }
    } else {
        $("#txtQty").css("border", 'solid red 2px');
    }
});

function checkOrderAndItem(itemQty) {
    for (let j = 0; j < cartItems.length; j++) {
        if (cartItems[j].orderId === $("#txtOrderID").val() && cartItems[j].code === $("#selectItemCode").val()) {
            cartItems[j].itemQty = Number(cartItems[j].itemQty) + Number(itemQty);
            console.log(cartItems[j].itemQty)
            return true;
        }
    }
    return false;
}

$("#orderAdd").click(function () {
    let id = $("#selectCustomerId").val();
    let code = $("#selectItemCode").val();
    if (id !== "Select Id" && code !== "Select Code") {
        let date = $("#txtDate").val();
        let orderId = $("#txtOrderID").val();
        let id = $("#selectCustomerId").val();
        let code = $("#selectItemCode").val();
        let itemDesc = $("#ItemDescription").val();
        let itemPrice = $("#ItemPrice").val();
        let itemQty = $("#txtQty").val();

        if (!checkOrderAndItem(itemQty)) {
            let newOrder = ({
                date: date,
                orderId: orderId,
                id: id,
                code: code,
                itemDesc: itemDesc,
                itemPrice: itemPrice,
                itemQty: itemQty,
            });
        }
        addToCart();
        updateItemQTY(code, itemQty);
    } else {
        if (id === "Select Id" && code === "Select Code") {
            $("#selectCustomerId").css("border", 'solid red 2px');
            $("#orderCustomerName").css("border", 'solid red 2px');
            $("#orderCustomerAddress").css("border", 'solid red 2px');
            $("#orderCustomerSalary").css("border", 'solid red 2px');

            $("#selectItemCode").css("border", 'solid red 2px');
            $("#ItemDescription").css("border", 'solid red 2px');
            $("#ItemPrice").css("border", 'solid red 2px');
            $("#QTY").css("border", 'solid red 2px');
        } else if (code === "Select Code") {
            $("#selectCustomerId").css("border", 'solid green 2px');
            $("#orderCustomerName").css("border", 'solid green 2px');
            $("#orderCustomerAddress").css("border", 'solid green 2px');
            $("#orderCustomerSalary").css("border", 'solid green 2px');

            $("#selectItemCode").css("border", 'solid red 2px');
            $("#ItemDescription").css("border", 'solid red 2px');
            $("#ItemPrice").css("border", 'solid red 2px');
            $("#QTY").css("border", 'solid red 2px');
        } else {
            $("#selectCustomerId").css("border", 'solid red 2px');
            $("#orderCustomerName").css("border", 'solid red 2px');
            $("#orderCustomerAddress").css("border", 'solid red 2px');
            $("#orderCustomerSalary").css("border", 'solid red 2px');

            $("#selectItemCode").css("border", 'solid green 2px');
            $("#ItemDescription").css("border", 'solid green 2px');
            $("#ItemPrice").css("border", 'solid green 2px');
            $("#QTY").css("border", 'solid green 2px');
        }
    }
});

function addToCart() {
    let tableBody = $("#tblOrder");
    tableBody.empty();
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].orderId === $("#txtOrderID").val()) {
            let tr = `<tr>
                        <td>${cartItems[i].date}</td>
                        <td>${cartItems[i].orderId}</td>
                        <td>${cartItems[i].id}</td>
                        <td>${cartItems[i].code}</td>
                        <td>${cartItems[i].itemPrice}</td>
                        <td>${cartItems[i].itemQty}</td>

                        <td>
                          <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                      </tr>`;
            tableBody.append(tr);
        }
    }
    getDeleteCartItem();
    calculateTotal();
}

function updateItemQTY(code, itemQty) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].code === code) {
            // console.log("Number(itemDB[i].qty)", Number(itemDB[i].qty))
            // console.log("Number(itemQty)", Number(itemQty));
            cartItems[i].qty = Number(cartItems[i].qty) - Number(itemQty); // 100 - 10
            console.log("itemDB[i].qty", cartItems[i].qty) // 90
            // searchItem(code).qty = itemDB[i].qty;

        }
    }
    // searchItem(code);
    clearItemSection();
}

function clearItemSection() {
    $("#selectItemCode").val("Select Code");
    $("#ItemDescription").val("");
    $("#ItemPrice").val("");
    $("#QTY").val("");
    $("#txtQty").val("");
}

function calculateTotal() {
    let price = 0, qty = 0, tot = 0;
    const table = $("#tblOrder")[0];
    for (let i = 0; i < $("#tblOrder > tr").length; i++) {
        price = Number(table.rows[i].cells[4].textContent);
        qty = Number(table.rows[i].cells[5].textContent);
        tot = tot + (price * qty);
    }
    $("#Total").val(tot);
}

$("#Discount,#Cash").keydown(function (event) {
    if (event.key === "Enter") {
        let cash = $("#Cash").val();
        let discount = $("#Discount").val();
        if (discount >= 0 && discount < 100) {
            $("#Discount").css("border", "green solid 2px");
            setBalance(cash, discount);
        } else {
            $("#Discount").css("border", "red solid 2px");
            $("#Discount").focus();
        }
    }
});


function setBalance(cash, discount) {
    let total = ($("#Total").val() - ($("#Total").val() * (discount / 100)));
    let balance = cash - total;
    console.log("total", total);
    if (balance >= 0) {
        $("#Balance").val(balance);
        $("#Balance").css("border", "solid 2px green");
    } else {
        $("#Balance").css("border", "solid 2px red");
    }
}

function getDeleteCartItem() {
    $("#tblOrder>tr>td>button:nth-child(1)").click(function () {
        // let id = $(this).parents("#order-table>tr").children().eq(2).text();
        let code = $(this).parents("#tblOrder>tr").children().eq(3).text();
        let qty = $(this).parents("#tblOrder>tr").children().eq(5).text();
        let oid = $("#txtOrderID").val();
        let consent = confirm("Do you want to delete.?");
        if (consent) {
            let response = deleteCartItem(oid, code, qty);
            if (response) {
                alert("Item Deleted");
                $("#tblOrder").empty();
                addToCart();
            } else {
                alert("Item Not Removed..!");
            }
        }
    });
}

function deleteCartItem(oid, code, newQTY) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].orderId === oid && orderDB[i].code === code) {
            let item = searchItem(code);
            item.qty = Number(item.qty) + Number(newQTY);
            cartItems.splice(i, 1);
            return true;
        }
    }
    return false;
}

$("#place-order").click(function () {
    $("#orderIdAlert").text("");
    $("#cashAlert").text("");
    let total = $("#total").text();
    let subTotal = $("#subTotal").text();
    let cash = $("#cash").val();
    let orderID = $("#orderId").val();

    $.ajax({
        url: "http://localhost:8080/pos_app/pages/order?option=orders",
        method: "get",
        success: function (resp) {
            orders = resp;
            if (undefined === searchOrder(orderID)) {
                console.log("hi")
                if ($("#order-table>tr").length > 0 && $("#invoice-customerNIC").val() !== "Select NIC") {
                    if (Number(cash) >= Number(total) && cash !== "") {
                        let date = $("#orderDate").val();
                        let nic = $("#invoice-customerNIC").val();
                        let discount = $("#discount").val();
                        console.log(discount)
                        let balance = $("#balance").val();
                        let newOrderDetails = {
                            "orderId": orderID,
                            "date": date,
                            "nic": nic,
                            "total": total,
                            "subTotal": subTotal,
                            "cash": cash,
                            "discount": discount,
                            "balance": balance,
                            "cartItems": cartItems
                        }
                        console.log("hi")
                        $.ajax({
                            url: "http://localhost:8080/pos_app/pages/order",
                            method: "post",
                            contentType: "application/json",
                            data: JSON.stringify(newOrderDetails),
                            success: function (resp) {
                                clearItemSection();
                                clearInvoiceSection();

                                $("#order-table").empty();
                                getOrderCount();

                                $("#total").text("0.0");
                                $("#subTotal").text("0.0");
                                $("#cash").val("");
                                $("#discount").val(0);
                                $("#balance").val("");

                                cartItems = [];

                                alert(resp.message);
                            }
                        });
                    } else {
                        $("#cashAlert").text("This amount is not enough");
                    }
                } else {
                    $("#invoice-customerNIC").focus();
                }
            } else {
                $("#orderIdAlert").text(`${orderID} already exits`);
            }
        }
    });
});
$("#btnPurchaseOrder").click(function () {

    $.ajax({
        url: "http://localhost:8080/Front_End/pages/order?option=orders",
        method: "get",
        success: function (resp) {
            orders = resp;
            if (undefined === searchOrder(orderID)) {
                console.log("check")
                if ($("#tblOrder>tr").length > 0 && $("#selectCustomerId").val() !== "Select Id") {
                    if (Number(cash) >= Number(total) && cash !== "") {
                        let date = $("#txtDate").val();
                        let orderID = $("#txtOrderID").val();
                        let id = $("#selectCustomerId").val();
                        let total = $("#Total").val();
                        let cash = $("#Cash").val();
                        let discount = $("#Discount").val();
                        let balance = $("#Balance").val();

                        let newOrderDetails = {
                            "orderId": orderID,
                            "date": date,
                            "id": id,
                            "total": total,
                            "cash": cash,
                            "discount": discount,
                            "balance": balance,
                            "cartItems": cartItems
                        }
                        console.log("hi")
                        $.ajax({
                            url: "http://localhost:8080/Front-End/pages/order",
                            method: "post",
                            contentType: "application/json",
                            data: JSON.stringify(newOrderDetails),
                            success: function (resp) {
                                clearItemSection();
                                clearInvoiceSection();

                                $("#tblOrder").empty();
                                getOrderCount();

                                $("#Total").text("0.0");
                                $("#Cash").val("");
                                $("#Discount").val(0);
                                $("#Balance").val("");

                                cartItems = [];

                                alert(resp.message);
                            }
                        });
                    } else {
                        $("#cash-empty-error").text("This amount is not enough");
                    }
                } else {
                    $("#selectCustomerId").focus();
                }
            } else {
                $("#orderIdAlert").text(`${orderID} already exits`);
            }
        }
    });
    // console.log($("#tblOrder>tr").length > 0 && $("#selectCustomerId").val() !== "Select NIC");
    // if ($("#tblOrder>tr").length > 0 && $("#selectItemCode").val() !== "Select NIC") {
    //
    //     orders.push({
    //         date: date,
    //         orderID: orderID,
    //         id: id,
    //         total: total,
    //         cash: cash,
    //         discount: discount,
    //         balance: balance
    //     });
    //     clearItemSection();
    //     clearInvoiceSection();
    //     $("#tblOrder").empty();
    //     setOrderId();
    //     $("#Total").text("0.0");
    //     $("#Cash").val("");
    //     $("#Discount").val(0);
    //     $("#Balance").val("");
    // } else {
    //     $("#selectCustomerId").focus();
    // }
});

function clearInvoiceSection() {
    $("#selectCustomerId").val("Select NIC");
    $("#orderCustomerName").val("");
    $("#orderCustomerAddress").val("");
    $("#orderCustomerSalary").val("");
}

$("#txtOrderID").keydown(function (event) {
    $("#orderIdAlert").text("");
    if (event.key === "Enter") {
        let orderID = $("#txtOrderID").val();

        console.log("ok");

        $.ajax({
            url: "http://localhost:8080/Front_End/pages/order?option=orderDetails&orderID=" + orderID,
            method: "get",
            success: function (resp) {

                let array = JSON.parse(resp.data)[0];


                if (array.length > 0) {
                    cartItems = array[1];
                    //loadToCart();
                    cartItems = [];

                    let customer = array[2];
                    $("#selectCustomerId").val(customer.id);
                    $("#orderCustomerName").val(customer.name);
                    $("#orderCustomerAddress").val(customer.address);
                    $("#orderCustomerSalary").val(customer.salary);

                    let orderDetails = array[0];
                    $("#txtDate").text(orderDetails.date);
                    $("#Total").text(orderDetails.total);
                    $("#Cash").val(orderDetails.cash);
                    $("#Discount").val(orderDetails.discount);
                    $("#Balance").val(orderDetails.balance);

                } else {
                    $("#txtOrderID").focus();
                    $("#orderIdAlert").text(`${orderID} has no order`);

                    clearItemSection();
                    clearInvoiceSection();
                    $("#tblOrder").empty();
                    setOrderId();
                    $("#Total").text("0.0");
                    $("#Cash").val("");
                    $("#Discount").val(0);
                    $("#Balance").val("");
                }
            }
        });
    }
    // if (event.key === "Enter") {
    //     let orderID = $("#txtOrderID").val();
    //     let order = searchOrder(orderID);
    //
    //     if (order !== undefined) {
    //         addToCart();
    //         let customer = searchCustomer(order.id);
    //         $("#selectCustomerId").val(order.id);
    //         $("#orderCustomerName").val(customer.name);
    //         $("#orderCustomerAddress").val(customer.address);
    //         $("#orderCustomerSalary").val(customer.salary);
    //
    //         $("#txtDate").text(order.date);
    //         $("#Total").text(order.total);
    //         $("#Cash").val(order.cash);
    //         $("#Discount").val(order.discount);
    //         $("#Balance").val(order.balance);
    //
    //     } else {
    //         $("#txtOrderID").focus();
    //     }
    //
    // }
});

function searchOrder(orderID) {
    return orders.find(function (orders) {
        return orders.orderID === orderID;
    });
}
