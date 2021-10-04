<?php

header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
date_default_timezone_set('America/Sao_Paulo');

class Api {
  public $transactions;  
  
  public function __construct() {
    $method = $_SERVER['REQUEST_METHOD'];
    
    $this->transactions = $this->getFileTransactions();
    
    if ($method === 'GET') {
      return $this->get();
    }

    if ($method === 'POST') {
      $_POST = json_decode(file_get_contents('php://input'), true);
      return $this->post();
    }
    
    if ($method === 'DELETE') {
      return $this->delete();
    }
  }

  private function getFileTransactions() {
    return json_decode(file_get_contents('transactions.json')) ?? [];
  }
  
  public function get() {
    if (isset($_GET['transactions'])) {
      die(json_encode($this->transactions));
    }
  }
  
  public function post() {
    if (isset($_GET['transactions'])) {

      $transaction = [
        'id' => uniqid(''),
        'createdAt' => date('Y-m-d H:i'),
        'amount' => $_POST['amount'],
        'category' => $_POST['category'],
        'title' => $_POST['title'],
        'type' => $_POST['type'],
      ];

      $this->transactions[] = $transaction; 
      file_put_contents('transactions.json', json_encode($this->transactions));
      die(json_encode($transaction));
    }

    die(json_encode([]));
  }
  
  public function delete() {
    if (isset($_GET['transactions']) && isset($_GET['transactionId'])) {

      $id = $_GET['transactionId'];
      
      $transactions = array_filter($this->transactions, function($transaction) use($id) {
        if ($transaction->id !== $id) {
          return $transaction;
        }
        return false;
      });

      file_put_contents('transactions.json', json_encode($transactions));
      die(json_encode($transactions));
    }

    die(json_encode([]));
  }

}

new Api();