const fn = document.getElementById("firstName")
const fnSpan = document.getElementById("firstNameSpan")

const ln = document.getElementById("lastName")
const lnSpan = document.getElementById("lastNameSpan")

const middleName = document.getElementById("middleName")

const email = document.getElementById("email")
const emailSpan = document.getElementById("emailSpan")

const password = document.getElementById("password")
const passwordSpan = document.getElementById("passwordSpan")

const confirmPassword = document.getElementById("confirmPassword")
const confirmPasswordSpan = document.getElementById("confirmPasswordSpan")

const university = document.getElementById("university")
const universitySpan = document.getElementById("universitySpan")

const program = document.getElementById("program")
const programSpan = document.getElementById("programSpan")

const form = document.getElementsByTagName("form")

const listOfUniversities = document.getElementById("university")

var randomEmailCode = ""

let codeToSendToEmail = 0

// document.getElementById("submitButton").addEventListener("click", validate)

fn.addEventListener("click", resetFirstNameField)
ln.addEventListener("click", resetLastNameField)

password.addEventListener("click", resetPasswordField)
confirmPassword.addEventListener("click", resetPasswordField)

email.addEventListener("click", resetEmail)


/* Passowrd */

function validatePassword(){
    let passwordValue = password.value
    let passwordConfirmationValue = confirmPassword.value

    let capitalLetters = 0
    let smallCaseLetters = 0

    let notesToDisplay = []

    for(let i = 0; i < password.value.length; i++){

        if(! charIsAlpha(passwordValue.charAt(i))) continue

        if(passwordValue.charAt(i) == passwordValue.charAt(i).toUpperCase()){
            capitalLetters++;
            continue
        }

        smallCaseLetters++;
    }
    
    if(passwordValue.length < 6){
        notesToDisplay.push("Password must be at least 6 characters")
        passwordSpan.innerHTML = notesToDisplay[0]
        password.style.border = "1px solid red"
        password.id += "Active"
        return false
    }

    if(capitalLetters == 0){
        notesToDisplay.push("Password must contains at least 1 capital letter")
        passwordSpan.innerHTML = notesToDisplay[0]
        password.style.border = "1px solid red"
        password.id += "Active"
        return false
    } 

    if(smallCaseLetters == 0){
        notesToDisplay.push("Password must contains at least 1 small letter")
        passwordSpan.innerHTML = notesToDisplay[0]
        password.style.border = "1px solid red"
        password.id += "Active"
        return false
    }

    if(passwordConfirmationValue != passwordValue){
        confirmPasswordSpan.innerHTML = "Passwords doesn't match"
        confirmPassword.style.border = "1px solid red"
        confirmPassword.id += "Active"
        return false
    }
    return true
}

function resetPasswordField(){

    password.id = "password"
    confirmPassword.id = "confirmPassword"

    password.style.border = "1px solid rgba(0, 0, 0, 0.2)"
    confirmPassword.style.border = "1px solid rgba(0, 0, 0, 0.2)"

    passwordSpan.innerHTML = ""
    confirmPasswordSpan.innerHTML = ""
}

/* First Name */

function validateFirstName(){
    let firstNameValue = fn.value
    let notesToDisplay = []


    if(firstNameValue.length == 0){
        notesToDisplay.push("First name missing")
        fnSpan.innerHTML = notesToDisplay[0]
        fn.style.border = "1px solid red"
        fn.id += "Active"
        return false
    }

    for(let i = 0 ; i < firstNameValue.length ; i++){
        
        if(! charIsAlpha(firstNameValue.charAt(i)) ){
            notesToDisplay.push("First name must only consist letters")
            fnSpan.innerHTML = notesToDisplay[0]
            fn.style.border = "1px solid red"
            fn.id += "Active"
            return false
        }
    }
    return true
}

function resetFirstNameField(){
    fn.style.border = "1px solid rgba(0, 0, 0, 0.2)"
    fn.id = "firstName"
    fnSpan.innerHTML = ""
}

/* Last Name */

function validateLastName(){
    let lastNameValue = ln.value
    let notesToDisplay = []

    if(lastNameValue.length == 0){
        notesToDisplay.push("Last name missing")
        lnSpan.innerHTML = notesToDisplay[0]
        ln.style.border = "1px solid red"
        ln.id += "Active"
        return false
    }

    for(let i = 0 ; i < lastNameValue.length ; i++){
        
        if(! charIsAlpha(lastNameValue.charAt(i)) ){
            notesToDisplay.push("Last name must only consist letters")
            lnSpan.innerHTML = notesToDisplay[0]
            ln.style.border = "1px solid red"
            ln.id += "Active"
            return false
        }
    }
    return true
}

function resetLastNameField(){
    ln.style.border = "1px solid rgba(0, 0, 0, 0.2)"
    ln.id = "lastName"
    lnSpan.innerHTML = ""
}

/* Email */

function validateEmail(){
    let emailValue = email.value
    let notesToDisplay = []

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
    {
      return (true)
    }else{

        notesToDisplay.push("Please enter a valid email")
        emailSpan.innerHTML = notesToDisplay[0]
        email.style.border = "1px solid red"
        email.id += "Active"

        return false
    }
    
}

function resetEmail(){
    email.style.border = "1px solid rgba(0, 0, 0, 0.2)"
    email.id = "email"
    emailSpan.innerHTML = ""
}

function validate(){
    // sendEmail()
    generateRandomEmailCode()
    if(validateFirstName() && validateLastName() && validatePassword() && validateEmail()){

        $.ajax({
            url:"../php/studentInfoPart1.php",
            type: 'POST',
            async:false,
            data:{
                firstName: fn.value,
                lastName: ln.value,
                middleName: middleName.value,
                password: password.value,
                email: email.value,
                university: university.value,
                program: program.value
            }
        })

        return true;
    }
    return false
}

function generateRandomEmailCode(){
    let codeLength = 12;
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for(let i = 0 ; i < codeLength; i++){
        let randomNumber = Math.floor(Math.random() * chars.length);
        randomEmailCode += chars.charAt(randomNumber)
    }
}

function charIsAlpha(p2) {
    let asciiCode = p2.charCodeAt(0)
      return (asciiCode >= 65 && asciiCode <=90 ) || (asciiCode <= 120 && asciiCode >= 97)
}

function addUniversity(uniName){
    listOfUniversities.innerHTML += `<option>${uniName}</option>`
    
}

function  addMajor(majorName){
    program.innerHTML += `<option>${majorName}</option>`;
}

// Ajax Connecting to PHP;

university.addEventListener("change", function(){
     $.ajax({
         url:'../php/getUniversityMajors.php',
         type: 'POST',
         data:{
            universityName: university.value
         },
         success:function(result){
            let data = JSON.parse(result)
            program.innerHTML = `<option selected disabled value="">Choose...</option> `
            for(let i = 0 ; i < data.length; i++){
                addMajor(data[i]);
            }
         }
     })
})

$(document).ready(function(){

    $.ajax({
        url:'../php/getUniversity.php',
        type: 'POST',
        success : function (result) {
            let data = JSON.parse(result);
            for(let i = 0 ; i < data.length ; i++){
                addUniversity(data[i].UniversityName)
            }
         },
         error : function () {
            console.log ('error could not load universities in js');
         }
    })

})
