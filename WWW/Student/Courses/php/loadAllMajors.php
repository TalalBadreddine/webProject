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
        }
        $result -> free_result();
    }

}

echo json_encode($arrayOfCourses);

$conn->close();

?>