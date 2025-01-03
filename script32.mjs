//import { supabase } from './supabaseClient.js';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

//const supabaseUrl = 'https://dqcwygutsfiepcbathqm.supabase.co';
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY3d5Z3V0c2ZpZXBjYmF0aHFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTA3NjE4OSwiZXhwIjoyMDQ2NjUyMTg5fQ.0pTRJQYmSMMbG-oQhXw_27uNkTi3KxtIBhUJCZJuul0"
const supabase2 = createClient(supabaseUrl, serviceRoleKey); // 使用服務金鑰

// 清空 users 表
async function deleteAllUsers() {
    const { error } = await supabase2
        .from('users')
        .delete()
        .gt('number', 0); // 使用 .gt() 指定條件 number > 0
  
    if (error) {
        console.error("Error deleting users:", error);
    } else {
        console.log("All users with number > 0 deleted successfully");
    }
}



  // 在頁面加載時清空 users 表
window.addEventListener('load', async () => {
    await deleteAllUsers();
  });
  




