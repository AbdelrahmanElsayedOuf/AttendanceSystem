$(function () {
    if (localStorage.getItem('admin') == 'authorized') {
        "use strict";
        // Spinner
        var spinner = function () {
            setTimeout(function () {
                if ($('#spinner').length > 0) {
                    $('#spinner').removeClass('show');
                }
            }, 1);
        };
        spinner();


        // Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        $('.back-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        });
        console.clear()


        // Sidebar Toggler
        $('.sidebar-toggler').click(function () {
            $('.sidebar, .content').toggleClass("open");
            return false;
        });




        /*******************************************Charts***************************************************************************/
        (async function charts() {
            let userData = await fetch(`http://localhost:3000/users`);
            let userDataArr = await userData.json();
            let fullName = [];
            let ages = [];
            let employees = 0;
            let securities = 0;
            let cairo = 0;
            let mansoura = 0;
            let alexandria = 0;
            userDataArr.forEach(el => {
                fullName.push(el.fname + " " + el.lname);
                ages.push(el.age);
                if (el.role == "Employee") { employees++ } else { securities++ }
                if (el.address == "Cairo") { cairo++ } else if (el.address == "Mansoura") { mansoura++ } else if (el.address == "Alexandria") { alexandria++ }
            })

            let reqData = await fetch(`http://localhost:3000/RegistrationRequests`);
            let reqDataArr = await reqData.json();
            let pending = reqDataArr.length;


            let attendanceData = await fetch(`http://localhost:3000/attendances`);
            let attendanceDatadataArr = await attendanceData.json();
            let dataChart1 = [];
            let dataChart2 = [];
            let dataChart3 = [];
            attendanceDatadataArr.forEach(el => {
                dataChart1.push(el.lateTimes)
                dataChart2.push(el.excuseTimes)
                dataChart3.push(el.absentTimes)
            })

            var ctx2 = $("#salse-revenue").get(0).getContext("2d");
            var myChart2 = new Chart(ctx2, {
                type: "line",
                data: {
                    labels: fullName,
                    datasets: [{
                        label: "LateTimes",
                        data: dataChart1,
                        backgroundColor: "rgba(138, 170, 229, .8)",
                        fill: true
                    },
                    {
                        label: "ExcuseTimes",
                        data: dataChart2,
                        backgroundColor: "rgba(138, 170, 229, .6)",
                        fill: true
                    },
                    {
                        label: "AbsentTimes",
                        data: dataChart3,
                        backgroundColor: "rgba(255, 154, 154, 0.616)",
                        fill: true
                    }
                    ]
                },
                options: {
                    responsive: true
                }
            });


            // Worldwide Sales Chart
            var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
            var myChart1 = new Chart(ctx1, {
                type: "bar",
                data: {
                    labels: fullName,
                    datasets: [{
                        label: "LateTimes",
                        data: dataChart1,
                        backgroundColor: "rgba(138, 170, 229, .9)"
                    },
                    {
                        label: "Excuse Times",
                        data: dataChart2,
                        backgroundColor: "rgba(138, 170, 229, .6)"
                    },
                    {
                        label: "AbsentTimes",
                        data: dataChart3,
                        backgroundColor: "rgba(255, 154, 154, 0.616)",
                        fill: true
                    }
                    ]
                },
                options: {
                    responsive: true
                }
            });


            // // Single Line Chart
            var ctx3 = $("#line-chart").get(0).getContext("2d");
            var myChart3 = new Chart(ctx3, {
                type: "line",
                data: {
                    labels: fullName,
                    datasets: [{
                        label: "Relative Ages",
                        fill: false,
                        backgroundColor: "rgba(138, 170, 229, .9)",
                        data: ages
                    }]
                },
                options: {
                    responsive: true
                }
            });


            // Single Bar Chart
            var ctx4 = $("#bar-chart").get(0).getContext("2d");
            var myChart4 = new Chart(ctx4, {
                type: "bar",
                data: {
                    labels: fullName,
                    datasets: [{
                        backgroundColor: [
                            "rgba(138, 170, 229, .9)",
                            "rgba(138, 170, 229, .7)",
                            "rgba(138, 170, 229, .5)",
                            "rgba(138, 170, 229, .3)",
                            "rgba(138, 170, 229, .5)"
                        ],
                        data: ages,
                        label: "Age Rates"
                    }]
                },
                options: {
                    responsive: true
                }
            });


            // Doughnut Chart
            var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
            var myChart6 = new Chart(ctx6, {
                type: "doughnut",
                data: {
                    labels: ["Employees", "Admins", "Pending Requests", "Securities"],
                    datasets: [{
                        backgroundColor: [
                            "rgba(138, 170, 229, 1)",
                            "rgba(138, 170, 229, .7)",
                            "rgba(138, 170, 229, .4)",
                            "rgba(138, 170, 229, .2)",
                            "rgba(138, 170, 229, .1)"
                        ],
                        data: [employees, 3, pending, securities]
                    }]
                },
                options: {
                    responsive: true
                }
            });


            // Pie Chart
            var ctx5 = $("#pie-chart").get(0).getContext("2d");
            var myChart5 = new Chart(ctx5, {
                type: "pie",
                data: {
                    labels: ["Cairo", "Alexandria", "Mansoura"],
                    datasets: [{
                        backgroundColor: [
                            "rgba(138, 170, 229, 1)",
                            "rgba(138, 170, 229, .7)",
                            "rgba(138, 170, 229, .4)",
                            "rgba(138, 170, 229, .2)",
                            "rgba(138, 170, 229, .1)"
                        ],
                        data: [cairo, mansoura, alexandria]
                    }]
                },
                options: {
                    responsive: true
                }
            });



        })();



        let navItems = $('.nav-item');

        //**************send mail function****************************************************************************************** */
        function sendMail(uniqueUserName, uniquePassword, email) {
            let params = {
                from_name: "Abdelrahman Elsayed Ouf",
                username: `${uniqueUserName}`,
                password: `${uniquePassword}`,
                tomail: `${email}`
            }
            emailjs.send('default_service', 'template_dx2p3el', params)
        }

        //***************formating dates functions****************************************************************************** */
        function formatDate(date) {
            return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        }
        function formatCalendar(elementDate) {
            let datePick = elementDate.split('/');
            for (let index = 1; index < 9; index++) {
                if (datePick[0] == index)
                    datePick[0] = index
                if (datePick[1] == index)
                    datePick[1] = index
            }
            let temp = datePick[0];
            datePick[0] = datePick[1];
            datePick[1] = temp;
            let formatedDate = datePick.join('-');
            return formatedDate;
        }


        /***************prevent form action using enter button********************************************************************* */
        $('form').bind("keypress", function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                return false;
            }
        });






        /*******************fetching all data for required reports************************************************************************/



        (async function init() {
            /***********start of table of specific range data*************************************************************************  */
            let attendanceData = await fetch(`http://localhost:3000/attendances`);
            let attendanceDatadataArr = await attendanceData.json();


            document.getElementById('display').addEventListener('click', function () {
                let table = document.getElementById('table4')
                table.innerHTML = "";
                let dateRange = document.getElementById('daterange');
                let firstDate = dateRange.value.split(' - ')[0];
                let secondDate = dateRange.value.split(' - ')[1];
                let firstDateFormated = formatCalendar(firstDate);
                let secondDateFormated = formatCalendar(secondDate);
                let start;
                let end;

                attendanceDatadataArr.forEach(element => {
                    let tr = document.createElement('tr');
                    let tr1 = document.createElement('tr');
                    let td1 = document.createElement('th');
                    let td2 = document.createElement('th');
                    let td3 = document.createElement('th');
                    let td4 = document.createElement('th');
                    let td5 = document.createElement('th');
                    let td6 = document.createElement('th');
                    td1.colSpan = "5";
                    td1.style.backgroundColor = "rgb(100, 100, 255)";
                    td1.style.color = "white";
                    td1.innerText = element.username;
                    td2.innerText = "Date";
                    td3.innerText = "Arriving Time";
                    td4.innerText = "Leaving Time";
                    td5.innerText = "Late";
                    td6.innerText = "Excuse";
                    tr.appendChild(td1);
                    tr1.appendChild(td2);
                    tr1.appendChild(td3);
                    tr1.appendChild(td4);
                    tr1.appendChild(td5);
                    tr1.appendChild(td6);
                    table.appendChild(tr)
                    table.appendChild(tr1)


                    for (let index = 1; index < element.info.length; index++) {
                        if (element.info[index].date == firstDateFormated) {
                            start = index;
                            break;
                        }
                    }
                    for (let index = start; index < element.info.length; index++) {
                        if (element.info[index].date == secondDateFormated) {
                            end = index;
                            break;
                        }
                    }


                    for (let index = start; index < end + 1; index++) {
                        let row = document.createElement('tr');
                        let td1 = document.createElement('td');
                        td1.innerText = element.info[index].date;
                        let td2 = document.createElement('td');
                        td2.innerText = element.info[index].arrive;
                        let td3 = document.createElement('td');
                        td3.innerText = element.info[index].out;
                        let td4 = document.createElement('td');
                        td4.innerText = element.info[index].late;
                        let td5 = document.createElement('td');
                        td5.innerText = element.info[index].excuse;

                        row.appendChild(td1);
                        row.appendChild(td2);
                        row.appendChild(td3);
                        row.appendChild(td4);
                        row.appendChild(td5);
                        table.appendChild(row);
                    }

                })

            })

            document.getElementById('rangeReport').style.display = "none"
            navItems[4].addEventListener('click', function () {
                document.getElementById('allEmployees').style.display = "none";
                document.getElementById('todayReport').style.display = "none";
                document.getElementById('pendingRequests').style.display = "none";
                document.getElementById('specificDayReport').style.display = "none";
                document.getElementById('employeeBrief').style.display = "none";
                document.getElementById('display3').style.display = "none";

                $(this).toggleClass('active');
                $("span:not(span:eq(6))").removeClass('active');

                if (document.getElementById('rangeReport').style.display == "none") {
                    document.getElementById('rangeReport').style.display = "block";
                }
                else
                    document.getElementById('rangeReport').style.display = "none"
            })

            /***************End of Range table data*********************************************************************************** */



            //**************table of Pending****************************************************************************************************************************************************************** */
            let data = await fetch("http://localhost:3000/RegistrationRequests");
            let dataobj = await data.json();
            $('#table1').append("<thead><th>Fullname</th><th>Username</th><th>Role</th><th>Address</th><th>E-mail</th><th>Age</th><th>Reject</th><th>Accept</th><th>Send Mail</th></thead>");

            for (let index = 0; index < dataobj.length; index++) {
                let username = dataobj[index].username;
                let tr = document.createElement('tr');
                let td2 = document.createElement('td');
                td2.innerText = dataobj[index].fname + " " + dataobj[index].lname;
                let td3 = document.createElement('td');
                td3.innerText = dataobj[index].username;
                let td4 = document.createElement('td');
                td4.innerText = dataobj[index].role;
                let td5 = document.createElement('td');
                td5.innerText = dataobj[index].address;
                let td6 = document.createElement('td');
                td6.innerText = dataobj[index].email;
                let td7 = document.createElement('td');
                td7.innerText = dataobj[index].age;
                let td8 = document.createElement('td');
                let img = document.createElement('img');
                img.src = "../images/delete.png";
                td8.appendChild(img)
                let td9 = document.createElement('td');
                let img2 = document.createElement('img');
                img2.src = "../images/confirm-icon.png";
                img2.style.display = "none";
                img2.style.visibility = "hidden";



                let td10 = document.createElement('td');
                let img3 = document.createElement('img');
                img3.src = "../images/mail.png";
                td9.appendChild(img2)
                td10.appendChild(img3)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)
                tr.appendChild(td6)
                tr.appendChild(td7)
                tr.appendChild(td8)
                tr.appendChild(td9)
                tr.appendChild(td10)

                img3.addEventListener('click', function (e) {
                    let password = dataobj[index].password;
                    let email = dataobj[index].email;
                    sendMail(username, password, email)
                    img2.style.display = "inline";
                    img3.style.display = "none";
                    img2.style.visibility = "visible";
                })
                document.getElementById('table1').appendChild(tr)

                img2.addEventListener('click', function (e) {
                    localStorage.setItem("admin","authorized");
                    let date = new Date();
                    let newInfo = [{ "date": `${formatDate(date)}`, "arrive": "", "out": "", "late": "", "excuse": "" }];
                    $.post("http://localhost:3000/users", dataobj[index]);
                    fetch(`http://localhost:3000/RegistrationRequests/${username}`, {
                        method: 'DELETE'
                    })
                    fetch(`http://localhost:3000/attendances`, {
                        method: "POST",
                        body: JSON.stringify({
                            username: `${username}`,
                            userId: `${username}`,
                            lateTimes: 0,
                            excuseTimes: 0,
                            absentTimes: 0,
                            info: newInfo
                        }),
                        headers: { "Content-type": "application/json; charset=UTF-8" }
                    });
                    alert("You have accepted the request successfully!");
                })

                img.addEventListener('click', function (e) {
                    localStorage.setItem("admin","authorized");
                    fetch(`http://localhost:3000/RegistrationRequests/${username}`, {
                        method: 'DELETE',
                        headers: { "Content-type": "application/json; charset=UTF-8" }
                    });
                    alert("You have deleted the request successfully!");
                })

            };

            document.getElementById('pendingRequests').style.display = "none"
            navItems[1].addEventListener('click', function () {
                document.getElementById('allEmployees').style.display = "none";
                document.getElementById('todayReport').style.display = "none";
                document.getElementById('rangeReport').style.display = "none";
                document.getElementById('specificDayReport').style.display = "none";
                document.getElementById('employeeBrief').style.display = "none";
                document.getElementById('display3').style.display = "none";


                $(this).toggleClass('active');
                $("span:not(span:eq(3))").removeClass('active');

                if (document.getElementById('pendingRequests').style.display == "none") {
                    document.getElementById('pendingRequests').style.display = "block";
                }
                else
                    document.getElementById('pendingRequests').style.display = "none"
            })
            //****************End of table of pending*******************************************************************************************************************************/



            //****************table of employees********************************************************************************************************** */
            let data2 = await fetch("http://localhost:3000/users");
            let dataobj2 = await data2.json();

            $('#table2').append("<thead><tr><th>Username</th><th>Password</th><th>Fullname</th><th>Address</th><th>E-mail</th><th>Age</th></tr></thead>");
            dataobj2.forEach((element) => {
                let tr = document.createElement('tr');
                tr.setAttribute("class", "item");
                let td2 = document.createElement('td');
                td2.innerText = element.username;
                let td3 = document.createElement('td');
                td3.innerText = element.password;
                let td4 = document.createElement('td');
                td4.innerText = element.fname + " " + element.lname;
                let td5 = document.createElement('td');
                td5.innerText = element.address;
                let td6 = document.createElement('td');
                td6.innerText = element.email;
                let td7 = document.createElement('td');
                td7.innerText = element.age;
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                document.getElementById('table2').appendChild(tr);
            })


            document.getElementById('allEmployees').style.display = "none"
            navItems[0].addEventListener('click', function () {

                document.getElementById('pendingRequests').style.display = "none";
                document.getElementById('todayReport').style.display = "none";
                document.getElementById('rangeReport').style.display = "none";
                document.getElementById('specificDayReport').style.display = "none";
                document.getElementById('employeeBrief').style.display = "none";
                document.getElementById('display3').style.display = "none";
                $(this).toggleClass('active');
                $("span:not(span:eq(2))").removeClass('active');

                if (document.getElementById('allEmployees').style.display == "none") {
                    document.getElementById('allEmployees').style.display = "block";
                }
                else
                    document.getElementById('allEmployees').style.display = "none";
            })

            /********************End of table of all Employees********************************************************************************************* */





            /*******************table of today report************************************************************************************ */
            document.getElementById('todayReport').style.display = "none";
            navItems[2].addEventListener('click', function () {
                document.getElementById('rangeReport').style.display = "none"
                document.getElementById('table3').innerHTML = "";
                document.getElementById('pendingRequests').style.display = "none";
                document.getElementById('allEmployees').style.display = "none";
                document.getElementById('specificDayReport').style.display = "none"
                document.getElementById('employeeBrief').style.display = "none";
                document.getElementById('display3').style.display = "none";

                $(this).toggleClass('active');
                $("span:not(span:eq(4))").removeClass('active');

                if (document.getElementById('todayReport').style.display == "none") {
                    document.getElementById('todayReport').style.display = "block";
                }
                else
                    document.getElementById('todayReport').style.display = "none";


                $('#table3').append("<thead><th>Username</th><th>Date</th><th>Arriving Time</th><th>Leaving Time</th><th>Late</th><th>Excuse</th><th>Late Times</th><th>Excuse Times</th><th>Attended/Absent</th></thead>");
                let date = new Date();
                attendanceDatadataArr.forEach(el => {
                    let tr = document.createElement('tr');
                    let td1 = document.createElement('td');
                    let td2 = document.createElement('td');
                    let td3 = document.createElement('td');
                    let td4 = document.createElement('td');
                    let td5 = document.createElement('td');
                    let td6 = document.createElement('td');
                    let td7 = document.createElement('td');
                    let td8 = document.createElement('td');
                    let td9 = document.createElement('td');

                    tr.appendChild(td1);
                    tr.appendChild(td9);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    tr.appendChild(td7);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td8);


                    el.info.forEach(e => {
                        td1.innerText = el.username;
                        td2.innerText = el.lateTimes;
                        td3.innerText = el.excuseTimes;
                        td9.innerText = formatDate(date);
                        if (e.date == formatDate(date)) {
                            td8.innerText = "Attended";
                            td4.innerText = e.arrive;
                            td5.innerText = e.out;
                            td6.innerText = e.late;
                            td7.innerText = e.excuse;
                        } else {
                            td8.innerText = "Absent";
                            td4.innerText = "-";
                            td5.innerText = "-";
                            td6.innerText = "-";
                            td7.innerText = "-";
                        }
                    })
                    document.getElementById('table3').appendChild(tr);
                })



            })

            /************************End of today report******************************************************************************* */



            /************************Start of specific day report*********************************************************************** */
            document.getElementById('specificDayReport').style.display = "none";
            navItems[3].addEventListener('click', function () {
                document.getElementById('rangeReport').style.display = "none"
                document.getElementById('pendingRequests').style.display = "none";
                document.getElementById('allEmployees').style.display = "none";
                document.getElementById('todayReport').style.display = "none";
                document.getElementById('employeeBrief').style.display = "none";
                document.getElementById('display3').style.display = "none";

                $(this).toggleClass('active');
                $("span:not(span:eq(5))").removeClass('active');

                if (document.getElementById('specificDayReport').style.display == "none") {
                    document.getElementById('specificDayReport').style.display = "block";
                }
                else
                    document.getElementById('specificDayReport').style.display = "none";



                document.getElementById('display2').addEventListener('click', function () {
                    document.getElementById('table5').innerHTML = "";
                    $('#table5').append("<thead><th>Username</th><th>Date</th><th>Arriving Time</th><th>Leaving Time</th><th>Late</th><th>Excuse</th><th>Late Times</th><th>Excuse Times</th><th>Attended/Absent</th></thead>");
                    let date = formatCalendar(document.getElementById('datepicker').value);
                    attendanceDatadataArr.forEach(el => {
                        let tr = document.createElement('tr');
                        let td1 = document.createElement('td');
                        let td2 = document.createElement('td');
                        let td3 = document.createElement('td');
                        let td4 = document.createElement('td');
                        let td5 = document.createElement('td');
                        let td6 = document.createElement('td');
                        let td7 = document.createElement('td');
                        let td8 = document.createElement('td');
                        let td9 = document.createElement('td');

                        tr.appendChild(td1);
                        tr.appendChild(td9);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td8);


                        for (let index = 1; index < el.info.length; index++) {
                            td1.innerText = el.username;
                            td2.innerText = el.lateTimes;
                            td3.innerText = el.excuseTimes;
                            td9.innerText = date;

                            if (el.info[index].date == date) {
                                td8.innerText = "Attended";
                                td4.innerText = el.info[index].arrive;
                                td5.innerText = el.info[index].out;
                                td6.innerText = el.info[index].late;
                                td7.innerText = el.info[index].excuse;
                                break;
                            } else {
                                td8.innerText = "Absent";
                                td4.innerText = "-";
                                td5.innerText = "-";
                                td6.innerText = "-";
                                td7.innerText = "-";
                            }
                        }

                        document.getElementById('table5').appendChild(tr);
                    })

                })



            })


            /*************************End of specific day report************************************************************************* */


            /**************************Start Employee Brief****************************************************************************** */
            document.getElementById('display3').style.display = "none";
            document.getElementById('employeeBrief').style.display = "none";
            let search = document.getElementById('search');

            navItems[5].addEventListener('click', function () {
                document.getElementById('allEmployees').style.display = "none";
                document.getElementById('todayReport').style.display = "none";
                document.getElementById('pendingRequests').style.display = "none";
                document.getElementById('specificDayReport').style.display = "none";
                document.getElementById('rangeReport').style.display = "none";

                $(this).toggleClass('active');
                $("span:not(span:eq(7))").removeClass('active');


                search.focus();
                if (document.getElementById('display3').style.display == "none")
                    document.getElementById('display3').style.display = "block";
                else
                    document.getElementById('display3').style.display = "none";

                if (document.getElementById('employeeBrief').style.display == "none") {
                    document.getElementById('employeeBrief').style.display = "block";
                }
                else
                    document.getElementById('employeeBrief').style.display = "none";
            })


            document.getElementById('display3').addEventListener('click', function () {
                let flag = 0;
                document.getElementById('table6').innerHTML = "";
                $('#table6').append("<thead><tr><th>Username</th><th>Password</th><th>Fullname</th><th>Address</th><th>E-mail</th><th>Age</th></tr></thead>")

                for (let index = 0; index < dataobj2.length; index++) {
                    if (dataobj2[index].username == search.value) {
                        flag = 1;
                        let tr = document.createElement('tr');
                        let td1 = document.createElement('td');
                        td1.innerText = dataobj2[index].username;
                        let td3 = document.createElement('td');
                        td3.innerText = dataobj2[index].password;
                        let td4 = document.createElement('td');
                        td4.innerText = dataobj2[index].fname + " " + dataobj2[index].lname;
                        let td5 = document.createElement('td');
                        td5.innerText = dataobj2[index].address;
                        let td6 = document.createElement('td');
                        td6.innerText = dataobj2[index].email;
                        let td7 = document.createElement('td');
                        td7.innerText = dataobj2[index].age;
                        tr.appendChild(td1);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
                        document.getElementById('table6').appendChild(tr);
                        break;
                    }
                }
                $('#table6').append("<thead><tr><th>Late Times</th><th>Excuse Times</th><th>Absent Times</th><th>Days Worked</th><th>Absent/Working Ratio</th><th>(Excuse&Late)/Working Ratio</th></tr></thead>")
                for (let index = 0; index < attendanceDatadataArr.length; index++) {
                    if (attendanceDatadataArr[index].userId == search.value) {
                        let tr = document.createElement('tr');
                        let td1 = document.createElement('td');
                        td1.innerText = attendanceDatadataArr[index].lateTimes;
                        let td3 = document.createElement('td');
                        td3.innerText = attendanceDatadataArr[index].excuseTimes;
                        let td4 = document.createElement('td');
                        td4.innerText = attendanceDatadataArr[index].absentTimes;
                        let td5 = document.createElement('td');
                        td5.innerText = attendanceDatadataArr[index].info.length - 1;
                        let td6 = document.createElement('td');
                        td6.innerText = ((attendanceDatadataArr[index].absentTimes) * (100) / (attendanceDatadataArr[index].info.length - 1)).toFixed(2) + "%";
                        let td7 = document.createElement('td');
                        td7.innerText = ((attendanceDatadataArr[index].lateTimes + attendanceDatadataArr[index].excuseTimes) * (100) / (attendanceDatadataArr[index].info.length - 1)).toFixed(2) + "%";
                        tr.appendChild(td1);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
                        document.getElementById('table6').appendChild(tr);
                        break;
                    }

                }

                if (!flag) {
                    let tr = document.createElement('tr');
                    let td = document.createElement('td');
                    td.colSpan = "6";
                    td.innerText = "There is no such a username in database, you can check your pending requests..";
                    tr.appendChild(td);
                    document.getElementById('table6').appendChild(tr);
                }

            })

            /**************************End Employee Brief********************************************************************************* */
        })();
        localStorage.setItem("admin","not authorized");
    } else {
        document.getElementsByTagName('body')[0].innerHTML = "<center>We can't find the page you want</center>";
    }
});

