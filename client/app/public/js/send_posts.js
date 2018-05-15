$(document).ready(function(){
    console.log("aeae");
    load_posts();
    $('#send_post').click(function(){

        var formData = new FormData();

        var file = document.getElementById('file').files[0];
        var comment = document.getElementById('comment').value;

        formData.append("file", file);
        formData.append("comment", comment);

        var xhr = new XMLHttpRequest();

        // verificar as mudanças de estado
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var resposta = xhr.responseText;
                document.getElementById('feedback').innerHTML = resposta;
            }
        }

        xhr.open("POST", "http://localhost:7331/api");
        xhr.send(formData);

    });

});

function load_posts(){
    console.log('load');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:7331/api");
    xhr.onload = function(){
        console.log('onload');
        if (xhr.status === 200){
            var data = $.parseJSON(xhr.responseText);
            console.log(data);
            var posts_html = '';
            for (var i = 0; i < data.length; i++){
                posts_html += '<div class="post"><div class="comment">'+data[i].comment+'</div><img src="http://localhost:7331/uploads/'+data[i].url_image+'"</div>'
            }
            $("#container_posts").append(posts_html);
        }
    }
    xhr.send();
}