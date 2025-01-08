

/**********formating calendar dates to deal with them*********************************************************** */
function formatCalendar(dateElement) {
    let datePick = dateElement.split('/');
    for (let index = 1; index < 9; index++) {
        if (datePick[0] == index)
            datePick[0] = index
        if (datePick[1] == index)
            datePick[1] = index
    }
    let temp = datePick[0];
    datePick[0] = datePick[1];
    datePick[1] = temp;
    formatedDate = datePick.join('-');
    return formatedDate;
}


$(function () {
    if (localStorage.getItem('emp')=='authorized') {
        $("#datepicker").datepicker();
        let empData = JSON.parse(localStorage.getItem("empData"));
        let allDataSpan = document.getElementsByTagName('span')[0];
        let rangeSpan = document.getElementsByTagName('span')[1];
        let dailySpan = document.getElementsByTagName('span')[2];
        let blankDiv = document.getElementById('blank');
        let img = document.getElementsByTagName('img')[0];


        /*************Home employee information from localstorage*******************************************************/
        document.getElementById('name').innerText = empData[0].fname + " " + empData[0].lname;
        document.getElementById('fullname').innerText = empData[0].fname + " " + empData[0].lname;
        document.getElementById('address').innerText = empData[0].address;
        document.getElementById('email').innerText = empData[0].email;
        document.getElementById('age').innerText = empData[0].age;
        document.getElementById('role').innerText = empData[0].role;
        document.getElementById('username').innerText = empData[0].username;
        document.getElementById('password').innerText = empData[0].password;



        /*********All Attendance Data********************************************************************* */
        allDataSpan.addEventListener('click', function () {
            dailySpan.style.border = "none";
            dailySpan.innerText = "Specific Day Attendance Information";
            rangeSpan.style.border = "none";
            rangeSpan.innerText = "Range Attendance Information";

            (async function allData() {
                let table = document.createElement('table');
                let data = await fetch(`http://localhost:3000/attendances?username=${empData[0].username}`)
                let dataArr = await data.json();
                table.innerHTML = "<thead><tr><th>Day (Date)</th><th>Arriving Time</th><th>Leaving Time</th><th>Late</th><th>Excuse</th></tr></thead>"
                for (let index = 1; index < dataArr[0].info.length; index++) {
                    let tr1 = document.createElement('tr');
                    let td4 = document.createElement("td");
                    let td5 = document.createElement("td");
                    let td6 = document.createElement("td");
                    let td7 = document.createElement("td");
                    let td8 = document.createElement("td");
                    td4.innerText = dataArr[0].info[index].date;
                    td5.innerText = dataArr[0].info[index].arrive;
                    td6.innerText = dataArr[0].info[index].out;
                    td7.innerText = dataArr[0].info[index].late;
                    td8.innerText = dataArr[0].info[index].excuse;
                    tr1.appendChild(td4);
                    tr1.appendChild(td5);
                    tr1.appendChild(td6);
                    tr1.appendChild(td7);
                    tr1.appendChild(td8);
                    table.appendChild(tr1);
                }

                blankDiv.innerHTML = "";
                blankDiv.style.padding = "1rem";
                blankDiv.appendChild(table);
                $('#blank').removeClass('blur')
                document.getElementById('rangeCalendar').style.display = "none";
                document.getElementById('datepicker').style.display = "none";
            })();
        })



        /***************Specific Day Attendance Data*************************************************************** */
        dailySpan.addEventListener('click', function () {
            let datePicker = document.getElementById('datepicker');
            let table2 = document.createElement('table');
            let checkDate = formatCalendar(datePicker.value);
            let flag = 0; //To check if the employee has this date in his attendance data or not.
            table2.setAttribute("id", "table2");


            //*********Bring values back to defaults*************************//
            blankDiv.innerHTML = "";
            dailySpan.style.border = "none";
            dailySpan.innerText = "Specific Day Attendance Information";
            rangeSpan.style.border = "none";
            rangeSpan.innerText = "Range Attendance Information";
            //*************************************************************//


            datePicker.addEventListener('blur', function () {
                dailySpan.innerText = "View Selected Day Attendance Information"
                dailySpan.style.border = "1px solid white";
                dailySpan.style.borderRadius = "10px";
            })



            document.getElementById('datepicker').style.display = "block";
            document.getElementById('rangeCalendar').style.display = "none";
            if (document.getElementById('datepicker').value.trim() == "") {
                document.getElementById('datepicker').focus()
                $('#blank').addClass('blur')
            } else {
                (async function dayData() {
                    let data = await fetch(`http://localhost:3000/attendances?username=${empData[0].username}`);
                    let dataArr = await data.json();
                    table2.innerHTML = "<thead><tr><th>Day (Date)</th><th>Arriving Time</th><th>Leaving Time</th><th>Late</th><th>Excuse</th></tr></thead>"
                    for (let index = 1; index < dataArr[0].info.length; index++) {
                        if (checkDate == dataArr[0].info[index].date) {
                            let tr1 = document.createElement('tr');
                            let td4 = document.createElement('td')
                            let td5 = document.createElement('td')
                            let td6 = document.createElement('td')
                            let td7 = document.createElement('td')
                            let td8 = document.createElement('td')
                            td4.innerText = dataArr[0].info[index].date;
                            td5.innerText = dataArr[0].info[index].arrive;
                            td6.innerText = dataArr[0].info[index].out;
                            td7.innerText = dataArr[0].info[index].late;
                            td8.innerText = dataArr[0].info[index].excuse;
                            tr1.appendChild(td4)
                            tr1.appendChild(td5)
                            tr1.appendChild(td6);
                            tr1.appendChild(td7);
                            tr1.appendChild(td8);
                            table2.appendChild(tr1);
                            flag = 1;
                            break;
                        }
                    }
                    if (!flag) {
                        blankDiv.innerHTML = "";
                        blankDiv.style.padding = "1rem";
                        blankDiv.innerHTML = `<h3><i class="fa-brands fa-creative-commons-zero"></i>  There is no data for "${empData[0].fname} ${empData[0].lname}" in this day</h3>`;
                    }


                    //*********Bring values back to defaults*************************//
                    blankDiv.style.padding = "1rem";
                    blankDiv.appendChild(table2);
                    document.getElementById('datepicker').value = "";
                    document.getElementById('datepicker').style.display = "none";
                    $('#blank').removeClass('blur')
                    //**************************************************************//

                })();
            }
        })


        /***************Range Attendance Data ********************************************************/
        rangeSpan.addEventListener('click', function () {
            blankDiv.innerHTML = "";
            let dateRange = document.getElementById('rangeCalendar');
            let table3 = document.createElement('table');


            //*********Bring values back to defaults**************************//
            rangeSpan.style.border = "none";
            rangeSpan.innerText = "Range Attendance Information";
            dailySpan.style.border = "none";
            dailySpan.innerText = "Specific Day Attendance Information";
            //**************************************************************//


            dateRange.addEventListener('blur', function () {
                rangeSpan.innerText = "View Selected Range Attendance Information"
                rangeSpan.style.border = "1px solid white";
                rangeSpan.style.borderRadius = "10px";
            })



            $('#blank').addClass('blur');
            dateRange.style.display = "block";
            document.getElementById('datepicker').style.display = "none";
            if (dateRange.value == "01/01/2023 - 01/01/2023") {
                dateRange.value = "";
                document.getElementById('rangeCalendar').focus();
            }
            else {
                (async function rangeData() {
                    let start = 0;
                    let end = 0;
                    let data = await fetch(`http://localhost:3000/attendances?username=${empData[0].username}`);
                    let dataArr = await data.json();
                    let firstDate = dateRange.value.split(' - ')[0];
                    let secondDate = dateRange.value.split(' - ')[1];
                    let firstDateFormated = formatCalendar(firstDate);
                    let secondDateFormated = formatCalendar(secondDate);


                    //*********Getting indexes of start and end dates**************************//
                    for (let index = 1; index < dataArr[0].info.length; index++) {
                        if (dataArr[0].info[index].date == firstDateFormated) {
                            start = index;
                            break;
                        }
                    }
                    for (let index = start; index < dataArr[0].info.length; index++) {
                        if (dataArr[0].info[index].date == secondDateFormated) {
                            end = index;
                            break;
                        }
                    }
                    //**************************************************************************//


                    table3.innerHTML = "<thead><tr><th>Day (Date)</th><th>Arriving Time</th><th>Leaving Time</th><th>Late</th><th>Excuse</th></tr></thead>";
                    if (start && end) {
                        for (let index = start; index < end + 1; index++) {
                            console.log(dataArr[0].info[index].date);
                            let tr1 = document.createElement('tr');
                            let td4 = document.createElement("td");
                            let td5 = document.createElement("td");
                            let td6 = document.createElement("td");
                            let td7 = document.createElement("td");
                            let td8 = document.createElement("td");
                            td4.innerText = dataArr[0].info[index].date;
                            td5.innerText = dataArr[0].info[index].arrive;
                            td6.innerText = dataArr[0].info[index].out;
                            td7.innerText = dataArr[0].info[index].late;
                            td8.innerText = dataArr[0].info[index].excuse;
                            tr1.appendChild(td4);
                            tr1.appendChild(td5);
                            tr1.appendChild(td6);
                            tr1.appendChild(td7);
                            tr1.appendChild(td8);
                            table3.appendChild(tr1);
                        }
                    }
                    else {
                        blankDiv.innerHTML = "";
                        blankDiv.style.padding = "1rem";
                        blankDiv.innerHTML = `<h3><i class="fa-brands fa-creative-commons-zero"></i>  There is no data for "${empData[0].fname} ${empData[0].lname}" in this range</h3>`;
                    }
                    blankDiv.style.padding = "1rem";
                    blankDiv.appendChild(table3);
                    $('#blank').removeClass('blur')
                    dateRange.style.display = "none";
                    dateRange.value = "01/01/2023 - 01/01/2023";
                })();
            }

        })


        /********************Change Avatar************************************************************************** */
        img.src = localStorage.getItem("avatar");
        document.getElementById('avatar').addEventListener('click', function (e) {
            e.preventDefault();
            if (img.src == "http://127.0.0.1:5500/images/male.jpg") {
                img.src = "http://127.0.0.1:5500/images/female.jpg";
                localStorage.setItem("avatar", "http://127.0.0.1:5500/images/female.jpg")
            }
            else {
                img.src = "http://127.0.0.1:5500/images/male.jpg";
                localStorage.setItem("avatar", "http://127.0.0.1:5500/images/male.jpg")

            }
        })
        localStorage.setItem("emp","not authorized");
        document.getElementById('home').addEventListener('click',function(){
            localStorage.setItem("emp","authorized");
        })
    } else {
        document.getElementsByTagName('body')[0].innerHTML = "<center style=\"color:white\">We can't find the page you want</center>";
    }
})