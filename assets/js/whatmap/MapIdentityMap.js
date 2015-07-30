var MapIdentityMap = function() { 
	this.map = {};
};

MapIdentityMap.prototype = {
	getId: function(id) {
		return this.map[id];
	},

	getName: function(name) {
		var list = [], regex = '/' + name + '/';
		for (var i = 0; i < this.map.length; ++i)
			if (this.map[i].name.match(regex))
				list.push(map);
		return list;
	},

	insert: function(id, map) {
		this.map[id] = map;
	},

	show: function() {
		for (var i = 0; i < this.map.length; ++i)
			console.log(this.map[i])
	}
};