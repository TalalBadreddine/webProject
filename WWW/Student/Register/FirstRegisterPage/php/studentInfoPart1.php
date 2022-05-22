<?php

include '../../../../extension/extensions.php';

session_start();

$_SESSION['fn'] = cleanItUp($_POST['firstName']);
$_SESSION['ln'] = cleanItUp($_POST['lastName']);
$_SESSION['mn'] = cleanItUp($_POST['middleName']);
$_SESSION['email'] = cleanItUp($_POST['email']);
$_SESSION['password'] = cleanItUp($_POST['password']);
$randomCode = generateRandomCode();
$_SESSION['randomCode'] = $randomCode;


sendEmailTo($email, "you're verification code is : $randomCode  don't share it with anyone");



?>