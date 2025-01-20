

// naughts and crosses
        // display nodes

function getRandomInt(maximum) {
    return Math.floor(Math.random() * maximum)
}

const gameDisplay = (function() { 
    playButton = document.querySelector('#play-button')
    boardDisplay = document.querySelector("#board")
    displayNodes = new Array()

    // make display
    for (let i = 0; i < 3; i ++) {
        node = document.createElement('div')
        node.classList.add('parent-box')
        board.appendChild(node)
        for (let j = 0; j < 3; j ++) {
            row_node = document.createElement('div')
            row_node.classList.add('nc-box')
            node.appendChild(row_node)
            displayNodes.push(row_node)
        }
    }

    return {
        getBoardDisplay: () => boardDisplay,  
        getPlayButton: () => playButton, 
        getDisplayNodes: () => displayNodes}
})()

const gameLogic = (function () {
    // handle board clicks
    // 0 = empty
    // 1 = player1
    // 2 = computer
    let state = new Array(3).fill().map(() => new Array(3).fill(0));

    gameOver = false

    function createPlayer(type, marker, isTurn) {
    return {type,marker,isTurn}
    }

    computer = createPlayer(2,'X',false)
    player1 = createPlayer(1,'O', true)

    function getCoords(target) { 
        let idx = gameDisplay.getDisplayNodes().indexOf(target)
        let row = idx % 3 
        let col = Math.floor(idx/3)
        return [row,col]
    }

    function updateDisplay(target, player) {
        target.textContent = player.marker 
    }

    function updateState(target,player) {
        let [row,col] = getCoords(target)
        letCurrentState = state[row][col]
        state[row][col] = player.type
        console.log(state)
    }


    function gameDone() {
        return !(state.some(row => row.includes(0)))
    }

    function computerMove() {
        let int = getRandomInt(9)
        let choice = gameDisplay.getDisplayNodes()[int]
        while (choice.textContent != "" ) {
            int = getRandomInt(9)
            choice = gameDisplay.getDisplayNodes()[int]
        }
        updateDisplay(choice, computer)
        updateState(choice, computer)
    }

    function clickedBox(event) { 
        if (!gameDone()) {
            let target = event.target
            updateDisplay(target, player1)
            updateState(target, player1)
            
            // computer turn
            if (!gameDone()) {
                setTimeout(computerMove, 400);
            }
        }
    
        
    }
    gameDisplay.getDisplayNodes().forEach(node => {
        node.addEventListener("click", clickedBox)
    })

    // handle play button clicks
    function playButtonClick () {
        gameDisplay.boardDisplay.classList.remove("invisible")  
        state = new Array(3).fill().map(() => new Array(3).fill(0));
        gameDisplay.getDisplayNodes().forEach(node => {
        node.textContent = ""
        })         
    }
    gameDisplay.getPlayButton().addEventListener("click",playButtonClick)
})()