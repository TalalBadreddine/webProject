<?php

require '../../../extension/makeConnection.php';

session_start();

$courseId = $_POST['courseId'];
$studentId = $_SESSION['studentData']['StudentID'];

$sql = "DELETE FROM `ManageStudentAndCourses` WHERE `CourseID` = '$courseId' ";

if ($conn->query($sql) === TRUE) {
    echo "success";
  } else {
    echo "error" . $conn->error;
  }

$conn->close();

?>