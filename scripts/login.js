window.addEventListener('load', function () {
    let username = this.document.getElementsByTagName('input')[0];
    let password = this.document.getElementsByTagName('input')[1];
    let login = this.document.getElementsByTagName('input')[2];
    let warning = this.document.getElementById('warning');
    let registerQuestion = this.document.getElementById('register');
    let signupButton = this.document.getElementById('signup');

    function emptySection (element, message){
        warning.innerHTML = "<i class=\"fa-solid fa-circle-xmark\"></i>"+"Enter The" +message+ "First";
        element.style.padding = "7px";
    }
    function wrongData (element){
        warning.innerHTML = "<i class=\"fa-solid fa-circle-xmark\"></i>"+"There is no match with our database";
        element.style.padding = "8px";
    }

    async function isInTeam() {
        let emp = await fetch(`http://localhost:3000/users?username=${username.value.trim()}&password=${password.value}&role=Employee`);
        let empArr = await emp.json();
        if (empArr.length) {
            localStorage.setItem("empData", JSON.stringify(empArr));
            localStorage.setItem("avatar","http://127.0.0.1:5500/images/male.jpg");
            localStorage.setItem("emp","authorized");
            window.open("../pages/Profile.html", "_self")
        } else {
            let sec = await fetch(`http://localhost:3000/users?username=${username.value.trim()}&password=${password.value}&role=Security`);
            let secArr = await sec.json();
            if (secArr.length) {
                localStorage.setItem("security","authorized");
                window.open("../pages/Attendance.html", "_self")
            } else {
                let admin = await fetch(`http://localhost:3000/Admin?username=${username.value.trim()}&password=${password.value}`);
                let adminArr = await admin.json();
                if (adminArr.length) {
                    localStorage.setItem("admin","authorized");
                    window.open("../pages/Admin.html", "_self")
                } else {
                    wrongData(warning)
                }
            }
        }
    }

    login.addEventListener('click', function () {
        if (username.value.trim() == ""){
            ;
            emptySection(warning," Username ");
        }
        else if (password.value == ""){
            warning.innerText = "Enter The Password First";
            emptySection(warning, " Password ");
        }
        else
            isInTeam();
    })


    registerQuestion.addEventListener('click',function(){
        signupButton.focus()
    })
})




