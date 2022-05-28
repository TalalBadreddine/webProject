<?php

require '../../../extension/makeConnection.php';
session_start();

$studentId = $_SESSION['studentData']['StudentID'];
$courseId = $_SESSION['currentCourseData'][0];

$sql = "INSERT INTO `ManageStudentAndCourses` (`StudentID`, `CourseID`) VALUES ($studentId, $courseId)";


if ($conn->query($sql) === TRUE) {
    echo "success";
  } else {
    echo "error" . $conn->error;
  }
  $conn->close();
?>