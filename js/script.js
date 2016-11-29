$(document).ready(function() {


    var cuerpoPrincipal = $('.introductionContainer');

    var $inputsComments = $('.inputsComments');

    var tags = BlogModule.getAllPostsTags();

    $(function() {

        $("#tags").autocomplete({


            source: tags,
            select: function(event, ui) {
                var title = ui.item.value;
                var list = $('.sidebar-nav li');

                $.each(list, function(index, value) {
                    if ($(value).data('title') === title) {

                        $(this).addClass('ui-selected');

                        var htmlComments = $('.container-comments .comment').html();

                        if (htmlComments) {
                            $('.container-comments .comment').empty();
                        }

                        var idToAppend = $(this).data('id');

                        var bodyToAppend = BlogModule.searchPost(idToAppend);
                        bodyToAppendText = bodyToAppend.body;

                        var titleToAppend = $(this).text();
                        $('.estados').hide();
                        $('.introductionContainer h1').text(titleToAppend);
                        $('.introductionContainer .instructions').html(bodyToAppendText);
                        $('.addCommentModal').show();
                        $('.container-comments').show();
                        setComments(idToAppend);
                        $('.container-comment:even').css("background", "#F7F6F5");



                    }


                });
            }
        });
    });





    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $(function() {
        $("#selectable").selectable();

    });

    function setComments(id) {
        $('.container-comments .comment').empty();
        var post = BlogModule.searchPost(id);
        var commentsToAppend = post.comments;
        $.each(commentsToAppend, function(index, value) {


            $('.container-comments .comment').append("<div class='container-comment'><p class='userComment'> Usuario: " + value.user + "</p><p>" + value.commentBody + "</p></div>");

        });

    }







    // $.get("https://jsonplaceholder.typicode.com/posts/", function(data) {
    //     for (var i in data) {
    //         BlogModule.createPost(data[i].title, data[i].body);

    //     }
    // });




    $('#addPost').click(function() {

        cleanWrap();
        var postTitle = $('#titleInput').val();
        // var postBody = $('textarea').val();
        var postBody = tinyMCE.activeEditor.getContent();

        if (!postTitle || !postBody) {
            $.growl.error({ message: "Ambos campos son obligatorios" });
            return;
        }

        BlogModule.createPost(postTitle, postBody);

        $('#myModal input').val('');
        $('#myModal textarea').val('');
        $('#myModal').modal('toggle');
        tinyMCE.activeEditor.setContent('');

    });


    $('#btn-delete').click(function() {
        var selectedElements = $("li.ui-selected");
        $.each(selectedElements, function(i, el) {
            var idElement = $(el).data('id');

            BlogModule.deletePost(idElement);
            $(el).remove();

        });
        cleanWrap();
    });


    $('h3').click(function() {
        cleanWrap();
    });



    function cleanWrap() {
        $('.introductionContainer h1').text('Bienvenido');
        $('.instructions').text('Selecciona el posta que desees ver de la lista de la izquierda');
        $('.estados').show();
        $("li").removeClass("ui-selected");
        $('.container-comments').hide();
        $('.addCommentModal').hide();

    }



    $('#btn-edit').click(function() {
        $(".modalEdit").attr('id', 'myModalEdit');
        var selectedElements = $("li.ui-selected");
        var selection = selectedElements[0];
        if (selectedElements.length > 1) {
            $("#myModalEdit").removeAttr('id');
            $.growl.error({ message: "No puedes editar mas de un campo a la vez" });
            return;
        }

        var idPost = $("li.ui-selected").data('id');
        var post = BlogModule.searchPost(idPost);
        bodyToAppendText = post.body;
        $('#titleInputEdit').val(post.title);

        //  tinyMCE.activeEditor.setContent('<p>some</p>');


      
        $('#myModalEdit').on('shown.bs.modal', function(e) {
             setTimeout(tinyMCE.activeEditor.setContent(bodyToAppendText), 100);
        })

    });

    $('#btn-sort').click(function() {
        var ordenado = false;
        var listado = $('.sidebar-nav');
        var elementos = listado.children("li").get();
        elementos.sort(function(a, b) {
            var A = $(a).text().toUpperCase();
            var B = $(b).text().toUpperCase();
            return (A < B) ? -1 : (A > B) ? 1 : 0;
        });
        $.each(elementos, function(id, elemento) {
            listado.append(elemento);
        });
    });


    $('#savePost').click(function() {
        var idPost = $("li.ui-selected").data('id');
        var newTitle = $('#titleInputEdit').val();
        var newBody = $('#bodyInputEdit').val();
        BlogModule.updatePost(newTitle, newBody, idPost);
        cleanWrap();
        $("li.ui-selected").text(newTitle);
        $("li.ui-selected").removeClass('ui-selected');
        $('#myModalEdit').modal('toggle');

    });



    $('.sidebar-nav').on('click', 'li', function() {
        var htmlComments = $('.container-comments .comment').html();

        if (htmlComments) {
            $('.container-comments .comment').empty();
        }

        var idToAppend = $(this).data('id');

        var bodyToAppend = BlogModule.searchPost(idToAppend);
        bodyToAppendText = bodyToAppend.body;

        var titleToAppend = $(this).text();
        $('.estados').hide();
        $('.introductionContainer h1').text(titleToAppend);
        $('.introductionContainer .instructions').html(bodyToAppendText);
        $('.addCommentModal').show();
        $('.container-comments').show();
        setComments(idToAppend);
        $('.container-comment:even').css("background", "#F7F6F5");
    });




    $('.addCommentModal').click(function() {
        $('#userInput').val('');
        tinyMCE.activeEditor.setContent('');

    });

    $('#addComment').click(function() {

        var idToComment = $('.ui-selected').data('id');
        var user = $('#userInput').val();
        var comment = tinyMCE.activeEditor.getContent();

        if (!comment) {
            $.growl.error({ message: "El comentario no puede estar vacio" });
            return;
        }
        BlogModule.addComment(idToComment, comment, user);

        $('#commentModal').modal('toggle');
        setComments(idToComment);

    });

});