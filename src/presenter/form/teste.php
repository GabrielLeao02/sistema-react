<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

function accounts()
{
  try {
    include("../conexao/conexao.php");

    $getJson = file_get_contents('php://input');
    $getJson = (array) json_decode($getJson, true);
    $request = $_REQUEST;
    $_POST = array_merge($getJson, $request);

    if ($conn->connect_error) {
      die("Falha na conexão: " . $conn->connect_error);
    }


    $data = $_POST;
    $insertedRows = 0;

    foreach ($data as $item) {
      $account_category = $item["account_category"];
      $account_product = $item["account_product"];
      $account_product_value = $item["account_product_value"];


      $stmt = $conn->prepare("INSERT INTO Accounts (account_category, account_product, account_product_value) VALUES (?, ?, ?)");


      $stmt->bind_param("sss", $account_category, $account_product, $account_product_value);


      $stmt->execute();
      if ($stmt->execute()) {
        $insertedRows++;
      }
    }
    if ($insertedRows > 0) {
      echo "Dados inseridos no banco de dados com sucesso!";
    } else {
      echo "Nenhum dado foi inserido no banco de dados.";
    }
    echo "Dados inseridos no banco de dados com sucesso!";
  } catch (Exception $e) {
    echo json_encode(['error' => strval($e)]), 500;
  }
}

accounts();
