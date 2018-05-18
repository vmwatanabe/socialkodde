$(document).ready(function(){
    $('#btn_logout').click(function(){
        window.location.href = '/logout';
    });
    $('#btn_search').click(function(){
        var search_text = $('#search_text').val();
        window.location.href = '/search?username='+search_text;
    });
});