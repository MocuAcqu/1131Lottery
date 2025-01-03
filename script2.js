document.addEventListener("DOMContentLoaded", () => {
    const prizeInput = document.getElementById("prize-input");
    const prizeCount = document.getElementById("prize-count");
    const nameList = document.getElementById("name-list");
    const nameCount = document.getElementById("name-count");
    const prizeImportButton = document.querySelector(".prize-import-button"); // 獎項內容匯入按鈕
    const nameImportButton = document.querySelector(".name-import-button"); // 抽獎名單匯入按鈕
    const clearButton = document.querySelector(".clear-button");

    // 更新獎項數量顯示
    prizeInput.addEventListener("input", () => {
        let totalPrizeCount = 0;
        const prizes = prizeInput.value.trim().split("\n").filter(line => line);

        prizes.forEach(line => {
            const parts = line.split(",");
            if (parts.length === 2) {
                const quantity = parseInt(parts[1].trim(), 10);
                if (!isNaN(quantity)) {
                    totalPrizeCount += quantity;
                }
            }
        });

        prizeCount.textContent = `目前獎項數: ${totalPrizeCount}`;
    });

    // 更新抽獎名單人數
    nameList.addEventListener("input", () => {
        const names = nameList.value.trim().split("\n").filter(line => line);
        nameCount.textContent = `目前人數: ${names.length}`;
    });

    // 獎項內容匯入功能
    prizeImportButton.addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".txt,.csv";

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    prizeInput.value = e.target.result.trim();
                    let totalPrizeCount = 0;
                    const prizes = prizeInput.value.split("\n").filter(line => line);

                    prizes.forEach(line => {
                        const parts = line.split(",");
                        if (parts.length === 2) {
                            const quantity = parseInt(parts[1].trim(), 10);
                            if (!isNaN(quantity)) {
                                totalPrizeCount += quantity;
                            }
                        }
                    });

                    prizeCount.textContent = `目前獎項數: ${totalPrizeCount}`;
                };
                reader.readAsText(file);
            }
        });

        fileInput.click();
    });

    // 抽獎名單匯入功能
    nameImportButton.addEventListener("click", () => {

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".txt,.csv";

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    nameList.value = e.target.result.trim();
                    const names = nameList.value.split("\n").filter(line => line);
                    nameCount.textContent = `目前人數: ${names.length}`;
                };
                reader.readAsText(file);
            }
        });

        fileInput.click();
    });

    // 清除資料按鈕功能
    clearButton.addEventListener("click", () => {
        prizeInput.value = "";
        nameList.value = "";
        prizeCount.textContent = "目前獎項數: 0";
        nameCount.textContent = "目前人數: 0";
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const nameList = document.getElementById("name-list");
    const nameCount = document.getElementById("name-count");
    const generateNumbersButton = document.getElementById("generate-numbers");
    const fileInput = document.getElementById("file-input");

    // 讀取文件並更新目前人數
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                nameList.value = e.target.result.trim(); // 設置名單內容
                updateNameCount(); // 更新人數顯示
            };
            reader.readAsText(file);
        }
    });

    // 產生編號按鈕點擊事件
    generateNumbersButton.addEventListener("click", () => {
        let startNumber = prompt("請輸入起始編號（必須為整數且不小於 0）：");
        let endNumber = prompt("請輸入結束編號（必須為整數且不小於起始編號）：");

        // 驗證輸入值是否為有效的整數且範圍正確
        startNumber = parseInt(startNumber, 10);
        endNumber = parseInt(endNumber, 10);

        if (isNaN(startNumber) || isNaN(endNumber) || startNumber < 0 || endNumber < startNumber) {
            alert("無效的輸入！請確認輸入的是整數且範圍正確。");
            return;
        }

        // 產生編號範圍並加入到抽獎名單
        const numberList = [];
        for (let i = startNumber; i <= endNumber; i++) {
            numberList.push(i);
        }

        // 把新編號添加到現有的名單
        const existingNames = nameList.value.split("\n").filter(line => line);
        nameList.value = [...existingNames, ...numberList].join("\n");

        // 更新目前人數顯示
        updateNameCount();
    });

    // 更新目前人數的顯示
    function updateNameCount() {
        const names = nameList.value.split("\n").filter(line => line); // 根據換行符號分割
        nameCount.textContent = `目前人數: ${names.length}`; // 更新目前人數
    }
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