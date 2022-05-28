<?php

require '../../../extension/extensions.php';
require '../../../../../../phpmailer/index.php';

session_start();

$email = cleanItUp($_POST['email']);
$randomCode = generateRandomCode();
$_SESSION['randomCode'] = $randomCode;
$_SESSION['email'] = $email;

sendEmailTo($email, "you're verification code is : $randomCode  don't share it with anyone");

?>