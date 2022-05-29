<?php
require '../../../extension/makeConnection.php';
session_start();

$title = $_POST['title'];
$aboutThisCourse = $_POST['aboutThisCourse'];
$nbOfHourse = $_POST['nbOfHourse'];
$fees = $_POST['fees'];
$language = $_POST['language'];
$schedual = $_POST['schedual'];
$credits = $_POST['credits'];
$sylabus = $_POST['sylabus'];
$currentCourseID = $_SESSION['currentCourseID'];

$sql = "UPDATE `Course` SET `CourseName`='$title',
`Credits`='$credits',
`Fees`='$fees',
`Hours`='$nbOfHourse',
`Language`='$language',
`Description`='$sylabus',
`Timing`='$schedual',
`AboutCourse`='$aboutThisCourse'
 WHERE `CourseID` = '$currentCourseID' ";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
  } else {
    echo "Error updating record: " . $conn->error;
}


?>