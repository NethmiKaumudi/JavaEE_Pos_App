$('#btnGetAllItem').click(function () {
    getAllItems();
})
getAllItems();

function getAllItems() {
    $("#tblItem").empty();
    <!--send ajax request to the item servlet using jQuery-->
    $.ajax({
        url: 'http://localhost:8080/back_end/pages/item',
        dataType: "json",
        success: function (items) {

            let x=JSON.parse(items.data)[0];
            console.log(x);

            for (let i in x) {
                let item = x[i];
                let code = item.code;
                let desc = item.description;
                let unitPrice = item.unitPrice;
                let qty = item.qty;
                let row = `<tr><td>${code}</td><td>${desc}</td><td>${unitPrice}</td><td>${qty}</td></tr>`;
                $("#tblItem").append(row);
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
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let code = $(this).children().eq(0).text();
        let desc = $(this).children().eq(1).text();
        let unitPrice = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtItemCode").val(code);
        $("#txtItemDescription").val(desc);
        $("#txtItemPrice").val(unitPrice);
        $("#txtQTYOnHand").val(qty);
    })
}

//customer save

$("#btnAddItem").click(function () {
    let formData = $("#itemForm").serialize();
    $.ajax({
        url: 'http://localhost:8080/back_end/pages/item',
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

    let code = $("#txtItemCode").val();
    let desc = $("#txtItemDescription").val();
    let unitPrice = $("#txtItemPrice").val();
    let qty = $("#txtQTYOnHand").val();

    //json object
    let item = {
        "code": code,
        "description": desc,
        "unitPrice": unitPrice,
        "qty": qty
    }

    let consent = confirm("Do you want to Update.?");
    if (consent) {
        $.ajax({
            url: 'http://localhost:8080/back_end/pages/item',
            method: 'put',
            origin: "*",
            // header: "Access-Control-Allow-Origin",
            setRequestHeader: "Access-Control-Allow-Origin",
            contentType: "application/json",
            data: JSON.stringify(item),
            success: function (resp) {
                getAllItems();
                alert(resp.message);
            },
            error: function (error) {
                alert(error.responseJSON.message);
            }
        });
    }
});


//item delete

$("#btnDeleteItem").click(function () {
    console.log("clicked");
    let code = $('#txtItemCode').val();

    $.ajax({
        url: 'http://localhost:8080/back_end/pages/item' + code,
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

//Search
$('#itemSearchbtn').click(function () {
    console.log("working")
    var searchValue = $('#searchItemField').val();

    $('#tableItem tbody tr').each(function () {
        var code = $(this).find('td:first').text();

        console.log(searchValue)
        console.log(code)
        console.log(code.includes(searchValue))
        if (code.includes(searchValue)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});


$("#itemSearchClearBtn").click(function () {
    $("#searchItemField").val("");
    getAllItems();
});
$("#btnClearAllItem").click(function () {
    $("#txtItemCode,#txtItemDescription,#txtItemPrice,#txtQTYOnHand").val("");

})
function searchItem(code) {
    return items.find(function (item) {
        return item.code === code;
    });
}