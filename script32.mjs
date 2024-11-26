import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabase = createClient('https://dqcwygutsfiepcbathqm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY3d5Z3V0c2ZpZXBjYmF0aHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNzYxODksImV4cCI6MjA0NjY1MjE4OX0.EcmYcKIUZGXOc3PP0ViL58olwi_tCYmFRPlwVe58IAk')
console.log("模組化檔案執行成功！");


/*const SUPABASE_URL = "https://dqcwygutsfiepcbathqm.supabase.co"; // 替換為你的 Project URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY3d5Z3V0c2ZpZXBjYmF0aHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNzYxODksImV4cCI6MjA0NjY1MjE4OX0.EcmYcKIUZGXOc3PP0ViL58olwi_tCYmFRPlwVe58IAk"; // 替換為你的 anon public key
const supabaseClient = supabaseClient.createClient(SUPABASE_URL, SUPABASE_KEY);*/

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
