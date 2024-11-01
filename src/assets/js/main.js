const changeTheme = document.querySelector(".change-theme");
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
