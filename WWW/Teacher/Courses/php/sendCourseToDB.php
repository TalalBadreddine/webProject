<?php

require '../../../extension/makeConnection.php';
session_start();


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
     
      $sql = "INSERT INTO `ManageMajorAndCourses`(`MajorId`, `CourseId`) VALUES ('$majorId','$last_id') ";

      if($conn->query($sql) == TRUE){

          // for($x = 1 ; $x < $NumberOfExams + 1 ; $x++){
          //   $sql = "INSERT INTO `Exam`(`ExamName`) VALUES ([value-1],[value-2])";
          // }

        if (!file_exists('../../../../../../webProjectFiles/Courses/'.$last_id.'/')) {
          mkdir('../../../../../../webProjectFiles/Courses/'.$last_id.'/', 0777, true);
      }

        echo json_encode($CourseName);
      }

    }

  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

?>