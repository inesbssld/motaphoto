<?php get_header(); ?>

<!--
<div class="hero-banner">
    <div class="hero-title">
        <h1>Photographe event</h1>
    </div>
</div>

-->


<section class="hero">
    <div class="hero-banner">
    </div>
</section>



<section class="gallery">
    <div class="filter-options">
        <form method="get">
            <select name="category_filter">
                <option value="">Catégories</option>
                <option value="reception">Réception</option>
                <option value="mariage">Télévision</option>
                <option value="concert">Concert</option>
                <option value="television">Mariage</option>
            </select>

            <select name="format_filter">
                <option value="">Formats</option>
                <option value="paysage">Paysage</option>
                <option value="portrait">Portrait</option>
            </select>

            <select name="sort_order">
                <option value="">Trier par </option>
                <option value="date">Date des plus récentes au plus anciennes</option>
                <option value="title">Date des plus anciennes aux plus récentes</option>
            </select>

            <!--<input type="submit" value="Filtrer">-->
        </form>
    </div>
    <div class="photo-gallery">
        <?php
    $args = array(
        'post_type' => 'photo', // Remplacez 'photos' par le nom de votre CPT
        'posts_per_page' => 12,// Nombre de photos à afficher initialement
		'orderby' => 'rand',
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) :
        while ($query->have_posts()) :
            $query->the_post();
    ?>
        <div class="photo-item">
            <?php
                if (has_post_thumbnail()) {
                    the_post_thumbnail();
                }
                ?>
        </div>
        <?php
        endwhile;
    endif;
    wp_reset_postdata();
    ?>
    </div>

    <button class="load-more" id="load-more">Charger plus</button>
</section>


<?php get_footer(); ?>