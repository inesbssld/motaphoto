jQuery(document).ready(function ($) {
  var page = 2;
  var canLoad = true;

  // Collecter les IDs des posts déjà chargés
  function getLoadedPosts() {
    var ids = [];
    $(".photo-items").each(function () {
      var id = $(this).data("photo-id"); // Ceci doit correspondre exactement à l'attribut de données dans votre HTML
      ids.push(id);
    });
    console.log(ids);
    return ids; // Pour le débogage, ceci devrait vous montrer les IDs collectés
  }

  $("#load-more").on("click", function (e) {
    e.preventDefault();
    var loadedPosts = getLoadedPosts(); // Récupérer les IDs
    console.log(
      "Chargement de plus de photos, exclusion des posts: ",
      loadedPosts
    ); // Débogage

    if (canLoad) {
      $.ajax({
        url: ajax_object.ajax_url,
        type: "POST",
        data: {
          action: "load_more_photos",
          page: page,
          excluded: getLoadedPosts(), // Envoyer les IDs à PHP
        },
        success: function (response) {
          if (response) {
            $(".photo-gallery").append(response);
            page++;
          } else {
            canLoad = false;
            console.log(false, "impossible de charger");
          }
        },
      });
    }
  });
});
