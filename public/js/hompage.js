const initApp=() => {
    const closeBtn = document.getElementById("close-button")
    const mobileMenu = document.getElementById("mobile-menu")

    const toggleMenu = () =>{
        mobileMenu.classList.toggle("hidden")
    }
    closeBtn.addEventListener("click", toggleMenu)
    mobileMenu.addEventListener("click", toggleMenu)
}
document.addEventListener("DOMContentLoaded", initApp)
