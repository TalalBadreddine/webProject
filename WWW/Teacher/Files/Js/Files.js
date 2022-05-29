const scroller = document.getElementById("scroller")
const CourseName = document.getElementById("CourseName")


function move(p1, p2){
    var value = 130
    var scrollDirection = p2 == 'left'? -value : value

    var element = scroller

    element.scrollLeft += scrollDirection

}

var count = 0 ;

var countAndfileLocation = {};

document.getElementById('examsCheat').addEventListener('click', function(){
  window.location.href = ("../Html/studentTable.html")
})

function getCurrentCourseSettings(p1){
    var element = document.getElementById(p1)
    let allCourses = document.getElementsByClassName("scrollerElement")

    for(var i = 1; i < allCourses.length ; i++){
        var targetId = "scrollerElement" + i
        var elementToUnbold = document.getElementById(targetId)
        if(elementToUnbold != undefined){
         
          elementToUnbold.style.fontWeight = "normal";
        }
    }

    element.style.fontWeight = "bolder"

    var scrollerPos = scroller
    var valueOfScroll = element.offsetLeft

    scrollerPos.scrollLeft = valueOfScroll - scrollerPos.clientWidth - scrollerPos.clientWidth/4 
    CourseName.innerHTML = element.innerHTML

    $.ajax({
      url:'../php/loadAllFiles.php',
      type:'POST',
      data:{
        courseName: element.innerHTML
      },
      success:function(response){
        let data = JSON.parse(response)
        console.log(data)
        let filesHtml = ''
        for(let x in data){

          let fileName = data[x]
          let iconClass =''
          let currentArr = fileName.split('.')

          if(currentArr.length > 1){
            iconClass ='pdfIcon ' + filesIcons[currentArr[currentArr.length - 1]]
          }else{
            iconClass = 'pdfIcon fas fa-file-alt'
           
          }

          filesHtml += `
                <div class="filesRow ${count} , ${fileName} " id="row ${count}">
                         <li class="fileItems item list-group-item ${data[x]}" id="filesItem${count}"><a href="#"></a><i class='${iconClass}'></i><span class="fileName">${fileName}</span><span class="deleteBtnSpan ${count}"><button class="deleteBtn" onclick="deleteMe('${count}')">delete</button></span><span
                class="date">${date.getDate()} ${monthNames[date.getMonth()]}</span></li>
                </div>
              `
            
        
              count++;
        filesUlDiv = document.getElementById("files")
        fileDivs = document.getElementsByClassName("filesRow")
        for (let i = 0; i < fileDivs.length; i++) {

          let currentPath = `${fromCourseNameToId[CourseName.innerHTML]}/${fileDivs[i].className.split(',')[1].trim()}`
          countAndfileLocation[count] = currentPath

          fileDivs[i].addEventListener('contextmenu',function(){
            window.open(`../../../../../../webProjectFiles/Courses/${currentPath}`)
          })

          // show the button
           fileDivs[i].addEventListener('dblclick', function() {
            showingDeleteBtn(fileDivs[i].id)
          });}
         
}

filesUlDiv.innerHTML = filesHtml
filesUlDiv = document.getElementById("files")
fileDivs = document.getElementsByClassName("filesRow")
for (let i = 0; i < fileDivs.length; i++) {

  let currentPath = `${fromCourseNameToId[CourseName.innerHTML]}/${fileDivs[i].className.split(',')[1].trim()}`
  countAndfileLocation[count] = currentPath

  fileDivs[i].addEventListener('contextmenu',function(){
    window.open(`../../../../../../webProjectFiles/Courses/${currentPath}`)
  })

  // show the button
   fileDivs[i].addEventListener('dblclick', function() {
    showingDeleteBtn(fileDivs[i].id)
  });}

}})

}

// Now its a double click

var pressTimer;

const deleteButtonDiv = document.getElementById("hiddenDelete")
var filesUlDiv = document.getElementById("files")
var fileDivs = document.getElementsByClassName("filesRow")
var posArr ;

for (let i = 0; i < fileDivs.length; i++) {

  fileDivs[i].addEventListener('click',function(){
    window.open = `../../../../../../webProjectFiles/Courses/${fileDivs[i].split(',')[1]}`
  })

  // show the button
  fileDivs[i].addEventListener('dblclick', function() {
    // console.log(fileDivs[i].id)
    showingDeleteBtn(fileDivs[i].id)
  });


}

function showingDeleteBtn(p1){
  let arrOfClass = p1.split(" ")
  let currentDivId = p1[p1.length - 1]
  let hiddenSpan = document.getElementsByClassName(`deleteBtnSpan ${currentDivId}`)[0]
  

  if(hiddenSpan.style.display == "block"){
    hiddenSpan.style.display = "none"
  }else{
    hiddenSpan.style.display = "block"
  }
}


