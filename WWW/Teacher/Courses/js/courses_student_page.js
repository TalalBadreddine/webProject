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

const startingDate =document.getElementById("startingTime")
const endingDate = document.getElementById("endingTime")

const addNewChange = document.getElementById("newEditButton");

var cardDiv = document.getElementsByClassName("card-of-course");



// Variables to add to data Base



var winX = null;
var winY = null;


var description
var allObjectives = []
var timing = []
var language = []

addNewChange.addEventListener('click', function(){
    validateAboutThisCourse()
})

function validateAboutThisCourse(){

    // objectives
    let objectives = listOfObjectives.innerHTML.split('</li>')
    for(let i = 0; i < objectives.length ; i++){
       let currentObjective = (objectives[i].split('>')[1])
       if(currentObjective != undefined){
        allObjectives.push(currentObjective)
       }
    }


    // timing need join
    if(checkBoxMonday.checked){
        let currentTiming = 'Monday:'+startTimeMonday.value.split(':')[0] +'/' + endTimeMonday.value.split(':')[0]
        timing.push(currentTiming)
    }

    if(checkBoxTuesday.checked){
        let currentTiming = 'Tuesday:'+startTimeTuesday.value.split(':')[0] +'/' + endTimeTuesday.value.split(':')[0]
        timing.push(currentTiming)
    }
    
    if(checkBoxWednesday.checked){
        let currentTiming = 'Wednesday:'+startTimeWednesday.value.split(':')[0]+'/' + endTimeWednesday.value.split(':')[0]
        timing.push(currentTiming)
    }

    if(checkBoxThursday.checked){
        let currentTiming = 'Thursday:'+startTimeThursday.value.split(':')[0]+'/'+endTimeThursday.value.split(':')[0]
        timing.push(currentTiming)
    }

    if(checkBoxFriday.checked){
        let currentTiming = 'Friday:'+startTimeFriday.value.split(':')[0]+'/'+endTimeFriday.value.split(':')[0]
        timing.push(currentTiming)
    }
    
    // language need Split
    if(french.checked){
        language.push("French")
    }

    if(english.checked){
        language.push("English")
    }
    
    // if(aboutThisCourse.innerHTML.split(' ').length < 50){
    //     alert("Description must be at least 50 word")
    //     return false
    // }

    description = aboutThisCourse.innerHTML
    
    $.ajax({
        url: '../php/sendCourseToDB.php',
        type: 'POST',
        data:{
            AboutCourse: aboutThisCourse.value,
            Description: allObjectives.join('-'),
            CourseName: title.value,
            CourseCode: code.value,
            Language: language.join('-'),
            Credits: credits.value,
            Fees: fees.value,
            NumberOfExams: nbOfExams.value,
            Hours: hours.value,
            Timing: timing.join('-'),
            startDate: startingDate.value,
            endDate: endingDate.value

        },
        success:function(response){
            console.log('res=> '+response)
            
            containerDiv.innerHTML += `<div class="card-of-course">
            <div class="header">
                ${JSON.parse(response)}
            </div>
            <div class="body-card">
                <div class="description">
                    <h5>you'll learn how to:</h5>
                    <ul>
                        <li>${allObjectives[0]}</li>
                        <li>${allObjectives[1]}</li>
                        <li>${allObjectives[2]}</li>
                    </ul>
                </div>
                <div class="footer" id="firstfooter">
                    <button class="apply-btn"><a id="firstCardButtonlink" href="../../CourseDetails/html/course_info.html"
                            class="hrefHelper">Edit</a></button>
                    <p>credits: ${credits.value}</p>
                </div>
            </div>
        </div> `

        let applyBtns = document.getElementsByClassName("apply-btn")

        for(let i = 0 ; i < applyBtns.length; i++){
            applyBtns[i].addEventListener('click',function(){
                $.ajax({
                    url:'../php/sendCurrentCourse.php',
                    type:'POST',
                    data:{
                        currentCourseData :{
                            AboutCourse: aboutThisCourse.value,
                            Description: allObjectives.join('-'),
                            CourseName: title.value,
                            CourseCode: code.value,
                            Language: language.join('-'),
                            Credits: credits.value,
                            Fees: fees.value,
                            NumberOfExams: nbOfExams.value,
                            Hours: hours.value,
                            Timing: timing.join('-'),
                            startDate: startingDate.value,
                            endDate: endingDate.value
                        }
                    },
                    success:function(test){
                        
                    }
                })
            })
        }
        }
    })
    test2()
}

