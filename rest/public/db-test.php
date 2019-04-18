<?php
require_once '../vendor/autoload.php';

header('Content-Type: text/html; charset=utf-8');

$config = [
	'db' => [
		'hostname' => '127.0.0.1',
		'dbname' => 'theone',
		'username' => 'root',
		'password' => 'bitnami'
	]
];



$config['db']['dsn'] = 'mysql:host='.$config['db']['hostname'].';dbname='.$config['db']['dbname'];    

ORM::configure($config['db']['dsn']);
ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
	if (!empty($config['db']['username']) && !empty($config['db']['password'])) {
		ORM::configure('username', $config['db']['username']);
		ORM::configure('password', $config['db']['password']);
	}

echo '<h2>สินค้า</h2>';
$products = array();
$products = ORM::forTable('docketr_product')->findArray();
foreach($products as $p) {
	echo $p['name'].'<br>';
}

echo '<h2>ลูกค้า</h2>';
$customers = array();
$customers = ORM::forTable('docketr_customer')->findArray();
foreach($customers as $c) {
	echo $c['name'].'<br>';
}