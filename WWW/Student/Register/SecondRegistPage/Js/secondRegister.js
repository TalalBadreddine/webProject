const gender = document.getElementById("Gender")
const language = document.getElementById('langugeId')
const bloodType = document.getElementById('BloodType')
const status = document.getElementById('statusId')
const branch = document.getElementById("branchId")
const dob = document.getElementById('dob')
const address = document.getElementById('address')
const phoneNumber = document.getElementById('phone')
const schoolGrades = document.getElementById('schoolGrades')
const schoolGradesSpan = document.getElementById('schoolSpan')
const personalPhoto = document.getElementById('personalPhoto')
const personalPhotoSpan = document.getElementById('personalPhotoSpan')
const idOrPassport = document.getElementById('idOrPassport')
const idOrPassportSpan = document.getElementById('idOrPassportSpan')

const submitBtn = document.getElementById('continueBtn')

let arr = {gender, language, bloodType, status, branch, dob, address, phoneNumber,personalPhoto, schoolGrades,idOrPassport}

 function validate(){
     if(
        validateField(branch, "Branch") &&
         validateField(language, "Language") &&
         validateField(bloodType, "BloodType") &&
         validateField(status, "Status") &&
         validateField(gender, "Gender") &&
         validateDob() &&
         validateField(address, "")&&
         validatePhoneNumber()&&
         validateFile(schoolGrades,schoolGradesSpan)&&
         validateFile(personalPhoto,personalPhotoSpan)&&
         validateFile(idOrPassport,idOrPassportSpan)
     ){

        $.ajax({
            url:'../php/studentInfoPart2.php',
            type:'POST',
            data:{
                branch: branch.value,
                language: language.value,
                bloodType: bloodType.value,
                status: status.value,
                gender: gender.value,
                dateOfBirth: dob.value,
                address: address.value,
                phoneNumber: phoneNumber.value,
                schoolGradesDocument: schoolGrades.value,
                personalPhotoDocument: personalPhotoSpan.value,
                idOrPassportDocument: idOrPassport.value 
            },
            success:function(result){
                console.log(result)
            }
        })

        //  window.location.href = '../../ThirdRegisterPage/html/thirdRegisterPage.html'
     }
}

function validateFile(Dom, spanDom){
    let value = Dom.value
   
    if(value == ""){
        applyAnimation(spanDom)
        return false
    }

    return true
}

function validateDob(){
    let value = dob.value

    if(value == ""){
        applyAnimation(dob)
    }

    let date = new Date()

    let currentYear = date.getFullYear()

    let year = value.split('-')[0]

    if(year > currentYear - 15){
        applyAnimation(dob)
        return false
    }

    return true;
}

function resetMe(Id){
    let element = document.getElementById(Id)
    element.style.border = "0.2px solid black"
    element.style.animation = "none"
}

function validatePhoneNumber(){
    let value = phoneNumber.value
    let arrOfValue = value.split('-')

    if(arrOfValue[0].length == value.length ){
        applyAnimation(phoneNumber)
        return false
    }

    for(let i = 0 ; i < arrOfValue.length ; i++){
        if(isNaN(arrOfValue[i])){
            applyAnimation(phoneNumber)
            return false
        }
    }

    if(value == ""){
        applyAnimation(phoneNumber)
        return false
    }

    if(arrOfValue[0].length != 2 || arrOfValue[1].length != 3 || arrOfValue[2].length != 3){
        applyAnimation(phoneNumber)
        return false
    }

    return true
}

function applyAnimation(DomOject){
    DomOject.style.animation = 'wiggle 1.1s';
    DomOject.style.border = " 1.7px solid red";

}

function validateField(dom, value){
    return dom.value != value  || applyAnimation(dom)
}

phoneNumber.addEventListener('keyup', function(){
    
    if(phoneNumber.value.length == 2){
        phoneNumber.value += '-'
    }

    if(phoneNumber.value.length == 6){
        phoneNumber.value += '-'
    }

    if(phoneNumber.value.length >= 10){
        phoneNumber.value =  phoneNumber.value.slice(0,10)
    }

})

function addBranch(branchName){
    branch.innerHTML += `<option>${branchName}</option>`
}

function addLanguage(languageName){

    language.innerHTML += `<option>${languageName}</option>`

}

// File Name

$(document).ready(function(){

    $('#idOrPassport').change(function () {
      $('#idOrPassportSpan').text(this.files[0].name + " file is selected");
      idOrPassportSpan.style.border = "2.3px solid green"
    });

    $('#personalPhoto').change(function () {
        $('#personalPhotoSpan').text(this.files[0].name + " file is selected");
        personalPhotoSpan.style.border = "2.3px solid green"
      });

    $('#schoolGrades').change(function () {
        $('#schoolSpan').text(this.files[0].name + " file is selected");
        schoolSpan.style.border = "2.3px solid green"
      });
});


// Ajax Connections 

// get Branches

var  branchWithMajorJSON = new Set()

branch.addEventListener('change', function(){
    
    branchWithMajorJSON.forEach(function(element){
        addLanguage(element)
    })
})


$(document).ready(function(){

    $.ajax({
        url: '../php/getBranches.php',
        type: 'POST',
        success:function(response){
            let data = JSON.parse(response)
            for(let i = 0 ; i <data.length ; i++){
                addBranch(data[i]['BranchName']);
                branchWithMajorJSON.add(data[i]['MajorLanguage'])
            }

        },error:function (request, status, error) {
            window.location = "../../../LandingPage/Html/LandingPage.html"

        }
    })
})
