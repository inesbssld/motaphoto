// code qui fonctionne
jQuery(document).ready(function ($) {
  $("select").each(function () {
    var $this = $(this),
      numberOfOptions = $(this).children("option").length;

    $this.addClass("select-hidden");
    $this.wrap('<div class="custom-dropdown"></div>');
    $this.after(
      '<div class="dropdown-toggle">' +
        $this.children("option").eq(0).text() +
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

    // test pour flèche

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

    //

    // code qui foncitonne //ok a suppimer
    /*
    $styledSelect.on("click", function (e) {
      e.stopPropagation();
      $("div.dropdown-toggle.active")
        .not(this)
        .each(function () {
          $(this).removeClass("active").next("ul.dropdown-menu").hide();
        });
      $(this).toggleClass("active").next("ul.dropdown-menu").toggle();
    });
*/
    //

    $listItems.on("click", function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass("active");
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
