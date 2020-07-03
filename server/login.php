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

$sql = "SELECT * FROM `user_data` WHERE useremail = '$useremail'";

$r = mysqli_query($db,$sql);

// 记录数据的条数
$num = mysqli_num_rows($r);

// 检查当前email在数据库中是否已经存在
if($num == 1){
    echo '{"status":"error","msg":"该邮箱已经存在，请重新填写"}';
}else{
    // echo "恭喜你该邮箱可以注册";
    echo '{"status":"success","msg":"恭喜你该邮箱可以注册"}';
}

?>