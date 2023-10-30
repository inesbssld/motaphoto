   <div class="photo-items" data-photo-id="<?php echo get_the_ID(); ?>">
       <a href="<?php the_permalink(); ?>">
           <!-- Ajout du lien pour la vue de page unique -->
           <?php if (has_post_thumbnail()) : ?>
           <?php the_post_thumbnail(); ?>
           <?php endif; ?>
       </a>
       <div class="photo-icons">
           <a href="#" class="fullscreen-icon"><i class="fas fa-expand fa-fade fa-thin fa-xs"></i></a>
           <a href="<?php the_permalink(); ?>" class="single-page-icon"><i class="fas fa-eye fa-xs"></i></a>
           <div class="photo-infos">
               <p class="photo-title"><?php the_title(); ?></p>
               <p class="photo-cat"><?php the_terms(get_the_ID(), 'categories-photos'); ?></p>
           </div>
       </div>
   </div>