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
                    const img = item.querySelector("picture img");
    
                    function loaded() {
                        item.classList.add("loaded");
                    }
    
                    if (img.complete) {
                        loaded();
                    } else {
                        img.addEventListener("load", loaded);
                    }
    
                    // Przestań obserwować element po jego załadowaniu
                    observer.unobserve(item);
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
    


}
