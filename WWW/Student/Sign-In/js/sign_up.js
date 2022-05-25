const emailDom = document.getElementById("email")
const password = document.getElementById("password")
const popUp = document.getElementById("hiddenDiv")
const popUpBody = document.getElementById("popUpBody")
const popUpBtn = document.getElementById("popUpBtn")

document.getElementById("signInBtn").addEventListener('click', function(){
    // checkCurrentUser(emailDom.value)
    if(validate()){
        $.ajax({
            url:'../php/manageRegister.php',
            type:'POST',
            data:{
                email: emailDom.value,
                password: password.value
            },
            success:function(response){
                 response = response.toLowerCase()
    
                if(response == "student"){
                    window.location.href = "../../../Student/Courses/html/courses_student_page.html"
                    return
                }
    
                if(response == "admin"){
                    window.location.href = "../../../Admin/Managment/Html/Managment.html"
                    return
                }
            
                if(response == "teacher"){
                    window.location.href = "../../../Teacher/Courses/html/courses_student_page.html"
                    return
                }
            
                if(response == "superAdmin"){
                    window.location.href = "../../../Super-Admin/Admins/index.html"
                    return
                }
    
                showPopUpWithMessage("The information you entered does not match our records. please try again")
            }
        })
    }

})

popUpBtn.addEventListener('click', function(){
  hidePopUp()
})

function showPopUpWithMessage(message){
    popUpBody.innerHTML = message
    popUp.style.opacity = 1
    popUp.style.zIndex = 33
}

function hidePopUp(){
    popUp.style.opacity = 0
    popUp.style.zIndex = -1
}

function validate(){
    if(emailDom.value.length == 0){
        showPopUpWithMessage("Can't Sign in with a empty email Adress")
        return false
    }

    if(password.value.length == 0){
        showPopUpWithMessage("Password Field is Empty!")
        return false
    }
    return true
}

function popUpAlert(){

}

function checkCurrentUser(email){

    if(email.includes("admin")){
        window.location.href = "../../../Admin/Managment/Html/Managment.html"
        return
    }

    if(email.includes('student')){
        window.location.href = "../../../Student/Courses/html/courses_student_page.html"
        return
    }

    if(email.includes('teacher')){
        window.location.href = "../../../Teacher/Courses/html/courses_student_page.html"
        return
    }

    if(email.includes('superAdmin')){
        window.location.href = "../../../Super-Admin/Admins/index.html"
    }
}