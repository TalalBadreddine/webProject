const confirmBtn = document.getElementById("confirm")
const email = document.getElementById("email")

confirmBtn.addEventListener('click',function(){

    $.ajax({
        url:'../php/confirmEmail.php',
        type:'POST',
        data:{
            email: email.value
        },
        success:function(response){
            if(response == "email is sent"){
                window.location.href = ('ChangePassword.html')
            }else{
                alert("Error Occurred please try again later")
            }
        }
    })
})