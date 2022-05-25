const emailLabel = document.getElementById("codeForEmail")
const submitBtn = document.getElementById("submitBtn")
const emailSpan = document.getElementById("emailHelp")

function goBigger(bigger, smaller){
    var getBigger = document.getElementById(bigger)
    var getSmaller = document.getElementById(smaller)

    // var toShow = document.getElementById(bigger+'Body')
    // var toHide = document.getElementById(smaller+'Body')

    // toShow.style.visibility = "visible"
    // toHide.style.visibility = "hidden"
    getBigger.style.width = "80%"
    getSmaller.style.width = "20%"
}

function reset() {
    document.getElementById("blueArea").style.width = "60%"
    document.getElementById("blackArea").style.width = "40%"
}

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 200;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // add css
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    css.style.color = "white"
    document.body.appendChild(css);
};

function showEmailError(message){
    emailHelp.style.display = "block"
    emailHelp.innerHTML = message
    emailHelp.style.color = "red"
}

emailLabel.addEventListener('keyup', function(){
    if(emailLabel.value == ""){
        emailHelp.style.display = "block"
        emailHelp.innerHTML = "Don't share the code with anyone"
        emailHelp.style.color = "gray"
    }else{
        emailHelp.style.display = "none"

    }
})

submitBtn.addEventListener('click', function(){
    let emailCode = emailLabel.value.trim()
    
    $.ajax({
        url:"../php/validateAndCreateUser.php",
        type: 'POST',
        data:{
            emailCode: emailCode
        },
        success:function(response){

            console.log(response)

            if(response == "exist"){
                
                alert("User Already Exist")

            }else if(response == "wrong"){

                showEmailError("Wrong Code")

            }else{

                // need done page
            // window.location.href = "../../../Courses/html/courses_student_page.html"

            }
        }
    })
})
