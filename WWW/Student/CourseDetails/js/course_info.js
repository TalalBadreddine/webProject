const sylabus = document.getElementById("sylabus")
const aboutThisCourse = document.getElementById("aboutThisCourse")
const nbOfHourse = document.getElementById("nbOfHours")
const profImg = document.getElementById("profImg")
const fees = document.getElementById("fees")
const languages = document.getElementById("languages")
const credits = document.getElementById("credits")
const title = document.getElementById("title")
const teacherName = document.getElementById("teacherName")

function loadCoursesData(arr){
    let details = arr[9].split('-')
    for(let x = 0 ; x < details.length ; x++){
        makeSylabus(details[x])
    }
    makeAboutThisCourse(arr)
    nbOfHourse.innerHTML = arr[6]
    fees.innerHTML = arr[3]
    languages.innerHTML = arr[8]
    credits.innerHTML = arr[2]
    title.innerHTML = arr[1]
}


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