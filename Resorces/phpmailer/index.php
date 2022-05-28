<?php

require 'includes/Exception.php';
require 'includes/PHPMailer.php';
require 'includes/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendEmailTo($target, $message){


$mail = new PHPmailer();

$mail->isSMTP();

$mail->Host = "smtp.gmail.com";

$mail->SMTPAuth = "true";

$mail->SMTPSecure = "tls";

$mail->Port = "587";

$mail->Username = "managementsystemcollege@gmail.com";

$mail->Password = "CMSCollege778899";

$mail->Subject = "Verification Code";

$mail->SetFrom("CollegeManagmentSystem@gmail.com");

$mail->Body = "$message";

$mail->addAddress("$target");

if( $mail->Send() ){
    echo "email is sent";
}else{
    echo "error";
}

$mail->smtpClose();

}


?>