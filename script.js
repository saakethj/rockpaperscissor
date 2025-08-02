// Game Configuration
const choices = {
    rock: { name: 'Rock', icon: '🗿', beats: 'scissors' },
    paper: { name: 'Paper', icon: '📄', beats: 'rock' },
    scissors: { name: 'Scissors', icon: '✂️', beats: 'paper' }
};

// Game State
let playerChoice = null;
let gameStats = {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    ties: 0,
    currentStreak: 0,
    bestStreak: 0
};

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const playerDisplay = document.getElementById('player-display');
const computerDisplay = document.getElementById('computer-display');
const resultText = document.getElementById('result-text');

// Stats Elements
const gamesPlayedEl = document.getElementById('games-played');
const totalWinsEl = document.getElementById('total-wins');
const totalLossesEl = document.getElementById('total-losses');
const totalTiesEl = document.getElementById('total-ties');
const winRateEl = document.getElementById('win-rate');
const winRateFillEl = document.getElementById('win-rate-fill');
const currentStreakEl = document.getElementById('current-streak');
const bestStreakEl = document.getElementById('best-streak');

// Initialize Game
document.addEventListener('DOMContentLoaded', function() {
    loadStats();
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    // Choice buttons
    const choiceBtns = document.querySelectorAll('.choice-btn');
    choiceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const choice = this.dataset.choice;
            selectChoice(choice);
        });
    });

    // Action buttons
    document.getElementById('play-again-btn').addEventListener('click', playAgain);
    document.getElementById('reset-stats-btn').addEventListener('click', resetStats);
    document.getElementById('change-weapon-btn').addEventListener('click', showWelcome);
}

// Game Functions
function selectChoice(choice) {
    playerChoice = choice;
    
    // Remove previous selections
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Highlight selected choice
    document.querySelector(`[data-choice="${choice}"]`).classList.add('selected');
    
    // Start game after short delay
    setTimeout(() => {
        startGame();
    }, 500);
}

function startGame() {
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    // Play first round
    playRound();
}

function playRound() {
    // Reset displays
    playerDisplay.textContent = '?';
    computerDisplay.textContent = '?';
    resultText.textContent = 'Computer is thinking...';
    
    // Simulate thinking time
    setTimeout(() => {
        const computerChoice = getRandomChoice();
        const result = determineWinner(playerChoice, computerChoice);
        
        // Show choices
        playerDisplay.textContent = choices[playerChoice].icon;
        computerDisplay.textContent = choices[computerChoice].icon;
        
        // Update stats
        gameStats.gamesPlayed++;
        
        // Show result and update stats
        let resultMessage = '';
        
        if (result === 'player') {
            gameStats.wins++;
            gameStats.currentStreak++;
            if (gameStats.currentStreak > gameStats.bestStreak) {
                gameStats.bestStreak = gameStats.currentStreak;
            }
            resultMessage = `You win! ${choices[playerChoice].name} beats ${choices[computerChoice].name}!`;
            resultText.style.color = '#10b981'; // Green
        } else if (result === 'computer') {
            gameStats.losses++;
            gameStats.currentStreak = 0;
            resultMessage = `Computer wins! ${choices[computerChoice].name} beats ${choices[playerChoice].name}!`;
            resultText.style.color = '#ef4444'; // Red
        } else {
            gameStats.ties++;
            resultMessage = "It's a tie! Same choice!";
            resultText.style.color = '#f59e0b'; // Yellow
        }
        
        resultText.textContent = resultMessage;
        
        updateStatsDisplay();
        saveStats();
        
    }, 1500);
}

function getRandomChoice() {
    const choiceKeys = Object.keys(choices);
    return choiceKeys[Math.floor(Math.random() * choiceKeys.length)];
}

function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    if (choices[player].beats === computer) return 'player';
    return 'computer';
}

// Stats Functions
function updateStatsDisplay() {
    gamesPlayedEl.textContent = gameStats.gamesPlayed;
    totalWinsEl.textContent = gameStats.wins;
    totalLossesEl.textContent = gameStats.losses;
    totalTiesEl.textContent = gameStats.ties;
    currentStreakEl.textContent = gameStats.currentStreak;
    bestStreakEl.textContent = gameStats.bestStreak;
    
    // Calculate win rate
    const winRate = gameStats.gamesPlayed > 0 ? 
        Math.round((gameStats.wins / gameStats.gamesPlayed) * 100) : 0;
    
    winRateEl.textContent = winRate + '%';
    winRateFillEl.style.width = winRate + '%';
}

function loadStats() {
    const saved = localStorage.getItem('rpsStats');
    if (saved) {
        try {
            gameStats = JSON.parse(saved);
            updateStatsDisplay();
        } catch (error) {
            console.log('Error loading stats:', error);
            // Reset to default if corrupted
            resetStatsData();
        }
    }
}

function saveStats() {
    try {
        localStorage.setItem('rpsStats', JSON.stringify(gameStats));
    } catch (error) {
        console.log('Error saving stats:', error);
    }
}

function resetStatsData() {
    gameStats = {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        currentStreak: 0,
        bestStreak: 0
    };
}

// Button Actions
function playAgain() {
    playRound();
}

function resetStats() {
    if (confirm('Are you sure you want to reset all statistics?')) {
        resetStatsData();
        updateStatsDisplay();
        saveStats();
        resultText.textContent = 'Statistics reset! Ready for a new game?';
        resultText.style.color = '#ffffff';
    }
}

function showWelcome() {
    gameScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    
    // Reset selection
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Reset result text
    resultText.style.color = '#ffffff';
}

// Utility Functions
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.round(start + (difference * progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Add some fun features
function celebrateWin() {
    // Add celebration animation or sound here if needed
    console.log('🎉 Player wins!');
}

function consoleLoss() {
    // Add consolation animation here if needed
    console.log('😔 Better luck next time!');
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        choices,
        determineWinner,
        getRandomChoice
    };
}