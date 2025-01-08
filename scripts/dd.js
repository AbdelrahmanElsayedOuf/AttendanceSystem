let allLis = document.getElementsByTagName('li');
let table1 = document.getElementsByTagName('table')[0];
let table2 = document.getElementsByTagName('table')[1];


function sendMail(uniqueUserName, uniquePassword, email) {
    let params = {
        from_name: "Abdelrahman Elsayed Ouf",
        username: `${uniqueUserName}`,
        password: `${uniquePassword}`,
        tomail: `${email}`
    }
    emailjs.send('default_service', 'template_dx2p3el', params)

}

$(function () {
    
    (async function init() {
        data = await fetch("http://localhost:3000/RegistrationRequests");
        dataobj = await data.json();
        dataobj.forEach((element) => {
            let tr = document.createElement('tr');
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
            let td8 = document.createElement('td');
            let img = document.createElement('img');
            img.src = "../images/confirm-icon.png";
            td8.appendChild(img)
            let td9 = document.createElement('td');
            let img2 = document.createElement('img');
            img2.src = "../images/delete.png";

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

            img3.addEventListener('click',function(e){
                let username = e.target.parentElement.parentElement.children[0].innerText;
                let password = e.target.parentElement.parentElement.children[1].innerText;
                let email = e.target.parentElement.parentElement.children[4].innerText;
                sendMail(username,password,email)
            })

            document.getElementsByTagName('table')[0].appendChild(tr)


            
            img.addEventListener('click', function (e) {
                element.id = "";
                $.post("http://localhost:3000/Employees", element);
                $.ajax({
                    url: `http://localhost:3000/RegistrationRequests?username=${e.target.parentElement.parentElement.children[0].innerText}`,
                    method: 'get',
                    success: function (e) {
                        let index = 0;
                        e.forEach(element => index = element.id);
                        fetch(`http://localhost:3000/RegistrationRequests/${index}`, {
                            method: 'DELETE',
                        })
                    }
                })
            })

            img2.addEventListener('click', function (e) {
                $.ajax({
                    url: `http://localhost:3000/RegistrationRequests?username=${e.target.parentElement.parentElement.children[0].innerText}`,
                    method: 'get',
                    success: function (e) {
                        let index = 0;
                        e.forEach(element => index = element.id);
                        fetch(`http://localhost:3000/RegistrationRequests/${index}`, {
                            method: 'DELETE',
                        })
                    }
                })
            })

        });
        allLis[1].addEventListener('click',function(){
            document.getElementsByTagName('table')[0].style.visibility="visible";
            document.getElementsByTagName('table')[1].style.visibility="hidden";
        })





        data = await fetch("http://localhost:3000/Employees");
        dataobj = await data.json();
        dataobj.forEach((element) => {
            let tr = document.createElement('tr');
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
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
            tr.appendChild(td6)
            tr.appendChild(td7)
            document.getElementsByTagName('table')[1].appendChild(tr)
        })
        allLis[0].addEventListener('click',function(){
            document.getElementsByTagName('table')[1].style.visibility="visible";
            document.getElementsByTagName('table')[0].style.visibility="hidden";
        })

    })();
})//end window load