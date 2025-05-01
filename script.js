document.addEventListener('DOMContentLoaded', function() {
    // Animácia úvodnej sekcie pri načítaní
    const uvodnaSekcia = document.getElementById('domov');
    if (uvodnaSekcia) {
        uvodnaSekcia.style.transition = 'opacity 1s ease-in-out';
        uvodnaSekcia.style.opacity = '1';
    }

    // Animácie pri rolovaní
    const sekcieNaAnimaciu = document.querySelectorAll('.skryty');

    function skontrolujViditelnost() {
        sekcieNaAnimaciu.forEach(sekcia => {
            const rect = sekcia.getBoundingClientRect();
            const jeCiastocneViditelna = rect.top < window.innerHeight && rect.bottom >= 0;

            if (jeCiastocneViditelna) {
                sekcia.classList.add('zobrazeny');
                sekcia.classList.remove('skryty');
            }
        });
    }

    window.addEventListener('scroll', skontrolujViditelnost);
    skontrolujViditelnost(); // Spustíme aj pri načítaní pre prípad, že sú sekcie už viditeľné

    // Lightbox funkčnosť
    const galeriaOdkazy = document.querySelectorAll('#galeria a');
    const lightbox = document.getElementById('lightbox');
    const lightboxObrazok = document.getElementById('lightbox-obrazok');
    const zavrietLightbox = document.getElementById('zavriet-lightbox');

     // Uistite sa, že lightbox je skrytý pri načítaní
     lightbox.classList.remove('zobrazeny');
     lightboxObrazok.src = '';
     lightboxObrazok.alt = '';
 
    galeriaOdkazy.forEach(odkaz => {
        odkaz.addEventListener('click', function(e) {
            e.preventDefault(); // Zabráni predvolenému správaniu odkazu (prechodu na inú stránku)
            const obrazokSrc = this.getAttribute('href');
            const obrazokAlt = this.getAttribute('data-alt');
            lightboxObrazok.src = obrazokSrc;
            lightboxObrazok.alt = obrazokAlt;
            lightbox.classList.add('zobrazeny');
        });
    });

    zavrietLightbox.addEventListener('click', function() {
        lightbox.classList.remove('zobrazeny');
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === this) { // Zavrie lightbox po kliknutí mimo obrázka
            lightbox.classList.remove('zobrazeny');
        }
    });
});