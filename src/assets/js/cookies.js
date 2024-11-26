document.addEventListener('DOMContentLoaded', function () {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const rejectCookies = document.getElementById('rejectCookies');
    
    // Show the banner if no consent is stored
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
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
    // Code to enable cookies or analytics
    console.log("Cookies enabled.");
}

function disableCookies() {
    // Code to disable cookies or analytics
    console.log("Cookies disabled.");
}
