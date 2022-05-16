// Add Links for Other Pages

$(".reportLi").on('click', function(){
    window.location.href = '../../report/html/report.html';
})

$(".managmentLi").on('click', function(){
    window.location.href = 'Managment.html';
})

$(".chatLi").on('click', function(){
    window.location.href = '../../chat/html/chat.html';
})

$(".applicationLi").on('click', function(){
    window.location.href = '../../Request/html/request.html';
})

$(".logOutLi").on('click', function(){
    window.location.href = '../../../Student/Sign-In/Html/sign_up.html'
})

// Managment

// Teacher and student

const teacherHeader = document.getElementById("teacherHeader")
const teacherRuler = document.getElementById("teacherRuler")

const studentHeader = document.getElementById("studentHeader")
const studentRuler = document.getElementById("studentRuler")

$('#teacherHeader').on('click', function(){
    let horizontalLine = document.getElementById("teacherRuler")

    resetTitle(studentHeader, studentRuler)

    horizontalLine.style.display = "block"
    horizontalLine.style.height = "13px"
    horizontalLine.style.backgroundColor = "#421453"
    horizontalLine.style.border = "1px solid black";
    horizontalLine.style.borderRadius = "7px 7px 7px 7px";

    this.style.color = "#421453"
    this.style.fontWeight = "bolder"

})

$('#studentHeader').on('click', function(){
    let horizontalLine = document.getElementById("studentRuler")

    resetTitle(teacherHeader, teacherRuler)

    horizontalLine.style.display = "block"
    horizontalLine.style.height = "13px"
    horizontalLine.style.backgroundColor = "#421453"
    horizontalLine.style.border = "1px solid black";
    horizontalLine.style.borderRadius = "7px 7px 7px 7px";

    this.style.color = "#421453"
    this.style.fontWeight = "bolder"

})

function resetTitle(header, ruler){

    header.style.color = "black"
    header.style.fontWeight = "normal"

    ruler.style.display = "none"
}

// deleting from table

//confarmation

const cancelBtn = document.getElementById("cancelButton")
const buttonsId = ["editBtn", "searchLable", "addNewUser", "select", "teacherHeader", "studentHeader"]


cancelBtn.addEventListener("click", function(){
    returnEverythingToNormal()
})


function returnEverythingToNormal(){
    buttonsId.forEach(element => {
        disableEnableElementWithId(element, false)
    });

    document.getElementsByTagName('body')[0].style.backgroundColor = "white"
    showPopUp('confirmDeleting', false)
}


function disableEnableElementWithId(Id, boolArg){
    document.getElementById(Id).disabled = boolArg
}


//   document.getElementsByTagName('body')[0].backgroundColor = "rgba(128, 128, 128, 0.256);"

function showPopUp(Id, boolArg){

    let wantToDisplay = boolArg == true ? "block" : "none"
    document.getElementById(Id).style.display = wantToDisplay

}

// show  confirmation

$('.deleteClass').on('click', function(e){

    showPopUp('confirmDeleting', true)

    buttonsId.forEach(element => {
        disableEnableElementWithId(element, true)
    });

    document.getElementsByTagName('body')[0].style.backgroundColor = "rgba(128, 128, 128, 0.256)"

    let idToDelete = 'row' + ' ' + (this.id).split(" ")[1]

    $("#deleteButton").on('click', function(){
        returnEverythingToNormal()
        showPopUp(idToDelete, false)
    })
    
})

$('#addNewUser').on('click', function(){
    showPopUp('userToBeAdded', true)
})


$('.exitButton').on('click', function(){
    showPopUp('userToBeAdded', false)
})

// validation 

const fn = document.getElementById("firstName")
const fnSpan = document.getElementById("firstNameSpan")

const ln = document.getElementById("lastName")
const lnSpan = document.getElementById("lastNameSpan")

const email = document.getElementById("email")
const emailSpan = document.getElementById("emailSpan")

const password = document.getElementById("password")
const passwordSpan = document.getElementById("passwordSpan")

const phoneNumber = document.getElementById("phoneNumber")
const phoneNumberSpan = document.getElementById("phoneNumberSpan")

const major = document.getElementById('major')
const majorSpan = document.getElementById('majorSpan')


function validateMajor(){
    let value = major.value

    if(value.length == 0){
        major.style.border = "1px solid red"
        majorSpan.innerHTML = "major cannot be empty"
        majorSpan.style.visibility = "visible"
        return false
    }

    return true
}

function validateName(domObject, domSpan){
    let value = domObject.value

    if(value.length == 0){
        domObject.style.border = "1px solid red"
        domSpan.innerHTML = "Name cannot be empty"
        domSpan.style.visibility = "visible"
        return false
    }

    for(let i = 0 ; i < value.length ; i++){
        if(!charIsAlpha(value[i])){
            domObject.style.border = "1px solid red"
            domSpan.innerHTML = "Name cannot containse numbers"
            domSpan.style.visibility = "visible"
            return false
        }
    }

    return true
}

