<?php

// Ajouter la prise en charge des images mises en avant
add_theme_support( 'post-thumbnails' );

// Ajouter automatiquement le titre du site dans l'en-tête du site
add_theme_support( 'title-tag' );

//ajouter le logo
add_theme_support('custom-logo');

// Enqueue le fichier style.css du thème
function enqueue_motaphoto_styles() {
    wp_enqueue_style('motaphoto-style', get_stylesheet_uri());
}

// Action pour ajouter la fonction à la file d'attente des styles
add_action('wp_enqueue_scripts', 'enqueue_motaphoto_styles');


function enqueue_custom_scripts() {
    // Enregistrez le script jQuery (si ce n'est pas déjà fait par WordPress)
    wp_enqueue_script('jquery');

    // Enregistrez votre script personnalisé
    wp_enqueue_script(
        'custom-script',
        get_template_directory_uri() . '/assets/js/script.js', // Chemin vers votre script
        array('jquery'), // Dépendance à jQuery
        '1.0', // Version de votre script
        true // Chargez le script dans le pied de page (true) ou l'en-tête (false)
    );
}

add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');






// enregistrement des emplacements de menus
function register_my_menus() {
    register_nav_menus(
        array(
            'main-menu' => __('Menu principal', 'text-domain'),
            'footer-menu' => __('Menu pied de page', 'text-domain'),
        )
    );
}
add_action('after_setup_theme', 'register_my_menus');