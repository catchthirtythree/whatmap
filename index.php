<!DOCTYPE html>
<html class="no-js" lang="en">
	<head>
		<title>What map is this?</title>
		
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="description" content="" />
		<meta name="author" content="" />
		
		<link rel="shortcut icon" href="assets/img/favicon.png">
		
		<link rel="stylesheet" href="assets/css/foundation.css" />
		<link rel="stylesheet" href="assets/css/style.css" />
		
		<script src="assets/js/vendor/jquery.js"></script>
		<script src="assets/js/modernizr.js"></script>
		<script src="assets/js/string.format.js"></script>

		<script src="assets/js/whatmap/Map.js"></script>
		<script src="assets/js/whatmap/MapTDG.js"></script>
		<script src="assets/js/whatmap/MapIdentityMap.js"></script>
		<script src="assets/js/whatmap/MapDataMapper.js"></script>
		<script src="assets/js/whatmap/WhatMapController.js"></script>
	</head>
<body>

<div class="row">
	<div class="large-12 columns">
		<ul class="pricing-table" id="search-table">
			<li class="title">What map is this?</li>
			<li class="price">
				<input type="text" id="search" placeholder="Enter a map name..." required>
			</li>
			
			<li class="description" id="loader"></li>
			<li class="description error"><h3 id="map-error"></h3></li>
			
			<li class="description map">
				<div class="row">
					<div class="medium-4 columns"><h4 id="map-name"></h4></div>
					<div class="medium-4 columns"><h4 id="map-tier"></h4></div>
					<div class="medium-4 columns"><h4 id="map-type"></h4></div>
				</div>
				<hr>
				<h4 id="map-video"></h4>
			</li>
			
			<li class="title maps">
				<div class="row">
					<div class="medium-4 columns">Map Name</div>
					<div class="medium-4 columns">Tier #</div>
					<div class="medium-4 columns">Linear / # Stages</div>
				</div>
			</li>
		</ul>
		
		<div data-alert class="alert-box secondary" style="text-align: center;">
			Try searching "surf" for a list of all maps. 
			<a href="#" class="close">&times;</a>
		</div>
		
		<div data-alert class="alert-box secondary" style="text-align: center;">
			Adapted to Youtube API v3; might return random videos at times.
			<a href="#" class="close">&times;</a>
		</div>
	</div>
</div>

<script src="assets/js/foundation.min.js"></script>
<script src="assets/js/scripts.js"></script>

</body>
</html>
