const hiddenPopUpId = document.getElementById("hiddenPopUpId")
const insertObjectiveBtn = document.getElementById("insertObjective")
const objective = document.getElementById("objectives")

const containerDiv = document.getElementById("coursesContainer"); // where we add the courses

const checkBoxMonday = document.getElementById("checkBoxMonday")
const startTimeMonday = document.getElementById("startTimeMonday")
const endTimeMonday = document.getElementById("endTimeMonday")

const checkBoxTuesday = document.getElementById("checkBoxTuesday")
const startTimeTuesday = document.getElementById("startTimeTuesday")
const endTimeTuesday = document.getElementById("endTimeTuesday")

const checkBoxWednesday = document.getElementById("checkBoxWednesday")
const startTimeWednesday = document.getElementById("startTimeWednesday")
const endTimeWednesday = document.getElementById("endTimeWednesday")

const checkBoxThursday = document.getElementById("checkBoxThursday")
const startTimeThursday = document.getElementById("startTimeThursday")
const endTimeThursday = document.getElementById("endTimeThursday")

const checkBoxFriday = document.getElementById("checkBoxFriday")
const startTimeFriday = document.getElementById("startTimeFriday")
const endTimeFriday = document.getElementById("endTimeFriday")

const french = document.getElementById("french")
const english = document.getElementById("english")

const nbOfExams = document.getElementById("nbOfExams")
const hours = document.getElementById("hours")
const fees = document.getElementById("fees")
const credits = document.getElementById("credits")
const code = document.getElementById("code")
const title = document.getElementById("title")

const listOfObjectives = document.getElementById("listOfObjectives")
const aboutThisCourse = document.getElementById("aboutThisCourse")

// Variables to add to data Base

var description
var sylabus


var winX = null;
var winY = null;

function addCourse(){

    
}

function validateAboutThisCourse(){
    
    if(aboutThisCourse.innerHTML.split(' ').length < 50){
        alert("Description must be at least 50 word")
        return false
    }

    description = aboutThisCourse.innerHTML
    return true
}

// function validateSylabus(){

// }

function showDiv(p1,message) {
    var elementToShow = document.getElementById(p1)


    elementToShow.style.display = "block"
    elementToShow.style.position = "fixed"
    hiddenPopUpId.innerHTML = message

    winX = window.scrollX;
    winY = window.scrollY;

}

function test() {
    var elementToClose = document.getElementById("hiddenPopUp")
    elementToClose.style.display = 'none'
    winX = null;
    winY = null;
}
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

insertObjective.addEventListener('click',function(){
    //10
    if(listOfObjectives.innerHTML.split('<li').length > 10){
        alert("can't add more objectives")
        return
    }
    listOfObjectives.innerHTML += `<li contentEditable="true">${objective.value}</li>`

})

// const EditButton = document.getElementById('EditButton');

// EditButton.addEventListener('click', function () {
//     let startDate = startDateInput.value.split(":");
//     let endDate = endDateInput.value.split(":");

//     if (startDate[0] > endDate[0]) {
//         // startDateInput.style.borderColor = "red";
//         alert("Error");
//         return;
//     }

//     if ((startDate[0] == endDate[0]) && (startDate[1] >= endDate[1])) {
//         alert("Error Minutes");
//         return;
//     }

//     const textarea = document.getElementById('comment')
//     textarea.disabled = true
//     EditButton.innerHTML = "Save";
// })

//  EditButton.addEventListener('click', function(){
//     textarea.disabled = false
//     EditButton.innerHTML = "Edit";
//  })


const addCourseButton = document.getElementById("addCourse");
addCourseButton.addEventListener("click", function () {
    addCourse("Hidden_PopUp")
})

function addCourse(p2) {
    const viewPopUp = document.getElementById(p2);
    viewPopUp.style.display = 'block';
}

const newEditButton = document.getElementsByClassName("description")
addCourseButton.addEventListener("click", function () {
    SaveNewCourse("Hidden_PopUp")
})

const EditButtons = document.getElementsByClassName("apply-btn");
const removeButton = document.getElementById("removeButton");

removeButton.addEventListener("click", remove);

var currentBool = false

function remove() {
    currentBool = ! currentBool

    if(currentBool){
        for (let i = 0; i < EditButtons.length; i++) {
            EditButtons[i].innerHTML = "Remove";
            EditButtons[i].style.backgroundColor = "red";
        }
    }else{
        for (let i = 0; i < EditButtons.length; i++) {
            EditButtons[i].innerHTML = "Edit";
            EditButtons[i].style.backgroundColor = "green";
        }
    }

}
const cardDiv = document.getElementsByClassName("card-of-course");

for (let j = 0; j < EditButtons.length; j++) {
    EditButtons[j].addEventListener("click", function () {
        if (EditButtons[j].innerHTML == "Remove")
            cardDiv[j].style.display = 'none';
    })
}




