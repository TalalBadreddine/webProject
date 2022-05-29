<?php

$path = $_POST['path'];

// chmod('../../../../../../webProjectFiles/Courses/'.$path,0777);
unlink('../../../../../../webProjectFiles/Courses/'.$path);
?>