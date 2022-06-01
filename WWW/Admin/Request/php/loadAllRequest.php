<?php

require '../../../extension/makeConnection.php';

session_start();

$universityId = $_SESSION['adminData']['UniversityID'];

$sql = "SELECT * FROM `Student` WHERE `UniversityID` = $universityId  AND `isApplying` = 1 ";

$arrOfPeople = array();

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  $arrayOfStudents = array();
  while($row = $result->fetch_assoc()) {
    array_push($arrayOfStudents, $row);
    }
    array_push($arrOfPeople, $arrayOfStudents);
} 


$sql = "SELECT * FROM `Teacher` WHERE `UniversityID` = $universityId AND `isApplying` = 1 ";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $arrayOfTeachers = array();
    while($row = $result->fetch_assoc()) {
      array_push($arrayOfTeachers, $row);
      }
      array_push($arrOfPeople, $arrayOfTeachers);
} 
  
echo json_encode($arrOfPeople);

?>