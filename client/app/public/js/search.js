$(document).ready(function(){
    console.log("ae search");
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return decodeURI(results[1]) || 0;
        }
    }
    console.log($.urlParam('username'));
    load_posts($.urlParam('username'));
});

function load_posts(username){
        var formData = new FormData();
        var loggeduser = $('#logged_username').text();
        formData.append("search_text", username);
        formData.append("logged_user", loggeduser);

        var xhr = new XMLHttpRequest();

        // verificar as mudanças de estado
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                console.log('return');
            }
        }
        xhr.onload = function(){
            console.log('onload');
            if (xhr.status === 200){
                var data = $.parseJSON(xhr.responseText);
                console.log(data);
                var users_html = '';
                for (var i = 0; i < data.length; i++){
                    users_html += '<div class="user"><div class="name"> <a class="username">'+data[i].user+'</a></div></div>';
                }
                $("#search_container").append(users_html);
            }
        }

        xhr.open("POST", "http://localhost:7331/users");
        xhr.send(formData);

}