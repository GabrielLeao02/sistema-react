<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

function login_usuario()
{
  try {
    include("../conexao/conexao.php");

    $getJson = file_get_contents('php://input');
    $getJson = (array) json_decode($getJson, true);
    $request = $_REQUEST;
    $_POST = array_merge($getJson, $request);

    $usuario_email = $_POST['user_email'];
    $senha_criptografada_frontend = $_POST['user_password'];

    $comando = "SELECT usuario_senha FROM sys_usuarios WHERE usuario_email = ?";

    $stmt = $con->prepare($comando);
    $stmt->bind_param("s", $usuario_email);
    $stmt->execute();
    $stmt->bind_result($senha_salgada_bd);
    $stmt->fetch();
    $stmt->close();

    if ($senha_salgada_bd !== null) {
      if (password_verify($senha_criptografada_frontend, $senha_salgada_bd)) {

        http_response_code(200);
        exit;
      } else {
        http_response_code(401);
        exit;
      }
    } else {
      http_response_code(401);
      exit;
    }

    $con->close();
  } catch (Exception $e) {
    echo json_encode(['error' => strval($e)]), 500;
  }
}

login_usuario();
