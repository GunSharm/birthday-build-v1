const gunjanBtn = document.querySelector("#btn-gunjan")
const guestBtn = document.querySelector("#btn-guest")
const garvitBtn = document.querySelector("#btn-garvit")
const profiles = document.querySelector("#profiles")
const home = document.querySelector("#home")
const message = document.querySelector("#message")
const episodeRow = document.querySelector("#episode-row")
const puzzle = document.querySelector("#puzzle")
const puzzleTitle = document.querySelector("#puzzle-title")
const puzzleHint = document.querySelector("#puzzle-hint")
const closeBtn = document.querySelector("#close-puzzle")

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

const episodes = [
    {title: "Episode 1 | The Opening Round", tag:"Wordle", runtime: "5 min", color:"#1d3557", answer: "GUNNERS", guesses: 7, 
    hint1: "Born in a factory, named for what it made. Wear the red, and the cannon is your shade.", 
    hint2: "Not the club. The nickname. Seven letters, and the crowd sings it loud.", 
    memory: "Always gonna be wearing your jersey."}
];

episodes.forEach((episode) => {
    const card = document.createElement("div");
    card.innerHTML = `<h3>${episode.title}</h3><p>${episode.tag} | ${episode.runtime}</p>`;
    card.className = "card";
    episodeRow.appendChild(card);
    card.style.backgroundColor = episode.color; 
    card.addEventListener("click", () =>{
        puzzleTitle.textContent = episode.title;
        puzzleHint.textContent = episode.hint1;
        puzzle.hidden=false;
    })   
});

closeBtn.addEventListener("click", () =>{
    puzzle.hidden = true;
});