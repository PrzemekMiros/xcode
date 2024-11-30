document.addEventListener('DOMContentLoaded', function () {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const rejectCookies = document.getElementById('rejectCookies');
    
    // Check consent status on page load
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
        cookieConsent.style.display = 'none';
        enableCookies(); // Ensure cookies are enabled if previously accepted
    } else if (cookiesAccepted === 'false') {
        cookieConsent.style.display = 'none'; // Hide banner if cookies were rejected
    } else {
        cookieConsent.style.display = 'block'; // Show banner if no consent is stored
    }

    // Handle acceptance
    acceptCookies.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.display = 'none';
        enableCookies(); // Define your function to enable cookies
    });

    // Handle rejection
    rejectCookies.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'false');
        cookieConsent.style.display = 'none';
        disableCookies(); // Define your function to disable cookies
    });
});

function enableCookies() {
    // Dynamically load Hotjar script
    (function(h, o, t, j, a, r) {
        h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments); };
        h._hjSettings = { hjid: 3601699, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

    console.log("Cookies enabled and Hotjar loaded.");
}

function disableCookies() {
    console.log("Cookies disabled. Analytics not loaded.");
}
