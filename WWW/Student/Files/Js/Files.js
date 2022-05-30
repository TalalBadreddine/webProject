const scroller = document.getElementById("scroller")
const titleFolder = document.getElementById("titleFolder")
const filesContainer = document.getElementById("filesContainer")

var count = 0;

var allCoursesData

function move(p1, p2){
    var value = 140
    var scrollDirection = p2 == 'left'? -value : value

    var element = document.getElementById("scroller")

    element.scrollLeft += scrollDirection

}

function changBackGround(p1){
    var element = document.getElementById(p1)

    for(var i = 0; i < count ; i++){
        var targetId = "scrollerElement" + i
        var elementToUnbold = document.getElementById(targetId)
        console.log(elementToUnbold)
        elementToUnbold.style.fontWeight = "normal";
    }

    element.style.fontWeight = "bolder"

    var scrollerPos = document.getElementById("scroller")
    var valueOfScroll = element.offsetLeft

    scrollerPos.scrollLeft = valueOfScroll - scrollerPos.clientWidth - scrollerPos.clientWidth/4 

    titleFolder.innerHTML = element.innerHTML

    let currentCourse;

    for(let i = 0 ; i < allCoursesData.length ; i++){
        if(allCoursesData[i][1] == element.innerHTML){
            currentCourse = allCoursesData[i]
            break
        }
    }
    $.ajax({
        url:'../php/loadFileContent.php',
        type:'POST',
        data:{
            currentCourseID:currentCourse[0]
        },
        success:function(response){
           let data = JSON.parse(response)
           filesContainer.innerHTML = ""
           for(let x in data){
       
           let fileName = data[x]
           let iconClass =''
           let currentArr = fileName.split('.')
 
           if(currentArr.length > 1){
             iconClass ='pdfIcon ' + filesIcons[currentArr[currentArr.length - 1]]
           }else{
             iconClass = 'pdfIcon fas fa-file-alt'
            
           }
           
           // display data in form of files
           filesContainer.innerHTML += ` <div class="filesRow" id='row${x}'>
           <li class="item list-group-item"><a href="#"></a><i class="listItem ${iconClass}"></i>${fileName}<span
               class="date">30 May</span></li>
         </div>
         `
        }
        let elements = document.getElementsByClassName(`filesRow`)
        for(let i = 0 ; i < elements.length ; i++){
            elements[i].addEventListener('dblclick',function(){

            let currentId =elements[i].id.split('row')[1]
            // Courses/${currentId}/${data[currentId]}
            window.open(`../../../../../../webProjectFiles/Courses/${currentCourse[0]}/${data[currentId]}`)
            })
        }
    }
    })

}

var filesIcons={
    'png':'fas fa-image',
    'jpeg':'fas fa-image',
    'mp4':'fas fa-video',
  }

$(document).ready(function(){
    $.ajax({
        url:'../php/loadAllCourses.php',
        type:'POST',
        success:function(response){
            let data = JSON.parse(response)
            allCoursesData = data
            for(let i=0 ; i < data.length ; i++){
                scroller.innerHTML += `<span class="scrollerElement" id="scrollerElement${count}" onclick="changBackGround('scrollerElement${count}')">${data[i][1]}</span>`
                count++;
            }
        
        }
    })
})
