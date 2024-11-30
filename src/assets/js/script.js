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
        rootMargin: "300px", // Rozpocznij ładowanie, gdy element jest 200px poza widokiem
        threshold: 0 // Brak minimalnego procentu widoczności
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

	
	// Modals
		// Funkcja generująca modal
		function createModal() {
		  const modalHTML = `
			<div class="modal" id="modal-one">
			  <div class="modal-bg modal-exit"></div>
			  <div class="modal-container shadow">
			   <div class="modal-wrap">
				<iframe src="https://cal.com/przemys%C5%82aw-miros/niezobowiazujaca-rozmowa" style="border-width:0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>
				<span class="modal-close modal-exit">X</span>
			   </div>
			  </div>
			</div>
		  `;
	  
		  // Tworzenie elementu DOM z kodu HTML
		  const div = document.createElement("div");
		  div.innerHTML = modalHTML;
	  
		  // Dodanie modala do dokumentu
		  document.body.appendChild(div.firstElementChild);
		}
	  
		// Dodanie modala do strony
		createModal();
	  
		// Delegacja zdarzeń dla otwierania i zamykania modala
		document.addEventListener("click", function (event) {
		  // Sprawdź, czy kliknięto element z atrybutem data-modal
		  const trigger = event.target.closest("[data-modal]");
		  if (trigger) {
			event.preventDefault();
			const modalId = trigger.dataset.modal;
			const modal = document.getElementById(modalId);
			if (modal) {
			  modal.classList.add("open");
			}
		  }
	  
		  // Zamknij modal, jeśli kliknięto modal-exit
		  const exit = event.target.closest(".modal-exit");
		  if (exit) {
			const modal = exit.closest(".modal");
			if (modal) {
			  modal.classList.remove("open");
			}
		  }
		});
	  
  

// End
};