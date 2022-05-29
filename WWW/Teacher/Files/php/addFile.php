<?php

session_start();

$currenCourseFileId =  $_SESSION['currentCourseFileID'];

foreach( $_FILES as $file ){
    $fileName = $file['name'];
    move_uploaded_file($file['tmp_name'], '../../../../../../webProjectFiles/Courses/'.$currenCourseFileId.'/'.$fileName);
    chmod('../../../../../../webProjectFiles/Courses/'.$currenCourseFileId.'/'.$fileName, 077);

}
?>