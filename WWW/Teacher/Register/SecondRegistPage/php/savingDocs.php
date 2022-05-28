<?php

require '../../../../extension/makeConnection.php';
require '../../../../extension/extensions.php';

session_start();

// echo "gege";

// var_dump($_FILES);

$fileId = uniqid();

$_SESSION['fileId'] = $fileId;

$x=0;
foreach( $_FILES as $file ){

    saveDocAs('teacher', $file['tmp_name'], $_SESSION['fn'].$_SESSION['ln'], $fileId ,array_Keys($_FILES)[$x]);

    $x += 1;
}


// require '../../../../extension/makeConnection.php';
// require '../../../../extension/extensions.php';


// $fileId = uniqid();

// $x=0;

// foreach( $_FILES as $file ){

//     saveDocAs('student', $file['tmp_name'], $_SESSION['fn'].$_SESSION['ln'], $fileId ,array_Keys($_FILES)[$x]);

//     $x += 1;
// }

?>

<!-- $_SESSION['branch'] = cleanItUp(isset($_POST['branch']) ? $_POST['branch'] : '');
$_SESSION['language'] = cleanItUp($_POST['language']);
$_SESSION['$bloodType'] = cleanItUp($_POST['bloodType']);
$_SESSION['$status'] = cleanItUp($_POST['status']);
$_SESSION['$gender'] = cleanItUp($_POST['gender']);
$_SESSION['$dateOfBirth'] = cleanItUp($_POST['dateOfBirth']);
$_SESSION['$address'] = cleanItUp($_POST['address']);
$_SESSION['$phoneNumber'] = cleanItUp($_POST['phoneNumber']);

$_SESSION['fn'] = cleanItUp($_POST['firstName']);
$_SESSION['ln'] = cleanItUp($_POST['lastName']);
$_SESSION['mn'] = cleanItUp($_POST['middleName']);
$_SESSION['email'] = cleanItUp($_POST['email']);
$_SESSION['password'] = hash("sha512",cleanItUp($_POST['password']));
$_SESSION['university'] = cleanItUp($_POST['university']);
$_SESSION['program'] = cleanItUp($_POST['program']); -->