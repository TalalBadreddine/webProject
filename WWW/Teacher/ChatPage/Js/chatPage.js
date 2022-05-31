
function addTextIn(element, text){
    var textNode = document.createTextNode(text)
    element.appendChild(textNode)
}

function createElementWithClass(element, className){
    var element = document.createElement(element)
    element.className = className

    return element
}


function sendMessage(){
    var element = document.getElementById("theTextArea")
    var message =  element.value;
    var chatScreen = document.getElementById("chatScreen")
    
    if(message.trim() == "")return;

    var today = new Date();
    var time = today.toLocaleString().split(',')
    time.reverse()
    time = time.join(" ")
    time.replace("-", "/")

    var sentMessageDiv = createElementWithClass("div","sent")
    var timeSpan = createElementWithClass("span","sentTime")
    var pElement = document.createElement("p");


    addTextIn(timeSpan, time)
    addTextIn(pElement, message)
    
    pElement.appendChild(timeSpan)
    sentMessageDiv.appendChild(pElement)

    document.getElementById("addText").appendChild(sentMessageDiv)

    element.value = ""
    
    chatScreen.scrollTo(0,chatScreen.scrollHeight)
}

$(document).ready(function(){
    $.ajax({
        url:'../php/manageProfilePhoto.php',
        type:'POST',
        success:function(response){
  
            let pp = document.getElementById('personalPhoto')
            pp.innerHTML = `<img src='../../../../../../webProjectFiles/Teacher/${response}/personalPhoto.png' width='52px' height='50px' style="border-radius:50%">`
        }
    })
  })