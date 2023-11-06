</main>

<?php get_template_part('template-parts/modal/modal');?>
<?php get_template_part('template-parts/lightbox');?>

<footer class="footer">


    <nav class="footer-nav">
        <?php
    wp_nav_menu(array(
        'theme_location' => 'footer-menu',
        'container' => 'ul',
        'menu_class' => 'footer-menu',
    ));
    ?>
    </nav>
    <span>Tous droits réservés</span>
</footer>

<?php wp_footer(); ?>

</body>

</html>