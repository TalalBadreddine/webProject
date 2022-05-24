<?php

include '../../../../../../../phpmailer/index.php';


function cleanItUp($dummy){

    return $dummy;
}


function generateRandomCode(){
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass);
}

function Redirect($url, $permanent = false)
{
    header('Location: ' . $url, true, $permanent ? 301 : 302);

    exit();
}

function saveDocAs($role, $fileName, $userFullName, $personalFileId, $description){
    $role = ucfirst($role);
    $fileSavingName = $userFullName . '-'. $personalFileId ;
    $filePath = '../../../../../../../webProjectFiles/'. $role . '/' . $fileSavingName . '/';

    if (!file_exists($filePath)) {
        mkdir($filePath, 0777, true);
    }

    if (!is_file($fileSavingName)) {

        echo "exist";
        move_uploaded_file($_FILES['file']['tmp_name'], $filePath . $description . '- copy' . uniqid());

    }else{

        move_uploaded_file($_FILES['file']['tmp_name'], $filePath . $description);

    }

}

?>