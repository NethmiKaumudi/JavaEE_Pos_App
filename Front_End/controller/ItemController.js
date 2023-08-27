$('#btnGetAllItem').click(function () {
    getAllItems();
})

function getAllItems() {
    $("#tblItems").empty();
    <!--send ajax request to the item servlet using jQuery-->
    $.ajax({
        url: 'http://localhost:8080/JavaEE_Pos/item',
        dataType: "json",
        success: function (items) {
            for (let i in items) {
                let item = items[i];
                let code = item.code;
                let desc = item.desc;
                let unitPrice = item.unitPrice;
                let qty = item.qty;
                let row = `<tr><td>${code}</td><td>${desc}</td><td>${unitPrice}</td><td>${qty}</td></tr>`;
                $("#tblItems").append(row);
                bindTrEventsItem();
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}


//bind event item table
function bindTrEventsItem() {
    $('#tblItems>tr').click(function () {
        //get the selected rows data
        let code = $(this).children().eq(0).text();
        let desc = $(this).children().eq(1).text();
        let unitPrice = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#InputItemID").val(code);
        $("#InputItemDesc").val(desc);
        $("#inputItemUnitPrice").val(unitPrice);
        $("#inputItemQty").val(qty);
    })
}

//customer save

$("#btnSaveItem").click(function () {
    let formData = $("#itemForm").serialize();
    $.ajax({
        url: 'http://localhost:8080/JavaEE_Pos/item',
        method: "post",
        data: formData,
        success: function (res) {
            console.log(res);
            alert(res.message);
            getAllItems();
        },
        error: function (error) {
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });

});

//customer update

$("#btnUpdateItem").click(function () {

    let code = $("#InputItemID").val();
    let desc = $("#InputItemDesc").val();
    let unitPrice = $("#inputItemUnitPrice").val();
    let qty = $("#inputItemQty").val();

    //json object
    let a = {
        "code": code,
        "desc": desc,
        "unitPrice": unitPrice,
        "qty": qty
    }


    $.ajax({
        url: 'http://localhost:8080/JavaEE_Pos/item',
        method: 'put',
        origin: "*",
        // header: "Access-Control-Allow-Origin",
        setRequestHeader: "Access-Control-Allow-Origin",
        contentType: "application/json",
        data: JSON.stringify(a),
        success: function (resp) {
            getAllItems();
            alert(resp.message);
        },
        error: function (error) {
            alert(error.responseJSON.message);
        }
    });
});


//customer delete

$("#btnDeleteItem").click(function () {
    console.log("clicked");
    let code = $('#InputItemID').val();

    $.ajax({
        url: 'http://localhost:8080/JavaEE_Pos/item?code=' + code,
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        // data:JSON.stringify(cusID),
        success: function (res) {
            getAllItems();
            alert(res.message);
        },
        error: function (error) {
            alert(error.message)
        }
    })
});