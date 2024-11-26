import { createClient } from '@supabase/supabase-js';

// 替換成你的 Supabase 資訊
const SUPABASE_URL = "https://dqcwygutsfiepcbathqm.supabase.co"; // 替換為你的 Project URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY3d5Z3V0c2ZpZXBjYmF0aHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNzYxODksImV4cCI6MjA0NjY1MjE4OX0.EcmYcKIUZGXOc3PP0ViL58olwi_tCYmFRPlwVe58IAk"; // 替換為你的 anon public key
const supabaseClient = supabaseClient.createClient(SUPABASE_URL, SUPABASE_KEY);

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
    const fetchNameButton = document.getElementById("fetch-name-button");

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

    async function fetchParticipants() {
        try {
            // 從 Supabase 資料庫中獲取抽獎者資料
            const { data, error } = await supabasesupabaseClient.from('users').select('name');
            if (error) throw error;
    
            // 將取得的名字匯入到名單輸入框
            const nameList = document.getElementById("name-list");
            nameList.value = data.map(user => user.name).join("\n");
    
            // 更新名單人數
            updateNameCount();
        } catch (err) {
            console.error("Error fetching participants:", err.message);
            alert("無法載入抽獎名單，請稍後再試！");
        }
    }
    
    document.getElementById("fetch-name-button").addEventListener("click", fetchParticipants);

    prizeInput.addEventListener("input", updatePrizeCount);
    nameList.addEventListener("input", updateNameCount);

});




