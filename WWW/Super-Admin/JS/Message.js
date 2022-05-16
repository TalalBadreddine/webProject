document.addEventListener("DOMContentLoaded", function(event) {
   
  const showNavbar = (toggleId, navId, bodyId, headerId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId),
  bodypd = document.getElementById(bodyId),
  headerpd = document.getElementById(headerId)
    
  // Validate that all variables exist
  if(toggle && nav && bodypd && headerpd){
  toggle.addEventListener('click', ()=>{
  // show navbar
  nav.classList.toggle('show')
  // change icon
  toggle.classList.toggle('bx-x')
  // add padding to body
  bodypd.classList.toggle('body-pd')
  // add padding to header
  headerpd.classList.toggle('body-pd')
  })
  }
  }
  
  showNavbar('header-toggle','nav-bar','body-pd','header')
  
  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')
  
  function colorLink(){
  if(linkColor){
  linkColor.forEach(l=> l.classList.remove('active'))
  this.classList.add('active')
  }
  }
  $('#Admins-options').change(function () {
    var optionSelected = $(this);
    var valueSelected   = optionSelected.val();

    $("#titleAdmin").text(valueSelected);
  });
  $( "#chatForm" ).submit(function( event) {

   var value= $("#input-message").val();
   var d = new Date();
   var time = d.getHours() + ":" + d.getMinutes()
   if(value!=null && value!=""){
    $( ".chat-log" ).append( "<div class='chat-log__item chat-log__item--own' id='answer-chat'>"
    +"<h3 class='chat-log__author' id='chatauthor'>Admin1: <small>"+time+"</small></h3>"
    +"<div class='chat-log__message' id='chatmessage'>"+value+"</div>"
  +"</div>");
   }
   else {alert("Please write your message") }
   $("#input-message").val("");
   alert("your message was successfuly send");
  
  }); 
  linkColor.forEach(l=> l.addEventListener('click', colorLink))

   // Your code to run since DOM is loaded and ready
  });

  // document.getElementById(Admins.innerHTML)= document.getElementById(A1.innerHTML);
    // function myFunction() {
    //     document.getElementById("demo").innerHTML =show;
    //   } 
    //   var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    //   var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    //     return new bootstrap.Dropdown(dropdownToggleEl)
    //   })