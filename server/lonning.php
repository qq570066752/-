<?php
header("Content-Type:text/html;charset=UTF-8");
// 连接数据库
$db = mysqli_connect("127.0.0.1","root","","wyzz");
$program_char = "utf8" ;
mysqli_set_charset( $db , "utf8" );
if (!$db) {
    die('连接错误: ' . mysqli_error($db));
  }
  //  获取数据
$useremail =$_REQUEST["useremail"];
$password = $_REQUEST["password"];

// 查找该用户是否存在
$sql = "SELECT * FROM `user_data` WHERE useremail = '$useremail'";

$r = mysqli_query($db, $sql);
// 查找记录的条数
$num = mysqli_num_rows($r);

if($num == 1){
  $data = mysqli_fetch_all($r,MYSQLI_ASSOC);
  $data = $data[0];
  if($password  === $data["password"]){
    echo '{"status":"success","msg":"登录成功!"}';
  }else{
    echo '{"status":"error","msg":"密码不正确!"}';
  }
}else{
  echo '{"status":"error","msg":"该用户名不存在!"}';
}

?>