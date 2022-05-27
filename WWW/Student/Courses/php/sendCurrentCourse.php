<?php

session_start();

$_SESSION['currentCourse']= $_POST['courseName'];
$_SESSION['arrayOfFilteredCourses'] =  $_POST['arrayOfFilteredCourses'];

?>