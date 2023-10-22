// gestion modal contact bis
jQuery(document).ready(function ($) {
  var modalContainer = $("#modal-container");

  $(".open-modal-link").click(function (e) {
    e.preventDefault();
    modalContainer.css("display", "block");

    // Récupérez la référence de la photo depuis l'attribut "data-photo-ref"
    var photoReference = $(this).data("photo-ref");

    // Pré-remplissez le champ "Réf-photo" avec la référence
    $('[name="your-subject"]').val(photoReference);
  });

  modalContainer.find(".close").click(function () {
    modalContainer.css("display", "none");
  });

  modalContainer.find("#overlay").click(function () {
    modalContainer.css("display", "none");
  });
});

//gestion thumbnail
jQuery(document).ready(function ($) {
  $(".prev-link").hover(
    function () {
      $(".prev-thumbnail").show();
    },
    function () {
      $(".prev-thumbnail").hide();
    }
  );

  $(".next-link").hover(
    function () {
      $(".next-thumbnail").show();
    },
    function () {
      $(".next-thumbnail").hide();
    }
  );
});
