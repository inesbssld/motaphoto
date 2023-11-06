jQuery(document).ready(function ($) {
  let currentPage = 1;

  $("#load-more").on("click", function () {
    currentPage++; // Incrémentation de currentPage de 1, pour charger la page suivante

    $.ajax({
      type: "POST",
      url: ajax_object.ajax_url,
      dataType: "json",
      data: {
        action: "load_more_photos",
        paged: currentPage,
      },
      success: function (res) {
        $(".photo-gallery").append(res.html); // Ajoute le contenu à la galerie existante

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
        $(".photo-suggest").html(res.html); // Remplace le contenu actuel par les nouvelles photos

        if (res.allLoaded) {
          $("#load-more-single").hide(); // Masque le bouton si toutes les photos sont chargées
        }
      },
    });
  });
});
