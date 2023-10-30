// essai code avec template parts
// On attend que le document soit prêt

/*
jQuery(document).ready(function ($) {
  // Variable pour suivre l'image actuellement visualisée en plein écran
  let currentImage;

  // Gestionnaire d'événement pour le clic sur un élément avec la classe 'gallery-fullscreen'
  $(document).on("click", ".fullscreen-icon", function (e) {
    // Empêche le comportement par défaut de l'événement
    e.preventDefault();

    // Trouve l'élément parent le plus proche avec la classe 'gallery-item' et le stocke
    currentImage = $(this).closest(".photo1");

    // Récupère l'URL de l'image et d'autres données associées à l'élément cliqué
    const imgSrc = $(this).data("src");
    const imgReference = $(this).data("reference"); // Récupère la référence
    const imgCategory = currentImage.find(".gallery-category").text();
    const imgTitle = currentImage.find(".info-title").text(); // Récupère le titre

    // Met à jour la lightbox avec les données récupérées
    $(".lightbox .lightbox-content img").attr("src", imgSrc);
    $(".lightbox .lightbox-title").text(imgTitle); // Affiche le titre
    $(".lightbox .lightbox-reference").text(imgReference);
    $(".lightbox .lightbox-category").text(imgCategory);

    // Ajout de classes pour afficher la lightbox et empêcher le défilement du corps
    $("body").addClass("no-scroll");
    $(".lightbox").addClass("lightbox-visible");
  });

  // Gestionnaire d'événement pour le clic sur le bouton 'Suivant' de la lightbox
  $(document).on("click", ".lightbox-next", function () {
    // Récupère l'élément suivant avec la classe 'gallery-item'
    let nextImage = currentImage.next(".photo1");

    // Si on est à la dernière image, on revient à la première
    if (!nextImage.length) {
      nextImage = $(".photo1").first();
    }
    currentImage = nextImage;
    const nextLink = nextImage.find(".fullscreen-icon");
    nextLink.click();

    // Réajustement de la classe pour empêcher le défilement
    $("body").removeClass("no-scroll").addClass("no-scroll");
  });

  // Gestionnaire d'événement pour le clic sur le bouton 'Précédent' de la lightbox
  $(document).on("click", ".lightbox-prev", function () {
    // Récupère l'élément précédent avec la classe 'gallery-item'
    let prevImage = currentImage.prev(".photo1");

    // Si on est à la première image, on revient à la dernière
    if (!prevImage.length) {
      prevImage = $(".photo1").last();
    }
    currentImage = prevImage;
    const prevLink = prevImage.find(".fullscreen-icon");
    prevLink.click();

    // Réajustement de la classe pour empêcher le défilement
    $("body").removeClass("no-scroll").addClass("no-scroll");
  });

  // Gestionnaire d'événement pour le clic sur le bouton 'Fermer' de la lightbox
  $(document).on("click", ".lightbox-close", function () {
    // Masque la lightbox
    $(".lightbox").removeClass("lightbox-visible");

    // Suppression de la classe pour permettre le défilement
    $("body").removeClass("no-scroll");
  });
});
*/

//code qui fonctionnne moyen

