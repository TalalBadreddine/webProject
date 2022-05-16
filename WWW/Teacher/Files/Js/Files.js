
function move(p1, p2){
    var value = 80
    var scrollDirection = p2 == 'left'? -value : value

    var element = document.getElementById("scroller")

    element.scrollLeft += scrollDirection

}

document.getElementById('examsCheat').addEventListener('click', function(){
  window.location.href = ("../Html/studentTable.html")
})

function changBackGround(p1){
    var element = document.getElementById(p1)

    for(var i = 1; i < 11 ; i++){
        var targetId = "scrollerElement" + i
        var elementToUnbold = document.getElementById(targetId)
        elementToUnbold.style.fontWeight = "normal";
    }

    element.style.fontWeight = "bolder"

    var scrollerPos = document.getElementById("scroller")
    var valueOfScroll = element.offsetLeft

    scrollerPos.scrollLeft = valueOfScroll - scrollerPos.clientWidth - scrollerPos.clientWidth/4 
}


// Long click function
// Now its a double click

var pressTimer;

const deleteButtonDiv = document.getElementById("hiddenDelete")
const filesUlDiv = document.getElementById("files")
const fileDivs = document.getElementsByClassName("filesRow")
var posArr ;

for (let i = 0; i < fileDivs.length; i++) {

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


/*$(".fileItems").dblclick(function(e){
//   clearTimeout(pressTimer);
//   // Clear timeout
//   return false;
// }).mousedown(function(e){
//   // Set timeout
//   pressTimer = window.setTimeout(function() { 
      console.log(this.clientY)
      let currentItem = e
      let currentId = currentItem.currentTarget.id

      let deleteXPos = currentItem.clientX + "px"
      let deleteYPos = parseInt(currentItem.clientY)+ "px"

      // let deleteXPos = this.offsetLeft
      // let deleteYPos
        
      deleteButtonDiv.style.zIndex = "43"
      deleteButtonDiv.style.left = deleteXPos
      deleteButtonDiv.style.top =  deleteYPos
      deleteButtonDiv.style.border = "1px solid black"
      deleteButtonDiv.style.borderRadius = "12px"
      deleteButtonDiv.style.backgroundColor = "red"
      deleteButtonDiv.style.color = "white"
      deleteButtonDiv.style.width = "70px"
      deleteButtonDiv.style.height = "30px"
      deleteButtonDiv.style.display = "block"

      
      function getMouseXPos(event) {
        return event.clientX 
      }

      function getMouseYPos(event) {
        return event.clientY
      }
      
        
    document.addEventListener("click", function(e){
        let currentX = getMouseXPos(e)
        let currentY = getMouseYPos(e)

        //|| currentY < parseInt(deleteYPos)  || currentY > parseInt(deleteYPos) + 31

       if(currentX < parseInt(deleteXPos) || currentX > parseInt(deleteXPos)+71 ){
        deleteButtonDiv.style.display = "none"
       }
    });

      deleteButtonDiv.addEventListener('click',  function(){
          console.log(currentItem.currentTarget)
          currentItem.currentTarget.style.display = "none"
         });
         return false; 
    })/*,600);*/
 




// function showPosition(e){

//     var xPosition = e.clientX;
//     var yPosition = e.clientY;

// }
// ----------------------



const files = document.getElementById("FileUpload1")

const addCourseBtn = document.getElementById("addCourse")

const addingToTableBtn = document.getElementById("submitAddition")

addCourseBtn.addEventListener('click', uploadClicked)

addingToTableBtn.addEventListener('click', addFilesToTable)

var allFiles = []

function uploadClicked(){

    files.click()
    if(files.value != " "){
      allFiles.push(files.value)
      console.log(allFiles)
    }

}

var date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var startNumber = 1;
function addFilesToTable(){
    allFiles.push(files.value)

    for(let i = 1 ; i < allFiles.length ; i++){
        let fileArr = allFiles[i].split("\\")
        let fileName = fileArr[fileArr.length - 1];

    //     <div class="filesRow" id="row1">
    //     <li class="fileItems item list-group-item" id="filesItem1" data-long-press-delay="500"><a href="#"></a><i class="pdfIcon fas fa-file-alt"></i> file1.pdf<span
    //         class="date">5 Feb</span></li>
    //   </div>

        filesUlDiv.innerHTML  +=  `<div class ='filesRow ${startNumber+3}' id = 'row ${startNumber+3}'> <li class='fileItems item list-group-item' id='filesItem1'  data-long-press-delay='500'><a href='#'></a><i class='pdfIcon fas fa-file-alt'></i><span class='fileName'>${fileName}</span><span class='deleteBtnSpan ${startNumber + 3}'><button class='deleteBtn' onclick='deleteMe(${startNumber+3})' >delete</button></span><span class='date'>${date.getDate()} ${monthNames[date.getMonth()]}</span></li></div>`
        startNumber++
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
  document.getElementById(divToDeleteName).style.display = "none"
}