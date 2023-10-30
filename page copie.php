<?php get_header(); ?>

<section class="hero">
    <div class="photo-hero">
        <?php
                $args = array(
                    'post_type' => 'photo',
                    'posts_per_page' => 1,
                    'orderby' => 'rand',
                );

                $loop = new WP_Query($args);

                while ($loop->have_posts()) : $loop->the_post();
                    the_post_thumbnail();
                endwhile;
                wp_reset_postdata();
                ?>
        <h2>photographe event </h2>
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
        'post_type' => 'photo',
        'posts_per_page' => 12,
        'orderby' => 'rand',
		'paged'=> 1,
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) :
        while ($query->have_posts()) :
            $query->the_post();
            get_template_part('template-parts/photo_block');
        endwhile;
    endif;
    wp_reset_postdata();
    ?>
    </div>

    <button class="load-more" id="load-more">Charger plus</button>
</section>


<?php get_footer(); ?>