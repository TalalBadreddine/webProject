<?php

require '../../../extension/makeConnection.php';
require '../../../extension/extensions.php';

session_start();

$email = cleanItUp($_SESSION['email']);
$password = hash("sha512",cleanItUp($_POST['newPassword']));

// Check in student;

$sqlForStudent = "SELECT * FROM Student WHERE Email = '$email'  AND isApplying = '0' ";


$result = $conn->query($sqlForStudent) ;

$row = $result -> fetch_assoc();

if($row){
   $updateSql = "UPDATE `Student` SET `Password`= '$password' WHERE `Email` = '$email' ";

   $result = $conn->query($updateSql) ;

   exit("student");
}

// check in Teacher


$sqlForTeacher = "SELECT * FROM Teacher WHERE Email = '$email' ";


$result = $conn->query($sqlForTeacher) ;

$row = $result -> fetch_assoc();

if($row){
   $updateSql = "UPDATE `Teacher` SET `Password`= '$password' WHERE `Email` = '$email' ";
   $result = $conn->query($updateSql) ;
   exit("Teacher");
}


// check in Admin 

$sqlForAdmin = "SELECT * FROM Admin WHERE Email = '$email' ";


$result = $conn->query($sqlForTeacher) ;

$row = $result -> fetch_assoc();

if($row){
   $updateSql = "UPDATE `Admin` SET `Password`= '$password' WHERE `Email` = '$email' ";
   $result = $conn->query($updateSql) ;
   exit("Admin");
}

exit("Not Found")

?>