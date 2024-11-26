import { supabase } from './supabaseClient';


const fetchNameButton = document.getElementById("fetch-name-button");

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

document.getElementById("fetch-name-button").addEventListener("click", fetchParticipants);
