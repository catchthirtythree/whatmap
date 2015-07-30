var Map = function(id, name, tier, islinear, stages) {
	var self = this;

	this.id = id;
	this.name = name;
	this.tier = tier;
	this.islinear = islinear;
	this.stages = stages;
}

Map.prototype = {
	getTier: function() {
		return "Tier " + this.tier;
	},

	getType: function() {
		return (!!this.islinear ? "Linear" : this.stages + " Stages");
	}
}