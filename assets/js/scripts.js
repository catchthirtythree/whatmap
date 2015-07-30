(function() {
	"use strict";
	
	$(document).foundation();

	$(document).ajaxStart(function() {
		$('.map').hide();
		$('.maps').hide();
		$('.error').hide();
		$("#loader").css('height', 'auto').hide().slideDown(300);
	}).ajaxStop(function() {
		$("#loader").css('height', 'auto').hide().slideUp(300);
	});

    $(document).ready(function() {    	
        new WhatMapController();
    });
})($);