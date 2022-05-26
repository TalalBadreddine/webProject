var winX = null;
var winY = null;
const tableRowWithData = document.getElementById("tableRowWithData")

// window.addEventListener('scroll', function () {
//     if (winX !== null && winY !== null) {
//         window.scrollTo(winX, winY);
//     }
// });

const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function showDiv(p1){
    var elementToShow = document.getElementById(p1)
    

    elementToShow.style.display = "block"
    elementToShow.style.position = "fixed"
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

$(document).ready(function(){
    $.ajax({
        url:'../php/loadDailySchedual.php',
        type:'POST',
        success:function(response){
            let data = JSON.parse(response)
            // console.log(response)
            let coursesForToday = data.filter(course => course[11].toLowerCase().includes(today));
            coursesForToday = coursesForToday.map(course => [course[1],course[11].toLowerCase(), course['teacherInfo']])
            coursesForToday.push(["Test","6/8"], ["other Test", "16/20"])
            coursesForToday = oraganizeAndSortArray(coursesForToday)
            inserIntoTable(coursesForToday)
        }
    })
})

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

var added = true

function inserIntoTable(arr){
    let lastFilledTime = 6
    for(let i = 0 ; i < arr.length ; i++){
        console.log(arr[i])
        let startTime = parseInt(arr[i][1].split('/')[0])
        let duration = parseInt(arr[i][1].split('/')[1]) - startTime
        let currentEnd = startTime + duration

        let timeBetween = startTime - lastFilledTime
        
        let nbofEmpty = timeBetween /2;

        if(nbofEmpty > 0){
            for(let k = 0 ; k < nbofEmpty; k++){
                tableRowWithData.innerHTML += `<td></td>`

            }
        }

        // let nbOfColspan = 0

        // if(duration > 2)nbOfColspan = 1
        // else{
        //     nbOfColspan = duration/2 + 1
        // }
        let imgsource = ``
        if(arr[i].length == 3)imgsource = `<img src= ${getImgResource(arr[i][2])} width='70px' height='70px' style="border-radius: 50%;">`
        tableRowWithData.innerHTML += `
                            
                            <td colspan="${duration/2}">
                                <div class="card-of-schedual" onclick="showDiv('hiddenPopUp')"
                                    style="${arrayOfStyles[i%3]}">
                                    <span><i class="${arrayOfIcons[i%4]}"></i></span>
                                    <div class="title-of-course-schedual">
                                        <h3>${arr[i][0]}</h3>
                                        <p>from ${startTime} to ${currentEnd}</p>
                                    </div>
                                    <span>${imgsource}</span>
                                </div>
                            </td>
                            `
        lastFilledTime = currentEnd 
    }
}

// Check For Coflict
function checkForTimeConflict(arr){
    for(let i = 0 ; i < arr.length - 1 ; i++){

        let currentArrStartTime = arr[i][1].split('/')[0]
        let currentArrEndTime = arr[i][1].split('/')[1]

        let nextArrStartTime = arr[i+1][1].split('/')[0]
        let nextArrEndTime = arr[i+1][1].split('/')[1]

        if(currentArrEndTime > nextArrStartTime )return [arr[i], arr[i+1]]
    
    }
    return true
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