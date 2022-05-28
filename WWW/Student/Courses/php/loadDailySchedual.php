<?php

require '../../../extension/makeConnection.php';

session_start();

$studentId = $_SESSION['studentData']['StudentID'];

// Getting CoursesID

// var_dump($_SESSION['studentData']);

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
            $currentCourseArray = $row;


          $sqlForTeacher = "SELECT * FROM `ManageTeachersAndCourses` WHERE `CourseId` = '$CoursesID[$x]' ";

          if ($resultforTeacher = $conn -> query($sqlForTeacher)) {
            while ($rowForTeacher = $resultforTeacher -> fetch_row()) {
                $teacherID = $rowForTeacher[0];
                
                $sqlForTeacherProfile = "SELECT * FROM `Teacher` WHERE `TeacherId` = '$teacherID' ";

                $resultforTeacherProfile = $conn -> query($sqlForTeacherProfile);

                $resultDataForTeacherProfile = $resultforTeacherProfile-> fetch_row();

                $currentCourseArray['teacherInfo'] =  $resultDataForTeacherProfile;


            
            }
          array_push($arrayOfCoursesDetails,$currentCourseArray);
        }

        }
        $result -> free_result();
    }
}
$_SESSION['coursesData'] = $arrayOfCoursesDetails;

echo json_encode($arrayOfCoursesDetails);

?>