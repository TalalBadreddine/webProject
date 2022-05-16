
var winX = null;
var winY = null;

// window.addEventListener('scroll', function () {
//     if (winX !== null && winY !== null) {
//         window.scrollTo(winX, winY);
//     }
// });

function showDiv(p1) {
    var elementToShow = document.getElementById(p1)


    elementToShow.style.display = "block"
    elementToShow.style.position = "fixed"
    winX = window.scrollX;
    winY = window.scrollY;

}

function test() {
    var elementToClose = document.getElementById("hiddenPopUp")
    elementToClose.style.display = 'none'
    winX = null;
    winY = null;
}
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");


const Edit_Button = document.getElementById('EditButton');

Edit_Button.addEventListener('click', function () {
    let startDate = startDateInput.value.split(":");
    let endDate = endDateInput.value.split(":");

    if (startDate[0] > endDate[0]) {
        // startDateInput.style.borderColor = "red";
        alert("Error");
        return;
    }

    if ((startDate[0] == endDate[0]) && (startDate[1] >= endDate[1])) {
        alert("Error Minutes");
        return;
    }

    const textarea = document.getElementById('comment')
    textarea.disabled = true
    Edit_Button.innerHTML = "Save";
})

//  Edit_Button.addEventListener('click', function(){
//     textarea.disabled = false
//     Edit_Button.innerHTML = "Edit";
//  })


const addCourseButton = document.getElementById("addCourse");
addCourseButton.addEventListener("click", function () {
    addCourse("Hidden_PopUp")
})

function addCourse(p2) {
    const viewPopUp = document.getElementById(p2);
    viewPopUp.style.display = 'block';
}

const newEditButton = document.getElementsByClassName("description")
addCourseButton.addEventListener("click", function () {
    SaveNewCourse("Hidden_PopUp")
})

const EditButtons = document.getElementsByClassName("apply-btn");
const removeButton = document.getElementById("removeButton");

removeButton.addEventListener("click", remove);

var currentBool = false

function remove() {
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
const cardDiv = document.getElementsByClassName("card-of-course");

for (let j = 0; j < EditButtons.length; j++) {
    EditButtons[j].addEventListener("click", function () {
        if (EditButtons[j].innerHTML == "Remove")
            cardDiv[j].style.display = 'none';
    })
}




function test2() {
    const cancelPopUp = document.getElementById("Hidden_PopUp");
    cancelPopUp.style.display = 'none';
}
const addNewChange = document.getElementById("newEditButton");
addNewChange.addEventListener("click", function () {
    let textArea = document.getElementById("newComment2").innerHTML;
    let array = textArea.split("\n");
    let Objective = [];
    for (let i = 0; i < 3; i++) {
        let currentObjective = array[i].split(":")[1]
        Objective[i] = currentObjective;
    }
    let title = document.getElementById("title")
    let containerDiv = document.getElementById("coursesContainer");
    containerDiv.innerHTML += `<div class="card-of-course">
    <div class="header">
        ${title.value}
    </div>
    <div class="body-card">
        <div class="description">
            <h5>you'll learn how to:</h5>
            <ul>
                <li>${Objective[0]}</li>
                <li>${Objective[1]}</li>
                <li>${Objective[2]}</li>
            </ul>
        </div>
        <div class="footer" id="firstfooter">
            <button class="apply-btn"><a id="firstCardButtonlink" href="../../CourseDetails/html/course_info.html"
                    class="hrefHelper">Edit</a></button>
            <p>credits: 3</p>
        </div>
    </div>
</div> `
    test2()

})

var boolean = false;

document.getElementsByClassName('editButtonForTime')[0].addEventListener('click', function(){
    boolean = !boolean

    if(boolean){
        document.getElementsByClassName('editButtonForTime')[0].innerHTML = "Edit"
        document.getElementsByClassName('TextAreaOfDetails')[0].disabled = true
    }else{
        document.getElementsByClassName('editButtonForTime')[0].innerHTML = "Save"
        document.getElementsByClassName('TextAreaOfDetails')[0].disabled = false


    }
})


/* <div class="card-of-course">
                        <div class="header">
                            coding web
                        </div>
                        <div class="body-card">
                            <div class="description">
                                <h5>you'll learn how to:</h5>
                                <ul>
                                    <li>create responsive web app</li>
                                    <li>make relation with database</li>
                                    <li>sucess in interview</li>
                                </ul>
                            </div>
                            <div class="footer" id="firstfooter">
                                <button class="apply-btn"><a id="firstCardButtonlink" href="../../CourseDetails/html/course_info.html"
                                        class="hrefHelper">Edit</a></button>
                                <p>credits: 3</p>
                            </div>
                        </div>
                    </div> */