//import { supabase } from './supabaseClient.js';
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://dqcwygutsfiepcbathqm.supabase.co'; // 從 Supabase 設定檔取得
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY3d5Z3V0c2ZpZXBjYmF0aHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNzYxODksImV4cCI6MjA0NjY1MjE4OX0.EcmYcKIUZGXOc3PP0ViL58olwi_tCYmFRPlwVe58IAk'; // 從 Supabase 設定檔取得

const supabase = createClient(supabaseUrl, supabaseKey);

// 從資料庫匯入名單
export async function fetchNameList() {
    try {
        const { data, error } = await supabase.from('users').select('name');
        if (error) {
            console.error('資料讀取錯誤:', error);
            return [];
        }
        return data.map(user => user.name); // 回傳名單陣列
    } catch (err) {
        console.error('發生錯誤:', err);
        return [];
    }
}

const fetchNameButton = document.getElementById("fetch-name-button");

// 定義更新人數的函式
function updateNameCount() {
    const nameList = document.getElementById("name-list");
    const names = nameList.value.split("\n").filter(name => name.trim() !== ""); // 過濾掉空行
    const nameCount = names.length;

    // 將人數顯示在 HTML 元素中（假設有一個元素用於顯示人數）
    const nameCountDisplay = document.getElementById("name-count");
    if (nameCountDisplay) {
        nameCountDisplay.textContent = `目前人數: ${nameCount}`;
    }
}

/*async function fetchParticipants() {
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
}*/

fetchNameButton.addEventListener("click", fetchParticipants);