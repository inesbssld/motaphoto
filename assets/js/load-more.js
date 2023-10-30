jQuery(document).ready(function ($) {
  let currentPage = 1;

  $("#load-more").on("click", function () {
    currentPage++; // Incrémentation de currentPage de 1, car nous voulons charger la page suivante

    $.ajax({
      type: "POST",
      url: ajax_object.ajax_url,
      dataType: "json",
      data: {
        action: "load_more_photos",
        paged: currentPage,
      },
      success: function (res) {
        $(".photo-gallery").append(res.html); // Ajoutez le contenu à la galerie existante

        // Après avoir chargé les nouvelles images, réinitialisez les gestionnaires d'événements de la lightbox
        //initLightbox();

        if (currentPage >= res.max) {
          $("#load-more").hide();
        }
      },
    });
  });
});

// bouton charger plus de la single page
jQuery(document).ready(function ($) {
  $("#load-more-single").on("click", function () {
    $.ajax({
      type: "POST",
      url: ajax_object.ajax_url,
      dataType: "json",
      data: {
        action: "load_all_photos",
      },
      success: function (res) {
        $(".photo-suggest").html(res.html); // Remplacez le contenu actuel par les nouvelles photos

        // Après avoir chargé les nouvelles images, réinitialisez les gestionnaires d'événements de la lightbox
        //initLightbox();

        // test pour cacher le bouton
        // Vérifiez si le nombre de photos chargées est égal au nombre total de photos
        if (res.allLoaded) {
          $("#load-more-single").hide(); // Masquez le bouton si toutes les photos sont chargées
        }
      },
    });
  });
});
