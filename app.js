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
const guessInput = document.querySelector("#guess-input")
const guessBtn = document.querySelector("#guess-btn")
const guessFeedback = document.querySelector("#guess-feedback")
const board = document.querySelector("#board")
const connections = document.querySelector("#connections")
const connectionsTitle = document.querySelector("#connections-title")
const closeConnections = document.querySelector("#close-connections")
const connectionsBoard = document.querySelector("#connections-board")
const shuffleBtn = document.querySelector("#shuffle-btn")
const submitBtn = document.querySelector("#submit-btn")
const connectionsFeedback = document.querySelector("#connections-feedback")
let currentWords = []
let currentEpisode= null
let guessesUsed = 0
let selected = []



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
    {
        title: "Episode 1 | The Opening Round", type: "Wordle", tag:"Wordle", runtime: "5 min", color:"#1d3557", answer: "GUNNERS", guesses: 7, 
        hint1: "Born in a factory, named for what it made. Wear the red, and the cannon is your shade.", 
        hint2: "Not the club. The nickname. Seven letters, and the crowd sings it loud."
    },
    {
        title: "Episode 2 | The Whole Picture", type:"Connections", tag:"Connections", runtime: "10 min", color:"#1d3557",
        teaser: "That's a lot of you in one place. Any idea how I'd fit it all on a gift?",
        groups: [
        { name: "BIG BACK Activities", words: ["SUSHI", "BIRYANI", "RAMEN", "BURGERS", "FRIES"] },
        { name: "DIVA Vibes", words: ["MATCHA", "COFFEE", "WHISKEY", "BEER", "DIET COKE" ] },
        { name: "Hobbies", words: ["RUNNING", "GYM", "PICKLEBALL", "HIKING", "FOOTBALL" ] },
        { name: "OUR Thing", words: ["COOKING", "VIDEO GAMES", "ARCADES", "ONE PIECE", "F1" ] }
    ]

    }
];

function drawTiles() {
    connectionsBoard.innerHTML = "";
    
    currentWords.forEach((word) => {
        const tile = document.createElement("button");
        tile.className = "word-tile";
        tile.textContent = word;
        connectionsBoard.appendChild(tile);

        if (selected.includes(word)){
            tile.classList.add("selected");
        }
        
        tile.addEventListener("click", () => {
            if(selected.includes(word)){
                selected = selected.filter((g) => g !== word);
            } else if (selected.length < 5){
                selected.push(word);
            } 
            drawTiles();
        })


    })
}

episodes.forEach((episode) => {
    const card = document.createElement("div");
    card.innerHTML = `<h3>${episode.title}</h3><p>${episode.tag} | ${episode.runtime}</p>`;
    card.className = "card";
    episodeRow.appendChild(card);
    card.style.backgroundColor = episode.color; 
    card.addEventListener("click", () =>{
        currentEpisode = episode;
        if (episode.type === "Wordle") {
            puzzleTitle.textContent = episode.title;
            puzzleHint.textContent = episode.hint1;
            puzzle.hidden=false;
            board.innerHTML = "";
            guessesUsed = 0
            guessFeedback.textContent = ""
            guessInput.value = "" 
            guessBtn.disabled = false
            connections.hidden = true
        } else {
            connectionsTitle.textContent = episode.title;
            connections.hidden=false;
            connectionsBoard.innerHTML= "";

            const allWords = [];
            episode.groups.forEach((group) => {
                group.words.forEach((word) => {
                    allWords.push(word);
                });
            });
            
            currentWords = allWords;
            currentWords.sort(() => Math.random() - 0.5);
            selected = [];
            drawTiles();

            puzzle.hidden = true

        }
    })
      
});

shuffleBtn.addEventListener("click", () => {
    currentWords.sort(() => Math.random() - 0.5);
    drawTiles();
});

submitBtn.addEventListener("click", () => {
    if(selected.length !==5){
        connectionsFeedback.textContent = "Pick 5 words";
        return;
    }

    connectionsFeedback.textContent = "5 selected";
});

closeBtn.addEventListener("click", () =>{
    puzzle.hidden = true;
});
closeConnections.addEventListener("click", () =>{
    connections.hidden = true;
});

guessBtn.addEventListener("click", () => {
    const typed = guessInput.value.toUpperCase();
    if (typed.length !== 7) {
        guessFeedback.textContent = "Needs 7 letters";
        return;
    }
    guessesUsed++
    if(guessesUsed === 3){
        puzzleHint.textContent = currentEpisode.hint2
    }
    if (typed === currentEpisode.answer) {
        guessFeedback.textContent = "Any idea on the gift now?";
        
    } else if (guessesUsed === currentEpisode.guesses){
        guessFeedback.textContent = " Panda, its done :("
        guessBtn.disabled = true
    } else {
        guessFeedback.textContent = "Panda, you can do better";
    }
    const row = document.createElement("div");
    const results = [];
    const remaining = currentEpisode.answer.split("");
    typed.split("").forEach((letter,i) => {
        if(letter === currentEpisode.answer[i]){
            results[i] = "correct";
            remaining[i] = null
        }
    });
    typed.split("").forEach((letter, i) => {
        if (results[i] !== "correct") {
            const spot = remaining.indexOf(letter);
            if (spot !== -1) {
                results[i] = "present";
                remaining[spot] = null;
            } else {
                results[i] = "absent";
            }
        }
    });
    typed.split("").forEach((letter,i) => {
        const box = document.createElement("span");
        box.className = "title";
        box.textContent = letter;
        box.classList.add(results[i]);
        row.appendChild(box);
    });
    
    board.appendChild(row);
});
