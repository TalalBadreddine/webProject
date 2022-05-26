var winX = null;
var winY = null;
const tableRowWithData = document.getElementById("tableRowWithData")
const hidenPopUp = document.getElementById("hiddenPopUpId")
const secondTableBody = document.getElementById("secondTableBody")

// window.addEventListener('scroll', function () {
//     if (winX !== null && winY !== null) {
//         window.scrollTo(winX, winY);
//     }
// });

const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

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
let today = daysOfTheWeek[time.getDay()].toLowerCase()

var arrToDisplay = []
var coursesArray = []

$(document).ready(function(){
    $.ajax({
        url:'../php/loadDailySchedual.php',
        type:'POST',
        success:function(response){
            let data = JSON.parse(response)
            displayArrayInTable(data)
            addToSecondTable(data)
            console.log(data)
        }
    })
})

function addToSecondTable(arr){
    for(let i = 0 ; i < arr.length ; i++){
        secondTableBody.innerHTML += `
        <tr>
        <td><a href="../../CourseDetails/html/course_info.html">${arr[i][1]}</a></td>
        <td><a href="../../Teacher profile/html/teacher_profile_page.html">${firstLetterCapital(arr[i]["teacherInfo"][1]) + firstLetterCapital(arr[i]["teacherInfo"][2])}</a></td>
        <td>${arr[i][2]}</td>
        <td>${arr[i][5]}</td>
        <td>${arr[i][8]}</td>
        <td>${arr[i][6]}</td>
    </tr>
    `
    }
}

function displayArrayInTable(arr){

    let coursesForToday = arr.filter(course => course[11].toLowerCase().includes(today));
    coursesForToday = coursesForToday.map(course => [course[1],course[11].toLowerCase(), course['teacherInfo'], course[13]])
    coursesForToday.push(["Test","6/8"], ["other Test", "16/20"], ["test3","16/20"],["test2", "6/12"])
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