// window.open('../../../../../../webProjectFiles/Student/talalbadreddine-628e64288dca8/personalPhoto');


const files = document.getElementById("FileUpload1")

const addCourseBtn = document.getElementById("addCourse")

const addingToTableBtn = document.getElementById("submitAddition")

addCourseBtn.addEventListener('click', function(){
  files.click()
})

files.addEventListener('change', uploadFiles)
addingToTableBtn.addEventListener('click', addFilesToTable)

var allFiles = []
var numberOfFile = 0;

var filesIcons={
  'png':'fas fa-image',
  'jpeg':'fas fa-image',
  'mp4':'fas fa-video',
}

function uploadFiles(){
  if(files.value != " "){
    let fileArr = files.value.split("\\")
    let fileName = fileArr[fileArr.length - 1];

    filesUlDiv.innerHTML  +=  `<div class ='filesRow ${count}' id = 'row ${count}'> <li class='fileItems item list-group-item' id='filesItem1'  data-long-press-delay='500'><a href='#'></a><i class='pdfIcon fas fa-file-alt'></i><span class='fileName'>${fileName}</span><span class='deleteBtnSpan ${count}'><button class='deleteBtn' onclick='deleteMe(${count})' >delete</button></span><span class='date'>${date.getDate()} ${monthNames[date.getMonth()]}</span></li></div>`
    
    let form_data = new FormData()

    form_data.append(numberOfFile,$('#FileUpload1').prop('files')[0])

    $.ajax({
      url:'../php/addFile.php',
      type:'POST',
      dataType: 'text', 
      contentType: false,
      processData: false,
      data: form_data,
      success:function(response){
        alert(response)
      }
    })
    
    count++
    let refreshClassElement = document.getElementsByClassName("filesRow")

    for (let i = 0; i < refreshClassElement.length; i++) {

      if(typeof(refreshClassElement[i]) != "undefined"){
        refreshClassElement[i].addEventListener('dblclick', function() {
          showingDeleteBtn(refreshClassElement[i].id)
        });
      }
    }
    
 }
}


var date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
function addFilesToTable(){
    allFiles.push(files.value)

    for(let i = 1 ; i < allFiles.length ; i++){
       count++;
        let fileArr = allFiles[i].split("\\")
        let fileName = fileArr[fileArr.length - 1];

        filesUlDiv.innerHTML  +=  `<div class ='filesRow ${count}' id = 'row ${count}'> <li class='fileItems item list-group-item' id='filesItem1'  data-long-press-delay='500'><a href='#'></a><i class='pdfIcon fas fa-file-alt'></i><span class='fileName'>${fileName}</span><span class='deleteBtnSpan ${count}'><button class='deleteBtn' onclick='deleteMe(${count})' >delete</button></span><span class='date'>${date.getDate()} ${monthNames[date.getMonth()]}</span></li></div>`


    }

    let refreshClassElement = document.getElementsByClassName("filesRow")

    for (let i = 0; i < refreshClassElement.length; i++) {

      if(typeof(refreshClassElement[i]) != "undefined"){
        refreshClassElement[i].addEventListener('dblclick', function() {
          showingDeleteBtn(refreshClassElement[i].id)
        });
      }
    }
    allFiles = []
}

function deleteMe(p1){
  let divToDeleteName = `row ${p1}`
  console.log(p1)
  console.log(countAndfileLocation[parseInt(p1)+1])
  $.ajax({
    url:'../php/deleteFile.php',
    type:'POST',
    data:{
      path:countAndfileLocation[parseInt(p1)+1]
    },
    success:function(response){
      document.getElementById(divToDeleteName).style.display = "none"
      console.log(response)
    }
  })
}

// load All Courses From DB 
var fromCourseNameToId = {}

$(document).ready(function(){
  $.ajax({
    url:'../php/loadAllCourses.php',
    type:'POST',
    success:function(response){

      let allCourses = JSON.parse(response)
    
      for(let i= 0 ; i < allCourses.length ; i++){
        fromCourseNameToId[allCourses[i]["CourseName"]] = allCourses[i]["CourseID"]
        addToScroller(allCourses[i])
      }
    }
  })
})

function addToScroller(arr){
  scroller.innerHTML += `<span class="scrollerElement" id="scrollerElement${arr["CourseID"]}" onclick="getCurrentCourseSettings('scrollerElement${arr["CourseID"]}')">${arr["CourseName"]}</span>`
}
