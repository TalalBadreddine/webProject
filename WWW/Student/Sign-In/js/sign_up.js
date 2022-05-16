const emailDom = document.getElementById("email")

document.getElementById("signInBtn").addEventListener('click', function(){
    checkCurrentUser(emailDom.value)
})

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