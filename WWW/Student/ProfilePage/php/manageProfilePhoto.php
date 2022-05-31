<?php
session_start();
$path = $_SESSION['studentData']['FirstName'] . $_SESSION['studentData']['LastName'] . '-' . $_SESSION['studentData']['profileId'];
echo($path);
?>