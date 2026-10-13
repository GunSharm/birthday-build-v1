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
const solvedBox = document.querySelector("#solved-groups")
const hintBtn = document.querySelector("#hint-btn")
const crossword = document.querySelector("#crossword")
const crosswordTitle = document.querySelector("#crossword-title")
const clueList = document.querySelector("#clue-list")
const crosswordFeedback = document.querySelector("#crossword-feedback")
const goldTiles = document.querySelector("#gold-tiles")
const closeCrossword = document.querySelector("#close-crossword")
const crosswordGrid = document.querySelector("#crossword-grid")
const playBtn = document.querySelector("#play-btn")
const readyBtn = document.querySelector("#ready-btn")
let currentWords = []
let currentEpisode= null
let guessesUsed = 0
let selected = []
let solved = []
let cluesSolved = 0
let goldCells =[]



gunjanBtn.addEventListener("click", () => {
    message.textContent = "Nice try, you already know how this ends.";
    readyBtn.hidden = true;
});

guestBtn.addEventListener("click", () => {
    message.textContent = "Guests aren't allowed here.";
    readyBtn.hidden = true;
});

garvitBtn.addEventListener("click", () => {
    message.textContent = "";
    readyBtn.hidden = false;
});

readyBtn.addEventListener("click", () => {
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
        { name: "BIG BACK Activities", words: ["SUSHI", "BIRYANI", "RAMEN", "BURGERS", "FRIES"], color: "#fff3b0" },
        { name: "DIVA Vibes", words: ["MATCHA", "COFFEE", "WHISKEY", "BEER", "DIET COKE" ], color: "#ffc8dd" },
        { name: "Hobbies", words: ["RUNNING", "GYM", "PICKLEBALL", "HIKING", "FOOTBALL" ], color: "#bde0fe"},
        { name: "OUR Thing", words: ["COOKING", "VIDEO GAMES", "ARCADES", "ONE PIECE", "F1" ], color: "#cdb4db" }
    ]
    },
    {
        title: "Episode 3 | The Gold Rush", type: "Crossword", tag:"Crossword", runtime: "15 min", color:"#0f4c5c", 
        teaser: "Something golden is hiding in here, Panda. Untangle it.",
        clues: [
            {clue: "What you make that's an absolute banger", answers: ["BIRYANI"], gold: 3},
            {clue: "Mortal Kombat on ____, Pushups and Whiskey?", answers: ["XBOX"], gold: 1},
            { clue: "What I call you", answers: ["PANDA"], gold: 2 },
            {clue: "Always gonna wear your team's jersey", answers: ["ARSENAL"], gold: 3},
            {clue: "In every other universe Gwen Stacy falls for _______", answers: ["SPIDERMAN"], gold: 7},
            { clue: "Our go-to takeout", answers: ["SUSHI"], gold: 5 },
            {clue: "The only kitchen where neither of us gets to cook", answers: ["PICKLEBALL"], gold: 1},
            {clue: "Where most of our weekends end up and you always end up losing to me", answers: ["ARCADES"], gold: 1},
            {clue: "______ to Survive", answers: ["DRIVE"], gold: 1},
            {clue: "Nothing happened.", answers: ["ONEPIECE"], gold: 1}       
    ]
    },
    { title: "Episode 4 | Full Time", tag: "Coming soon", runtime: "In Progress", color: "#2a2a35", locked: true },
    { title: "Episode 5 | The Finale", tag: "Coming soon", runtime: "In Progress", color: "#2a2a35", locked: true }
];

