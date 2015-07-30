<?php
	# Page:     Config.class.php
	# Function: Configuration object for the database.
	class Config 
	{
		const LOCAL = 0;
		const AMAZON = 1;
		
		static function getDSN($db) {
			$config = parse_ini_file('Config.ini', true);

			switch ($db) {
				case self::LOCAL:
					$config = $config['LOCAL'];

					return "pgsql:"
						. "host=" . $config['host'] . ";"
						. "dbname=" . $config['dbname'] . ";"
						. "user=" . $config['user'] . ";"
						. "port=" . $config['port'] . ";"
						. "password=" . $config['password'] . "";
				case self::AMAZON:
					$config = $config['AMAZON'];

					return "pgsql:"
						. "host=" . $config['host'] . ";"
						. "dbname=" . $config['dbname'] . ";"
						. "user=" . $config['user'] . ";"
						. "port=" . $config['port'] . ";"
						. "password=" . $config['password'] . "";
				default:
					throw exception("Database does not exist.");
			}
		}
	}