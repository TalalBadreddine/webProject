<?php

require '../../../../extension/extensions.php';
session_start();

$codeFromJs = cleanItUp($_POST['emailCode']);
$fileId = $_SESSION['fileId'];

// echo $fileId,$_SESSION['fn'],$_SESSION['ln'],$_SESSION['mn'],$_SESSION['email'],$_SESSION['$phoneNumber'],$_SESSION['password'],$_SESSION['universityId'],$_SESSION['branchId'],$_SESSION['majorId'],$_SESSION['bloodType'],$_SESSION['address'],$_SESSION['dateOfBirth'],$_SESSION['gender'];

if($codeFromJs == $_SESSION['randomCode']){

    require '../../../../extension/makeConnection.php';

    $files = $_SESSION['documents'];

    // echo $_SESSION['fn'] . $_SESSION['ln'] . $_SESSION['email'];
    $fn = $_SESSION['fn'];
    $ln = $_SESSION['ln'];
    $mn = $_SESSION['mn'];
    $email = $_SESSION['email'];
    $majorId = $_SESSION['majorId'];


    $sqlForExistance = "SELECT COUNT(*) FROM Teacher WHERE `FirstName` = '$fn' AND `LastName` = '$ln' AND `MiddleName` = '$mn' AND `email` = '$email' AND `MajorID` = '$majorId' ";

    $result = $conn->query($sqlForExistance);


    $row = $result -> fetch_assoc();



    if($row["COUNT(*)"] == 0){
        
    $sql = "INSERT INTO `Teacher`
    (`profileId`,
     `FirstName`,
     `LastName`,
      `MiddleName`,
       `Email`,
        `PhoneNumber`,
        `Password`,
         `UniversityID`,
          `BranchID`, 
          `MajorID`,
           `BloodType`,
            `Address`,
            `Birthdate`,
             `Gender`, 
             `isApplying`,
             `AvailableCredits`
             )
             VALUES
              (
                  '".$fileId."',
                  '".$_SESSION['fn']."',
                  '".$_SESSION['ln']."',
                  '".$_SESSION['mn']."',
                  '".$_SESSION['email']."',
                  '".$_SESSION['$phoneNumber']."',
                  '".$_SESSION['password']."',
                  '".$_SESSION['universityId']."',
                  '".$_SESSION['branchId']."',
                  '".$_SESSION['majorId']."',
                  '".$_SESSION['bloodType']."',
                  '".$_SESSION['address']."',
                  '".$_SESSION['dateOfBirth']."',
                  '".$_SESSION['gender']."',
                   1 ,
                   16)
                   ";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";

    } else {

        echo "Error: " . $sql . "<br>" . $conn->error;

    }

    session_destroy();

    }else{

        // return error
        die("exist");


    }


    $conn->close();

}else{

    die("wrong");

}

?>







<!-- $_SESSION['branch'] = cleanItUp(isset($_POST['branch']) ? $_POST['branch'] : '');
$_SESSION['universityId']
$_SESSION['language'] = cleanItUp($_POST['language']);
$_SESSION['$bloodType'] = cleanItUp($_POST['bloodType']);
$_SESSION['$status'] = cleanItUp($_POST['status']);
$_SESSION['$gender'] = cleanItUp($_POST['gender']);
$_SESSION['$dateOfBirth'] = cleanItUp($_POST['dateOfBirth']);
$_SESSION['$address'] = cleanItUp($_POST['address']);
$_SESSION['$phoneNumber'] = cleanItUp($_POST['phoneNumber']);
$_SESSION['randomCode'] = $randomCode;

$_SESSION['fn'] = cleanItUp($_POST['firstName']);
$_SESSION['ln'] = cleanItUp($_POST['lastName']);
$_SESSION['mn'] = cleanItUp($_POST['middleName']);
$_SESSION['email'] = cleanItUp($_POST['email']);
$_SESSION['password'] = hash("sha512",cleanItUp($_POST['password']));
$_SESSION['university'] = cleanItUp($_POST['university']);
$_SESSION['program'] = cleanItUp($_POST['program']); -->