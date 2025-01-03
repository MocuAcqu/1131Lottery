const playButton = document.getElementById('playButton');
const videoPopup = document.getElementById('videoPopup');
const popupVideo = document.getElementById('popupVideo');

const dotPositions = {
    1: [[50, 50]],
    2: [[30, 30], [70, 70]],
    3: [[30, 30], [50, 50], [70, 70]],
    4: [[20, 20], [20, 80], [80, 20], [80, 80]],
    5: [[20, 20], [20, 80], [50, 50], [80, 20], [80, 80]],
    6: [[20, 20], [20, 50], [20, 80], [80, 20], [80, 50], [80, 80]]
};

let luckyNumber = 3;



// 設定幸運數字
function generateLuckyNumber() {
    luckyNumber = Math.floor(Math.random() * 16) + 3; // 1-18的範圍
    document.getElementById("luckyNumber").textContent = luckyNumber;
}

// 隨機生成骰子點數，點數範圍根據幸運數字設定
function randomDice(max) {
    return Math.floor(Math.random() * max) + 1;
}

// 創建骰子並顯示點數
function createDice(value) {
    const dice = document.createElement('div');
    dice.className = 'dice';
    
    // 根據點數生成白點
    dotPositions[Math.min(value, 6)].forEach(([top, left]) => {
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
    const resultMessageElement = document.getElementById('resultMessage');
    diceContainer.innerHTML = '';
    resultMessageElement.textContent = '';
    resultMessageElement.className = ''; // 清除之前的樣式

    // 根據幸運數字決定骰子數量
    const diceCount = 3; // 3 顆

    let totalScore = 0;
    for (let i = 0; i < diceCount; i++) {
        const diceValue = randomDice(Math.min(18, 6));
        totalScore += diceValue;
        diceContainer.appendChild(createDice(diceValue));
    }

    // 更新點數總和，並根據結果套用不同的樣式
    totalScoreElement.textContent = totalScore;
    if (totalScore === luckyNumber) {
        resultMessageElement.className = 'win-message';
        resultMessageElement.textContent = '恭喜你中獎了！';

        // 顯示影片彈窗
        videoPopup.style.display = 'flex';

        // 重置影片到起始點
        popupVideo.currentTime = 0;

        // 保持靜音，避免自動播放限制
        popupVideo.muted = true;
        popupVideo.play();

        // 等待影片開始播放後解除靜音
        popupVideo.onplay = () => {
            popupVideo.muted = false; // 解除靜音
            popupVideo.volume = 1; // 設置音量為最大
        };

        // 影片播放完畢後隱藏彈窗
        popupVideo.addEventListener('ended', () => {
        videoPopup.style.display = 'none'; // 影片播放完畢後隱藏彈窗
        popupVideo.pause(); // 暫停影片（防止影片繼續播放）

        generateWinners();
        displayWinners();
        rulesModal.style.display = "flex"; // 顯示視窗
        });

    } else {
        resultMessageElement.className = 'lose-message';
        resultMessageElement.textContent = '銘謝惠顧';
    }
}

// 當頁面加載完成時，顯示規則視窗
window.onload = function() {
    // 自動生成幸運數字
    generateLuckyNumber();

    // 顯示規則視窗
    const modal = document.getElementById('rulesModal');
    modal.style.display = 'flex'; // 顯示視窗

    // 監聽“確認”按鈕，點擊後隱藏視窗
    const closeModalBtn = document.getElementById('closeModalBtn');
    closeModalBtn.onclick = function() {
        modal.style.display = 'none'; // 隱藏視窗
    }
}


