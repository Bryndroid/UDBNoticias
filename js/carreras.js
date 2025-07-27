'use strict' 
    //Funcionalidad para mostrar solo la categoría seleccionada desde el navbar
    document.addEventListener('DOMContentLoaded', function() {
      //Tabs de carreras
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      const tabButtons = document.querySelectorAll('#carrerasTab button');
      //Recorro todos los navLinks para agregar un listener del evento click
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            tabButtons.forEach(btn => {
              if (btn.getAttribute('data-bs-target') === href) {
                //Acciono el evento click de los botones para que me filtre
                btn.click();
              }
            });
          }
        });
      });
    });
  