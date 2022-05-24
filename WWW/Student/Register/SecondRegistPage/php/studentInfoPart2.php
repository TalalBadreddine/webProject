<?php

require '../../../../extension/makeConnection.php';
require '../../../../extension/extensions.php';


session_start();

// $branch = cleanItUp(isset($_POST['branch']) ? $_POST['branch'] : '');
// $language = cleanItUp($_POST['language']);
// $bloodType = cleanItUp($_POST['bloodType']);
// $status = cleanItUp($_POST['status']);
// $gender = cleanItUp($_POST['gender']);
// $dateOfBirth = cleanItUp($_POST['dateOfBirth']);
// $address = cleanItUp($_POST['address']);
// $phoneNumber = cleanItUp($_POST['phoneNumber']);
$fileId = uniqid();
// $test = $_POST['test'];
// $schoolGradesDocument = cleanItUp($_POST['schoolGradesDocument']);
// $personalPhotoDocument = cleanItUp($_POST['personalPhotoDocument']);
// $idOrPassportDocument = cleanItUp($_POST['idOrPassportDocument']);


saveDocAs('teacher', $_FILES['file']['name'], $_SESSION['fn'].$_SESSION['ln'], '628d5f1c363d6', "exam")

?>


<!-- $_SESSION['fn'] = cleanItUp($_POST['firstName']);
$_SESSION['ln'] = cleanItUp($_POST['lastName']);
$_SESSION['mn'] = cleanItUp($_POST['middleName']);
$_SESSION['email'] = cleanItUp($_POST['email']);
$_SESSION['password'] = hash("sha512",cleanItUp($_POST['password']));
$_SESSION['university'] = cleanItUp($_POST['university']);
$_SESSION['program'] = cleanItUp($_POST['program']); -->