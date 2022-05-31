<?php

session_start();
require '../../../extension/makeConnection.php';

$studentId = $_POST['studentId'];
$examNumber = $_SESSION['currentExamData']['currentExam'];
$gradeValue = $_POST['gradeValue'];
$courseId = $_SESSION['currentCourseFileID'];


$sql = "UPDATE `Grades` SET 
`Grade`= '$gradeValue'
 WHERE `StudentId` = '$studentId' AND `CourseId` = '$courseId' AND `ExamNumber` = '$examNumber' ";

 if($conn->query($sql) === TRUE){
     echo "success";
 }else{
     echo $conn->error;
 }

?>