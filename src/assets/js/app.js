// Globalna lista dodatkowych atrakcji
let extraAttractions = [];

// Funkcja do pobrania koszyka z localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Funkcja do zapisu koszyka do localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Funkcja do wyświetlania koszyka
function displayCart() {
    const cart = getCart();
    let cartHtml = '';

    if (cart.length === 0) {
        cartHtml = '<p>Schowek jest pusty</p>';
    } else {
        cart.forEach((item, index) => {
            cartHtml += 
                `<div class="cart-item" style="border-bottom: 1px solid #ccc; padding: 0 0 40px 0;margin-bottom:20px;">
                    <h4>${item.name}</h4>
                    <ul style="list-style: none; padding: 0; margin: 10px 0;">
                        ${item.extras.map(extra => `<li>${extra.name} - ${extra.price} zł</li>`).join('')}
                    </ul>
                    <p>Cena: ${item.price} zł</p>
                    <button onclick="removeFromCart(${index})" style="font-size:15px;font-weight:600;cursor: pointer;">Remove</button>
                </div>`;
        });
    }

    document.getElementById('cart').innerHTML = cartHtml;
}

// Funkcja do usuwania pozycji z koszyka
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1); // Usuń element z tablicy
    saveCart(cart);
    displayCart(); // Odśwież wyświetlanie koszyka
    calculateTotal(); // Zaktualizuj sumę
}

// Funkcja do obliczania łącznej sumy koszyka
function calculateTotal() {
    const cart = getCart();
    let total = 0;

    cart.forEach(item => {
        total += item.price; // Cena głównej atrakcji
        item.extras.forEach(extra => {
            total += extra.price; // Ceny dodatkowych atrakcji
        });
    });

    document.getElementById('total').textContent = `Łączna cena: ${total.toFixed(2)} zł`;
}

// Funkcja do dodania pozycji do koszyka
function addToCart(attraction) {
    const cart = getCart();
    cart.push(attraction);
    saveCart(cart);
    alert('Added to cart');
    calculateTotal(); // Zaktualizuj sumę
}

// Funkcja do dodania atrakcji do koszyka po kliknięciu w #attraction-add-to-card-btn
function addAttractionToCart() {
    const priceElement = document.getElementById('storage-add-to-card-price');
    if (!priceElement) {
        console.error("Element with ID 'storage-add-to-card-price' does not exist.");
        return;
    }

    const attraction = {
        id: document.querySelector('.single-storage').getAttribute('data-id'),
        name: document.querySelector('.single-storage-title').textContent,
        price: parseFloat(priceElement.textContent), // Pobieramy wartość z elementu div
        extras: extraAttractions // Dodajemy dodatkowe atrakcje
    };

    // Dodanie do koszyka
    addToCart(attraction);

    // Resetowanie dodatkowych atrakcji po dodaniu do koszyka
    extraAttractions = [];
}

// Funkcja do aktualizacji ceny
function updatePrice() {
    const pricePerPersonElement = document.getElementById('storage-price-to-calc');
    const peopleCountElement = document.getElementById('storage-people-count');
    const totalPriceElement = document.getElementById('storage-add-to-card-price');

    if (!pricePerPersonElement || !peopleCountElement || !totalPriceElement) {
        console.error("One of the required items was not found.");
        return;
    }

    const pricePerPerson = parseFloat(pricePerPersonElement.textContent);
    const peopleCount = parseInt(peopleCountElement.value);

    if (isNaN(pricePerPerson) || isNaN(peopleCount)) {
        console.error("Invalid values in the Price per person or Number of people fields.");
        totalPriceElement.textContent = "0";
        return;
    }

    // Podstawowa cena (cena za osobę * liczba osób)
    let totalPrice = pricePerPerson * peopleCount;

    // Dodanie kosztów dodatkowych atrakcji
    extraAttractions.forEach(extra => {
        totalPrice += extra.price;
    });

    // Aktualizacja elementu z ceną
    totalPriceElement.textContent = totalPrice.toFixed(2); // Ustawiamy wynik w elemencie
}

// Obsługa zmiany liczby osób
document.addEventListener('DOMContentLoaded', () => {
    const peopleCountElement = document.getElementById('storage-people-count');
    if (peopleCountElement) {
        peopleCountElement.addEventListener('input', updatePrice);
    }

    // Obliczenie ceny na początku (przy załadowaniu strony)
    updatePrice();
});

// Obsługa przycisków z klasą 'more-attraction-add-to-card-btn'
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.more-storage-add-to-card-btn').forEach(button => {
        button.addEventListener('click', function () {
            const parentItem = this.closest('.more-storage-item');
            if (!parentItem) return;

            const priceElement = parentItem.querySelector('.more-storage-price');
            const nameElement = parentItem.querySelector('.more-storage-title');

            const price = priceElement ? parseFloat(priceElement.textContent) : 0;
            const name = nameElement ? nameElement.textContent : 'Nieznanae';

            if (isNaN(price)) {
                console.error('Invalid price value.');
                return;
            }

            // Dodanie do globalnej listy dodatkowych atrakcji
            extraAttractions.push({ name, price });

            // Ponowne przeliczenie ceny
            updatePrice();
        });
    });
});

// Inicjalizacja modala i koszyka
document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.getElementById('storage-add-to-card-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addAttractionToCart);
    }

    const modals = document.querySelectorAll("[data-modal]");
    modals.forEach(function (trigger) {
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            const modal = document.getElementById(trigger.dataset.modal);
            modal.classList.add("open");

            // Resetuj dodatkowe atrakcje
            extraAttractions = [];
            displayCart();
            calculateTotal();

            const exits = modal.querySelectorAll(".modal-exit");
            exits.forEach(function (exit) {
                exit.addEventListener("click", function (event) {
                    event.preventDefault();
                    modal.classList.remove("open");
                });
            });
        });
    });
});
