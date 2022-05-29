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

<!-- {"sylabus":"Css1-Css2-Css3-Css4",
    "aboutThisCourse":"In higher education a course is a unit of teaching that typically lasts one academic term, is led by one or more instructors, and has a fixed roster of students. A course usually covers an individual subject. Courses generally have a fixed program of sessions every week during the term, called lessons or classes.Js",
    "nbOfHourse":"40",
    "fees":"2000",
    "language":"English",
    "title":"CSS",
    "schedual":"Monday: 16-\/18-Friday: 8-\/10-Saturday: 14-\/17-"} -->