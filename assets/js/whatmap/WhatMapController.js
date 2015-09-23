var WhatMapController = function() {
	var self = this;
	var regex = /[^]*\/\*([^]*)\*\/\}$/;
	var channel = "https://www.googleapis.com/youtube/v3/search?&forUsername=ksfrecords&q={0}&key=AIzaSyBAiqL_S3tVfpHNHix6sJ9vlcbIcw3X1VQ%20&part=snippet";

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
		
		$.getJSON(channel.format(map.name), function(response) {
			var html;
			if (response.items === undefined) {
				html = "No video was found, try going <a href=\"http://www.youtube.com/results?search_query=" + map.name.replace(/_/g, " ") + " wr\" target=\"youtubes\">here</a>.";
			} else {
				html = "<iframe width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/" + response.items[0].id.videoId + "\" frameborder=\"0\" allowfullscreen></iframe>";
			}
			
			console.log(response)
			console.log(map.name + ", " + response.items[0].id.videoId)
			
			self.$mapvideo.html(html);
		});
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
				self.search(event.target.id)
			});
		}
		
		self.$maps.css('height', 'auto').hide().slideDown(400);
	}
	
	this.init()
};
