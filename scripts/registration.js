import { Emp } from './empClass.js'

let allinputs = document.getElementsByTagName('input');
let alllabels = document.getElementsByTagName('label');
let warningSpan = document.getElementsByTagName('span')[0];
let login = document.getElementsByTagName('a')[0];
let role = "";
allinputs[0].focus();


/***************function to post new user in the registeration requests section in the database************* */
function newEmpInJson(uniqueUserName, uniquePassword, role) {
    $.post("http://localhost:3000/RegistrationRequests",
        {
            "username": uniqueUserName,
            "password": uniquePassword,
            "fname": allinputs[0].value.trim(),
            "lname": allinputs[1].value.trim(),
            "address": allinputs[2].value.trim(),
            "email": allinputs[3].value.trim(),
            "age": allinputs[4].value.trim(),
            "role": role
        });
}


/*******************functions to get rondam unique username and passwords*********************************** */
function GetUserName(text) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function GetPassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 12;
    let password = "";

    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}

/*************functoins for inputs and regex validations*************************************************** */
function stringIsMatch(name) {
    return ((/^[a-zA-Z\" \"]{3,15}$/).test(name.value.trim()));
}

function stringIsMail() {
    return ((/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/).test(allinputs[3].value));
}

function isEmpty(field, index) {
    return (field[index].value.trim() == "");
}



/***************function for the warning span which tell user the problem in which field*******************/
function warning(section, index) {
    section[index].value = "";
    section[index].focus();
    warningSpan.innerText = "Try a valid " + alllabels[index].innerText;
    warningSpan.style.padding = "0.5rem";
    warningSpan.style.marginTop = "1rem";
    warningSpan.style.display = "block";
}


/*****************function for telling user that he entered an e-mail already exists in database********* */
function repeatedEmail() {
    warningSpan.innerText = "The E-mail already exists, Try to login";
    warningSpan.style.padding = "0.5rem";
    warningSpan.style.marginTop = "1rem";
    warningSpan.style.display = "block";
}



/*********************clicking submit button*************************************************************** */
allinputs[7].addEventListener('click', function (e) {
    if (document.getElementById('Security').checked) {
        role = "Security"
    } else {
        role = "Employee"
    }
    if (!stringIsMatch(allinputs[0]) || isEmpty(allinputs, 0)) {
        e.preventDefault();
        warning(allinputs, 0);
    }
    else if (!stringIsMatch(allinputs[1]) || isEmpty(allinputs, 1)) {
        e.preventDefault();
        warning(allinputs, 1);
    }
    else if (!stringIsMatch(allinputs[2]) || isEmpty(allinputs, 2)) {
        e.preventDefault();
        warning(allinputs, 2);
    }
    else if (!stringIsMail()) {
        e.preventDefault();
        warning(allinputs, 3);
    }
    else if (allinputs[4].value == "" || allinputs[4].value < 20 || allinputs[4].value > 50) {
        e.preventDefault();
        warning(allinputs, 4);
    }
    else {
        e.preventDefault();
        init();
        async function init() {
            let fromEmp = await fetch(`http://localhost:3000/users?email=${allinputs[3].value}`);
            let fromEmpArr = await fromEmp.json();
            let fromReq = await fetch(`http://localhost:3000/RegistrationRequests?email=${allinputs[3].value}`);
            let fromReqArr = await fromReq.json();
            if (!fromEmpArr.length && !fromReqArr.length) {
                let uniqueUserName = GetUserName(allinputs[0].value.trim());
                let uniquePassword = GetPassword();
                newEmpInJson(uniqueUserName, uniquePassword, role);
                alert("Wait for Admin Confirmatoin");
                window.open("../pages/Home.html", "_blank");
                window.open("../pages/Registration.html", '_self').close();
            }
            else {
                allinputs[3].value = "";
                login.focus();
                repeatedEmail();
            }
        };
    }
})//end of submit click

