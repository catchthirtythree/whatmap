/**************************************/
/*     String formatter prototype     */
/* http://stackoverflow.com/a/4673436 */
/**************************************/

if (!String.prototype.format) {
	  String.prototype.format = function() {

		var args = arguments;
		var sprintfRegex = /\{(\d+)\}/g;

		var sprintf = function(match, number) {
			return number in args ? args[number] : match;
		};

		return this.replace(sprintfRegex, sprintf);
	};
}