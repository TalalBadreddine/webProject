<?php
session_start();
$path = $_SESSION['teacherData']['FirstName'] . $_SESSION['teacherData']['LastName'] . '-' . $_SESSION['teacherData']['profileId'];
echo($path);
?>