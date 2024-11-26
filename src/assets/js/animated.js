document.addEventListener("DOMContentLoaded", function() {
  const animatedElements = document.querySelectorAll('.animated');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
          }
      });
  });

  animatedElements.forEach(element => {
      observer.observe(element);
  });
});