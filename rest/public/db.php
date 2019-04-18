<?php
require_once '../vendor/autoload.php';

use Luracast\Restler\RestException;

$config = [
	'db' => [
		'hostname' => '127.0.0.1',
		'dbname' => 'theone',
		'username' => 'root',
		'password' => 'bitnami'
	]
];

try {

	$config['db']['dsn'] = 'mysql:host='.$config['db']['hostname'].';dbname='.$config['db']['dbname'];    
	ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
	\ORM::configure($config['db']['dsn']);
	if (!empty($config['db']['username']) && !empty($config['db']['password'])) {
		\ORM::configure('username', $config['db']['username']);
		\ORM::configure('password', $config['db']['password']);
	}

} catch (PDOException $e) {
	print($e->getMessage());
	throw new RestException(501, 'MySQL: ' . $e->getMessage());
}
