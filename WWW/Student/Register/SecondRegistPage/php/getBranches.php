<?php
// require '../../../../extension/makeConnection.php';

session_start();

// try {
//     empty($_SESSION['fn']);
// }
//   catch(Exception $e) {
//     echo 'Message: ' .$e->getMessage();

//   }
if(empty($_SESSION['fn'])){
    
    http_response_code(404);
    die();

}else{

    $targetMajor = $_SESSION['program'];
    $branches = $_SESSION['branches'];
    
    $arr = array();
    
    for($x = 0 ; $x < count($branches) ; $x++){
        if($branches[$x]['MajorName'] == $targetMajor){
            $currentArr = array();
            $currentArr['BranchName'] = $branches[$x]['BranchName'];
            $currentArr['MajorLanguage'] = $branches[$x]['MajorLanguage'];
            array_push($arr,$currentArr);
        }
    }
    
    echo json_encode($arr);

}



?>