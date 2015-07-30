var MapTDG = function() { };

MapTDG.findId = function(id) {
    return $.ajax({
		type: "GET",
		url: "search.php?id=" + id,
		async: false
	}).responseText;
}

MapTDG.findName = function(query) {
    return $.ajax({
		type: "GET",
		url: "search.php?q=" + query,
		async: false
	}).responseText;
}