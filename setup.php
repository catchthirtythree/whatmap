<?php
	# Page:     maps.php
	# Function: Create map table in postgres database.
	#           Fill table with data from maps.csv file.
	include 'src/Config.class.php';
	include 'src/Map.class.php';
	include 'src/Statements.class.php';
	
	try {
		# Open connection to database.
		$db = new PDO(Config::getDSN(Config::AMAZON));
		
		# Make the database object throw exceptions.
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		# Drop the table. 
		# Edit: Don't drop the table, we want to keep dates consistent now.
		# Edit: Nope, screw dates; zet keeps changing map names. Keep it commented unless I accidentally run it again though.
		$db->query(Statements::map_drop_table());

		# Check if maps table already exists.
		if (!($results = $db->query(Statements::map_table_exists())->fetchAll())) {
			# Get the query from the sql file.
			$query = file_get_contents('assets/sql/maps.sql');
			
			# Run contents from sql file.
			if (!$db->query($query))
				throw new exception("'maps' table could not be created.");
		}
		
		# Insert the maps from zet's list.
		insertMapsFromCVS($db, explode("\n", file_get_contents('assets/data/maps.csv')));
		
		# Close connection to database.
		$db = null;
	} catch (PDOException $e) {
		print "PDOException: " . $e->getMessage() . "<br/>";
		die();
	} catch (exception $e) {
		print "Exception: " . $e->getMessage() . "<br/>";
		die();
	}
	
	echo "Maps table created and filled.";
	
	function insertMapsFromCVS($db, $maps)
	{
		# Loop through the contents.
		foreach ($maps as $map)
		{
			# Split the contents.
			$info = explode(',', $map);
				
			# Convert the stage to an int.
			$info[3] = (int)$info[3];
			
			# Create a new map object.
			$m = new Map(
				$info[0],
				$info[1],
				empty($info[2]) ? false : true,
				is_numeric($info[3]) ? $info[3] : 0
			);
				
			try {
				# Prepare the insert statement.
				$stmt = $db->prepare(Statements::map_insert());
					
				# Bind values and execute.
				$stmt->bindValue(':name',     $m->name,     PDO::PARAM_STR);
				$stmt->bindValue(':tier',     $m->tier,     PDO::PARAM_INT);
				$stmt->bindValue(':islinear', $m->islinear, PDO::PARAM_BOOL);
				$stmt->bindValue(':stages',   $m->stages,   PDO::PARAM_INT);
				$stmt->execute();

				# Display the added map.
				print $m->toString() . "<br/>";
			} catch (PDOException $e) {
				print "PDOException: " . $e->getMessage() . "<br/>";
			}
		}
	}