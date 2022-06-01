var winX = null;
var winY = null;
const tableRowWithData = document.getElementById("tableRowWithData")
const hidenPopUp = document.getElementById("hiddenPopUpId")
const secondTableBody = document.getElementById("secondTableBody")
const listOfCourses =document.getElementById("listOfCourses")
const filterBtn = document.getElementById("filterBtn")
const language = document.getElementById("language-search-courses")
const credits = document.getElementById("creditsLabel")
const hours = document.getElementById("hoursLabel")
const star1 = document.getElementById("star-1")
const star2 = document.getElementById("star-2")
const star3 = document.getElementById("star-3")
const star4 = document.getElementById("star-4")
const star5 = document.getElementById("star-5")

// window.addEventListener('scroll', function () {
//     if (winX !== null && winY !== null) {
//         window.scrollTo(winX, winY);
//     }
// });


function getRating(){
    if(star1.checked)return 5
    if(star2.checked)return 4
    if(star3.checked)return 3
    if(star4.checked)return 2
    if(star5.checked)return 1
    return 0
}

const daysOfTheWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function showDiv(p1,message){
    var elementToShow = document.getElementById(p1)
    

    elementToShow.style.display = "block"
    elementToShow.style.position = "fixed"
    if(message == "" || message == null){
        hidenPopUp.innerHTML = "No Message Added By The Teacher"
        return
    }
    hidenPopUp.innerHTML = message

    winX = window.scrollX;
    winY = window.scrollY;
    
}

function test(){
    var elementToClose = document.getElementById("hiddenPopUp")
    elementToClose.style.display = 'none'
    winX = null;
    winY = null;
}

const time = new Date()
let today = (daysOfTheWeek[time.getDay()]).toLowerCase()


var arrToDisplay = []

$(document).ready(async function(){
    $.ajax({
        url:'../php/loadDailySchedual.php',
        type:'POST',
        async: false,
        cache: false,
        timeout: 30000,
        success:await function(response){
            let data = JSON.parse(response)
            currentCoursesArray = data
            displayArrayInTable(data)
            addToSecondTable(data)
        }
    })
    $.ajax({
        url:'../php/loadAllMajors.php',
        type:'POST',
        success: function(response){
            let data = JSON.parse(response)
            arrayOfFilteredCourses = (filterArray(data))

            for(let i = 0; i < arrayOfFilteredCourses.length ; i++){
                addToCourses(arrayOfFilteredCourses[i])
            }

        }
    })
})

function removeFromTable(id){
    document.getElementById('Course'+id).remove()
}

 function drop(courseId){

    $.ajax({
        url:'../php/dropCourse.php',
        type:'POST',
        async:false,
        data:{
            courseId: courseId
        },
        success:function(response){
            if(response == "success"){
            removeFromTable(courseId)

            }else{
                alert(response)
            }
        }
    })
    $.ajax({
        url:'../php/loadDailySchedual.php',
        type:'POST',
        async: false,
        cache: false,
        timeout: 30000,
        success: function(response){
            let data = JSON.parse(response)
            currentCoursesArray = data
            secondTableBody.innerHTML = ""
            tableRowWithData.innerHTML = ""
            displayArrayInTable(data)
            addToSecondTable(data)
        }
    }),
    $.ajax({
        url:'../php/loadAllMajors.php',
        type:'POST',
        success: function(response){
            let data = JSON.parse(response)
            listOfCourses.innerHTML = ""
            arrayOfFilteredCourses = (filterArray(data))

            for(let i = 0; i < arrayOfFilteredCourses.length ; i++){
                addToCourses(arrayOfFilteredCourses[i])
            }

        }
    })
    
}


function resetDailySchedual(){
    tableRowWithData.innerHTML = ""
}

function addToSecondTable(arr){
    for(let i = 0 ; i < arr.length ; i++){
        secondTableBody.innerHTML += `
        <tr id=Course${arr[i][0]}>
        <td>${arr[i][1]}</td>
        <td><a href="../../Teacher profile/html/teacher_profile_page.html">${firstLetterCapital(arr[i]["teacherInfo"][1]) + firstLetterCapital(arr[i]["teacherInfo"][2])}</a></td>
        <td>${arr[i][2]}</td>
        <td><Button style="background:white" class="dropBtn" onclick="drop(${arr[i][0]})">Drop</Button></td>
        <td>${arr[i][8]}</td>
        <td>${arr[i][6]}</td>
    </tr>
    `
    }
}

