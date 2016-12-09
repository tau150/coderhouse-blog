var BlogModule = (function() {

    // Privado

    var posts = [];




    function Post(title, body, id) {

        var $li;
        var $list = $('.sidebar-nav');
        var $body;
        var $bodyContainer = $('.bodyContainer');

        this.title = title;
        this.body = body;

        var id = composeId();
        this.comments = [];



        function composeId() {
            var postsCount = posts.length;
            if (!postsCount) {
                // Es el primer elemento, retorno 1
                var id = 1;
            } else {
                // Busco el ultimo elemento (mayor id) y le sumo 1
                var id = posts[postsCount - 1].getId() + 1
            }
            return id;
        }



        this.render = function() {


            newTitlePoints = this.title;


            $li = $(
                "<li data-id=" + id + " " + "data-title=" + newTitlePoints + ">" + newTitlePoints + "</li>"

            );
            $list.append($li);

            // $body = $(
            //     "<h1>" + this.title + "</h1>" +
            //     "<p>" + this.body + "</p>" +
            //     "<a href='#menu-toggle' class='btn btn-default' id='menu-toggle'>Toggle Menu</a>"
            //  );

            // $bodyContainer.append($body);

        }

        this.getId = function() {
            return id;
        }


    }

    function Comment(user, commentBody) {
        this.user = user || 'anonimo';
        this.commentBody = commentBody;
        this.likes = 0;
    }





    function getPost(id) {
        var post = posts.find(function(post) {
            return post.getId(id) == id;
        });

        return post;
    }

    function getAllPostsTags() {

        return posts.map(function(post) {
            return post.title;
        });

    
    }

    // Publico

    function createPost(title, body) {
        var post = new Post(title, body);
        posts.push(post);
        post.render();
    }




    function deletePost(id) {
        var postToDelete = getPost(id);

        if (postToDelete) {
            var postIndex = posts.indexOf(id);
            posts.splice(postIndex, 1);
        }

    };


    function showPosts() {
        for (var i in posts) {
            console.log(posts[i]);
        }
    }

    function addComment(id, commentBody, user) {
        var post = getPost(id);
        var comment = new Comment(user, commentBody);
        post.comments.push(comment);
    }

    function searchPost(id) {
        var resultPost = getPost(id);
        return resultPost;
    }


    function updatePost(title, body, id) {
        var postToUpdate = getPost(id);

        postToUpdate.body = body;
        postToUpdate.title = title;
    }

    var obj = {
        createPost: createPost,
        deletePost: deletePost,
        showPosts: showPosts,
        updatePost: updatePost,
        searchPost: searchPost,
        addComment: addComment,
        getAllPostsTags: getAllPostsTags

    }

    return obj;



})();

// BlogModule.createPost('prueba', 'cuerpo de prueba');
// BlogModule.createPost('prueba2', 'cuerpo de prueba asfsaasaddasdasdsdsadsadsadasdsadsasf');
// BlogModule.addComment(1, 'nuevo comentario', 'santi');

// BlogModule.addComment(1, 'segundo comentario', 'agus');
// BlogModule.addComment(1, 'tercer comentario');

// BlogModule.addComment(2, 'asdsad', 'carlos');
// BlogModule.addComment(2, 'lalalala', 'juan');



// BlogModule.showPosts();