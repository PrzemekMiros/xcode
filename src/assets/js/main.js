/*
const changeTheme = document.querySelector(".button-theme");
let theme = localStorage.getItem("theme");

const applyTheme = (theme) => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
};

const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

if (!theme) {
    theme = systemPrefersDark.matches ? "dark" : "light";
}
applyTheme(theme);

changeTheme.addEventListener("click", () => {
    theme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(theme);
    localStorage.setItem("theme", theme); 
});

systemPrefersDark.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
    }
});
*/

function mainApp() {

    // Pobieramy aktualny adres URL
    var currentUrl = window.location.pathname;
        
    // Pobieramy wszystkie linki w menu
    var menuLinks = document.querySelectorAll('.main-menu a');

        // Usuwamy klasę "active" ze wszystkich linków w menu
menuLinks.forEach(function(link) {
link.classList.remove('link-active');
});

    // Iterujemy przez wszystkie linki w menu
    menuLinks.forEach(function(link) {
        // Sprawdzamy, czy adres URL linka odpowiada aktualnemu adresowi URL
        if (link.getAttribute('href') === currentUrl) {
            // Dodajemy klasę "active" do linka, jeśli adresy URL się zgadzają
            link.classList.add('link-active');
        }
    });


// Lazy blur images
if (document.querySelector(".blur-load")) {
    const blurImgWrap = document.querySelectorAll(".blur-load");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const item = entry.target;

                // Sprawdź, czy element nie jest już załadowany
                if (!item.classList.contains("loaded")) {
                    const img = item.querySelector("picture img");

                    function loaded() {
                        item.classList.add("loaded");
                        observer.unobserve(item); // Przestań obserwować po załadowaniu
                    }

                    if (img.complete) {
                        loaded();
                    } else {
                        img.addEventListener("load", loaded);
                        img.addEventListener("error", () => {
                            console.error("Image failed to load:", img.src);
                            observer.unobserve(item); // Odłącz obserwację również przy błędzie
                        });
                    }
                }
            }
        });
    }, {
        root: null, // Domyślnie okno przeglądarki
        threshold: 0.1 // Obraz wczytywany, gdy co najmniej 10% elementu jest w widoku
    });

    blurImgWrap.forEach((item) => {
        observer.observe(item);
    });
}

    
    if (document.querySelector('.swiper-works')) {
		var swiper = new Swiper(".swiper-works", {
            parallax: true,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 15,
			centeredSlides: false,
			loop: false,
			lazy: {
				loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
				loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true
			},
			scrollbar: {
				el: '.swiper-scrollbar',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			autoplay: {
				delay: 4000,
			},
			keyboard: {
				enabled: true
			},
			mousewheel: false,
            breakpoints: {
                // when window width is >= 480px
                480: {
                  slidesPerView: 2
                },
                // when window width is >= 640px
                640: {
                  slidesPerView: 2
                }
            }
		});
	};


    

}