function emptyFields(){
    aboutThisCourse.value = ""
    listOfObjectives.innerHTML = ""
    title.value = ""
    code.value = ""
    french.checked = false
    english.checked = false
    credits.value = ""
    fees.value = ""
    nbOfExams.value = ""
    hours.value = ""

    checkBoxMonday.checked = false
    startTimeMonday.value = ""
    endTimeMonday.value = ""

    startingDate.value = ""
    endingDate.value = ""
    objective.value = ""

    checkBoxTuesday.checked = false
    startTimeTuesday.value = ""
    endTimeTuesday.value = ""

    checkBoxWednesday.checked = false
    startTimeWednesday.value = ""
    endTimeWednesday.value = ""

    checkBoxThursday.checked = false
    startTimeThursday.value = ""
    endTimeThursday.value = ""

    checkBoxFriday.checked = false
    startTimeFriday.value = ""
    endTimeFriday.value = ""

}

function showDiv(p1,arr) {
    var elementToShow = document.getElementById(p1)
    let data = arr.split(',')

    elementToShow.style.display = "block"
    elementToShow.style.position = "fixed"
    hiddenPopUpId.innerHTML = `<p contentEditable="true" id="hiddenPopUpValue" class="hiddenPopUpClass ,${data[0]}">${data[3]}</p>`

    winX = window.scrollX;
    winY = window.scrollY;

}

function test() {

    let valueOfPopUp = document.getElementById("hiddenPopUpValue")
    let courseName = document.getElementsByClassName("hiddenPopUpClass")[0].className.split(',')[1]

    $.ajax({
        url:'../php/saveDailyNote.php',
        type:'POST',
        data:{
            note: valueOfPopUp.innerHTML,
            courseName: courseName
        },success:function(response){
            console.log(response)
        }
    }),
    $.ajax({
        url:'../php/loadDailyCourses.php',
        type:'POST',
        success:function(test){
            tableRowWithData.innerHTML = ""
            let data = JSON.parse(test)
            console.log(data)
            displayArrayInTable(data)
        }
    })

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

const addCourseButton = document.getElementById("addCourse");
addCourseButton.addEventListener("click", function () {
    addCourse("Hidden_PopUp")
})

function addCourse(p2) {
    const viewPopUp = document.getElementById(p2);
    viewPopUp.style.display = 'block';
}

var EditButtons = document.getElementsByClassName("apply-btn");
const removeButton = document.getElementById("removeButton");
var currentBool = false

removeButton.addEventListener("click", remove);



function remove() {
    EditButtons = document.getElementsByClassName("apply-btn")
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

function refreshRemovingCourse(){
    for (let j = 0; j < EditButtons.length; j++) {
        EditButtons[j].addEventListener("click", function () {

            $.ajax({
                url:'../php/sendCurrentCourse.php',
                type:'POST',
                data:{
                    courseId:EditButtons[j].id
                },
                success:function(test){
                }
            })

            if (currentBool){
                $.ajax({
                    url:'../php/deleteCurrentCourse.php',
                    type:'POST',
                    success:function(response){
                        console.log(response)
                    }
                })
                
                cardDiv[j].style.display = 'none';

            }else{
                window.location.href = '../../CourseDetails/html/course_info.html'
            }

        })
    }

}

function test2() {
    const cancelPopUp = document.getElementById("Hidden_PopUp");
    emptyFields()
    cancelPopUp.style.display = 'none';
}

// Daily Schedual

const time = new Date()
const daysOfTheWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let today = daysOfTheWeek[time.getDay()].toLowerCase()

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
                                <div class="card-of-schedual" onclick="showDiv('hiddenPopUp','${arr}')"
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

// load All Courses in Db 

$(document).ready(function(){
    $.ajax({
        url:'../php/loadAllCourses.php',
        type:'POST',
        success:function(response){
            let data = JSON.parse(response)

            for(let i = 0 ;i < data.length; i++){
                containerDiv.innerHTML += `<div class="card-of-course">
                <div class="header">
                    ${data[i]["CourseName"]}
                </div>
                <div class="body-card">
                    <div class="description">
                        <h5>you'll learn how to:</h5>
                        <ul>
                            <li>${data[i]["Description"].split('-')[0]}</li>
                            <li>${data[i]["Description"].split('-')[1]}</li>
                            <li>${data[i]["Description"].split('-')[2]}</li>
                        </ul>
                    </div>
                    <div class="footer" id="firstfooter">
                        <button class="apply-btn" id='${data[i]['CourseID']}'><a id="firstCardButtonlink" href="../../CourseDetails/html/course_info.html"
                                class="hrefHelper">Edit</a></button>
                        <p>credits: ${data[i]["Credits"]}</p>
                    </div>
                </div>
            </div> `
            }
            cardDiv = document.getElementsByClassName("card-of-course");
            refreshRemovingCourse()
        }
    })
})

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