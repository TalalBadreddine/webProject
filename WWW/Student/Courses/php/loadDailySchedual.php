<?php

require '../../../extension/makeConnection.php';

session_start();

$studentId = $_SESSION['studentData']['StudentID'];

// Getting CoursesID

$sqlForCourses = "SELECT * FROM `ManageStudentAndCourses` WHERE `StudentID` = '$studentId' ";

$CoursesID = array();

if ($result = $conn -> query($sqlForCourses)) {
    while ($row = $result -> fetch_row()) {
      array_push($CoursesID,$row[1]);
    }
    $result -> free_result();
}

// Getting Courses Details

$arrayOfCoursesDetails = array();
$arrayOfCoursesTeacherForCourses = array();

for($x = 0 ; $x < count($CoursesID) ; $x++){
    $sql = "SELECT * FROM `Course` WHERE `CourseID` = '$CoursesID[$x]' ";

    if ($result = $conn -> query($sql)) {
        while ($row = $result -> fetch_row()) {
          array_push($arrayOfCoursesDetails,$row);

        //   $sqlForTeacher = "SELECT * FROM `ManageTeachersAndCourses` WHERE `CourseId` = '$CoursesID[$x]' ";

        //   if ($result = $conn -> query($sqlForCourses)) {
        //     while ($row = $result -> fetch_row()) {
        //       array_push($CoursesID,$row[1]);
        //     }
        //     $result -> free_result();
        // }

        }
        $result -> free_result();
    }
}

echo json_encode($arrayOfCoursesDetails);

?>