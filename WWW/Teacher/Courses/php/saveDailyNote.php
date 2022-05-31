<?php
session_start();
require '../../../extension/makeConnection.php';

$courses = $_SESSION['teacherCourses'];
$currentCourse = $_POST['courseName'];
$note = $_POST['note'];

for($x = 0 ; $x < count($courses) ; $x++){
    if($courses[$x]['CourseName'] == $currentCourse){
        $courseId = $courses[$x]['CourseID'];
    } 
}

$sql = "UPDATE `Course` SET `DailyNote` = '$note' WHERE `CourseID` = '$courseId' ";

if($conn->query($sql) == TRUE){
    echo "all good";
}else{
    echo "error";
}

$conn->close();
?>