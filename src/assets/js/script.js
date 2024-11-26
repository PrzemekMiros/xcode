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
		threshold: 0.1 // Obraz wczytywany, gdy co najmniej 10% elementu jest w widoku
	});

	blurImgWrap.forEach((item) => {
		observer.observe(item);
	});
};

	if (document.querySelector('.swiper-opinion')) {
		var swiper = new Swiper(".swiper-opinion", {
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 15,
			lazyPreloadPrevNext: 1,
			centeredSlides: false,
			loop: true,
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
				delay: 5000,
			},
			keyboard: {
				enabled: true
			},
			mousewheel: false,
			breakpoints: {
				460: {
					slidesPerView: 1.25
				},
				768: {
					slidesPerView: 1.8
				},
				991: {
					slidesPerView: 2
				},
				1024: {
					slidesPerView: 2
				},
				1200: {
					slidesPerView: 2
				}
			}
		});
	};

	if (document.querySelector('.swiper-works')) {
		var swiper = new Swiper(".swiper-works", {
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 15,
			centeredSlides: false,
			loop: true,
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
		});
	};


	if (document.querySelector('.works-grid-item')) {
		var worksGridItems = document.querySelectorAll('.works-grid-item');
		worksGridItems.forEach(function(item) {
			item.addEventListener('mouseenter', function(event) {
				worksGridItems.forEach(function(innerItem) {
					if (innerItem !== item) {
						innerItem.classList.add('works-grid-item-effect');
					}
				});
			});
			item.addEventListener('mouseleave', function(event) {
				worksGridItems.forEach(function(innerItem) {
					if (innerItem !== item) {
						innerItem.classList.remove('works-grid-item-effect');
					}
				});
			});
		});
	}

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
  // Header scrolled
  if (document.querySelector(".site-header")) {
	(function() {
		var doc = document.documentElement;
		var w = window;
		var curScroll;
		var prevScroll = w.scrollY || doc.scrollTop;
		var curDirection = 0;
		var prevDirection = 0;
		var body = document.querySelector('body');
		var header = document.querySelector('.site-header');
		var toggled;
		var threshold = 20;

		var checkScroll = function() {
			curScroll = w.scrollY || doc.scrollTop;
			if (curScroll > prevScroll) {
				// scrolled down
				curDirection = 2;
			} else {
				// scrolled up
				curDirection = 1;
			}

			if (curDirection !== prevDirection) {
				toggled = toggleHeader();
			}

			// Add or remove 'scrolled' class based on scroll position
			if (curScroll > 150) {
				header.classList.add('scrolled');
			} else {
				header.classList.remove('scrolled');
			}

			prevScroll = curScroll;
			if (toggled) {
				prevDirection = curDirection;
			}
		};

		var toggleHeader = function() {
			toggled = true;
			if (curDirection === 2 && curScroll > threshold) {
				header.classList.add('hide');
				body.classList.add('sticky-up');
        body.classList.remove('sticky-down');
			} else if (curDirection === 1) {
				header.classList.remove('hide');
				body.classList.remove('sticky-up');
        body.classList.add('sticky-down');
			} else {
				toggled = false;
			}
			return toggled;
		};

		window.addEventListener('scroll', checkScroll);

	})();
    };

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


// End
};