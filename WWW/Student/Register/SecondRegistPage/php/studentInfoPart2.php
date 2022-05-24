<?php

require '../../../../extension/makeConnection.php';
require '../../../../extension/extensions.php';


session_start();

$branch = cleanItUp($_SESSION['branch']);
$language = cleanItUp($_SESSION['language']);
$bloodType = cleanItUp($_SESSION['bloodType']);
$status = cleanItUp($_SESSION['status']);
$gender = cleanItUp($_SESSION['gender']);
$dateOfBirth = cleanItUp($_SESSION['dateOfBirth']);
$address = cleanItUp($_SESSION['address']);
$phoneNumber = cleanItUp($_SESSION['phoneNumber']);
$schoolGradesDocument = cleanItUp($_SESSION['schoolGrades']);
$personalPhotoDocument = cleanItUp($_SESSION['personalPhotoDocument']);

//  echo $_SESSION['fn'] . $_SESSION['ln'] . $_SESSION['mn'] . $_SESSION['password'] . $_SESSION['randomCode'] . $_POST['address'];

?>

                <!-- branch: branch.value,
                language: language.value,
                bloodType: bloodType.value,
                status: status.value,
                gender: gender.value,
                dateOfBirth: dob.value,
                address: address.value,
                phoneNumber: phoneNumber.value,
                schoolGradesDocument: schoolGrades.value,
                personalPhotoDocument: personalPhotoSpan.value,
                idOrPassportDocument: idOrPassport.value  -->