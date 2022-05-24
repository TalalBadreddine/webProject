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
// $test = $_POST['test'];
// $schoolGradesDocument = cleanItUp($_POST['schoolGradesDocument']);
// $personalPhotoDocument = cleanItUp($_POST['personalPhotoDocument']);
// $idOrPassportDocument = cleanItUp($_POST['idOrPassportDocument']);

// $pname = rand(1000,10000) . "-" .  $_FILES['file']['name'];

// $tname = $_FILES['files']['tmp_name'];
define ('SITE_ROOT', realpath(dirname(__FILE__)));


// move_uploaded_file($tname, $upload_dir.'/'.$pname);
// echo "$branch $language $bloodType ";

if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
}
else {
    move_uploaded_file($_FILES['file']['tmp_name'], '../../../../../../../webProjectFiles/Student/' . $_FILES['file']['name']);
}

?>


<!-- $_SESSION['fn'] = cleanItUp($_POST['firstName']);
$_SESSION['ln'] = cleanItUp($_POST['lastName']);
$_SESSION['mn'] = cleanItUp($_POST['middleName']);
$_SESSION['email'] = cleanItUp($_POST['email']);
$_SESSION['password'] = hash("sha512",cleanItUp($_POST['password']));
$_SESSION['university'] = cleanItUp($_POST['university']);
$_SESSION['program'] = cleanItUp($_POST['program']); -->