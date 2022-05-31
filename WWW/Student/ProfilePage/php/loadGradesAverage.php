<?php

require '../../../extension/makeConnection.php';

session_start();

$studentID = $_SESSION['studentData']['StudentID'];

$sql = "SELECT * FROM `Grades` WHERE `StudentID` = '$studentID' ";

$sumOfStudentGrades = 0 ;
$countOfStudentExams = 0;

$result = $conn->query($sql);

if ($result->num_rows > 0){

  while($row = $result->fetch_assoc()) {

    if(is_numeric($row['Grade'])){
        $sumOfStudentGrades += $row['Grade'];
        $countOfStudentExams += 1;
    }
}
}else {
  echo "0 results";
}

$sql = " SELECT * FROM `Grades` WHERE 1 ";

$allGradesSum = 0;
$countOfAllExams = 0;

$result = $conn->query($sql);


if ($result->num_rows > 0){

    while($row = $result->fetch_assoc()) {
      if( !is_null($row['Grade'])){
          $allGradesSum += (int)$row['Grade'];
          $countOfAllExams += 1;
      }
  }
  }else {
    echo "0 results";
}

$array = array();

array_push($array, $sumOfStudentGrades/$countOfStudentExams);

if($countOfAllExams != 0 ){
    array_push($array,$allGradesSum /$countOfAllExams);
}

echo json_encode($array);
?>