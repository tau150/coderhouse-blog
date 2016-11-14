var BlogModule = (function(){

// Privado

var posts = [];
    



function Post(title, body, id){
    
    var $li;
    var $list = $('.sidebar-nav');
    var $body;
    var $bodyContainer = $('.bodyContainer');

    this.title = title;
    this.body = body;
   
    var id = composeId();

  function composeId(){
      var postsCount = posts.length;
      if(postsCount == 0){
        // Es el primer elemento, retorno 1
        var id = 1;
      }else{
        // Busco el ultimo elemento (mayor id) y le sumo 1
        var id = posts[postsCount - 1].getId() + 1
      }
      return id;
    }
  


    this.render = function(){

         if(this.title.length > 20){
            
            var newTitle = this.title.substr(0,20);
            newTitlePoints =newTitle.concat('...');
           
         }else{
             newTitlePoints = this.title;
         }

        $li = $(
            "<li data-id=" + id + ">"  + newTitlePoints +"</li>" 
         
          );
        $list.append($li);

        // $body = $(
        //     "<h1>" + this.title + "</h1>" +
        //     "<p>" + this.body + "</p>" +
        //     "<a href='#menu-toggle' class='btn btn-default' id='menu-toggle'>Toggle Menu</a>"
        //  );
        
        // $bodyContainer.append($body);
       
      }

        this.getId = function(){
        return id;
          }


     }





    function getPost(id){
        var post = posts.find(function(post){
            return post.getId(id) == id;
        });

        return post;
    }


// Publico

function createPost(title, body){
    var post = new Post(title, body);
    posts.push(post);
    post.render();
  }




 function deletePost(id){
     var postToDelete = getPost(id);
     
     if(postToDelete){
         var postIndex = posts.indexOf(id);
         posts.splice(postIndex, 1);  
     }

 };


  function showPosts(){
      for(var i in posts){
          console.log(posts[i]);
      }
  }

  function searchPost(id){
      var resultPost = getPost(id);
      return resultPost;
  }


  function updatePost(title,body,id){
      var postToUpdate = getPost(id);

      postToUpdate.body = body;
      postToUpdate.title = title;
  }

var obj = {
    createPost: createPost,
    deletePost: deletePost,
    showPosts: showPosts,
    updatePost: updatePost,
    searchPost: searchPost

}

return obj;



})();

