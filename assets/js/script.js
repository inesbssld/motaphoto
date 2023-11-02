jQuery(document).ready(function ($) {
  var modalContainer = $("#modal-container");

  $(".open-modal-link").click(function (e) {
    e.preventDefault();
    modalContainer.css("display", "block");
    modalContainer.addClass("show"); // Ajout de la classe 'show'

    // Récupérez la référence de la photo depuis l'attribut "data-photo-ref"
    var photoReference = $(this).data("photo-ref");

    // Pré-remplissez le champ "Réf-photo" avec la référence
    $('[name="your-subject"]').val(photoReference);
  });

  modalContainer.find(".close, #overlay").click(function () {
    modalContainer.removeClass("show"); // Retrait de la classe 'show'
    modalContainer.css("display", "none");
  });
});

/*


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
*/

//gestion thumbnail

jQuery(document).ready(function ($) {
  // Montrer le conteneur de miniature au démarrage
  var thumbnailContainer = $("#hover-thumbnail-container");
  if (thumbnailContainer.find("img").attr("src") !== "") {
    thumbnailContainer.show();
  }

  // Lorsque vous survolez un lien de navigation
  $(".nav-link").on("mouseenter", function () {
    var thumbnailUrl = $(this).data("thumbnail"); // Récupère l'URL de la miniature
    var postUrl = $(this).data("postlink"); // Récupère l'URL du post

    // Créez un élément 'a' autour de l'image de la miniature et rendez-le cliquable
    var clickableThumbnail =
      '<a href="' +
      postUrl +
      '">' + // Lien vers le post
      '<img src="' +
      thumbnailUrl +
      '" class="thumbnail-img" alt="Miniature">' +
      "</a>";

    // Définissez la miniature cliquable et affichez-la
    $("#hover-thumbnail-container").html(clickableThumbnail).show();
  });

  // Cachez la miniature lorsque le curseur quitte le lien
  //$(".nav-link").on("mouseleave", function () {
  // $("#hover-thumbnail-container").hide();
  //});
});

// menu responsive

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const mainMenu = document.querySelector(".main-menu");
  const menuLinks = mainMenu.querySelectorAll("a"); // sélectionner tous les liens dans le menu

  const closeMenu = () => {
    mainMenu.classList.add("closing");
    mainMenu.addEventListener(
      "animationend",
      function () {
        mainMenu.classList.remove("mobile-menu");
        mainMenu.classList.remove("closing");
      },
      { once: true }
    );

    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  };

  menuToggle.addEventListener("click", function () {
    if (mainMenu.classList.contains("mobile-menu")) {
      closeMenu();
    } else {
      mainMenu.classList.add("mobile-menu");
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    }
  });

  // Ajout d'un écouteur d'événement pour chaque lien
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Écouteur d'événement pour le redimensionnement de la fenêtre
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mainMenu.classList.remove("mobile-menu");
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });
});

// Filtres

//essai nouveau code
// code qui fonctionne
jQuery(document).ready(function ($) {
  $("select").each(function () {
    var $this = $(this),
      numberOfOptions = $(this).children("option").length;

    $this.addClass("select-hidden");
    $this.wrap('<div class="custom-dropdown"></div>');
    $this.after(
      '<div class="dropdown-toggle">' +
        '<span class="selected-text">' +
        $this.children("option").eq(0).text() +
        "</span>" + // fermez la balise ici
        '<span class="arrow"><img src="wp-content/themes/motaphoto/img/arrow_select_icon.png"></span></div>'
    );

    var $styledSelect = $this.next("div.dropdown-toggle");

    var $list = $("<ul />", {
      class: "dropdown-menu",
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $("<li />", {
        text: $this.children("option").eq(i).text(),
        rel: $this.children("option").eq(i).val(),
      }).appendTo($list);
    }

    var $listItems = $list.children("li");

    $styledSelect.on("click", function (e) {
      e.stopPropagation();
      var $arrow = $(this).find(".arrow");
      $("div.dropdown-toggle.active")
        .not(this)
        .each(function () {
          $(this).removeClass("active").next("ul.dropdown-menu").hide();
          $(this).find(".arrow").removeClass("arrow-reverse");
        });
      $(this).toggleClass("active").next("ul.dropdown-menu").toggle();
      $arrow.toggleClass("arrow-reverse");
    });

    $listItems.on("click", function (e) {
      e.stopPropagation();
      $styledSelect.find(".selected-text").text($(this).text());
      $styledSelect.removeClass("active");
      $this.val($(this).attr("rel"));
      $list.hide();
      // Reflétant les changements dans le select d'origine
      $this.trigger("change");
    });

    $(document).on("click", function () {
      $styledSelect.removeClass("active");
      $list.hide();
    });
  });
});
