// get all customers
getAllCustomers();
$('#btnGetCustomer').click(function () {
    getAllCustomers();
})

function getAllCustomers() {
    $("#tblCustomer").empty();
    <!--send ajax request to the customer servlet using jQuery-->
    $.ajax({
        url: 'http://localhost:8080/back_end/pages/customer',
        dataType: "json",
        success: function (customers) {
            let x=JSON.parse(customers.data)[0];
            console.log(x);
            for (let i in x) {
                let cus = x[i];
                let id = cus.id;
                let name = cus.name;
                let address = cus.address;
                let salary = cus.salary;
                // console.log(cus)
                let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
                $("#tblCustomer").append(row);
                bindTrEvents();
            }
        },
        error: function (error) {
            console.log(error.message);
            alert(error.message);

        }
    });

}


//bind event customer table
function bindTrEvents() {
    $('#tblCustomer>tr').click(function () {
        //get the selected rows data
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#Cus_Id").val(id);
        $("#Cus_Name").val(name);
        $("#Address").val(address);
        $("#Salary").val(salary);
    })
}

//customer save

$("#btnAddToCustomerTable").click(function () {
    let formData = $("#customerForm").serialize();
    $.ajax({
        url: 'http://localhost:8080/back_end/pages/customer',
        method: "post",
        data: formData,
        success: function (res) {
            console.log(res);
            alert(res.message);
            getAllCustomers();
        },
        error: function (error) {
            // console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });

});

//customer update

$("#btnUpdateCustomer").click(function () {

    let id = $("#Cus_Id").val();
    let name = $("#Cus_Name").val();
    let address = $("#Address").val();
    let salary = $("#Salary").val();

    //json object
    let a = {
        "id": id,
        "name": name,
        "address": address,
        "salary": salary
    }

    let consent = confirm("Do you want to Update.?");
    if (consent) {
        $.ajax({
            url: 'http://localhost:8080/back_end/pages/customer',
            method: 'put',
            origin: "*",
            // header: "Access-Control-Allow-Origin",
            setRequestHeader: "Access-Control-Allow-Origin",
            contentType: "application/json",
            data: JSON.stringify(a),
            success: function (resp) {
                getAllCustomers();
                alert(resp.message);
            },
            error: function (error) {
                alert(error.responseJSON.message);
            }
        });
    }
});


//customer delete

$("#btnDeleteCustomer").click(function () {
    console.log("clicked");
    let cusID = $('#Cus_Id').val();
    let consent = confirm("Do you want to delete.?");
    if (consent) {
        $.ajax({
            url: 'http://localhost:8080/back_end/pages/customer?id=' + cusID,
            method: "DELETE",
            dataType: "json",
            contentType: "application/json",
            // // data:JSON.stringify(cusID),
            success: function (res) {
                getAllCustomers()
                alert(res.message);
            },
            error: function (error) {
                alert(error.message);
            }
        })
    }
});

//Search customer from input field
$('#customerSearchbtn').click(function () {
    console.log("working")
    var searchValue = $('#searchCustomerField').val();

    $('#div_03 tbody tr').each(function () {
        var id = $(this).find('td:first').text();

        // console.log(searchValue)
        // console.log(id)
        // console.log(id.includes(searchValue))
        if (id.includes(searchValue)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});


$("#customerSearchClearBtn").click(function () {
    $("#searchCustomerField").val("");
    getAllCustomers();
});

$("#btnClearCustomer").click(function () {
    $("#Cus_Id,#Cus_Name,#Address,#Salary").val("");

})

function searchCustomer(id) {
    return customers.find(function (customer) {
        return customer.id === id;
    });//return to matched customer object
}//
