function animationMain() {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
  // duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  lerp: 0.15,
  smooth: 5,
  smoothTouch: false,
  touchMultiplier: 2,
  wheelMultiplier: 1,
  infinite: false,
  autoResize: true
  });

  lenis.on('scroll', ScrollTrigger.update)
  
  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  });
  
  if (window.matchMedia("(min-width: 767px)").matches) {

  // Paragraph --------------------------------------------------------------
  if (document.querySelector(".split-lines")) {
    let splitTextLines = [...document.querySelectorAll(".split-lines")];
    splitTextLines.forEach((element) => {
      let mySplitText = new SplitText(element, {
        type: "lines",
        linesClass: "line",
      });
      new SplitText(element, {
        type: "lines",
        linesClass: "line-parent",
      });
      gsap.from(mySplitText.lines, {
        duration: .65,
        delay: .4,
        stagger: 0.05,
        yPercent: 105,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          //toggleActions: 'restart pause reverse pause',
        },
      });
    });
  };

  if (document.querySelector(".text-highlight")) {
  const textHighlights = document.querySelectorAll(".text-highlight");
  textHighlights.forEach((textHighlight) => {
    const splitText = new SplitText(textHighlight, {
      type: "lines, chars",
      charsClass: "char-highlight"
    });
    const tlh = gsap.timeline({
      scrollTrigger: {
        trigger: textHighlight, 
        scrub: 1,
        start: "top 70%", 
        end: "bottom 80%" 
      }
    });
    tlh.from(".char-highlight", {
      opacity: 0.2,
      stagger: 0.3
    });
  });
  };
  
  // Fade in
  if (document.querySelector(".fade-in")) {
  const fadeIn = gsap.utils.toArray(".fade-in");
  fadeIn.forEach((fadeInItem) => {
    gsap.from(fadeInItem, {
      opacity: 0,
      duration: 1,
      delay: .4,
      ease: Power2.easeInOut,
      scrollTrigger: {
        trigger: fadeIn,
        start: "top 90%",
      },
    });
  });
};

// Scroll image
const scrollImg = gsap.utils.toArray(".scroll-image");
scrollImg.forEach((scrollImgItem) => {
  gsap.to(scrollImgItem, {
    yPercent: 20,
    scale: .65,
    ease: "none",
    scrollTrigger: {
      trigger: scrollImgItem, // Poprawione odwołanie
      start: "top 50%",
      end: "bottom top",
      markers: true, // Do debugowania, można usunąć w produkcji
      scrub: true // Synchronizacja z przewijaniem
    },
  });
});


  // Line animation
  const lineX = gsap.utils.toArray(".line-x");
  lineX.forEach((lineXItem) => {
    gsap.from(lineXItem, {
      width: "0",
      duration: .75,
      delay: .4,
      ease: Power2.easeInOut,
      scrollTrigger: {
        trigger: '.line-x',
        start: "top 90%",
      },
    });
  });

    // Parallax
      gsap.utils.toArray(".parallax-wrap").forEach(function (container) {
        let image = container.querySelector("picture img");
        gsap.set(".parallax-wrap", {overflow: "hidden"});
  
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            scrub: true,
            pin: false,
          },
        });
        tl.from(image, {
          yPercent: -9,
          ease: "none",
        }).to(image, {
          yPercent: 9,
          ease: "none",
        });
      });

  // Footer parallax
    gsap.from(".footer-parallax", {
      opacity: 0,
      y: "-25%",
      scrollTrigger: {
        trigger: ".footer-parallax",
        start: "top bottom",
        end: "bottom 85%",
        scrub: true,
      },
    });

  // Magnetic
  var magnets = document.querySelectorAll('.magnetic');
  var magnetText = document.querySelectorAll("xt");
  var strength = 100;

  if(window.innerWidth > 767){
    // Mouse Reset
    magnets.forEach( (magnet) => {
      magnet.addEventListener('mousemove', moveMagnet );
      // $(this.parentNode).removeClass('not-active');
      magnet.addEventListener('mouseleave', function(event) {
        gsap.to( event.currentTarget, 1.5, {
          x: 0, 
          y: 0, 
          ease: 'Elastic.easeOut'
        });
        gsap.to( magnetText, 1.5, {
          x: 0, 
          y: 0, 
          ease: 'Elastic.easeOut'
        });
      });
    });

    // Mouse move
    function moveMagnet(event) {
      var magnetButton = event.currentTarget;
      var bounding = magnetButton.getBoundingClientRect();
      var magnetsStrength = magnetButton.getAttribute("data-strength");
      var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");
      var magnetText = magnetButton.querySelector(".btn-text");

      gsap.to( magnetButton, 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrength,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrength,
        rotate: '0.005deg',
        ease: 'Power4.easeOut'
      });
      gsap.to( magnetText, 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
        rotate: '0.001deg',
        ease: 'Power4.easeOut'
      });
    }
  }; 

     // Scroll progress
     if (window.matchMedia("(min-width: 767px)").matches) {
      gsap.to(".scrollprogress", {
       height: "100vh",
       ease: 'none',
       scrollTrigger: { 

         trigger: ".scrollContainer",
         start: "top 0%",
         end: "bottom 99%",
         scrub: true,
       }
     });
     };
    };


         // Nav menu
         if (document.querySelector("#menuToggle")) {
         const menuToggle = document.getElementById("menuToggle");
         const menuBar = gsap.timeline();
         var tl = gsap.timeline({ paused: true});
         tl.to('.fullpage-menu', {
             duration: 0,
             display: "block",
             ease: 'Expo.easeInOut',
         });
         tl.from('.menu-bg', {
             duration: .8,
             opacity: 0,
             ease: 'Expo.easeInOut'
         });
         tl.from('.main-menu li a', {
             duration: 1.3,
             y:"110%",
             stagger: 0.1,
             ease: 'Expo.easeInOut'
         }, "-=0.6");
         tl.from('.line-xh', {
          duration: 1,
          stagger: .1,
          width: "0",
          ease: 'Expo.easeInOut'
         }, "-=1.3");
         tl.reverse();
         menuToggle.addEventListener('click', function(){
             menuBar.reversed(!menuBar.reversed());
             tl.reversed(!tl.reversed());
           // menuWrap.classList.toggle("active");
         });
        };

         if (document.querySelector('.send-icon-big')) {
          gsap.from('.send-icon-big', {
           yPercent: 120,
           xPercent: -100,
           duration: .75,
           delay: .35
          });
         };

  // End animation
}

if (document.querySelector('.menu-toggle')) {
function addMenuClass() {
  MenuClass = document.querySelector("body");
  MenuToggle = document.querySelector(".menu-toggle");
  MenuToggle.addEventListener('click', () => {
    MenuClass.classList.toggle("menu-open");
  });
}
addMenuClass();
function removeMenuClass() {
  document.querySelector("body").classList.remove("menu-open");
}
};
