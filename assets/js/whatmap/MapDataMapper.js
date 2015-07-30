var MapDataMapper = function() { };

MapDataMapper.id_map = new MapIdentityMap();

MapDataMapper.buildObject = function(json) {
	var map = new Map(json.id, json.name, json.tier, json.islinear, json.stages);
	this.id_map.insert(map.id, map);
	return map;
}

MapDataMapper.buildObjects = function(json) {
	var list = [],
		self = this;

	json.forEach(function(map) {
		var map = new Map(map.id, map.name, map.tier, map.islinear, map.stages);
		self.id_map.insert(map.id, map);
		list.push(map);
	});

	return list;
}

MapDataMapper.findId = function(query) {
	var response = this.id_map.getId(query);

	if (!response) {
		response = MapTDG.findId(query);

		if (response) {
			var json = eval('(' + response + ')');
			return MapDataMapper.buildObject(json[0]);
		}
	}

	return response;
}

MapDataMapper.findName = function(query) {
	//var response = this.id_map.getName(query);

	//if (response.length == 0) {
	var response = MapTDG.findName(query);

	if (response) {
		var json = eval('(' + response + ')');
		return MapDataMapper.buildObjects(json);
	} 
	//}

	return response;
}