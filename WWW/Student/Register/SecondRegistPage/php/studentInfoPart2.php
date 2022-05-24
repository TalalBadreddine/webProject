<?php

require '../../../../extension/extensions.php';


session_start();

$_SESSION['branch'] = cleanItUp(isset($_POST['branch']) ? $_POST['branch'] : '');
$_SESSION['language'] = cleanItUp($_POST['language']);
$_SESSION['$bloodType'] = cleanItUp($_POST['bloodType']);
$_SESSION['$status'] = cleanItUp($_POST['status']);
$_SESSION['$gender'] = cleanItUp($_POST['gender']);
$_SESSION['$dateOfBirth'] = cleanItUp($_POST['dateOfBirth']);
$_SESSION['$address'] = cleanItUp($_POST['address']);
$_SESSION['$phoneNumber'] = cleanItUp($_POST['phoneNumber']);

// $schoolGradesDocument = cleanItUp($_POST['schoolGradesDocument']);
// $personalPhotoDocument = cleanItUp($_POST['personalPhotoDocument']);
// $idOrPassportDocument = cleanItUp($_POST['idOrPassportDocument']);


?>


<!-- $_SESSION['fn'] = cleanItUp($_POST['firstName']);
$_SESSION['ln'] = cleanItUp($_POST['lastName']);
$_SESSION['mn'] = cleanItUp($_POST['middleName']);
$_SESSION['email'] = cleanItUp($_POST['email']);
$_SESSION['password'] = hash("sha512",cleanItUp($_POST['password']));
$_SESSION['university'] = cleanItUp($_POST['university']);
$_SESSION['program'] = cleanItUp($_POST['program']); -->