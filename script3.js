import { fetchNameList } from './script32.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const fetchNameButton = document.getElementById("fetch-name-button");
    const nameList = document.getElementById("name-list");
    const nameCount = document.getElementById("name-count");

    // 更新名單人數
    function updateNameCount() {
        const names = nameList.value.split("\n").filter(line => line.trim());
        nameCount.textContent = `目前人數: ${names.length}`;
    }

    fetchNameButton.addEventListener("click", fetchNameList);
    // 匯入資料庫名單
    fetchNameButton.addEventListener("click", async () => {
        const names = await fetchNameList(); // 從資料庫獲取名單
        if (names.length > 0) {
            nameList.value = names.join("\n"); // 顯示到輸入框
            updateNameCount();
        } else {
            alert('未從資料庫獲取到任何名單！');
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {    
        
    const prizeInput = document.getElementById("prize-input");
    const prizeCount = document.getElementById("prize-count");
    const nameList = document.getElementById("name-list");
    const nameCount = document.getElementById("name-count");
    const prizeImportButton = document.querySelector(".prize-import-button");
    const nameImportButton = document.querySelector(".name-import-button");
    const clearButton = document.querySelector(".clear-button");
    const startLotteryButton = document.querySelector(".start-lottery-button");
    const resultDisplay = document.getElementById("result-display");
    

    // 讓匯入按鈕打開文件管理器
    prizeImportButton.addEventListener("click", () => document.getElementById("prize-file").click());
    nameImportButton.addEventListener("click", () => document.getElementById("name-file").click());

    // 更新獎項數量（根據每個獎項的數量加總）
    function updatePrizeCount() {
        const prizeLines = prizeInput.value.split("\n").filter(line => line.trim());
        let totalCount = 0;
        prizeLines.forEach(prize => {
            const parts = prize.split(","); // 假設每個獎項是"獎品名稱,數量"
            if (parts.length > 1 && !isNaN(parts[1].trim())) {
                totalCount += parseInt(parts[1].trim(), 10); // 加總數量
            }
        });
        prizeCount.textContent = `目前獎項數: ${totalCount}`;
    }

    // 更新名單人數
    function updateNameCount() {
        const names = nameList.value.split("\n").filter(line => line.trim());
        nameCount.textContent = `目前人數: ${names.length}`;
    }

    // 讀取並匯入獎項文件
    document.getElementById("prize-file").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                prizeInput.value = reader.result;
                updatePrizeCount();
            };
            reader.readAsText(file);
        }
    });

    // 讀取並匯入名單文件
    document.getElementById("name-file").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                nameList.value = reader.result;
                updateNameCount();
            };
            reader.readAsText(file);
        }
    });

    // 清除資料
    clearButton.addEventListener("click", () => {
        prizeInput.value = "";
        nameList.value = "";
        resultDisplay.textContent = "";
        updatePrizeCount();
        updateNameCount();
    });

    // 抽獎功能
    /*startLotteryButton.addEventListener("click", () => {
        const prizes = prizeInput.value.split("\n").filter(line => line.trim());
        const names = nameList.value.split("\n").filter(line => line.trim());
        if (prizes.length === 0 || names.length === 0) {
            alert("請確保有獎項和名單！");
            return;
        }
        let result = prizes.map(prize => `${prize} 的得主是：${names[Math.floor(Math.random() * names.length)]}`).join("\n");
        resultDisplay.textContent = result;
    });*/

    
    prizeInput.addEventListener("input", updatePrizeCount);
    nameList.addEventListener("input", updateNameCount);

});

const playButton = document.getElementById('playButton');
const videoPopup = document.getElementById('videoPopup');
const popupVideo = document.getElementById('popupVideo');
const modal = document.getElementById('rulesModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContent = document.querySelector(".modal-content");
const prizeInput = document.getElementById("prize-input");
const nameList = document.getElementById("name-list");

let winners = []; // 儲存中獎名單

playButton.addEventListener('click', () => {

    const prizes = prizeInput.value.split("\n").filter(line => line.trim());
    const names = nameList.value.split("\n").filter(line => line.trim());
    if (prizes.length === 0 || names.length === 0) {
        alert("請確保有獎項和名單！");
        return;
    }

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
});

// 影片播放完畢後隱藏彈窗
popupVideo.addEventListener('ended', () => {
    videoPopup.style.display = 'none'; // 影片播放完畢後隱藏彈窗
    popupVideo.pause(); // 暫停影片（防止影片繼續播放）

    generateWinners();
    displayWinners();
    rulesModal.style.display = "flex"; // 顯示視窗
});

// 關閉視窗按鈕
closeModalBtn.addEventListener("click", () => {
    rulesModal.style.display = "none";
});

// 抽獎邏輯：隨機分配中獎者
function generateWinners() {
    winners = [];
    const prizes = prizeInput.value.trim().split("\n").filter(line => line);
    const names = nameList.value.trim().split("\n").filter(line => line);

    if (names.length === 0 || prizes.length === 0) {
        alert("請確認已輸入獎項及名單！");
        return;
    }

    prizes.forEach(prizeLine => {
        const [prizeName, prizeCount] = prizeLine.split(",");
        const count = parseInt(prizeCount.trim(), 10);

        if (!prizeName || isNaN(count)) return;

        const shuffled = [...names].sort(() => 0.5 - Math.random());
        const selected = shuffled.splice(0, count);

        winners.push({ prize: prizeName.trim(), winners: selected });

        // 移除中獎者，避免重複抽中
        names.splice(0, count);
    });
}

// 顯示中獎名單
function displayWinners() {
    const listHtml = winners.map(winner =>
        `
        <div class="winner-item">
            <h3 class="prize">${winner.prize}</h3>
            <ul class="winner-names">
                ${winner.winners.map(name => `<li>${name}</li>`).join("")}
            </ul>
        </div>
        `
    ).join("");

    const modalContent = document.querySelector("#winnerList");
    modalContent.innerHTML = listHtml;

    // 綁定下載 CSV 和關閉按鈕
    document.getElementById("downloadCsv").addEventListener("click", downloadCsv);
    document.getElementById("closeModalBtn").addEventListener("click", () => {
        document.getElementById("rulesModal").style.display = "none";
    });
}

// 下載 CSV 檔案
function downloadCsv() {
    // 定義標題欄
    const prizes = [...new Set(winners.map(winner => winner.prize))]; // 獲取所有獎項
    const header = ["中獎者", ...prizes];
    
    // 建立 CSV 資料
    const rows = [];
    const maxWinners = Math.max(...winners.map(winner => winner.winners.length)); // 找到中獎人數最多的獎項
    
    for (let i = 0; i < maxWinners; i++) {
        const row = prizes.map(prize => {
            const prizeData = winners.find(w => w.prize === prize);
            return prizeData && prizeData.winners[i] ? prizeData.winners[i] : ""; // 填入中獎者或空字串
        });
        rows.push(["", ...row]); // 第一欄保留中獎者的名字
    }
    
    // 合併標題與資料
    const csvData = [header, ...rows];
    
    // 轉換成 CSV 格式字串並添加 UTF-8 BOM
    const BOM = '\uFEFF';
    const csvContent = BOM + csvData.map(row => row.join(",")).join("\n");

    // 建立 Blob 並下載
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "中獎名單.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
