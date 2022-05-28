<?php

require '../../../extension/makeConnection.php';

session_start();

// var_dump($_SESSION['studentData']);
$targetMajor = $_SESSION['studentData']["MajorID"];

$sql = "SELECT * FROM `ManageMajorAndCourses` WHERE `MajorId` = '$targetMajor' ";

$arrayOfCoursesId = array();

if ($result = $conn->query($sql)) {
    while ($row = $result -> fetch_row()) {
      array_push($arrayOfCoursesId,$row[1]);
    }
    $result -> free_result();
}

$arrayOfCourses = array();

for($x = 0 ; $x < count($arrayOfCoursesId); $x++){
    $sql="SELECT * FROM `Course` WHERE `MajorId`= '$arrayOfCoursesId[$x]' ";

    if ($result = $conn->query($sql)) {
        while ($row = $result -> fetch_row()) {

          array_push($arrayOfCourses,$row);

          // // Getting Teacher assosiated this course
          // $courseID = $row[0];
          // $teacherSql = "SELECT * FROM `ManageTeachersAndCourses` WHERE `CourseId` = '$courseID' ";
          // $teacherSqlResponse = $conn->query($teacherSql);
          // $teacherID = ($teacherSqlResponse->fetch_row())[0];
          

          // // Getting teacher Data 
          // $sqlForTeacherData = "SELECT * FROM `Teacher` WHERE `TeacherID` = '$teacherID' ";
          // $teacherDataSqlResponse = $conn->query($sqlForTeacherData);
          // $teacherData = ($teacherDataSqlResponse->fetch_row());
          // $currentCourse['teacherData'] = $teacherData;

          // array_push($arrayOfCourses, $currentArray);
        }
        $result -> free_result();
    }

}

echo json_encode($arrayOfCourses);

$conn->close();

?>