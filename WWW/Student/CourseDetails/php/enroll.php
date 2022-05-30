<?php

require '../../../extension/makeConnection.php';
session_start();

$studentId = $_SESSION['studentData']['StudentID'];
$courseId = $_SESSION['currentCourseData'][0];
$studentMajor = $_SESSION['studentData']['MajorID'];
$nbOfExams = $_SESSION['currentCourseData'][4];

$sql = "INSERT INTO `ManageStudentAndCourses` (`StudentID`, `CourseID`) VALUES ($studentId, $courseId)";


if ($conn->query($sql) === TRUE) {

  for($x = 1 ; $x < $nbOfExams + 1 ; $x++){

    $sql = "INSERT INTO `Grades`(`StudentID`, `CourseId`, `ExamNumber`, `MajorId`) VALUES ('$studentId','$courseId','$x','$studentMajor') ";

    if($conn->query($sql)){

    }

  }
    echo "success";
  } else {
    echo "error" . $conn->error;
  }
  $conn->close();
?>