function displayArrayInTable(arr){

    let coursesForToday = arr.filter(course => course[11].toLowerCase().includes(today));
    coursesForToday = coursesForToday.map(course => [course[1],course[11].toLowerCase(), course['teacherInfo'], course[13]])
    // coursesForToday.push(["Test","6/8"])
    coursesForToday = oraganizeAndSortArray(coursesForToday)
    arrToDisplay = coursesForToday

    if(thereIsConflict(arrToDisplay)){
        inserIntoTable(arrToDisplay)
        inserIntoTable(arrofConfilcted)
    }else{
        inserIntoTable(arrToDisplay)
    }

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
        if(arr[i].length > 2){
            imgsource = `<img src= ${getImgResource(arr[i][2])} width='70px' height='70px' style="border-radius: 50%;">`
            drName = firstLetterCapital(arr[i][2][1]) + firstLetterCapital(arr[i][2][2])
        }
      
        html += `
                            
                            <td colspan="${duration/2}">
                                <div class="card-of-schedual" onclick="showDiv('hiddenPopUp','${arr[i][3]}')"
                                    style="${arrayOfStyles[i%3]}">
                                    <span><i class="${arrayOfIcons[i%4]}"></i></span>
                                    <div class="title-of-course-schedual">
                                        <h3>${firstLetterCapital(arr[i][0])}</h3>
                                        <p>from ${startTime} to ${currentEnd}<br> with dr. ${drName}</p>
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

// Check For Coflict
var arrofConfilcted = []
function thereIsConflict(arr){

    let end = arr[0][1].split('/')[1]

    for(let i = 1 ; i < arr.length ; i++){

        let currentArrStartTime = arr[i][1].split('/')[0]
        let currentArrEndTime = arr[i][1].split('/')[1]


        if(end > currentArrStartTime ){
            arrofConfilcted.push(arr[i])
            end = Math.min(arr[i][1].split[1], end)
        
        arrToDisplay = arrToDisplay.filter(function(item) {
            return item !== arr[i]
        })
         }else{
             end = currentArrEndTime
         }
    
    }
    return arrofConfilcted.length != 0
}


function firstLetterCapital(str){
    return  str.charAt(0).toUpperCase() + str.slice(1);
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

function firstArrIsBigger(arr1, arr2){
    return parseInt(arr1[1].split('/')[0]) > parseInt(arr2[1].split('/')[0])
}

// Selection Sort forgot Merge Sort

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

function getImgResource(teacherArr){
    return '../../../../../../../webProjectFiles/Teacher/'+teacherArr[1]+teacherArr[2]+'-'+teacherArr[3]+'/personalPhoto.png'
}


// Return All Courses Of This Major


function addToCourses(course){
    let listOfObjectives = course[9].split('-')
    listOfCourses.innerHTML += `
                <div class="card-of-course">
                    <div class="header">
                        ${course[1]}
                    </div>
                    <div class="body-card">
                        <div class="description">
                            <h5>you'll learn how to:</h5>
                            <ul>
                                <li>${listOfObjectives[0]}</li>
                                <li>${listOfObjectives[1]}</li>
                                <li>${listOfObjectives[2]}</li>
                            </ul>
                        </div>
                        <div class="footer">
                            <button class="apply-btn ${course[5]}"><a href="../../CourseDetails/html/course_info.html"
                            class="hrefHelper">Apply</a></button>
                            <p>credits: ${course[2]}</p>
                        </div>
                    </div>
                </div>
    `
    let applyBtns = document.getElementsByClassName("apply-btn")

    for(let i = 0 ; i < applyBtns.length; i++){
        applyBtns[i].addEventListener('click',function(){
            $.ajax({
                url:'../php/sendCurrentCourse.php',
                type:'POST',
                data:{
                    courseName:applyBtns[i].className.split(' ')[1],
                    arrayOfFilteredCourses: arrayOfFilteredCourses
                },
                success:function(test){
                    
                }
            })
        })
    }

}


var currentCoursesArray = []
var arrayOfFilteredCourses = []

function filterArray(arr){
    for(let i = 0 ; i < arr.length ; i++){
        for(let j = 0 ; j < currentCoursesArray.length ; j++){
            if(arr[i][1] == currentCoursesArray[j][1] ||  inTheFuture(arr[i][15])){
                arr.splice(i, 1);


            }
        }
    }
    return arr
}

function inTheFuture(dummyDate){
    let date = dummyDate.slice("-")

    if(date[0] < time.getFullYear())return false
    if(data[1] < time.getMonth())return false
    if(date[2] < time.getDate()) return false
    return true
}
function resetCoursesList(){
    listOfCourses.innerHTML = ""
}

// Filter

filterBtn.addEventListener('click', function(){
    filter()
})

function filter(){
    let arrAfterPressingFilter = arrayOfFilteredCourses
    let rating = getRating()
    let hoursVal = hours.value
    let credistVal = credits.value
    let languageVal = language.value

    if(rating == 0 && hoursVal == "" && credistVal.length == 0 && languageVal.length == 0){
        resetCoursesList()
        for(let i = 0; i < arrayOfFilteredCourses.length ; i++){
            addToCourses(arrayOfFilteredCourses[i])
        }
        return
    }

    let mathForm = ['<=','>=','<','>']

    if(rating != 0 ){
        arrAfterPressingFilter = arrAfterPressingFilter.filter(course => course[7] == rating)
    }

    if(hoursVal != 0 ){
        let found = false
        for(let z=0; z < mathForm.length; z++){
            if(hoursVal.includes(mathForm[z]) ){

                switch(z) {
                    case 0:
                        arrAfterPressingFilter = arrAfterPressingFilter.filter(course => course[6] <= parseInt(hoursVal.slice(2,hoursVal.length)))
                        break;
                    case 1:
                        arrAfterPressingFilter = arrAfterPressingFilter.filter(course => course[6] >= parseInt(hoursVal.slice(2,hoursVal.length)))
                        break;
                    case 2:
                        arrAfterPressingFilter = arrAfterPressingFilter.filter(course => course[6] < parseInt(hoursVal.slice(1,hoursVal.length)))
                        break;
                    case 3:
                        arrAfterPressingFilter = arrAfterPressingFilter.filter(course => course[6] > parseInt(hoursVal.slice(1,hoursVal.length)))
                        break; 
                  }
                  found = true
                break

            }else{
                if(found)break
                arrAfterPressingFilter = arrAfterPressingFilter.filter(course => course[6] == hoursVal)
                

            }
        }
    }

    if(credistVal != 0 ){
        arrAfterPressingFilter = arrAfterPressingFilter.filter(course => course[2] == credistVal)
    }

    if(languageVal != "none" ){
        arrAfterPressingFilter = arrAfterPressingFilter.filter(course => course[8].toLowerCase().includes(languageVal.toLowerCase()))
    }

    resetCoursesList()

    for(let i = 0; i < arrAfterPressingFilter.length ; i++){
        addToCourses(arrAfterPressingFilter[i])
    }

    if(arrAfterPressingFilter.length > 0)window.scrollBy(300, 400);

}

let arr=[star1,star2,star3,star4,star5]



language.addEventListener('change',function(){
    filter()
})

credits.addEventListener('change',function(){
    filter()
})

hours.addEventListener('keyup',function(){
    filter()
})

for(let x = 0 ; x < arr.length ; x++){
    arr[x].addEventListener('click',function(){
        filter()
    })
}

$(document).ready(function(){
    $.ajax({
        url:'../php/manageProfilePhoto.php',
        type:'POST',
        success:function(response){
  
            let pp = document.getElementById('personalPhoto')
            pp.innerHTML = `<img src='../../../../../../webProjectFiles/Student/${response}/personalPhoto.png' width='52px' height='50px' style="border-radius:50%">`
        }
    })
  })