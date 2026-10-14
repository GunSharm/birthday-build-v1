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
const lockedRow = document.querySelector("#locked-row")
const trivia = document.querySelector("#trivia")
const triviaTitle = document.querySelector("#trivia-title")
const triviaProgress = document.querySelector("#trivia-progress")
const triviaQuestion = document.querySelector("#trivia-question")
const triviaSlots = document.querySelector("#trivia-slots")
const triviaInput = document.querySelector("#trivia-input")
const triviaBtn = document.querySelector("#trivia-btn")
const triviaSkip = document.querySelector("#trivia-skip")
const triviaFeedback = document.querySelector("#trivia-feedback")
const triviaScore = document.querySelector("#trivia-score")
const closeTrivia = document.querySelector("#close-trivia")
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
        title: "Episode 1 | The Opening Round", type: "Wordle", tag:"Wordle", runtime: "5 min", color:"#2f6bbf", answer: "GUNNERS", guesses: 7, 
        hint1: "Born in a factory, named for what it made. Wear the red, and the cannon is your shade.", 
        hint2: "Not the club. The nickname. Seven letters, and the crowd sings it loud.",
        blurb: "Seven letters. One nickname."
    },
    {
        title: "Episode 2 | The Whole Picture", type:"Connections", tag:"Connections", runtime: "10 min", color:"#14867f",
        teaser: "That's a lot of you in one place. Any idea how I'd fit it all on a gift?",
        groups: [
        { name: "BIG BACK ACTIVITIES", words: ["SUSHI", "BIRYANI", "RAMEN", "BURGERS", "FRIES"], color: "#a8861f" },
        { name: "DIVA VIBES", words: ["MATCHA", "COFFEE", "WHISKEY", "BEER", "DIET COKE" ], color: "#a8456f" },
        { name: "HOBBIES", words: ["RUNNING", "GYM", "PICKLEBALL", "HIKING", "FOOTBALL" ], color: "#2f6bbf"},
        { name: "OUR THING", words: ["COOKING", "VIDEO GAMES", "ARCADES", "ONE PIECE", "F1" ], color: "#7a4bb0" }
        ],
        blurb: "Twenty words. Four groups."
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
            ],
            blurb: "Something golden is hiding."
    },
    {
        title: "Episode 4 | Full Time", tag: "Coming soon", runtime: "In Progress", color: "#2a2a35",
        type: "Trivia",
        target: 20,
        perPrompt: 3,
        teaser: "Full time, Panda. Now you need something to wear on matchday.",
        retry: "Not enough yet, Panda. There are more names in there. Go again?",
        prompts: [
            {
                question: "Name a player from the 2003-04 Invincibles squad",
                answers: [
                    { names: ["Henry", "Thierry Henry", "Thierry", "Titi"], points: 1 },
                    { names: ["Bergkamp", "Dennis Bergkamp", "Dennis"], points: 1 },
                    { names: ["Vieira", "Patrick Vieira", "Patrick"], points: 1 },
                    { names: ["Pires", "Robert Pires"], points: 1 },
                    { names: ["Ljungberg", "Freddie Ljungberg", "Fredrik Ljungberg", "Freddie"], points: 3 },
                    { names: ["Campbell", "Sol Campbell", "Sol"], points: 3 },
                    { names: ["Cole", "Ashley Cole", "Ashley"], points: 3 },
                    { names: ["Lauren", "Lauren Etame Mayer"], points: 3 },
                    { names: ["Toure", "Kolo Toure", "Kolo"], points: 3 },
                    { names: ["Lehmann", "Jens Lehmann", "Jens"], points: 3 },
                    { names: ["Gilberto", "Gilberto Silva", "Silva"], points: 3 },
                    { names: ["Keown", "Martin Keown"], points: 3 },
                    { names: ["Clichy", "Gael Clichy"], points: 3 },
                    { names: ["Edu"], points: 3 },
                    { names: ["Parlour", "Ray Parlour"], points: 3 },
                    { names: ["Reyes", "Jose Antonio Reyes", "Jose Reyes"], points: 3 },
                    { names: ["Kanu", "Nwankwo Kanu"], points: 3 },
                    { names: ["Wiltord", "Sylvain Wiltord", "Sylvain"], points: 3 },
                    { names: ["Fabregas", "Cesc Fabregas", "Cesc"], points: 5 },
                    { names: ["Cygan", "Pascal Cygan"], points: 5 },
                    { names: ["Jeffers", "Francis Jeffers"], points: 5 },
                    { names: ["Hoyte", "Justin Hoyte"], points: 5 },
                    { names: ["Stack", "Graham Stack"], points: 5 },
                    { names: ["Owusu-Abeyie", "Quincy Owusu-Abeyie", "Quincy"], points: 5 },
                    { names: ["Simek", "Frankie Simek", "Frank Simek"], points: 5 }
                ]
            },
            {
                question: "Name an Arsenal manager (caretakers count)",
                answers: [
                    { names: ["Wenger", "Arsene Wenger", "Arsene"], points: 1 },
                    { names: ["Arteta", "Mikel Arteta", "Mikel"], points: 1 },
                    { names: ["Emery", "Unai Emery", "Unai"], points: 1 },
                    { names: ["Graham", "George Graham"], points: 1 },
                    { names: ["Chapman", "Herbert Chapman", "Herbert"], points: 3 },
                    { names: ["Mee", "Bertie Mee", "Bertie"], points: 3 },
                    { names: ["Neill", "Terry Neill"], points: 3 },
                    { names: ["Howe", "Don Howe"], points: 3 },
                    { names: ["Whittaker", "Tom Whittaker"], points: 3 },
                    { names: ["Allison", "George Allison"], points: 3 },
                    { names: ["Rioch", "Bruce Rioch"], points: 3 },
                    { names: ["Rice", "Pat Rice"], points: 3 },
                    { names: ["Ljungberg", "Freddie Ljungberg", "Freddie"], points: 3 },
                    { names: ["Houston", "Stewart Houston"], points: 5 },
                    { names: ["Wright", "Billy Wright"], points: 5 },
                    { names: ["Swindin", "George Swindin"], points: 5 },
                    { names: ["Shaw", "Joe Shaw"], points: 5 },
                    { names: ["Knighton", "Leslie Knighton"], points: 5 },
                    { names: ["Kelso", "Phil Kelso"], points: 5 },
                    { names: ["Morrell", "George Morrell"], points: 5 },
                    { names: ["Bradshaw", "Harry Bradshaw"], points: 5 },
                    { names: ["Hollis", "Sam Hollis"], points: 5 }
                ]
            },
            {
                question: "Name a team Arsenal love to hate",
                answers: [
                    { names: ["Tottenham", "Tottenham Hotspur", "Spurs"], points: 1 },
                    { names: ["Chelsea"], points: 1 },
                    { names: ["Manchester United", "Man United", "Man Utd", "Man U", "MUFC"], points: 1 },
                    { names: ["Liverpool", "LFC"], points: 3 },
                    { names: ["Manchester City", "Man City"], points: 3 },
                    { names: ["Newcastle", "Newcastle United", "NUFC"], points: 3 },
                    { names: ["Leeds", "Leeds United"], points: 3 },
                    { names: ["Everton"], points: 5 },
                    { names: ["West Ham", "West Ham United"], points: 5 },
                    { names: ["Crystal Palace", "Palace"], points: 5 },
                    { names: ["Aston Villa", "Villa"], points: 5 },
                    { names: ["Stoke", "Stoke City"], points: 5 },
                    { names: ["Birmingham", "Birmingham City"], points: 5 }
                ]
            },
            {
                question: "Name an Arsenal striker, any era",
                answers: [
                    { names: ["Henry", "Thierry Henry", "Thierry", "Titi"], points: 1 },
                    { names: ["Wright", "Ian Wright"], points: 1 },
                    { names: ["Van Persie", "Robin van Persie", "Robin", "RVP"], points: 1 },
                    { names: ["Giroud", "Olivier Giroud", "Olivier"], points: 1 },
                    { names: ["Aubameyang", "Pierre-Emerick Aubameyang", "Auba"], points: 1 },
                    { names: ["Lacazette", "Alexandre Lacazette", "Laca"], points: 1 },
                    { names: ["Jesus", "Gabriel Jesus"], points: 1 },
                    { names: ["Gyokeres", "Viktor Gyokeres", "Viktor"], points: 1 },
                    { names: ["Bergkamp", "Dennis Bergkamp", "Dennis"], points: 3 },
                    { names: ["Anelka", "Nicolas Anelka", "Nicolas"], points: 3 },
                    { names: ["Walcott", "Theo Walcott", "Theo"], points: 3 },
                    { names: ["Kanu", "Nwankwo Kanu"], points: 3 },
                    { names: ["Wiltord", "Sylvain Wiltord", "Sylvain"], points: 3 },
                    { names: ["Overmars", "Marc Overmars", "Marc"], points: 3 },
                    { names: ["Sanchez", "Alexis Sanchez", "Alexis"], points: 3 },
                    { names: ["Bendtner", "Nicklas Bendtner", "Nicklas"], points: 3 },
                    { names: ["Welbeck", "Danny Welbeck", "Danny"], points: 3 },
                    { names: ["Nketiah", "Eddie Nketiah", "Eddie"], points: 3 },
                    { names: ["Arshavin", "Andrey Arshavin", "Andrei Arshavin", "Andrey"], points: 3 },
                    { names: ["Bastin", "Cliff Bastin", "Cliff"], points: 5 },
                    { names: ["Radford", "John Radford"], points: 5 },
                    { names: ["Drake", "Ted Drake", "Ted"], points: 5 },
                    { names: ["Brain", "Jimmy Brain"], points: 5 },
                    { names: ["Lishman", "Doug Lishman"], points: 5 },
                    { names: ["Hulme", "Joe Hulme"], points: 5 },
                    { names: ["Jack", "David Jack"], points: 5 },
                    { names: ["Lewis", "Reg Lewis"], points: 5 },
                    { names: ["Baker", "Joe Baker"], points: 5 }
                ]
            }
        ]
    },
    { title: "Episode 5 | The Finale", tag: "Coming soon", runtime: "In Progress", color: "#2a2a35", locked: true }
];

function clean(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function hideAll() {
    puzzle.hidden = true;
    connections.hidden = true;
    crossword.hidden = true;
    trivia.hidden = true;
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

episodes.forEach((episode,i) => {
    const card = document.createElement("div");
    episode.card = card;
    card.innerHTML = `<span class="ep-num">${i + 1}</span><h3>${episode.title}</h3><p>${episode.tag} | ${episode.runtime}</p><p class="blurb">${episode.blurb || ""}</p>`;
    card.className = "card";
    (episode.locked ? lockedRow : episodeRow).appendChild(card);
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
            guessInput.focus();
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

        } else if (episode.type === "Trivia") {
            triviaTitle.textContent = episode.title;
            triviaQuestion.textContent = episode.prompts[0].question;
            trivia.hidden = false; 
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
                        const nextBox = clueList.querySelector("input:not(:disabled)");
                        if (nextBox) {
                            nextBox.focus();
                        }
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
            clueList.querySelector("input").focus();
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

closeTrivia.addEventListener("click", () => {
    trivia.hidden = true;
});

guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        guessBtn.click();
    }
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
        guessBtn.disabled = true;
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
    guessInput.value = "";
    guessInput.focus();
});
