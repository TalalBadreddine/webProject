function move(p1, p2){
    var value = 80
    var scrollDirection = p2 == 'left'? -value : value

    var element = document.getElementById("scroller")

    element.scrollLeft += scrollDirection

}

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
