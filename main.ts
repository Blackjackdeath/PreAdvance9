interface IUser {
    login: string;
    password: string;
    email: string;
}
let loginRegExp: RegExp = /^[a-z]{4,16}$/i;
let emailRegExp: RegExp = /^[\w_\-\.]+@\w+\.\w+$/;
let passwordRegExp: RegExp = /^[\w_\-\.]{4,16}$/;
let boxError: unknown = document.querySelectorAll('.boxError');
let loginCheck: boolean = false;
let emailCheck: boolean = false;
let passwordCheck: boolean = false;
let editCheck: boolean = false;
let user: IUser = {
    login: '',
    password: '',
    email: ''
};
let arr: Array<IUser> = [];
let tableH: unknown = document.getElementsByTagName('tbody');
let index;
let loginBtn = document.querySelector('.boxLogin__button') as HTMLButtonElement;
let editBtn = document.querySelector('.boxLogin__edit') as HTMLButtonElement;
let loginInput = document.getElementById('login') as HTMLInputElement;
let passwordInput = document.getElementById('password') as HTMLInputElement;
let emailInput = document.getElementById('email') as HTMLInputElement;

//function CHECK

function checkInfo() {
    if (loginCheck && emailCheck && passwordCheck) {
        loginBtn.removeAttribute('disabled');
        loginBtn.classList.add('active');
        editBtn.removeAttribute('disabled');
        editBtn.classList.add('active');
    }
    else {
        loginBtn.setAttribute('disabled', 'true');
        loginBtn.classList.remove('active');
        editBtn.setAttribute('disabled', 'true');
        editBtn.classList.remove('active');
    }
}

// function RENDER

function render() {
    if (!tableH[0].innerHTML as unknown == '') {
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
    loginInput.style.borderColor = 'yellowgreen';
    passwordInput.style.borderColor = 'yellowgreen';
    emailInput.style.borderColor = 'yellowgreen';
    index = Number(this.parentElement.parentElement.children[0].textContent);
    loginInput.value = arr[index - 1].login;
    passwordInput.value = arr[index - 1].password;
    emailInput.value = arr[index - 1].email;
    editCheck = true;
    editBtn.removeAttribute('disabled');
    editBtn.classList.add('active');
    loginCheck = true;
    emailCheck = true;
    passwordCheck = true;
}

//function ADDUSER

function addUser() {
    user.login = loginInput.value;
    user.password = passwordInput.value;
    user.email = emailInput.value;
    arr.push(Object.assign({}, user));
    loginInput.value = '';
    passwordInput.value = '';
    emailInput.value = '';
    loginCheck = false;
    emailCheck = false;
    passwordCheck = false;
    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
    emailInput.style.borderColor = '';
    checkInfo();
    loginBtn.setAttribute('disabled', 'true');
    loginBtn.classList.remove('active');
    render();

}

// function SAVEEDITUSER
function saveEditUser() {
    user.login = loginInput.value;
    user.password = passwordInput.value;
    user.email = emailInput.value;
    loginInput.value = '';
    passwordInput.value = '';
    emailInput.value = '';
    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
    emailInput.style.borderColor = '';
    loginBtn.style.visibility = 'visible';
    editBtn.style.visibility = 'hidden';
    loginBtn.style.height = '50px';
    editBtn.style.height = '0px';
    loginBtn.setAttribute('disabled', 'true');
    loginBtn.classList.remove('active');
    arr.splice((index - 1), 0, Object.assign({}, user));
    render();
}

loginInput.oninput = function () {
    let test = loginRegExp.test(loginInput.value);
    if (test) {
        boxError[0].style.opacity = 0;
        loginInput.style.borderColor = 'yellowgreen';
        loginCheck = true;
        checkInfo();
    }
    else {
        if (loginInput.value == '') {
            boxError[0].style.opacity = 0;
            loginInput.style.borderColor = '';
        }
        else {
            boxError[0].style.opacity = 1;
            boxError[0].children[0].textContent = 'Please provid valid Login';
            loginInput.style.borderColor = 'red';
        }
        loginCheck = false;
        checkInfo();
    }
    if (editCheck) {
        arr.splice(index - 1, 1);
        editCheck = false;
    }
}

passwordInput.oninput = function () {
    let test = passwordRegExp.test(passwordInput.value);
    if (test) {
        boxError[1].style.opacity = 0;
        passwordInput.style.borderColor = 'yellowgreen';
        passwordCheck = true;
        checkInfo();
    }
    else {
        if (passwordInput.value == '') {
            boxError[1].style.opacity = 0;
            passwordInput.style.borderColor = '';
        }
        else {
            boxError[1].style.opacity = 1;
            boxError[1].children[0].textContent = 'Please provid valid password';
            passwordInput.style.borderColor = 'red';
        }
        passwordCheck = false;
        checkInfo();
    }
    if (editCheck) {
        arr.splice(index - 1, 1);
        editCheck = false;
    }
}
emailInput.oninput = function () {
    let test = emailRegExp.test(emailInput.value);
    if (test) {
        boxError[2].style.opacity = 0;
        emailInput.style.borderColor = 'yellowgreen';
        emailCheck = true;
        checkInfo();
    }
    else {
        if (emailInput.value == '') {
            boxError[2].style.opacity = 0;
            emailInput.style.borderColor = '';
        }
        else {
            boxError[2].style.opacity = 1;
            boxError[2].children[0].textContent = 'Please provid valid Email address';
            emailInput.style.borderColor = 'red';
        }
        emailCheck = false;
        checkInfo();
    }
    if (editCheck) {
        arr.splice(index - 1, 1);
        editCheck = false;
    }
}

loginBtn.addEventListener('click', addUser);
editBtn.addEventListener('click', saveEditUser);