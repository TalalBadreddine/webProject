<?php

require '../../../extension/makeConnection.php';

session_start();

$teacherID = $_SESSION['teacherData']['TeacherID'];

$sql = "SELECT * FROM `ManageTeachersAndCourses` WHERE `TeacherId` = $teacherID ";

$result = $conn->query($sql);
$coursesId = array();

while($row = $result->fetch_assoc()){
    $currentCourseId = $row['CourseId'];

    $sqlForCourseInfo = "SELECT * FROM `Course` WHERE `CourseID` = $currentCourseId ";
    $resultForCourseInfo = $conn->query($sqlForCourseInfo);

    array_push($coursesId,  $resultForCourseInfo->fetch_row());
}

echo json_encode($coursesId);

?>