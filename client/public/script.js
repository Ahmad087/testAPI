// Appointment Calendar: Author: Guilherme Felix da Silva Maciel, Usage: Modified, Date Modified: 24/4/2021, Source: https://codepen.io/guifelix/pen/LMjZpX
// Calendar brakes by itself sometimes
let arrAppointment;
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
showCalendar(currentMonth, currentYear);

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = new Date(year, month+1, 0).getDate();
    let tbl = document.getElementById("days");
    tbl.innerHTML = "";

    $("#month").text(months[month]);
    $("#month").data("val", month);
    $("#year").text(year);

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        row.className = `week week_${i}`;

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.classList.add("inactive");
                cell.classList.add("disabled");
                cell.classList.add("bg-secondary");
                cell.setAttribute('data-day', date);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    $(cell).addClass("text-white active bg-info today text-center font-weight-bold");
                    $(cell).attr('data-day', date);
                    put_badges_new(cell);
                } else if (date < today.getDate() && year <= today.getFullYear() && month <= today.getMonth()){
                    $(cell).addClass("inactive disabled text-white bg-light text-muted text-center font-weight-light");
                    $(cell).attr('data-day', date);
                    $(cell).attr('disabled', 'disabled');
                } else if (date >= today.getDate() && year >= today.getFullYear() && month >= today.getMonth()) {
                    $(cell).addClass("active text-dark bg-white text-center font-weight-bold");
                    $(cell).attr('data-day', date);
                    put_badges_new(cell);
                } else {
                    $(cell).addClass("text-center text-secondary");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}

$("#days td.active").on("click", function () {
    $('#date').val($(this).text() + "/" + ($('#month').data('val') + 1) + "/" + $('#year').text());
    if (is_empty() == true) {
        $("#submit").prop('disabled', true);
    } else {
        $("#submit").prop('disabled', false);
    }
    if ($("#location").val() == null || $("#location").val() == '') {
        $("#location").focus();
    } else {
        $("#submit").focus();
    }
});

function make_appointment() {
    if (is_empty() == true) {
        return
    } else {
        alert('Appointment made successfully')
    }
}

function clear_input() {
    $("#date").val('');
    $("#location").val('');
    $("#appointmentTime").val('');
    $("#nameSurname").val('');
    $("#submit").prop('disabled', true);
}

function is_empty() {
    if (
        ($("#date").val() == null || $("#date").val() == '') ||
        ($("#location").val() == null || $("#location").val() == '') ||
        ($("#nameSurname").val() == null || $("#nameSurname").val() == '')
    ) {
        return true;
    }
    return false;
}

function is_past_date() {
    var today = new Date();
    var arrDate = GetDateInput();
    var selected_date = new Date(arrDate[2], arrDate[1]-1, arrDate[0], 0, 0, 0, 0);
    if (selected_date < today) {
        return true;
    }
    return false;
}

function GetDateInput() {
    var date = $("#date").val();
    return date.split("/");
}

function get_Date(time, arrDate = false) {
    if (arrDate == false) {
        var arrDate = GetDateInput();
    }
    var date = new Date(arrDate[2], arrDate[1]-1, arrDate[0], 0, 0, 0, 0);
    var _t = time.split(":");
    date.setHours(_t[0], _t[1], 0, 0);
    return date;
}

function put_badges_new(cell) {
    var data = localStorage.getItem("tbAppointment");
    data = JSON.parse(data);
    if (data[0] !== null) {
        let counter = 0;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (cell.getAttribute("data-day") == element.date.slice(0,2)) {
                counter++;
            }
        }

        if (counter >= 1) {
            cell.classList.add("badge1");
            cell.setAttribute('data-badge', counter);
        }
        if (counter <= 0) {
            cell.classList.remove("badge1");
            cell.removeAttribute('data-badge');
        }
    }
}
// End of Appointment Calendar

//alerts

function submit_symptoms(){
    alert('Symptoms have been sumbited to doctor for viewing')
}