<?php
	# Page:     search.php?q=[a-zA-Z0-9]&type=[name|tier|islinear|stage]
	# Function: Search the database.
	#           Return json.
	include 'src/Config.class.php';
	include 'src/Statements.class.php';
	
	try {
		# Open connection to database.
		$db = new PDO(Config::getDSN(Config::AMAZON));
		
		# Make the database object throw exceptions.
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		# Get the search query.
		if (isset($_GET['id']) || isset($_GET['q'])) {
			if (isset($_GET['id'])) {
				if (is_numeric((int)$_GET['id'])) {
					$query = $_GET['id'];
					
					# Prepare the id search  statement.
					$stmt = $db->prepare(Statements::map_id_search());
				}
			} else {
				$query = "%" . $_GET['q'] . "%";
				
				# Prepare the name search statement.
				$stmt = $db->prepare(Statements::map_name_search());
			}
			
			# Bind values and execute.
			$stmt->bindValue(':query', $query, PDO::PARAM_STR);
			
			# Execute statement and fetch results.
			$stmt->execute(); $results = $stmt->fetchAll();
			
			# If results are found.
			if ($results) {
				# Create new maps array.
				$maps = array();
					
				# Create a proper associative array from all the maps.
				foreach ($results as $result) {
					$maps[] = array(
						'id'       => $result['id'],
						'name'     => $result['name'],
						'tier'     => $result['tier'],
						'islinear' => $result['islinear'],
						'stages'   => $result['stages'],
					);
				}
				
				# Echo the encoded map list.
				echo json_encode($maps);
			}
		}
		
		# Close connection to database.
		$db = null;
	} catch (PDOException $e) {
		print "PDOException: " . $e->getMessage() . "<br/>";
		die();
	} catch (exception $e) {
		print "Exception: " . $e->getMessage() . "<br/>";
		die();
	}