let loginRegExp = /^[a-z]{4,16}$/i;
let emailRegExp = /^[\w_\-\.]+@\w+\.\w+$/;
let passwordRegExp = /^[\w_\-\.]{4,16}$/;
let boxError = document.querySelectorAll('.boxError');
let loginCheck = false;
let emailCheck = false;
let passwordCheck = false;
let editCheck = false;
let user = {};
let arr = [];
let tableH = document.getElementsByTagName('tbody');
let index;
let loginBtn = document.querySelector('.boxLogin__button');
let editBtn = document.querySelector('.boxLogin__edit')

//function CHECK

function checkInfo() {
    if (loginCheck & emailCheck & passwordCheck) {
        loginBtn.removeAttribute('disabled');
        loginBtn.classList.add('active');
        editBtn.removeAttribute('disabled');
        editBtn.classList.add('active');
    }
    else {
        loginBtn.setAttribute('disabled', true);
        loginBtn.classList.remove('active');
        editBtn.setAttribute('disabled', true);
        editBtn.classList.remove('active');
    }
}

// function RENDER

function render() {
    if (!tableH[0].innerHTML == '') {
        tableH[0].innerHTML = '';
    }
    for (let i = 0; i < arr.length; i++) {
        let row = tableH[0].insertRow();
        let cell = row.insertCell();

        cell.classList.add('box__dNumber');
        cell.textContent = i + 1;
        cell = row.insertCell();

        cell.classList.add('box__dLogin');
        cell.textContent = arr[i].login;
        cell = row.insertCell();

        cell.classList.add('box__dPassword');
        cell.textContent = arr[i].password;
        cell = row.insertCell();

        cell.classList.add('box__dEmail');
        cell.textContent = arr[i].email;
        cell = row.insertCell();

        cell.classList.add('box__dEdit');
        let editB = document.createElement("button");
        editB.textContent = 'Edit';
        editB.classList.add('editButton');
        editB.addEventListener('click', editUser);
        cell.appendChild(editB);
        cell = row.insertCell();

        cell.classList.add('box__dDelete');
        let deleteB = document.createElement("button");
        deleteB.textContent = 'Delete';
        deleteB.classList.add('deleteButton');
        deleteB.addEventListener('click', deleteUser);
        cell.appendChild(deleteB);
    }
}

//function DELETE

function deleteUser() {
    index = Number(this.parentElement.parentElement.children[0].textContent);
    arr.splice(index - 1, 1);
    render();
}
//function EDIT

function editUser() {
    loginBtn.style.visibility = 'hidden';
    editBtn.style.visibility = 'visible';
    loginBtn.style.height = '0px';
    editBtn.style.height = '50px';
    document.getElementById('login').style.borderColor = 'yellowgreen';
    document.getElementById('password').style.borderColor = 'yellowgreen';
    document.getElementById('email').style.borderColor = 'yellowgreen';
    index = Number(this.parentElement.parentElement.children[0].textContent);
    document.getElementById('login').value = arr[index - 1].login;
    document.getElementById('password').value = arr[index - 1].password;
    document.getElementById('email').value = arr[index - 1].email;
    editCheck=true;
    editBtn.removeAttribute('disabled');
    editBtn.classList.add('active');
    loginCheck = true;
    emailCheck = true;
    passwordCheck = true;
    //arr.splice(index - 1, 1);
}

//function ADDUSER

function addUser() {
    user.login = document.getElementById('login').value;
    user.password = document.getElementById('password').value;
    user.email = document.getElementById('email').value;
    arr.push(Object.assign({}, user));
    document.getElementById('login').value = '';
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';
    loginCheck = false;
    emailCheck = false;
    passwordCheck = false;
    document.getElementById('login').style.borderColor = '';
    document.getElementById('password').style.borderColor = '';
    document.getElementById('email').style.borderColor = '';
    checkInfo();
    loginBtn.setAttribute('disabled', true);
    loginBtn.classList.remove('active');
    render();

}

// function SAVEEDITUSER
function saveEditUser() {
    user.login = document.getElementById('login').value;
    user.password = document.getElementById('password').value;
    user.email = document.getElementById('email').value;
    document.getElementById('login').value = '';
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';
    document.getElementById('login').style.borderColor = '';
    document.getElementById('password').style.borderColor = '';
    document.getElementById('email').style.borderColor = '';
    loginBtn.style.visibility = 'visible';
    editBtn.style.visibility = 'hidden';
    loginBtn.style.height = '50px';
    editBtn.style.height = '0px';
    loginBtn.setAttribute('disabled', true);
    loginBtn.classList.remove('active');
    arr.splice((index - 1), 0, Object.assign({}, user));
    render();
}

document.getElementById('login').oninput = function () {
    let test = loginRegExp.test(this.value);
    if (test) {
        boxError[0].style.opacity = 0;
        this.style.borderColor = 'yellowgreen';
        loginCheck = true;
        checkInfo();
    }
    else {
        if (this.value == '') {
            boxError[0].style.opacity = 0;
            this.style.borderColor = '';
        }
        else {
            boxError[0].style.opacity = 1;
            boxError[0].children[0].textContent = 'Please provid valid Login';
            this.style.borderColor = 'red';
        }
        loginCheck = false;
        checkInfo();
    }
    if (editCheck) {
        arr.splice(index - 1, 1);
        editCheck=false;
    }
}

document.getElementById('password').oninput = function () {
    let test = passwordRegExp.test(this.value);
    if (test) {
        boxError[1].style.opacity = 0;
        this.style.borderColor = 'yellowgreen';
        passwordCheck = true;
        checkInfo();
    }
    else {
        if (this.value == '') {
            boxError[1].style.opacity = 0;
            this.style.borderColor = '';
        }
        else {
            boxError[1].style.opacity = 1;
            boxError[1].children[0].textContent = 'Please provid valid password';
            this.style.borderColor = 'red';
        }
        passwordCheck = false;
        checkInfo();
    }
    if (editCheck) {
        arr.splice(index - 1, 1);
        editCheck=false;
    }
}
document.getElementById('email').oninput = function () {
    let test = emailRegExp.test(this.value);
    if (test) {
        boxError[2].style.opacity = 0;
        this.style.borderColor = 'yellowgreen';
        emailCheck = true;
        checkInfo();
    }
    else {
        if (this.value == '') {
            boxError[2].style.opacity = 0;
            this.style.borderColor = '';
        }
        else {
            boxError[2].style.opacity = 1;
            boxError[2].children[0].textContent = 'Please provid valid Email address';
            this.style.borderColor = 'red';
        }
        emailCheck = false;
        checkInfo();
    }
    if (editCheck) {
        arr.splice(index - 1, 1);
        editCheck=false;
    }
}

loginBtn.addEventListener('click', addUser);
editBtn.addEventListener('click', saveEditUser);