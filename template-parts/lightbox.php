<div id="lightbox" style="display = none">
    <button class="lightbox__close" id="close-lightbox">X</button>
    <button class="lightbox__prev" id="prev-image">Précédente</button>
    <button class="lightbox__next" id="next-image">Suivante </button>

    <div class="lightbox-content">
        <img id="lightbox-image" src="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>">

        <div class="lightbox-infos">
            <p class=" photo-ref">
                <?php echo get_field('reference', get_the_ID()); ?>
            </p>
            <p class="photo-cat" id="lightbox-category">
                <?php

   $terms = get_the_terms(get_the_ID(), 'categories-photos');
   if ($terms && !is_wp_error($terms)) {
       $category_names = array();
       foreach ($terms as $term) {
           $category_names[] = esc_html($term->name);
       }
       echo implode(', ', $category_names);
   }


$terms = get_the_terms(get_the_ID(), 'categories-photos');
if ($terms && !is_wp_error($terms)) {

    $category_names = array();
    foreach ($terms as $term) {
        $category_names[] = esc_html($term->name);
    }
    echo implode(', ', $category_names);
}

   ?>
            </p>
        </div>

    </div>
</div>