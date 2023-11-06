jQuery(document).ready(function ($) {
  var $lightbox = $("#lightbox");
  var currentIndex = -1;

  function displayImage(index) {
    var $photos = $(".photo-items");
    if (index < 0 || index >= $photos.length) return;

    var $photoItem = $photos.eq(index);
    var imageSrc = $photoItem.find(".fullscreen-icon").data("image");
    var reference = $photoItem.find(".fullscreen-icon").data("reference");
    var category = $photoItem.find(".photo-icons").data("cat");

    $(".lightbox-content img").attr("src", imageSrc);
    $(".photo-ref").text(reference);
    $("#lightbox-category").text(category);

    currentIndex = index;
  }

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
