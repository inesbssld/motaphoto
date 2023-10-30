jQuery(document).ready(function ($) {
  // Lorsqu'une valeur est sélectionnée dans le formulaire
  $("#filter-form select").change(function (event) {
    var category = $('select[name="category_filter"]').val();
    var format = $('select[name="format_filter"]').val();
    var order = $('select[name="sort_order"]').val();

    // Appel Ajax
    $.ajax({
      type: "GET",
      url: afp_vars.afp_ajax_url,
      dataType: "json",
      data: {
        action: "filter_photos",
        afp_nonce: afp_vars.afp_nonce,
        category_filter: category,
        format_filter: format,
        sort_order: order,
      },

      success: function (response) {
        console.log(response);

        // Pour voir toute la réponse
        $(".photo-gallery").empty().html(response.html);

        event.preventDefault();
      },
    });
  });
});
