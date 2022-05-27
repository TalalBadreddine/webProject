<?php
session_start();

$currentCourseCode =  $_SESSION['currentCourse'];
$arrayOfCourses = $_SESSION['arrayOfFilteredCourses'];
$currentCourseData = '';

for($x = 0 ; $x < count($arrayOfCourses); $x++){
    if(($arrayOfCourses[$x][5] == $currentCourseCode)){
        $currentCourseData = $arrayOfCourses[$x];
    };
}
echo json_encode($currentCourseData);
?>