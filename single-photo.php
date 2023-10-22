<?php get_header(); ?>


<article class="post">

    <div class="photo-details">
        <?php
        $args = array(
            'post_type' => 'photo',
            'p' => get_the_ID(), // Obtient l'ID de la publication actuelle
        );

        $photo_query = new WP_Query($args);

        if ($photo_query->have_posts()) :
            while ($photo_query->have_posts()) : $photo_query->the_post();
        ?>

        <h1><?php the_title(); ?></h1>
        <p>Référence: <?php echo get_field('reference'); ?></p>
        <p>Catégorie: <?php the_terms(get_the_ID(), 'categories-photos'); ?></p>
        <p>Format: <?php the_terms(get_the_ID(), 'format'); ?></p>
        <p>Type: <?php echo get_field('type'); ?></p>
        <p>Année: <?php echo get_the_date('Y'); ?></p>
        <?php
            endwhile;
        endif;
        wp_reset_postdata();
        ?>
    </div>

    <div class="photo-image">
        <?php the_post_thumbnail(); ?>
    </div>

    <div class="additional-content">
        <?php
        // Récupérez la photo actuelle
        $current_photo = $post;

        // Incluez le lien pour ouvrir la modal avec la référence pré-remplie
        ?>


        <p>Cette photo vous intéresse ?</p>
        <a href="#myModal" id="reference-field" class="contact open-modal-link"
            data-photo-ref="<?php echo esc_attr(get_field('reference', $current_photo)); ?>">Contactez-nous</a>


        <div class="navigation">
            <div class="thumbnail">
                <?php
        // Récupérez la photo précédente
        $previous_photo = get_previous_post();
        if ($previous_photo) :
        ?>
                <div class="prev-thumbnail">
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url($previous_photo, 'thumbnail')); ?>"
                        alt="Photo précédente">
                </div>
                <?php endif; ?>

                <?php
        // Récupérez la photo suivante
        $next_photo = get_next_post();
        if ($next_photo) :
        ?>
                <div class="next-thumbnail">
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url($next_photo, 'thumbnail')); ?>"
                        alt="Photo suivante">
                </div>
                <?php endif; ?>
            </div>
            <div class="arrow">
                <a href="<?php echo get_permalink($previous_photo); ?>" class="nav-link prev-link">
                    &larr;
                </a>
                <a href="<?php echo get_permalink($next_photo); ?>" class="nav-link next-link">
                    &rarr;
                </a>
            </div>
        </div>





    </div>
    <div class="photo-appart">

        <h3>Vous aimerez aussi</h3>

        <div class="photo-suggest">
            <?php
    $categories = get_the_terms(get_the_ID(), 'categories-photos'); // Obtenez les catégories du post actuel

    if ($categories) {
        $category_slugs = wp_list_pluck($categories, 'slug'); // Récupérez les slugs des catégories

        $args = array(
            'post_type' => 'photo',
            'posts_per_page' => 2,
            'orderby' => 'rand',
            'tax_query' => array(
                array(
                    'taxonomy' => 'categories-photos',
                    'field'    => 'slug',
                    'terms'    => $category_slugs,
                ),
            ),
        );
    }
        $query = new WP_Query($args);

        if ($query->have_posts()) :
            while ($query->have_posts()) :
                $query->the_post();
    ?>
            <!-- essayer de remplacer par le template part-->


            <a href="<?php the_permalink(); ?>" class="photo-items">
                <!-- Ajout du lien pour la vue de page unique -->
                <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail(); ?>
                <?php endif; ?>

                <div class="photo-icons">
                    <a href="#" class="fullscreen-icon"><i class="fas fa-expand"></i></a>
                    <a href="<?php the_permalink(); ?>" class="single-page-icon"><i class="fas fa-eye"></i></a>
                </div>
            </a>

            <?php
    endwhile;
    endif;
    wp_reset_postdata();
?>
        </div>

        <button class="load-more" id="load-more">Charger plus</button>
    </div>



</article>



<?php get_footer(); ?>