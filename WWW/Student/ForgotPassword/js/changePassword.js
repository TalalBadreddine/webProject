const verificationCode = document.getElementById("codeLabel")
const verificationCodeSpan = document.getElementById("codeLabelSpan")

const password = document.getElementById("newPass")
const passwordSpan = document.getElementById("newPassSpan")

const confPassword = document.getElementById("confPass")
const confPasswordSpan = document.getElementById("confPassSpan")

const submitBtn = document.getElementById("confirmBtn")
var code 


verificationCode.addEventListener('keyup', function(){
    validateCode()
})

function validateCode(){
    if(verificationCode.value == ""){
        hide(verificationCodeSpan)
        return false
    }

    if(verificationCode.value != code && verificationCode.value != ""){
        show(verificationCodeSpan, "Code does not match")
    }else{
        show(verificationCodeSpan, "Code Match")
        verificationCodeSpan.style.color = "green"
        return true
    }
}

password.addEventListener('keyup', function(){
    if(password.value == ""){

        hide(passwordSpan)

    }else{

        validatePassword()

    }
})

confPassword.addEventListener('keyup', function(){
    repeatPassword()
})

function repeatPassword(){
    if(confPassword.value != password.value){
        show(confPasswordSpan,"passwords don't match")
        return false
    }else if(validatePassword()){
        show(confPasswordSpan,"Match")
        confPasswordSpan.style.color = "green"
        return true
    }else{
        confPasswordSpan.innerHTML = passwordSpan.innerHTML
        return false
    }

}

function validatePassword(){
    let passwordValue = password.value

    let capitalLetters = 0
    let smallCaseLetters = 0

    for(let i = 0; i < password.value.length; i++){

        // if(! charIsAlpha(passwordValue.charAt(i))) continue

        if(passwordValue.charAt(i) == passwordValue.charAt(i).toUpperCase()){
            capitalLetters += 1;
            continue
        }

        smallCaseLetters++;
    }
    
    if(passwordValue.length < 6){
        show(passwordSpan,"Password must be at least 6 characters")
        return false
    }

    if(capitalLetters == 0){
        show(passwordSpan,"Password must contains at least 1 capital letter")
        return false
    } 

    if(smallCaseLetters == 0){
        show(passwordSpan,"Password must contains at least 1 small letter")
        return false
    }

    show(passwordSpan, "Accepted")
    passwordSpan.style.color = "green"

    return true
}

function show(Dom,message){
    Dom.style.opacity = 1
    Dom.style.color = "red"
    Dom.innerHTML = message
}
function hide(Dom){
    Dom.style.opacity = 0
}

function submit(){
    if(validateCode() && validatePassword() && repeatPassword()){
       return true
    }

    return false
}

submitBtn.addEventListener('click',function(){
    // if(!submit)return
    $.ajax({
        url:'../php/changePassword.php',
        type:'POST',
        data:{
            newPassword: password.value
        },
        success:function(response){
            response = response.toLowerCase()
            if(response == "student" || response == "teacher" || response == "admin"){
                alert("Password has been reset")
                window.location.href = "../../Sign-In/Html/sign_up.html"
            }else{
                alert("User Not Found !")
            }
        }
    })
})

$(document).ready(function(){
    $.ajax({
        url:'../php/reveiceCode.php',
        success:function(response){
           code = response
        }
    })
})