<?php get_header()?>


<div id="primary" class="content-area">
    <main id="main" class="site-main">

        <?php
        while (have_posts()) : the_post(); // La boucle WordPress

            ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

            <header class="entry-header">
                <h1 class="entry-title"><?php the_title(); ?></h1>
            </header>

            <div class="entry-content">
                <?php the_content(); // Affiche le contenu de la page ?>
            </div>

        </article>

        <?php
            // Si les commentaires sont activés ou s'il y a au moins un commentaire, charge le modèle de commentaire.
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;

        endwhile;
        ?>

    </main>
</div>

<?php get_footer()?>