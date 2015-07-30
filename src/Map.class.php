<?php
	# Page:     Map.class.php
	# Function: Map object.
	class Map 
	{
		private $vars = array();
		
		/**
		 * Construct a map object.
		 * @param unknown $name
		 * @param unknown $tier
		 * @param unknown $islinear
		 * @param number $stages
		 */
		public function __construct($name, $tier, $islinear, $stages = 0) 
		{
			$this->vars['name'] = $name;
			$this->vars['tier'] = $tier;
			$this->vars['islinear'] = $islinear;
			$this->vars['stages'] = $stages;
		}
		
		/**
		 * Allows access of the global variables.
		 * @param unknown_type $key
		 */
		public function __get($key)
		{
			return $this->vars[$key];
		}
		
		/**
		 * Allows the access to set global variables.
		 * @param unknown_type $key
		 * @param unknown_type $value
		 */
		public function __set($key, $value)
		{
			$this->vars[$key] = $value;
		}
		
		/**
		 * Returns the map in string form delimited by commas.
		 */
		public function toString()
		{
			return join($this->vars, ',');
		}
	}