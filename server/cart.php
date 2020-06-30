<?php 
header("Content-Type:text/html;charset=UTF-8");

// 先连接数据库
$db = mysqli_connect("127.0.0.1","root","","wyzz");
$program_char = "utf8" ;
mysqli_set_charset( $db , "utf8" );

if (!$db) {
    die('连接错误: ' . mysqli_error($db));
  }
// 获取数据
$sql = "SELECT * FROM product";

$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

/* 3、把数据转换为JSON数据返回 */
echo json_encode($data,true);

?>