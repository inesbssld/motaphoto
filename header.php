<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <?php wp_body_open(); ?>

    <header class="header">

        <div class="logo">
            <?php
    if (has_custom_logo()) {
        the_custom_logo();
    } else {
        echo '<a href="' . esc_url(home_url('/')) . '">' . get_bloginfo('name') . '</a>';
    }
    ?>
        </div>


        <!-- on ajoute notre menu dans le header-->
        <nav class="header-nav">
            <?php
    wp_nav_menu(array(
        'theme_location' => 'main-menu', // Emplacement du menu à afficher
        'container' => 'ul', // Pour généré une ul et non une div comme container
       'menu_class' => 'main-menu', // Classe CSS pour la liste du menu
    ));
    ?>
        </nav>
    </header>