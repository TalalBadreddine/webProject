$(".reportLi").on('click', function(){
    window.location.href = '../../report/html/report.html';
})

$(".managmentLi").on('click', function(){
    window.location.href = '../../Managment/Html/Managment.html';
})

$(".chatLi").on('click', function(){
    window.location.href = '../../chat/html/chat.html';
})

$(".applicationLi").on('click', function(){
    window.location.href = 'request.html';
})

$(".logOutLi").on('click', function(){
    window.location.href = '../../../Student/Sign-In/Html/sign_up.html'
})

var students
var teachers
var applyNum = 0

const teacherHeader = document.getElementById("teacherHeader")
const teacherRuler = document.getElementById("teacherRuler")

const studentHeader = document.getElementById("studentHeader")
const studentRuler = document.getElementById("studentRuler")

const requestTable = document.getElementById("requestTable")

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

    show(teachers,"TeacherID")
    addOnCLick()

})

function show(arr,typeID){
    requestTable.innerHTML = `            <tr class="header">
    <td>App Number</td>
    <td class="name">Name</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td class="addmission">Addmission Date</td>
</tr>`

    for(let i = 0 ; i < arr.length ; i++){
        let currentUser = arr[i]
        let name = currentUser['FirstName'] + ' ' + currentUser['LastName']
        let appNumber = parseInt(currentUser[typeID]) + applyNum + 100230
        let applyingDate = currentUser['admissionDate']
        console.log(appNumber)

        requestTable.innerHTML += `    
        <tr class="tableRow ${applyNum} , ${typeID} , ${currentUser[typeID]}" id="row${applyNum}">
        <td>${appNumber}</td>
        <td>${name}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="addmission">${applyingDate}</td>
        </tr>
        `
        applyNum++
    }



}



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
    show(students,"StudentID")
    addOnCLick()

})

function resetTitle(header, ruler){

    header.style.color = "black"
    header.style.fontWeight = "normal"

    ruler.style.display = "none"
}


// show and hide div

function showDiv(Id, bool){
    let element = document.getElementById(Id)
    let isHidden = bool == true ? 'block' : 'none'

    element.style.display = isHidden
}

document.getElementsByClassName('exitButton')[0].addEventListener('click', function(){
    showDiv('hiddenDiv',false)
})

function addOnCLick(){
    var rowsInTable = document.getElementsByClassName("tableRow")
    var lastRowClicked = [];
    for(let i = 0 ; i < rowsInTable.length ; i++){
        rowsInTable[i].addEventListener('click', function(){
            let infoToAdd = rowsInTable.className
            console.log(infoToAdd)
            showDiv('hiddenDiv',true)
            lastRowClicked.push(rowsInTable[i].id)
        })
    }
}


function showId(){
   document.getElementById(lastRowClicked[lastRowClicked.length - 1]).style.display = "none"
   showDiv('hiddenDiv', false)

}

function retract(){
    if(lastRowClicked.length == 0 || lastRowClicked[lastRowClicked.length - 1] == null){
        alert("No users deleted to retract")
        return;
    }

   let element =  document.getElementById(lastRowClicked[lastRowClicked.length - 1])
   element.style.display = "table-row"
    element.style.width = "100%"
    lastRowClicked.pop()
}

document.getElementById('retract').addEventListener('click', function(){
    retract()
})

$(document).ready(function(){
    $.ajax({
        url:'../php/loadAllRequest.php',
        type:'POST',
        success:function(response){
            let data = JSON.parse(response)

            students = data[0]
            teachers = data[1]

            show(students,"StudentID")

        }
    })
})