function test2() {
    const cancelPopUp = document.getElementById("Hidden_PopUp");
    cancelPopUp.style.display = 'none';
}
const addNewChange = document.getElementById("newEditButton");
addNewChange.addEventListener("click", function () {
    let textArea = document.getElementById("newComment2").innerHTML;
    let array = textArea.split("\n");
    let Objective = [];
    for (let i = 0; i < 3; i++) {
        let currentObjective = array[i].split(":")[1]
        Objective[i] = currentObjective;
    }
    
    containerDiv.innerHTML += `<div class="card-of-course">
    <div class="header">
        ${title.value}
    </div>
    <div class="body-card">
        <div class="description">
            <h5>you'll learn how to:</h5>
            <ul>
                <li>${Objective[0]}</li>
                <li>${Objective[1]}</li>
                <li>${Objective[2]}</li>
            </ul>
        </div>
        <div class="footer" id="firstfooter">
            <button class="apply-btn"><a id="firstCardButtonlink" href="../../CourseDetails/html/course_info.html"
                    class="hrefHelper">Edit</a></button>
            <p>credits: 3</p>
        </div>
    </div>
</div> `
    test2()

})

// var boolean = false;

// document.getElementsByClassName('editButtonForTime')[0].addEventListener('click', function(){
//     boolean = !boolean

//     if(boolean){
//         document.getElementsByClassName('editButtonForTime')[0].innerHTML = "Edit"
//         document.getElementsByClassName('TextAreaOfDetails')[0].disabled = true
//     }else{
//         document.getElementsByClassName('editButtonForTime')[0].innerHTML = "Save"
//         document.getElementsByClassName('TextAreaOfDetails')[0].disabled = false


//     }
// })

/* <div class="card-of-course">
                        <div class="header">
                            coding web
                        </div>
                        <div class="body-card">
                            <div class="description">
                                <h5>you'll learn how to:</h5>
                                <ul>
                                    <li>create responsive web app</li>
                                    <li>make relation with database</li>
                                    <li>sucess in interview</li>
                                </ul>
                            </div>
                            <div class="footer" id="firstfooter">
                                <button class="apply-btn"><a id="firstCardButtonlink" href="../../CourseDetails/html/course_info.html"
                                        class="hrefHelper">Edit</a></button>
                                <p>credits: 3</p>
                            </div>
                        </div>
                    </div> */
// Daily Schedual

const time = new Date()
const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let today = daysOfTheWeek[time.getDay() - 1].toLowerCase()

$(document).ready(function(){
    $.ajax({
        url:'../php/loadDailyCourses.php',
        type:'POST',
        success:function(test){
            let data = JSON.parse(test)
            console.log(data)
            displayArrayInTable(data)
        }
    })
})          

function displayArrayInTable(arr){

    let coursesForToday = arr.filter(course => course[11].toLowerCase().includes(today));
    coursesForToday = coursesForToday.map(course => [course[1],course[11].toLowerCase(), course['teacherInfo'], course[13]])
    coursesForToday = oraganizeAndSortArray(coursesForToday)
    arrToDisplay = coursesForToday

    inserIntoTable(arrToDisplay)

}



arrayOfStyles = [
    "background-color: #F3F0FF;border: 0.5px solid #8369FF;",
    "background-color: #E6F3FF; border: 0.5px solid #80BFFC;",
    "background-color: #FFEAF6; border: 00.5px solid #FC2EA1;"
]

arrayOfIcons = [
    "fa-brands fa-gg",
    "fa-brands fa-connectdevelop",
    "fa-brands fa-nfc-directional",
    "fa-brands fa-pushed"
]


function firstLetterCapital(str){
    return  str.charAt(0).toUpperCase() + str.slice(1);
}


function inserIntoTable(arr){
    let lastFilledTime = 6
    let html = '<tr>'
    for(let i = 0 ; i < arr.length ; i++){
        let startTime = parseInt(arr[i][1].split('/')[0])
        let duration = parseInt(arr[i][1].split('/')[1]) - startTime
        let currentEnd = startTime + duration

        let timeBetween = startTime - lastFilledTime
        
        let nbofEmpty = timeBetween /2;

        if(nbofEmpty > 0){
            for(let k = 0 ; k < nbofEmpty; k++){
                html += `<td></td>`
            }
        }

        let imgsource = ``
        let drName = ``
       
        html += `
                            
                            <td colspan="${duration/2}">
                                <div class="card-of-schedual" onclick="showDiv('hiddenPopUp',${arr[i][13]})"
                                    style="${arrayOfStyles[i%3]}">
                                    <span><i class="${arrayOfIcons[i%4]}"></i></span>
                                    <div class="title-of-course-schedual">
                                        <h3>${firstLetterCapital(arr[i][0])}</h3>
                                        <p>from ${startTime} to ${currentEnd}</p>
                                    </div>
                                    <span>${imgsource}</span>
                                </div>
                            </td>
                            `
        lastFilledTime = currentEnd 
    }
    html += '</tr>'

    tableRowWithData.innerHTML += html

}

function oraganizeAndSortArray(arr){
   
    for(let i = 0 ; i < arr.length ; i++){
        let currentArr = arr[i][1].split('-')

        for(let j = 0 ; j < currentArr.length ; j++){
            if(currentArr[j].includes(today)){
                arr[i][1] = currentArr[j].split(":")[1]
            }
        }
    }
    return sortArrayByTiming(arr)    
}

function sortArrayByTiming(arr){
    for(let i = 0 ; i < arr.length ; i++){

        let currentIndex = i

        for(let j = i+1 ; j < arr.length ; j++){
            if(firstArrIsBigger(arr[i], arr[j])){
                currentIndex = j
                
                tempArr = arr[i]
                arr[i] = arr[j]
                arr[j] = tempArr
            }
        }
    }
    return arr
}

function firstArrIsBigger(arr1, arr2){
    return parseInt(arr1[1].split('/')[0]) > parseInt(arr2[1].split('/')[0])
}