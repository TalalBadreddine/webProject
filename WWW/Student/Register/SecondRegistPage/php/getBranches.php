<?php

session_start();

$targetMajor = $_SESSION['program'];
$branches = $_SESSION['branches'];

$arr = array();


for($x = 0 ; $x < count($branches) ; $x++){
    if($branches[$x]['MajorName'] == $targetMajor){
        array_push($arr,$branches[$x]['BranchName']);
    }
}

echo json_encode($arr);

?>