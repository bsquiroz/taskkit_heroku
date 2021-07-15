const iconToggle = document.querySelector("#icon-toggle");
const menu = document.querySelector("#menu"); //menu responsivo
const sidebar = document.querySelector("#sidebar"); //sidebar responsivo

//botones
const menuOpen = document.querySelector("#menu-open");
const menuClose = document.querySelector("#menu-close");

if (iconToggle) {
    if (menu) {
        iconToggle.addEventListener("click", () => {
            menu.classList.toggle("show-navigation");
            toggleBottons();
        });
    } else if (sidebar) {
        iconToggle.addEventListener("click", () => {
            sidebar.classList.toggle("show-sidebar");
            toggleBottons();
        });
    }
}

const toggleBottons = () => {
    let aux = menuOpen.className;
    if (aux === "active md hydrated") {
        menuOpen.classList.add("no-active");
        menuClose.classList.remove("no-active");
    } else {
        menuOpen.classList.remove("no-active");
        menuClose.classList.add("no-active");
    }
};