/*
// Fonction pour initialiser les gestionnaires d'événements de la lightbox
// Configuration de la lightbox

let lightboxImage; // Déclarez la variable lightboxImage en dehors de la fonction
let photoRef; // Déclarez la variable photoRef en dehors de la fonction
let photoCat;

// lightbox.js
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  lightboxImage = document.getElementById("lightbox-image");
  photoRef = document.querySelector(".photo-ref");
  photoCat = document.querySelector(".photo-cat");
  let currentPhotoID = null;

  // Fonction pour mettre à jour l'image de la lightbox
  function updateLightbox(direction) {
    // Sélection de l'élément photo actuel en utilisant currentPhotoID
    const currentPhoto = document.querySelector(
      `[data-photo-id="${currentPhotoID}"]`
    );
    let newPhoto = null;

    if (direction === "prev") {
      newPhoto = currentPhoto.previousElementSibling; // photo précédente
    } else if (direction === "next") {
      newPhoto = currentPhoto.nextElementSibling; // photo suivante
    }

    // Si newPhoto existe, mettez à jour la lightbox et currentPhotoID
    if (newPhoto) {
      const newImgURL = newPhoto
        .querySelector(".fullscreen-icon")
        .getAttribute("data-image");
      const newCat = newPhoto
        .querySelector(".fullscreen-icon")
        .getAttribute("data-cat");
      const newRef = newPhoto
        .querySelector(".fullscreen-icon")
        .getAttribute("data-reference");

      lightboxImage.src = newImgURL;
      photoCat.textContent = newCat || "Catégorie non disponible";
      photoRef.textContent = newRef || "Référence non disponible";

      // Mise à jour de currentPhotoID
      currentPhotoID = newPhoto.getAttribute("data-photo-id");
    }
  }

  // Configuration du gestionnaire d'événements pour fermer la lightbox
  const closeBtn = document.getElementById("close-lightbox");
  closeBtn.addEventListener("click", function (event) {
    event.preventDefault();
    lightbox.style.display = "none";
  });

  // Configuration du gestionnaire d'événements pour les boutons de navigation de la lightbox
  const prevButton = document.getElementById("prev-image");
  const nextButton = document.getElementById("next-image");

  // Ajout d'événements click avec la nouvelle logique
  if (prevButton) {
    prevButton.addEventListener("click", function () {
      updateLightbox("prev");
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      updateLightbox("next");
    });
  }

  // Configuration du gestionnaire d'événements pour les icônes en plein écran
  document.querySelectorAll(".fullscreen-icon").forEach(function (icon) {
    icon.addEventListener("click", function (event) {
      event.preventDefault();
      const imageSrc = icon.getAttribute("data-image");
      const reference = icon.getAttribute("data-reference");
      const category = icon.getAttribute("data-cat");
      console.log("Catégorie : ", category);

      // Configuration de la lightbox avec les nouvelles valeurs
      lightboxImage.src = imageSrc;
      photoRef.textContent = reference || "Référence non disponible";
      // photoCat.textContent = category || "Catégorie non disponible";

      // Affichage de la lightbox
      lightbox.style.display = "block";

      // Mise à jour de currentPhotoID avec l'ID de la photo actuelle
      currentPhotoID = icon
        .closest(".photo-items")
        .getAttribute("data-photo-id");

      // Mettez à jour la catégorie dans la lightbox
      const categoryElement = document.querySelector(".photo-cat");
      if (categoryElement) {
        categoryElement.textContent = category || "Catégorie non disponible";
      }
    });
  });

  // Appel à la fonction initLightbox après avoir chargé de nouvelles images
  initLightbox();
});
// Définissez la fonction initLightbox
function initLightbox() {
  // Configuration du gestionnaire d'événements pour les icônes en plein écran
  document.querySelectorAll(".fullscreen-icon").forEach(function (icon) {
    icon.addEventListener("click", function (event) {
      event.preventDefault();
      const imageSrc = icon.getAttribute("data-image");
      const reference = icon.getAttribute("data-reference");
      const category = icon.getAttribute("data-cat");

      // Configuration de la lightbox avec les nouvelles valeurs
      lightboxImage.src = imageSrc;
      photoRef.textContent = reference || "Référence non disponible";
      photoCat.textContent = category || "Catégorie non disponible";

      // Affichage de la lightbox
      lightbox.style.display = "block";

      // Mise à jour de currentPhotoID avec l'ID de la photo actuelle
      currentPhotoID = icon
        .closest(".photo-items")
        .getAttribute("data-photo-id");
    });
  });
}
*/

// 3eme essai
jQuery(document).ready(function ($) {
  var $lightbox = $("#lightbox");
  var currentIndex = -1;

  function displayImage(index) {
    console.log("Displaying image at index:", index); // Log de débogage
    var $photos = $(".photo-items");
    if (index < 0 || index >= $photos.length) return;

    var $photoItem = $photos.eq(index);
    var imageSrc = $photoItem.find(".fullscreen-icon").data("image");
    var reference = $photoItem.find(".fullscreen-icon").data("reference");
    var category = $photoItem.find(".photo-icons").data("cat");

    console.log("Image source:", imageSrc); // Log de débogage

    $(".lightbox-content img").attr("src", imageSrc);
    $(".photo-ref").text(reference);
    $("#lightbox-category").text(category);

    currentIndex = index;
  }

  // Utilisation de la délégation d'événements pour les éléments ajoutés dynamiquement
  $("body").on("click", ".fullscreen-icon", function (e) {
    e.preventDefault();

    var $photos = $(".photo-items");
    var index = $photos.index($(this).closest(".photo-items"));
    displayImage(index);

    $lightbox.show();
  });

  $("#close-lightbox").on("click", function () {
    $lightbox.hide();
    $(".lightbox-content img").attr("src", "");
  });

  $("#prev-image").on("click", function () {
    displayImage(currentIndex - 1);
  });

  $("#next-image").on("click", function () {
    displayImage(currentIndex + 1);
  });
});
