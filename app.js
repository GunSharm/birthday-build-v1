const gunjanBtn = document.querySelector("#btn-gunjan")
const guestBtn = document.querySelector("#btn-guest")
const garvitBtn = document.querySelector("#btn-garvit")
const profiles = document.querySelector("#profiles")
const home = document.querySelector("#home")
const message = document.querySelector("#message")

gunjanBtn.addEventListener("click", () => {
    message.textContent = "Nice try, you already know how this ends.";
});

guestBtn.addEventListener("click", () => {
    message.textContent = "Guests aren't allowed here.";
});

garvitBtn.addEventListener("click", () => {
    profiles.hidden = true;
    home.hidden = false;
});