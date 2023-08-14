<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$getJson = file_get_contents('php://input');
$getJson = (array) json_decode($getJson, true);
$request = $_REQUEST;
$_POST = array_merge($getJson, $request);

include("../conexao/conexao.php");

$user_email = $_POST['user_email'];
$usuario_senha = $_POST['user_password'];

if (empty($user_email)) {
  return;
}

$sql = "SELECT * FROM `sys_usuarios` WHERE `usuario_email` LIKE '" . $user_email . "'";

$result = mysqli_query($con, $sql);

$row = mysqli_fetch_array($result);

$senha_salgada_bd = $row['usuario_senha'];

if ($senha_salgada_bd !== null) {

  if ($senha_criptografada_frontend === $usuario_senha) {

    http_response_code(200);

    exit;
  } else {

    http_response_code(401);
  }
}
