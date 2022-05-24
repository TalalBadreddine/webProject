<?php

require '../../../../extension/makeConnection.php';

session_start();

$uniName = $_POST['universityName'];

$sqlForUniID = "SELECT UniversityID FROM University WHERE `UniversityName` = '$uniName' ";

$resultSqlUniID = $conn->query($sqlForUniID);

$UniversityID = $resultSqlUniID->fetch_assoc()["UniversityID"];


// ALL GOOD (Got the university)

$sqlForBranch = "SELECT * FROM Branch WHERE `UniversityID` = $UniversityID ";

$sqlResultForBranch = $conn->query($sqlForBranch);

$arrayOfBranches = array();
$arrayOfBranchesName = array();


if ($sqlResultForBranch->num_rows > 0) {
    // output data of each row
    while($row = $sqlResultForBranch->fetch_assoc()) {
      array_push($arrayOfBranches,$row['BranchID']);
      array_push($arrayOfBranchesName,$row['BranchName']);
    }

  } else {

    echo "no branch found in DB";
}

// All GOOD (got all branch of the university)


$assisativeArrayOfBranchesName = array();
$arrOfMajors = array();

for( $i = 0 ; $i < count($arrayOfBranches); $i++){
    $branchID = $arrayOfBranches[$i];

    $sqlForMajors = "SELECT * FROM Major WHERE `BranchID` = '$branchID' ";

    $sqlResultForMajors = $conn->query($sqlForMajors);

    if ($sqlResultForMajors->num_rows > 0) {
        // output data of each row
        while($row = $sqlResultForMajors->fetch_assoc()) {

          $currentArr = array();
          array_push($arrOfMajors, $row['MajorName']);

          $currentArr['BranchName'] = $arrayOfBranchesName[$i];
          $currentArr['MajorName'] = $row['MajorName'];
          $currentArr['MajorLanguage'] = $row['Language'];

          }
          array_push($assisativeArrayOfBranchesName, $currentArr);
    
      } else {
    
        echo "no major found in branch";
    }

}

$_SESSION['branches'] = $assisativeArrayOfBranchesName;

echo json_encode($arrOfMajors);


?>