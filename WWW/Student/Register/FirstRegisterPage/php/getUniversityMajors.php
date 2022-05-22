<?php

require '../../../../extension/makeConnection.php';

$uniName = $_POST['universityName'];

$sqlForUniID = "SELECT UniversityID FROM University WHERE `UniversityName` = '$uniName' ";

$resultSqlUniID = $conn->query($sqlForUniID);

$UniversityID = $resultSqlUniID->fetch_assoc()["UniversityID"];


// ALL GOOD (Got the university)

$sqlForBranch = "SELECT BranchID FROM Branch WHERE `UniversityID` = $UniversityID ";

$sqlResultForBranch = $conn->query($sqlForBranch);

$arrayOfBranches = array();

if ($sqlResultForBranch->num_rows > 0) {
    // output data of each row
    while($row = $sqlResultForBranch->fetch_assoc()) {
      array_push($arrayOfBranches,$row['BranchID']);
    }

  } else {

    echo "no branch found in DB";
}

// All GOOD ( got all branch of the university)

$arrOfMajors = array();

for( $i = 0 ; $i < count($arrayOfBranches); $i++){
    $branchID = $arrayOfBranches[$i];

    $sqlForMajors = "SELECT MajorName FROM Major WHERE `BranchID` = '$branchID' ";

    $sqlResultForMajors = $conn->query($sqlForMajors);

    if ($sqlResultForMajors->num_rows > 0) {
        // output data of each row
        while($row = $sqlResultForMajors->fetch_assoc()) {
          array_push($arrOfMajors, $row['MajorName']);
        }
    
      } else {
    
        echo "no major found in branch";
    }

}

echo json_encode($arrOfMajors);



?>