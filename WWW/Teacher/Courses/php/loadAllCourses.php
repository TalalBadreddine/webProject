<?php

require '../../../extension/makeConnection.php';

session_start();

$teacherID =  $_SESSION['teacherData']['TeacherID']; 

$sql = "SELECT * FROM `ManageTeachersAndCourses` WHERE TeacherId = '$teacherID' ";

$result = $conn->query($sql);

$courses = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        
        $currentCourseID = $row['CourseId'];
    
        $sqlForCourse = "SELECT * FROM `Course` WHERE `CourseId` = '$currentCourseID' ";
        $resultForCourse = $conn->query($sqlForCourse);

        array_push($courses,$resultForCourse->fetch_assoc());

    }
    $_SESSION['teacherCourses'] = $courses;
    echo json_encode($courses);
  } else {
    echo "0 results";
  }

$conn->close();
?>