function clean(text) {
    return text.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function hideAll() {
    puzzle.hidden = true;
    connections.hidden = true;
    crossword.hidden = true;
}

function drawTiles() {
    connectionsBoard.innerHTML = "";
    solvedBox.innerHTML = "";

    solved.forEach((group) => {
        const banner = document.createElement("div");
        banner.className = "solved-banner";
        banner.style.backgroundColor = group.color;
        banner.innerHTML = `<strong>${group.name}</strong><p>${group.words.join(", ")}</p>`;
        solvedBox.appendChild(banner);
    });
    
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

function markWatched(ep){
    ep.card.classList.add("watched");
    updatePlay();
}

function nextEpisode() {
    return episodes.find((ep) => !ep.locked && !ep.card.classList.contains("watched"));
}

function updatePlay() {
    const next = nextEpisode();
    if (next) {
        playBtn.textContent = `Play Episode ${episodes.indexOf(next) + 1}`;
    } else {
        playBtn.textContent = "Watch again";
    }
}

episodes.forEach((episode) => {
    const card = document.createElement("div");
    episode.card = card;
    card.innerHTML = `<h3>${episode.title}</h3><p>${episode.tag} | ${episode.runtime}</p>`;
    card.className = "card";
    episodeRow.appendChild(card);
    card.style.backgroundColor = episode.color; 

    if (episode.locked) {
        card.classList.add("locked");
        return;
    }
    
    card.addEventListener("click", () =>{
        currentEpisode = episode;
        hideAll();
        if (episode.type === "Wordle") {
            puzzleTitle.textContent = episode.title;
            puzzleHint.textContent = episode.hint1;
            puzzle.hidden=false;
            board.innerHTML = "";
            guessesUsed = 0
            guessFeedback.textContent = ""
            guessInput.value = "" 
            guessBtn.disabled = false
        } else if (episode.type === "Connections") {
            connectionsTitle.textContent = episode.title;
            connections.hidden=false;

            const allWords = [];
            episode.groups.forEach((group) => {
                group.words.forEach((word) => {
                    allWords.push(word);
                });
            });
            
            currentWords = allWords;
            currentWords.sort(() => Math.random() - 0.5);
            selected = [];
            solved = [];
            connectionsFeedback.textContent = "";
            submitBtn.disabled = false;
            drawTiles();

        } else {
            crosswordTitle.textContent = episode.title;
            crossword.hidden = false;
            clueList.innerHTML = "";
            crosswordGrid.innerHTML = "";
            goldTiles.innerHTML = "";
            goldCells = [];
            cluesSolved = 0;
            crosswordFeedback.textContent = "";

            episode.clues.forEach((clue, i) => {
                const answer = clue.answers[0];
                const offset = 7-clue.gold;
                const cells = [];

                const gridRow = document.createElement("div");
                gridRow.className = "cw-row";
                const num = document.createElement("span");
                num.className = "cw-num";
                num.textContent = i+1;
                const grid = document.createElement("div");
                grid.className = "cw-grid";

                for (let c = 0; c < 16; c++) {
                    const cell = document.createElement("div");
                    const pos = c - offset;
                    if (pos < 0 || pos >=answer.length) {
                        cell.className = "cw-cell empty";
                    } else {
                        cell.className = "cw-cell";
                        cells.push(cell);
                        if(pos === clue.gold - 1){
                            goldCells.push(cell);
                        }
                    }
                    grid.appendChild(cell);
                }
                gridRow.appendChild(num);
                gridRow.appendChild(grid);
                crosswordGrid.appendChild(gridRow);

                const item = document.createElement("div");
                item.className = "clue-row";
                const label = document.createElement("p");
                label.textContent = `${i + 1}. ${clue.clue}`;
                const box = document.createElement("input");                
                box.addEventListener("input", () => {
                    if (clue.answers.includes(clean(box.value))){
                        box.disabled = true;
                        item.classList.add("done")
                        cells.forEach((cell,k) => {
                            cell.textContent = answer[k];
                            cell.classList.add("filled");
                        })
                        cluesSolved++;
                    if(cluesSolved === currentEpisode.clues.length){
                        crosswordFeedback.textContent = episode.teaser;
                        markWatched(currentEpisode);
                        goldCells.forEach((cell) => {
                            cell.classList.add("gold")
                        });
                        const letters = goldCells.map((cell) => cell.textContent);
                        letters.sort(() => Math.random() - 0.5);
                        letters.forEach((letter) => {
                            const badge = document.createElement("div");
                            badge.className = "gold-tile";
                            badge.textContent = letter;
                            goldTiles.appendChild(badge);
                        })
                    }
                    }
                });
                item.appendChild(label);
                item.appendChild(box);
                clueList.appendChild(item);
            });
        }
    })
      
});
updatePlay();

shuffleBtn.addEventListener("click", () => {
    currentWords.sort(() => Math.random() - 0.5);
    drawTiles();
});

hintBtn.addEventListener("click", () => {
    const nextGroup = currentEpisode.groups.find((s) => !solved.includes(s));
    if (nextGroup) {
        connectionsFeedback.textContent = "Stuck already, Panda? Try finding " + nextGroup.name;
    }
});

playBtn.addEventListener("click", () => {
    const target = nextEpisode() || episodes[0];
    target.card.click();
});

submitBtn.addEventListener("click", () => {
    if(selected.length !==5){
        connectionsFeedback.textContent = "Pick 5 words";
        return;
    }

    const match = currentEpisode.groups.find((group) => {
        return group.words.every((word) => selected.includes(word));
    });
    if (match){
        solved.push(match);
        currentWords = currentWords.filter((word) => !match.words.includes(word));
        selected = [];
        connectionsFeedback.textContent = "";
        if(solved.length ===  currentEpisode.groups.length) {
            connectionsFeedback.textContent = currentEpisode.teaser;
            submitBtn.disabled = true;
            markWatched(currentEpisode);
        }
        drawTiles();
    } else {
        connectionsFeedback.textContent = "Panda, you can do better";
    }
});

closeBtn.addEventListener("click", () =>{
    puzzle.hidden = true;
});
closeConnections.addEventListener("click", () =>{
    connections.hidden = true;
});
closeCrossword.addEventListener("click", () =>{
    crossword.hidden = true;
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
        markWatched(currentEpisode);
        
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
