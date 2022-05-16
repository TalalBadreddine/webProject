
document.getElementById('add').addEventListener('click', function(){
            add()
        })

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
    
    
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
  
    
    });
    function addadmin() {
        let x = document.getElementById("createadmin");
        if (x.style.display === "none") {
            x.style.display = "block";
    
        }
        else {
            x.style.display = "none";
        }
    
    }
    
    
        date = new Date();
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        var date=document.getElementById("date");
        
        
       
    function add(){
        let fname = document.getElementById("fullname");
        var lname = document.getElementById("lastname");
        var email=document.getElementById("email");
        var number=document.getElementById("number");
        var table = document.getElementById("tbl1");
        
       
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        
        // rIndex=this.rowindex;
        row.insertCell(0).innerHTML = fname.value +" "+ lname.value ;
        row.insertCell(1).innerHTML = email.value +"<br>"+ number.value;
        row.insertCell(2).innerHTML = "<label> Added on </label>" +" " +day + "/" + month + "/" + year;
        row.insertCell(3).innerHTML = '<button type="button"  style="font-size:25px; border: 0px ;border-radius:50%; background-color:red;width:34px; color:white; margin-left:25%;" onClick="Javacsript:deleteRow(this)"><i class="fa fa-close"></i></button>' ;
       
       
    }
    function deleteRow(obj) {
        var index = obj.parentNode.parentNode.rowIndex;
        var table = document.getElementById("tbl1");
        table.deleteRow(index);
    }
    function selectedRow(){
        for (var i=0; i<rowCount;i++){
            table.rows[i].onclick=function(){
                //rIndex=this.rowindex;
                fname.value=this.cells[0].innerHTML;
                
            }
        }
        }
    
    // Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
     