function validateEmail(){
    let emailValue = email.value

    if(!emailValue.includes('@') || !emailValue.includes('.')){
        emailSpan.innerHTML = "Please enter a valid email"
        emailSpan.style.visibility = "visible"
        return false;
    }
    return true
}

function validatePhoneNumber(){
    let phoneValue = phoneNumber.value
    let numbers = ['1','2','3','4','5','6','7','8','9','0']

    if(phoneValue.length == 0){
        phoneNumberSpan.innerHTML = "phone number cannot be empty"
        phoneNumberSpan.style.visibility = "visible"
        return false
    }

    if(phoneValue.length < 6){
        phoneNumberSpan.innerHTML = "phone number too short"
        phoneNumberSpan.style.visibility = "visible"
        return false
    }

    if(phoneValue.length > 9){
        phoneNumberSpan.innerHTML = "phone number too long"
        phoneNumberSpan.style.visibility = "visible"
        return false
    }

    for(let i = 0 ; i < phoneValue.length ; i++){
        if(!numbers.includes(phoneValue[i])){
            phoneNumberSpan.innerHTML = "phone number must only contain digits"
            phoneNumberSpan.style.visibility = "visible"
            return false;
        }
    }
    return true
}

function validatePassword(){
    let passwordValue = password.value.trim()

    let nbOfCapital = 0;

    if(passwordValue.length == 0){
        passwordSpan.innerHTML = "Password can't be empty"
        passwordSpan.style.visibility = "visible"
        return false
    }

    if(passwordValue.length < 6){
        passwordSpan.innerHTML = "Password too short, must be 6 characters"
        passwordSpan.style.visibility = "visible"
        return false;
    }

    for(let i = 0 ; i < passwordValue.length ; i++){

        if(passwordValue[i].toUpperCase() == passwordValue[i]){
            nbOfCapital++;
        }
    }

    if(nbOfCapital < 1){
        passwordSpan.innerHTML = "Password must contains at least 1 capital letter"
        passwordSpan.style.visibility = "visible"
        return false
    }
    return true
}

function resetMajor(){
    major.style.border = "0.2px solid rgba(0, 0, 0, 0.298)";
    majorSpan.style.visibility = "hidden"
}

function resetEmail(){
    email.style.border = "0.2px solid rgba(0, 0, 0, 0.298)";
    emailSpan.style.visibility = "hidden"
}

function resetFirstNameField(){
    fn.style.border = "0.2px solid rgba(0, 0, 0, 0.298)";
    fnSpan.style.visibility = "hidden"
}

function resetLastNameField(){
    ln.style.border = "0.2px solid rgba(0, 0, 0, 0.298)";
    lnSpan.style.visibility = "hidden"
}

function charIsAlpha(p2) {
    let asciiCode = p2.charCodeAt(0)
      return (asciiCode >= 65 && asciiCode <=90 ) || (asciiCode <= 120 && asciiCode >= 97)
}

function resetPhoneNumber(){
    phoneNumber.style.border = "0.2px solid rgba(0, 0, 0, 0.298)";
    phoneNumberSpan.style.visibility = "hidden"
}

function resetPassword(){
    password.style.border = "0.2px solid rgba(0, 0, 0, 0.298)";
    passwordSpan.style.visibility = "hidden"
}


$('.addUserBtn').on('click', function(){
    validateAll()
})


function validateAll(){

    if(validateName(fn, fnSpan) && validateName(ln, lnSpan) && validateMajor() && validatePhoneNumber() && validateEmail() && validatePassword() ){
       
        addtoTable(currentCount*currentCount+currentCount , fn.value + " " + ln.value, 'Nabatieh',major.value)

        showPopUp("userToBeAdded", false)
    }
}

// adding to able after validation

const usersTable = document.getElementById("tableOfUsers")

var currentCount = 8

function addtoTable(Id, Name, faculty, major ){
    usersTable.readOnly = false
    usersTable.innerHTML += `<tr id=${currentCount}><td>${Id}</td><td>${Name}</td><td>${faculty}</td><td>${major}</td><td><i id="icon ${currentCount}" class="deleteClass fa-solid fa-circle-minus fa-2x"
    style="color:red ;"></i></td></tr>`
    currentCount++;

    showPopUp('userToBeAdded', false)

    // refresh
    // for (let i = 0; i < currentCount; i++) {

    //     let element = document.getElementById(`icon ${i}`)
    //     console.log(element)
    //   if(typeof(element) != "undefined" || element !== null){

    //     element.addEventListener('click', function() {
    //         showPopUp('userToBeAdded', true)
    //     });
    //   }
    // }

    // currentCount++;
}

