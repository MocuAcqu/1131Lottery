const dotPositions = {
    1: [[50, 50]],
    2: [[30, 30], [70, 70]],
    3: [[30, 30], [50, 50], [70, 70]],
    4: [[20, 20], [20, 80], [80, 20], [80, 80]],
    5: [[20, 20], [20, 80], [50, 50], [80, 20], [80, 80]],
    6: [[20, 20], [20, 50], [20, 80], [80, 20], [80, 50], [80, 80]]
};

// 隨機生成骰子點數，點數範圍為1到6
function randomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// 創建骰子並顯示點數
function createDice(value) {
    const dice = document.createElement('div');
    dice.className = 'dice';
    
    // 根據點數生成白點
    dotPositions[value].forEach(([top, left]) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.top = `${top}%`;
        dot.style.left = `${left}%`;
        dice.appendChild(dot);
    });

    return dice;
}

// 投擲骰子並顯示結果
function rollDice() {
    const diceContainer = document.getElementById('diceContainer');
    const totalScoreElement = document.getElementById('totalScore');
    diceContainer.innerHTML = '';
    
    const diceCount = parseInt(document.getElementById('diceCount').value); // 取得使用者選擇的骰子數量
    let totalScore = 0;

    for (let i = 0; i < diceCount; i++) {
        const diceValue = randomDice();
        totalScore += diceValue;
        diceContainer.appendChild(createDice(diceValue));
    }

    totalScoreElement.textContent = totalScore; // 顯示總點數
}
