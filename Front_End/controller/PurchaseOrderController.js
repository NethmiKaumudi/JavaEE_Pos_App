//load customer ids

function loadCusIds() {
    var optionCus = '';

    $.ajax({
        url: 'http://localhost:8080/Front_End/pages/customer',
        dataType: "json",
        success: function (customers) {
            for (let i in customers) {
                let cus = customers[i];
                let id = cus.id;
                optionCus += '<option value="' +id + '">' + id + '</option>';
            }
            $('#selectCusId').append(optionCus);
        },
        error: function (error) {
            console.log(error);
        }
    });

}
