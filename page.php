<?php get_header(); ?>

<?php
// Start the Loop
while (have_posts()) : the_post();
    // Votre contenu ici
    the_content();

    if (comments_open() || get_comments_number()) {
        comments_template();
    }
endwhile; // Fin de la boucle
?>

<?php get_footer(); ?>