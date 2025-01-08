function formatDate(date) {
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
}
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}



window.addEventListener('load', function () {
    if (localStorage.getItem('security') == 'authorized') {
        let input = this.document.getElementsByTagName('input')[0];
        let messageSpan = this.document.getElementById('message');




        this.document.getElementsByTagName('a')[0].addEventListener('click', function () {
            if (input.value.trim() == "") {
                input.focus();
                messageSpan.innerText = "Enter The Username First";
            } else {
                isWithUs();
            }
        })


        async function isHere() {
            let checkData = await fetch(`http://localhost:3000/attendances?username=${input.value}`);
            let checkDataArr = await checkData.json();
            let datechecked = new Date();
            let newInfo = checkDataArr[0].info;
            console.log(checkDataArr[0].info[checkDataArr[0].info.length - 1].date)
            if (checkDataArr[0].info[checkDataArr[0].info.length - 1].date == formatDate(datechecked) && checkDataArr[0].info[checkDataArr[0].info.length - 1].arrive !== "") {
                if (checkDataArr[0].info[checkDataArr[0].info.length - 1].out == "not left yet") {
                    localStorage.setItem("security", "authorized");
                    let date;
                    let arrive;
                    let late;
                    ({ date, arrive, late } = checkDataArr[0].info[checkDataArr[0].info.length - 1])
                    let arr = `${formatTime(datechecked)}`.split(" ")[0].split(":");
                    let hours = 3 - arr[0];
                    if (hours < 0) { hours += 12 };
                    let minutes = 30 - arr[1];
                    if (minutes < 0) { minutes += 60; hours-- };
                    let excuseIncrement = checkDataArr[0].excuseTimes;
                    if (hours > 0 || (hours == 0 && minutes > 0) || h == 3 || `${formatTime(datechecked)}`.split(" ")[1] == "am") {
                        excuseIncrement++;
                    }
                    newInfo[newInfo.length - 1] = { date: date, arrive: arrive, late: late, out: `${formatTime(datechecked)}`, excuse: `${hours} hours, ${minutes} minutes` }
                    fetch(`http://localhost:3000/attendances/${input.value}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            info: newInfo,
                            excuseTimes: excuseIncrement
                        }),
                        headers: { "Content-type": "application/json; charset=UTF-8" }
                    })
                    messageSpan.innerText = "Leaving Time stored";
                } else {
                    messageSpan.innerText = "This Employee has already left"
                }
            } else {
                localStorage.setItem("security", "authorized");
                messageSpan.innerText = "Arriving Time stored";
                let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
                let arr = `${formatTime(datechecked)}`.split(" ")[0].split(":");
                let hours = arr[0] - 8;
                if (hours < 0) { hours += 12 };
                let minutes = arr[1] - 30;
                if (minutes < 0) { minutes += 60; hours-- };
                let lateIncrement = checkDataArr[0].lateTimes;
                let absentIncrement = checkDataArr[0].absentTimes;
                if (hours > 0 || minutes > 10) {
                    lateIncrement++;
                }
                if (yesterday.getDay() != 5 && checkDataArr[0].info[checkDataArr[0].info.length - 1].date != formatDate(yesterday)) {
                    absentIncrement++;
                }
                let newDay = { date: `${formatDate(datechecked)}`, arrive: `${formatTime(datechecked)}`, out: "not left yet", late: `${hours} hours, ${minutes} minutes` };
                newInfo.push(newDay);
                fetch(`http://localhost:3000/attendances/${input.value}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        info: newInfo,
                        lateTimes: lateIncrement,
                        absentTimes: absentIncrement
                    }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
            }
        };


        async function isWithUs() {
            let emp = await fetch(`http://localhost:3000/users?username=${input.value}`)
            let empArr = await emp.json()
            if (empArr.length == 0) {
                messageSpan.innerText = "The Username does not exist"
            }
            else {
                isHere()
            }
        }
        localStorage.setItem("security", "not authorized");
    } else {
        document.getElementsByTagName('body')[0].innerHTML = "<center style=\"color:black\">We can't find the page you want</center>";
    }
})

