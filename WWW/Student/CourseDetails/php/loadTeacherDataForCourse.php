<?php

require '../../../extension/makeConnection.php';
session_start();

$currentCourse =  $_SESSION['currentCourse'];
$arrOfCourses =  $_SESSION['arrayOfFilteredCourses'];

$idOfCurrentCourse = '';


for($x = 0 ; $x < count($arrOfCourses) ; $x++){
    
    for($i = 0 ; $i < count($arrOfCourses[$x]); $i++){
        if($arrOfCourses[$x][5] == $currentCourse){
            $idOfCurrentCourse = $arrOfCourses[$x][0];
        }
    }
}
// var_dump($idOfCurrentCourse);

// = '$idOfCurrentCourse'
// // SELECT * FROM `Teacher` INNER JOIN  `ManageTeachersAndCourses` = '$idOfCurrentCourse' ON Teacher.TeacherID = ManageTeachersAndCourses.TeacherId 
$sql = "SELECT * FROM `ManageTeachersAndCourses` WHERE `CourseId` = '$idOfCurrentCourse' ";

$currentTeacherID = '';
if($result = $conn->query($sql)){
    while($row = $result-> fetch_row()){
        $currentTeacherID = $row[0];
    }
}

$sql = "SELECT * FROM `Teacher` WHERE `TeacherId` = '$currentTeacherID' ";

if($result = $conn->query($sql)){
    echo json_encode($result->fetch_row());
}

?>