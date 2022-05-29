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
const editBtn = document.getElementById("editBtn")
const willEdit = document.getElementsByClassName("willEdit");
const editBtnHtml = document.getElementById("editBtnHtml")
var canEdit = false


var months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// "Monday:14/17-Tuesday:15:19"
var objectives = []
editBtn.addEventListener('click',function(){
    canEdit = !canEdit

        for(let i = 0 ; i < willEdit.length ; i++){
   
            willEdit[i].contentEditable = canEdit
            console.log(willEdit[i])
        }

        if(canEdit){

            editBtnHtml.classList.add("dot-pulse")
            editBtnHtml.style.marginLeft = "65px"
            editBtn.style.background = "#F38701"

        }else{
            editBtnHtml.innerHTML = "Edit"
            editBtnHtml.classList.remove("dot-pulse")
            editBtnHtml.style.marginLeft = "0px"
            editBtn.style.background = "#0B6D12"

            // let arr = sylabus.innerHTML.split('-')
            // console.log(arr)
            // for(let i = 0 ; i < arr.length; i++){
            //     if(i%2 != 0){
            //         objectives.push(arr[i].split('<')[0])
            //     }
            // }
            let arr = sylabus.getElementsByTagName("li")
            for(let i = 0 ; i < arr.length; i++){
                objectives.push((arr[i].innerHTML).slice(1))
            }
            console.log(schedual.innerHTML)
            
            $.ajax({
                url:'../php/saveUpdate.php',
                type:'POST',
                data:{
                    sylabus: objectives.join('-'),
                    aboutThisCourse: aboutThisCourse.innerHTML,
                    nbOfHourse: nbOfHourse.innerHTML,
                    fees: fees.innerHTML,
                    language: languages.innerHTML,
                    title: title.innerHTML,
                    credits: credits.innerHTML,
                    schedual: schedual.innerHTML.replaceAll('-&gt;','/').replaceAll('<br>','-')

                },
                success:function(response){
                    console.log(response)
                }
            })
        }


})

function loadCoursesData(arr){
    let details = arr["Description"].split('-')
    for(let x = 0 ; x < details.length ; x++){
        makeSylabus(details[x])
    }
    let schedualArr = arr['Timing'].split('-')
    makeAboutThisCourse(arr)
    nbOfHourse.innerHTML = arr['Hours']
    fees.innerHTML = arr['Fees']
    languages.innerHTML = arr['Language']
    credits.innerHTML = arr['Credits']
    title.innerHTML = arr['CourseName']
    for(let i = 0 ; i < schedualArr.length; i++){
        let elementToArr = schedualArr[i].replaceAll("/","->")
        let indexOfTwoPoints = elementToArr.indexOf(":")
        elementToArr = elementToArr.slice(0, indexOfTwoPoints+1) + " " + elementToArr.slice(indexOfTwoPoints+1);
        schedual.innerHTML += elementToArr + "<br>"
        
    }
}


function makeSylabus(goal){
    sylabus.innerHTML += `<li >-${goal}</li>`
}

function makeAboutThisCourse(extra){
    aboutThisCourse.innerHTML += extra['AboutCourse']
}

$(document).ready(function(){

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