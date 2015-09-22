var WhatMapController = function() {
	var self = this;
	
	var channel = [
		"https://gdata.youtube.com/feeds/api/videos?author=ksfrecords&v=2&orderby=rating&alt=jsonc&q={0}",
		"https://gdata.youtube.com/feeds/api/videos?author=sourcesurf&v=2&orderby=rating&alt=jsonc&q={0}",
	];

	var regex = /[^]*\/\*([^]*)\*\/\}$/;

	this.init = function() {
		this.$map = $('.map').hide();
		this.$maps = $('.maps').hide();
		this.$error = $('.error').hide();
		this.$loader = $('#loader').hide();
		
		this.$description = $('.description');
		this.$table = $('#search-table');

		this.$maperror = $('#map-error');
		this.$mapname  = $('#map-name');
		this.$maptier  = $('#map-tier');
		this.$maptype  = $('#map-type');
		this.$mapvideo = $('#map-video');
		
		this.bindSearch('#search');
	}

	this.bindSearch = function(element) {
		$(element).on('keydown', function(event) {
			if (event.which === 13) {
				var input = $('#' + event.target.id).val().trim();
				
				if (input) self.search(input);
				
				return false;
			}
		});
	}

	this.createMapColumn = function(map) {
		return (function () {/*
			<li class="description maps">
				<div class="row">
					<div class="medium-4 columns"><a href="#" id="{0}">{1}</a></div>
					<div class="medium-4 columns">Tier {2}</div>
					<div class="medium-4 columns">{3}</div>
				</div>
			</li>       
		*/}).toString().match(regex)[1].format(
			map.id, 
			map.name, 
			map.tier,
			map.getType()
		);
	}

	this.search = function(query) {
		if (/^\+?(0|[1-9]\d*)$/.test(query)) {
			var map = MapDataMapper.findId(query);

			if (map) {
				this.$map.css('height', 'auto').hide().slideDown(400, 
					self.showMap(map)
				);
			} else {
				self.$error.css('height', 'auto').hide().slideDown(400, 
					self.showError("No results found.")
				);
			}
		} else {
			var list = MapDataMapper.findName(query);

			if (list) {
				self.showResults(list);
			} else {
				self.$error.css('height', 'auto').hide().slideDown(400, 
					self.showError("No results found.")
				);
			}
		}
	}

	this.showError = function(error) {
		self.$maperror.text(error);
	}

	this.showMap = function(map) {
		this.$map.hide();
		this.$maps.hide();
		this.$error.hide();
		self.$description.remove('.maps');
		
		self.$mapname.text(map.name);
		self.$maptier.text(map.getTier());
		self.$maptype.text(map.getType());
		
		if (map.name.slice(-1) === "_")
			map.name = map.name.slice(0, -1);

		$.when(
			$.ajax(channel[0].format(map.name)), 
			$.ajax(channel[1].format(map.name)).then(
			function (resp1, resp2, resp3) {
				var html  = "No video was found, try going <a href=\"http://www.youtube.com/results?search_query=" + map.name.replace(/_/g, " ") + " wr\" target=\"youtubes\">here</a>.",
					resps = [ resp1, resp2, resp3 ],
					found = false;
				
				resps.forEach(function(resp) {
					if (resp !== undefined && !found) {
						console.log(resp.data)
						html = "<iframe width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/" + resp.data.items[0].id + "\" frameborder=\"0\" allowfullscreen></iframe>";
						found = true;
					}
				});
				
				self.$mapvideo.html(html);
			})
		);
	}

	this.showResults = function(maps) {
		self.$description.remove('.maps');

		if (maps.length === 1) {
			this.$map.css('height', 'auto').hide().slideDown(400, 
				self.showMap(maps[0])
			);
			return;
		}
		
		for (var i = 0; i < maps.length; ++i) {
			$('#' + maps[i].id).remove();
			self.$table.append(self.createMapColumn(maps[i]));
			$('#' + maps[i].id).click(function(event) {
				console.log(event.target.id)
				self.search(event.target.id);
			});
		}
		
		self.$maps.css('height', 'auto').hide().slideDown(400);
	}
	
	this.init()
};
