<?php
session_start();

$currentCourseId = $_SESSION['currentCourseID'];
$allCourses = $_SESSION['teacherCourses'];

for($x = 0 ; $x < count($allCourses) ; $x++){
    if($allCourses[$x]['CourseID'] == $currentCourseId ){
        echo json_encode($allCourses[$x]);
        break;
    }
}
?>