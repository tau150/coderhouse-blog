$(document).ready(function(){


$( function() {
    $( "#selectable" ).selectable();
 
  } );



$('li').hover(function(){
    $(this).css('cursor','pointer');

});

var cuerpoPrincipal = $('.introductionContainer');



    

$.get( "https://jsonplaceholder.typicode.com/posts", function( data ) {
    for(var i in data){
         BlogModule.createPost(data[i].title, data[i].body);

    }
});
    


  $('.addPost').click(function(){
        var postTitle =  $('#titleInput').val();
        var postBody = $('textarea').val();

        if(postTitle === '' || postBody===''){
            $.growl.error({ message: "Ambos campos son obligatorios" });
            return; 
        }

        BlogModule.createPost(postTitle, postBody);
        // console.log(BlogModule.showPosts());
        $('#myModal input').val('');
        $('#myModal textarea').val('');
        $('#myModal').modal('toggle');
    });


    $('#btn-delete').click(function(){
       var selectedElements = $("li.ui-selected");
       $.each(selectedElements, function(i, el){
          var idElement =  $(el).data('id');

         BlogModule.deletePost(idElement);
         $(el).remove();
         
       });
        cleanWrap();
    });

 
   $('h3').click(function(){
       cleanWrap();
   });
    


    function cleanWrap(){
        $('.introductionContainer h1').text('Bienvenido');
        $('.instructions').text('Selecciona el posta que desees ver de la lista de la izquierda');
        $('.estados').show();
    }



    $('#btn-edit').click(function(){
           $(".modalEdit").attr('id','myModalEdit');
           var selectedElements = $("li.ui-selected");
           var selection = selectedElements[0];
           if(selectedElements.length > 1){
                 $("#myModalEdit").removeAttr('id');
                $.growl.error({ message: "No puedes editar mas de un campo a la vez" });
                  

                return ;
                
           }

           var idPost = $("li.ui-selected").data('id');
           var post = BlogModule.searchPost(idPost);
           $('#titleInputEdit').val(post.title);
           $('#bodyInputEdit').val(post.body);

          

     });

     $('#btn-sort').click(function(){
        var ordenado = false;
        var listado = $('.sidebar-nav');
	    var elementos = listado.children("li").get();
	    elementos.sort(function(a,b) {
		var A = $(a).text().toUpperCase();
		var B = $(b).text().toUpperCase();
 		return (A < B) ? -1 : (A > B) ? 1 : 0;
	});
	    $.each(elementos, function(id, elemento) {
		listado.append(elemento);
	    });
     });


  $('.savePost').click(function(){
            var idPost = $("li.ui-selected").data('id');
            var newTitle = $('#titleInputEdit').val();
            var newBody = $('#bodyInputEdit').val();
            BlogModule.updatePost(newTitle, newBody,idPost);
            cleanWrap();
            $("li.ui-selected").text(newTitle);
            $("li.ui-selected").removeClass('ui-selected');
            $('#myModalEdit').modal('toggle');

            console.log(BlogModule.showPosts());

     });

    $('.sidebar-nav').on('click', 'li',function(){
       var idToAppend = $(this).data('id');

       var bodyToAppend = BlogModule.searchPost(idToAppend);
       var titleToAppend= $(this).text();
       $('.estados').hide();
       $('.introductionContainer h1').text(titleToAppend);
       $('.introductionContainer .instructions').text(bodyToAppend.body);
    });

 

});