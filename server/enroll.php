<?php
header("Content-Type:text/html;charset=UTF-8");
// 连接数据库
$db = mysqli_connect("127.0.0.1","root","","wyzz");
$program_char = "utf8" ;
mysqli_set_charset( $db , "utf8" );
if (!$db) {
    die('连接错误: ' . mysqli_error($db));
  }

 
$useremail = $_REQUEST["useremail"];
$password = $_REQUEST["password"];
$name = $_REQUEST["name"];
$identity = $_REQUEST["identity"];
$phone = $_REQUEST["phone"];

    $sql = "INSERT INTO user_data " .
    "(id,useremail,password,name,identity,phone)" .
    "VALUES " .
    "(NULL,'$useremail','$password','$name','$identity',$phone)";

  $retval = mysqli_query($db, $sql);
    echo '{"status":"注册成功"}';

?>