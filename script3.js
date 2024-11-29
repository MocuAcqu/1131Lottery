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
    startLotteryButton.addEventListener("click", () => {
        const prizes = prizeInput.value.split("\n").filter(line => line.trim());
        const names = nameList.value.split("\n").filter(line => line.trim());
        if (prizes.length === 0 || names.length === 0) {
            alert("請確保有獎項和名單！");
            return;
        }
        let result = prizes.map(prize => `${prize} 的得主是：${names[Math.floor(Math.random() * names.length)]}`).join("\n");
        resultDisplay.textContent = result;
    });

    
    prizeInput.addEventListener("input", updatePrizeCount);
    nameList.addEventListener("input", updateNameCount);

});
