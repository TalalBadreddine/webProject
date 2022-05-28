const sylabus = document.getElementById("sylabus")
const aboutThisCourse = document.getElementById("aboutThisCourse")
const nbOfHourse = document.getElementById("nbOfHours")
const profImg = document.getElementById("profImg")
const fees = document.getElementById("fees")
const languages = document.getElementById("languages")
const credits = document.getElementById("credits")
const title = document.getElementById("title")
const teacherName = document.getElementById("teacherName")
const startingDate = document.getElementById("startingDate")
const schedual = document.getElementById("schedual")
const enrollBtn = document.getElementById("enrollBtn")

var months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

"Monday:14/17-Tuesday:15:19"

function loadCoursesData(arr){
    let details = arr[9].split('-')
    for(let x = 0 ; x < details.length ; x++){
        makeSylabus(details[x])
    }
    let schedualArr = arr[11].split('-')
    makeAboutThisCourse(arr)
    nbOfHourse.innerHTML = arr[6]
    fees.innerHTML = arr[3]
    languages.innerHTML = arr[8]
    credits.innerHTML = arr[2]
    title.innerHTML = arr[1]
    for(let i = 0 ; i < schedualArr.length; i++){
        let elementToArr = schedualArr[i].replaceAll("/","->")
        let indexOfTwoPoints = elementToArr.indexOf(":")
        elementToArr = elementToArr.slice(0, indexOfTwoPoints+1) + " " + elementToArr.slice(indexOfTwoPoints+1);
        schedual.innerHTML += elementToArr + "<br>"
        
    }

    // schedual.innerHTML = arr[11].replaceAll("/","->")
    startingDate.innerHTML =  arr[15].split('-')[2] + ' ' + months[parseInt(arr[15].split('-')[1] - 1)] 
}


enrollBtn.addEventListener('click', function(){
    $.ajax({
        url:'../php/enroll.php',
        type:'POST',
        success:function(response){
            if(response == "success"){

                enrollBtn.style.cursor = "default";
                enrollBtn.style.background = "green";
                enrollBtn.innerHTML = "Enrolled";

            }else{
                alert("Error please try again later")
            }
            
        }
    })
})


function makeSylabus(goal){
    sylabus.innerHTML += `<li class="list-items-syllabus">-${goal}</li>`
}

function makeAboutThisCourse(extra){
    aboutThisCourse.innerHTML += extra[14]
}

$(document).ready(function(){

    $.ajax({
        url:'../php/loadTeacherDataForCourse.php',
        type:'POST',
        success:function(response){
            let data =JSON.parse(response)
            teacherName.innerHTML += data[1] + data[2]
        }
    })

    $.ajax({
        url:'../php/loadCoursesDetails.php',
        type:'POST',
        success:function(response){
            let data = JSON.parse(response)
            console.log(data)
            loadCoursesData(data)

        }
    })

})