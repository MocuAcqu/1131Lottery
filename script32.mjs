import { supabase } from './supabaseClient.js';

const fetchNameButton = document.getElementById("fetch-name-button");

// 定義更新人數的函式
function updateNameCount() {
    const nameList = document.getElementById("name-list");
    const names = nameList.value.split("\n").filter(name => name.trim() !== ""); // 過濾掉空行
    const nameCount = names.length;

    // 將人數顯示在 HTML 元素中（假設有一個元素用於顯示人數）
    const nameCountDisplay = document.getElementById("name-count");
    if (nameCountDisplay) {
        nameCountDisplay.textContent = `目前人數：${nameCount}`;
    }
}

async function fetchParticipants() {
    try {
        // 從 Supabase 資料庫中獲取抽獎者資料
        const { data, error } = await supabase.from('users').select('name');
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

fetchNameButton.addEventListener("click", fetchParticipants);
