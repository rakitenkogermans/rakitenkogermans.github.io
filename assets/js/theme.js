$(document).ready(function(){
    'use strict';
   
    $('.accept-btn').click(function(){
        $('.cookies-section').css("display", "none")
    });
    $('.decline-btn').click(function(){
        $('.cookies-section').css("display", "none")
    });
    $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#bodyelement').toggleClass('scroll-y');
        $('#overlay').toggleClass('open');
    });
    $('#show-requisites').after().click(function() {
        $('#show-this').toggleClass('show-requisites');
    });
});

