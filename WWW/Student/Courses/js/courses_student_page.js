var winX = null;
var winY = null;

// window.addEventListener('scroll', function () {
//     if (winX !== null && winY !== null) {
//         window.scrollTo(winX, winY);
//     }
// });

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
