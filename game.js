// game.js

const CARD_SIZE = 5;
const LETTERS = ['B', 'I', 'N', 'G', 'O'];

const masterGridElement = document.getElementById('master-grid');
const playerCardElement = document.getElementById('player-bingo-card');
const calledNumberDisplay = document.getElementById('called-number-display'); 

// ቋሚ የቢንጎ ካርዶች ክምችት (Pool) - ለሙከራ
const STATIC_CARD_POOL = {
    'card-44': {
        'B': [5, 4, 15, 2, 3],
        'I': [17, 30, 29, 28, 26],
        'N': [37, 39, 'FREE', 36, 33],
        'G': [60, 54, 51, 48, 52],
        'O': [75, 73, 68, 62, 65]
    }
};

// ለሙከራ የተጠሩ ቁጥሮች (Master Grid እና Card ላይ ማርክ ለማድረግ)
const CALLED_NUMBERS = [11, 4, 23, 42]; 

// 1. 75 ቁጥሮችን Master Grid ላይ የሚሞላ ተግባር
function renderMasterGrid() {
    masterGridElement.innerHTML = '';
    
    // የ Master Grid ቁጥሮችን መሙላት
    for (let i = 1; i <= 75; i++) {
        const cell = document.createElement('div');
        cell.textContent = i;
        cell.classList.add('master-cell');
        cell.dataset.number = i;

        // ከተጠሩ ቁጥሮች ጋር ማመሳሰል እና ማርክ ማድረግ
        if (CALLED_NUMBERS.includes(i)) {
            cell.classList.add('called');
        }

        masterGridElement.appendChild(cell);
    }
}

// 2. የተጫዋቹን 5x5 ካርድ የሚጭን ተግባር
function renderPlayerCard(cardId) {
    const cardData = STATIC_CARD_POOL[cardId];
    if (!cardData) return;
    
    playerCardElement.innerHTML = '';
    
    // ፊደሎቹን (Headers) ማሳየት
    LETTERS.forEach(letter => {
        const header = document.createElement('div');
        header.textContent = letter;
        header.classList.add('header');
        playerCardElement.appendChild(header);
    });

    // ቁጥሮችን መሙላት
    for (let row = 0; row < CARD_SIZE; row++) {
        LETTERS.forEach(letter => {
            const cell = document.createElement('div');
            const number = cardData[letter][row];
            
            cell.textContent = number;
            cell.classList.add('cell');

            if (number === 'FREE') {
                cell.classList.add('free-space', 'marked');
            } else {
                cell.dataset.number = number;
                // በራስ ሰር ማርክ ማድረግ (በተጠራ ቁጥር መሰረት)
                if (CALLED_NUMBERS.includes(number)) {
                    cell.classList.add('marked');
                }
                // ቁጥሩን የመምረጥ ሎጂክ በአሁኑ ጊዜ አልተካተተም
            }
            playerCardElement.appendChild(cell);
        });
    }
}

// 3. የጥሪ ቁጥሩን በቢንጎ ፊደል ማሳየት
function updateCalledNumberDisplay(number) {
    let letter = '';
    if (number >= 1 && number <= 15) letter = 'B';
    else if (number >= 16 && number <= 30) letter = 'I';
    else if (number >= 31 && number <= 45) letter = 'N';
    else if (number >= 46 && number <= 60) letter = 'G';
    else if (number >= 61 && number <= 75) letter = 'O';

    calledNumberDisplay.textContent = `${letter}-${number}`;
}


// 4. ገጹ ሲከፈት ሁለቱንም ግሪዶች ማስጀመር
document.addEventListener('DOMContentLoaded', () => {
    // የመጨረሻውን የተጠራ ቁጥር ማሳየት (B-11)
    updateCalledNumberDisplay(11); 
    
    renderMasterGrid();
    renderPlayerCard('card-44'); 

    // የ Telegram WebAppን ማስጀመር (Exit button ን ለመጠቀም)
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
    }
});
