window.addEventListener('load', function () {
    let input = this.document.getElementsByTagName('input')[0];
    let anchor = this.document.getElementsByTagName('a')[0];

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



    async function isInEmployees(date) {
        let emp = await fetch(`http://localhost:3000/Employees?username=${input.value}`);
        let empObj = await emp.json();
        if (empObj.length) {
            isHere(date)
        }
        else{
            alert("not exist");
        }

    };

    async function logAttendance(date) {
        await fetch(`http://localhost:3000/Attendance`, {
            method: "POST",
            body: JSON.stringify({
                id: "",
                username: `${input.value}`,
                date: `${formatDate(date)}`,
                in: `${formatTime(date)}`
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
    }


    async function isHere(date) {
        let checkData = await fetch(`http://localhost:3000/Attendance?username=${input.value}&date=${formatDate(date)}`);
        let checkDataObj = await checkData.json();
        alert(checkDataObj);
        if (checkDataObj.length) {
            if (checkDataObj[0].out) {
                alert('Already left')
            } else {
                await fetch(`http://localhost:3000/Attendance/${checkDataObj[0].id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ out: `${formatTime(date)}` }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
            }
        }
        else {
            logAttendance(date);
        }
    }


    anchor.addEventListener('click', function () {
        let date = new Date()
        isInEmployees(date);
    })
})