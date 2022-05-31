const editBtn = document.getElementById("editBtn")
const editableLables = document.getElementsByClassName("canEdit")

const pass  = document.getElementById("passwordInput")
const passSpan = document.getElementById("passwordSpan")

const email = document.getElementById("emailInput")
const emailSpan = document.getElementById("emailSpan")

const phoneNumber = document.getElementById("phone")
const phoneNumberSpan = document.getElementById("phoneSpan")


let canEdit = false

editBtn.addEventListener('click', toggleEdit)

function toggleEdit(){
    canEdit = !canEdit
   
    if(canEdit){

        pass.type = "text"

        editBtn.style.backgroundColor = "green"
        editBtn.innerHTML = "Save"

        for(let i = 0; i < editableLables.length ; i++){
            let element = editableLables[i]
            element.readOnly = !canEdit
            element.style.border = "1px solid black"
        }

    }else{

        // validate

        if(!validatePassword() || !emailValidation() || !validatePhone() ){
            return
        }

        pass.type = "password"

        for(let i = 0; i < editableLables.length ; i++){
            let element = editableLables[i]
            element.readOnly = !canEdit
            element.style.border = "none"
            editBtn.style.backgroundColor = "#1da0f2"
            editBtn.innerHTML = "Edit"
        }

    }
}

// validate Password

function passwordIsGood(){
    passSpan.style.display = "none"
}

function validatePassword(){
    let passwordValue = pass.value.trim()

    if(passwordValue == ""){
        passSpan.style.display = "block"
        passSpan.innerHTML = "Password can't be empty"
        return false;
    }

    if(passwordValue.length < 6){
        passSpan.style.display = "block"
        passSpan.innerHTML = "Password must be at least 6 characters "
        return false;
    }

    let nbOfCapital = 0

    for(let i = 0 ; i < passwordValue.length ; i++){
        if(passwordValue[i].toUpperCase() == passwordValue[i]){
            nbOfCapital++;
        }
    }

    if(nbOfCapital < 1){
        passSpan.style.display = "block"
        passSpan.innerHTML = "Password must have at least 1 capital letter "
        return false;
    }

    passwordValue = passwordValue.trim()
    
    passwordIsGood()
    return true
}

// validate email

function emailIsGood(){
    emailSpan.style.display = "none"
}

function emailValidation(){

    let emailValue = email.value

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
    {
      emailIsGood()
      return true

    }else{

        emailSpan.style.display = "block"
        emailSpan.innerHTML = "Email not valid!"
        return false

    }
}

// validate Phone

function phoneNumberIsGood(){
    phoneNumberSpan.style.display = "none"
}

function validatePhone(){

    let phoneValue = phoneNumber.value


    let phoneno = /^\(?[+]?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/

    if(phoneno.test(phoneValue)){
        let dummyHelper = "" ;

        for(let i = 0 ; i < phoneValue.length; i++){
            if(phoneValue[i] != ' ' && phoneValue[i] != '-'  && phoneValue[i] != '+'){
                console.log(phoneValue[i])
                dummyHelper += phoneValue[i];
            }
        }

        phoneValue = dummyHelper

        let indexOfFirstOne = phoneValue.indexOf('1')
        phoneValue =  phoneValue.slice(0, indexOfFirstOne + 1) + ' ' + phoneValue.slice( indexOfFirstOne + 1, indexOfFirstOne + 3) + '-' + phoneValue.slice( indexOfFirstOne + 3 , indexOfFirstOne + 6) + '-' + phoneValue.slice( indexOfFirstOne + 6 , phoneValue.length)
        phoneNumber.value = '+' + phoneValue
        phoneNumberIsGood()
        return true

    }else{
        phoneNumberSpan.style.display = "block"
        phoneNumberSpan.innerHTML = "Not a valid lebanese number"
        return false
    }
}


function show(className){
    var arr = ["courses",  "AcadamicStats", "Payments", "Warnings"]
    
    for(var i = 0; i < arr.length ; i++){
        var element = document.getElementById(arr[i])

        if(arr[i] == className){
            element.style.display = "block";
            document.getElementById(arr[i] +'Nav').className = "nav-link active"
        }else{
            element.style.display = "none";
            document.getElementById(arr[i] +'Nav').className = "nav-link"
        }
       
    }
}

// Profile

$(document).ready(function(){
    $.ajax({
      url:'../php/manageProfilePhoto.php',
      type:'POST',
      success:function(response){
  
        document.getElementById('bigPP').innerHTML = `<img src='../../../../../../webProjectFiles/Teacher/${response}/personalPhoto.png' width='52px' height='50px' style="border-radius:50%">`
        document.getElementById('smallPP').innerHTML = `<img src='../../../../../../webProjectFiles/Teacher/${response}/personalPhoto.png' width='152px' height='146px' style="border-radius:50%" alt="user image" class="userImg">`
      }
  })
})