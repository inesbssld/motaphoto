jQuery(document).ready(function ($) {
  var contactLink = $("li.contact-link > a");
  var modalContainer = $("#modal-container");

  contactLink.click(function (e) {
    e.preventDefault();
    modalContainer.css("display", "block");
  });

  modalContainer.find(".close").click(function () {
    modalContainer.css("display", "none");
  });

  modalContainer.find("#overlay").click(function () {
    modalContainer.css("display", "none");
  });
});
