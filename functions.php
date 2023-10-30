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
     // Enqueue le fichier lightbox.js
    wp_enqueue_script(
        'lightbox',
        get_template_directory_uri() . '/assets/js/lightbox.js', // Assurez-vous que ce chemin est correct
        array('jquery'),
        '1.0.0',
        true
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


// bouton charger plus page accueil
function load_more_photos() {

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12,
        'orderby' => 'date',
        'order' => 'DESC',
        'paged' => $_POST['paged'],
        //'post__not_in'=>[]
    );

    $query = new WP_Query($args);

  $response = '';
    $max_pages = $query->max_num_pages;


    if ($query->have_posts()) {
 ob_start();
        while ($query->have_posts()) :
            $query->the_post();
            $response .= get_template_part('template-parts/photo_block', 'photo');
        endwhile;
         $output = ob_get_contents();
    ob_end_clean();
    }
    else {
        $response='';
    }

 $result = [
    'max' => $max_pages,
    'html' => $output,
  ];



 echo json_encode($result);
 exit;
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');



// bouton charger plus single-page
function load_all_photos() {
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => -1, // Charger toutes les photos
        'orderby' => 'date',
        'order' => 'DESC',
    );

    $query = new WP_Query($args);

    $response = '';

    if ($query->have_posts()) {
        ob_start();
        while ($query->have_posts()) :
            $query->the_post();
            $response .= get_template_part('template-parts/photo_block', 'photo');
        endwhile;
        $output = ob_get_contents();
        ob_end_clean();
    } else {
        $response = '';
    }
// ajout test



 // Vérifiez si toutes les photos sont chargées en comparant avec le nombre total de photos
    $total_photos = wp_count_posts('photo')->publish;
    $photos_loaded = $query->found_posts;
    $all_loaded = ($photos_loaded >= $total_photos);


//fin ajout test


    $result = [
        'html' => $output,
         'allLoaded' => $all_loaded, // Indiquez si toutes les photos sont chargées test

    ];

    wp_reset_postdata();

    echo json_encode($result);
    exit;
}

add_action('wp_ajax_load_all_photos', 'load_all_photos');
add_action('wp_ajax_nopriv_load_all_photos', 'load_all_photos');






// ajout de la configuration ajax

function add_ajax_library() {
    wp_enqueue_script('load-more-photos', get_template_directory_uri() . '/assets/js/load-more.js', array('jquery'), '', true);

    wp_localize_script('load-more-photos', 'ajax_object', array(
        'ajax_url' => admin_url('admin-ajax.php'),

    ));
}

add_action('wp_enqueue_scripts', 'add_ajax_library');