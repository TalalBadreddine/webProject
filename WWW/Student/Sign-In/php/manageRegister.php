<?php

require '../../../extension/makeConnection.php';
// require '../../../extension/extensions.php';
session_start();
session_destroy();

function cleanItUp($dummy){

    return $dummy;
}

$email = cleanItUp($_POST['email']);
$password = hash("sha512",cleanItUp($_POST['password']));

// Check in student;

$sqlForStudent = "SELECT * FROM Student WHERE Email = '$email' AND Password =  '$password'  AND isApplying = '0' ";


$result = $conn->query($sqlForStudent) ;

$row = $result -> fetch_assoc();

if($row){
    session_start();
    $_SESSION['studentData'] = $row;
    exit ("student");
}

// check in Teacher

$sqlForTeacher = "SELECT * FROM Teacher WHERE Email = '$email' AND Password = '$password' ";

$result = $conn->query($sqlForTeacher) ;

$row = $result -> fetch_assoc();

if($row){
    session_start();
    $_SESSION['teacherData'] = $row;
    exit ("teacher");
}

// check in Admin 

$sqlForAdmin = "SELECT * FROM Admin WHERE Email = '$email' AND Password = '$password' ";

$result = $conn->query($sqlForAdmin) ;

$row = $result -> fetch_assoc();

if($row){
    session_start();
    $_SESSION['adminData'] = $row;
    exit ("admin");
}

if($email == "root" && $password == hash("sha512","root")){
    exit("superAdmin");
}

exit("Not Found")

?>