<?php

require '../../../../extension/extensions.php';
require '../../../../../../../phpmailer/index.php';


session_start();

$_SESSION['fn'] = cleanItUp($_POST['firstName']);
$_SESSION['ln'] = cleanItUp($_POST['lastName']);
$_SESSION['mn'] = cleanItUp($_POST['middleName']);
$_SESSION['email'] = cleanItUp($_POST['email']);
$_SESSION['password'] = hash("sha512",cleanItUp($_POST['password']));
$_SESSION['university'] = cleanItUp($_POST['university']);
$_SESSION['program'] = cleanItUp($_POST['program']);

$randomCode = generateRandomCode();
$_SESSION['randomCode'] = $randomCode;

sendEmailTo($_SESSION['email'], "you're verification code is : $randomCode  don't share it with anyone");

?>