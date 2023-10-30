</main>

<?php get_template_part('template-parts/modal/modal');?>
<!--
<?php get_template_part('template-parts/lightbox');?>-->
<footer>
    <nav class="footer-nav">
        <?php
    wp_nav_menu(array(
        'theme_location' => 'footer-menu', // Utilisez l'emplacement 'footer-menu'
        'container' => 'ul', // Pour éviter la création d'une div supplémntaire
        'menu_class' => 'footer-menu', // Classe CSS pour la liste du menu
    ));
    ?>
    </nav>

</footer>

<?php wp_footer(); ?>


<div id="lightbox" style="display = none">
    <button class="lightbox__close" id="close-lightbox">Fermer</button>
    <button class="lightbox__prev" id="prev-image">Précédent</button>
    <button class="lightbox__next" id="next-image">Suivant </button>

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

var_dump($terms); // Affiche les termes de taxonomie pour le débogage
var_dump($post)


   ?>
            </p>
        </div>

    </div>
</div>


</div>

</body>

</html>