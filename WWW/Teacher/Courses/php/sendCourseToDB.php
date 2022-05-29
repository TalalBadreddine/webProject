<?php

require '../../../extension/makeConnection.php';
session_start();
var_dump($_SESSION);


$CourseName = $_POST['CourseName'];
$Credits = $_POST['Credits'];
$Fees = $_POST['Fees'];
$NumberOfExams = $_POST['NumberOfExams'];
$CourseCode = $_POST['CourseCode'];
$Hours = $_POST['Hours'];
$Rating = 4;
$Language = $_POST['Language'];
$Description = $_POST['Description'];
$Timing = $_POST['Timing'];
$majorId = $_SESSION['teacherData']['MajorID'];
$AboutCourse = $_POST['AboutCourse'];
$startDate = $_POST['startDate'];
$endDate = $_POST['endDate'];


$sql = "INSERT INTO `Course`(`CourseName`,
 `Credits`,
  `Fees`,
   `NumberOfExams`,
    `CourseCode`,
     `Hours`, 
     `Rating`,
      `Language`,
       `Description`,
         `Timing`,
          `MajorId`,
           `AboutCourse`,
            `startDate`, 
            `endDate`)
             VALUES ( 
                 '$CourseName',
                 '$Credits',
                 '$Fees',
                 '$NumberOfExams',
                 '$CourseCode',
                 '$Hours',
                 '$Rating',
                 '$Language',
                 '$Description',
                 '$Timing',
                 '$majorId',
                 '$AboutCourse',
                 '$startDate',
                 '$endDate'
                 )";

$teacherID = $_SESSION['teacherData']['TeacherID'];
if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    
    $sql = "INSERT INTO `ManageTeachersAndCourses`(`TeacherId`, `CourseId`) VALUES ('$teacherID','$last_id')";

    if($conn->query($sql) == TRUE){
      echo "success";
    }

  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

?>