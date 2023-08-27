// get all customers

$('#btnGetAllCus').click(function () {
    getAllCustomers();
})

function getAllCustomers() {
    $("#tblCustomer").empty();
    <!--send ajax request to the customer servlet using jQuery-->
    $.ajax({
        url: 'http://localhost:8080/Front_End/pages/customer',
        dataType: "json",
        success: function (customers) {
            for (let i in customers) {
                let cus = customers[i];
                let id = cus.id;
                let name = cus.name;
                let address = cus.address;
                let salary = cus.salary;
                let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
                $("#tblCustomer").append(row);
                bindTrEvents();
            }
        },
        error: function (error) {
            console.log(error);
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
        url: 'http://localhost:8080/Front_End/pages/customer',
        method: "post",
        data: formData,
        success: function (res) {
            console.log(res);
            alert(res.message);
            getAllCustomers();
        },
        error: function (error) {
            console.log(error.responseJSON);
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
        "cusID": id,
        "cusName": name,
        "cusAddress": address,
        "cusSalary": salary
    }


    $.ajax({
        url: 'http://localhost:8080/Front_End/pages/customer',
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
});


//customer delete

$("#btnDeleteCustomer").click(function () {
    console.log("clicked");
    let cusID = $('#Cus_Id').val();

    $.ajax({
        url: 'http://localhost:8080/Front_End/pages/customer?cusID=' + cusID,
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        // data:JSON.stringify(cusID),
        success: function (res) {
            getAllCustomers()
            alert(res.message);
        },
        error: function (error) {
            alert(error.responseJSON.message)
        }
    })
});

//Search customer from input field
function searchCustomers() {
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


}

$('#customerSearchbtn').click(function () {
    console.log("working")
    $.ajax({
        url: 'http://localhost:8080/Front_End/pages/customer',
        dataType: "json",
        success: function (res) {
            searchCustomers();
            console.log(res.message);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#customerSearchClearBtn").click(function () {
    $("#searchCustomerField").val("");
    getAllCustomers();
});


