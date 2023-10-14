jQuery(document).ready(function ($) {
  // Sélectionnez le lien dans le <li> avec la classe "contact-link"
  var contactLink = $("li.contact-link > a");

  // Sélectionnez la modal par son ID
  var modal = $("#myModal");

  // Gérez l'ouverture de la modal au clic sur le lien
  contactLink.click(function (e) {
    e.preventDefault(); // Empêche le lien de suivre son URL
    modal.css("display", "block");
  });

  // Gérez la fermeture de la modal
  modal.find(".close").click(function () {
    modal.css("display", "none");
  });

  // Gérez la fermeture de la modal lorsque l'utilisateur clique en dehors de celle-ci
  $(window).click(function (event) {
    if (event.target === modal[0]) {
      modal.css("display", "none");
    }
  });
});
