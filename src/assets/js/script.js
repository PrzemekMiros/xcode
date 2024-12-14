function appMain() {
  
	// Pobieramy aktualny adres URL
	var currentUrl = window.location.pathname;
	var menuLinks = document.querySelectorAll('.menu a');
	menuLinks.forEach(function(link) {
		link.classList.remove('link-active');
	});
	menuLinks.forEach(function(link) {
		if (link.getAttribute('href') === currentUrl) {
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
				
				const loaded = () => {
					item.classList.add("loaded");
					img.removeEventListener("load", loaded);
				};
				
				img.addEventListener("load", loaded);
				
				if (img.complete) {
					loaded();
				}
				
				observer.unobserve(item);
			}
		});
	}, {
		root: null, 
		rootMargin: "300px", 
		threshold: 0.1 
	});	

    blurImgWrap.forEach((item) => {
        observer.observe(item);
    });
};


	// Greeting
	if (document.querySelector("#greeting")) {
		const greeting = document.getElementById("greeting");
		const hour = new Date().getHours();
		const welcomeTypes = ["Dzień dobry", "Dobry wieczór"];
		let welcomeText = "";
		if (hour < 20) welcomeText = welcomeTypes[0];
		else welcomeText = welcomeTypes[1];
		greeting.innerHTML = welcomeText;
	}

	// Acordion
	if (document.querySelector(".accordion")) {
		let t = document.getElementsByClassName("accordion");
		for (let e = 0; e < t.length; e++)
			t[e].addEventListener("click", function() {
				let e = this.nextElementSibling;
				if (e.style.maxHeight)
					(e.style.maxHeight = null), this.classList.remove("open");
				else {
					for (let a = 0; a < t.length; a++)
						t[a].classList.remove("open"),
						(t[a].nextElementSibling.style.maxHeight = null);
					(e.style.maxHeight = e.scrollHeight + "px"),
					this.classList.toggle("open");
				}
			});
	};

  // Navbar
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#customNavbar');

    navbarToggler.addEventListener('click', () => {
        navbarToggler.classList.toggle('collapsed');
        navbarCollapse.classList.toggle('show');
    });

    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.remove('collapsed'); // Przywrócenie animacji hamburgera
            }
        });
    });

    // Form send
	function handleSubmit(formId, redirectUrl) {
		var form = document.getElementById(formId);

		if (form) {
			form.addEventListener('submit', function(e) {
				e.preventDefault();

				var formData = new FormData(form);
				var xhr = new XMLHttpRequest();

				xhr.open('POST', 'https://www.futurewebstudio.pl/form/forms/' + formId + '.php');

				xhr.onreadystatechange = function() {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (xhr.status === 200) {
							var res = JSON.parse(xhr.responseText);
							if (res.status === 1) {
								form.reset();
								window.location.href = redirectUrl; // Przekieruj po pomyślnym wysłaniu formularza
							}
						}
					}
				};

				xhr.send(formData);
			});
		}
	}
	handleSubmit('briefForm', '/wyslano-formularz');
	handleSubmit('contactForm', '/wyslano-formularz');


	
// Sprawdzamy aktualną datę i czas
function updateAvailability() {
    const now = new Date();
    const day = now.getDay(); // 0 = Niedziela, 1 = Poniedziałek, ..., 6 = Sobota
    const hour = now.getHours();

    // Elementy do ukrywania/pokazywania
    const availableElements = document.querySelectorAll('.available');
    const notAvailableElements = document.querySelectorAll('.not-available');

    // Określamy warunki widoczności
    const isWeekday = day >= 1 && day <= 5; // Poniedziałek - Piątek
    const isSaturday = day === 6; // Sobota
    const isAvailableTime = (isWeekday && hour >= 9 && hour < 17) || (isSaturday && hour >= 9 && hour < 15);

    if (isAvailableTime) {
        // Pokaż dostępne, ukryj niedostępne
        availableElements.forEach(el => el.style.display = 'block');
        notAvailableElements.forEach(el => el.style.display = 'none');
    } else {
        // Pokaż niedostępne, ukryj dostępne
        availableElements.forEach(el => el.style.display = 'none');
        notAvailableElements.forEach(el => el.style.display = 'block');
    }
}

// Wywołaj funkcję na start i ustaw cykliczne sprawdzanie co minutę
updateAvailability();
setInterval(updateAvailability, 60000);



// End
};