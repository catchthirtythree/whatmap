<?php
	class Statements 
	{
		public static function map_drop_table() 
		{
			return "DROP TABLE IF EXISTS maps";	
		}
		
		public static function map_id_search()
		{
			return "
				SELECT * FROM maps WHERE id = :query
			";
		}
		
		public static function map_insert() 
		{
			return "
				INSERT INTO maps (name, tier, islinear, stages, created) 
				VALUES (:name, :tier, :islinear, :stages, NOW())
			";
		}
		
		public static function map_name_search()
		{
			return "
				SELECT * FROM maps WHERE name ILIKE :query ORDER BY tier, name
			";
		}
		
		public static function map_table_exists() 
		{
			return "
				SELECT table_name
				FROM information_schema.tables
				WHERE table_schema='public'
				AND table_type='BASE TABLE'
				AND table_name='maps'
			";
		}
	}