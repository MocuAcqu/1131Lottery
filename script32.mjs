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
  
import { allWinners } from './script3.js';
// 這個函數會從 Supabase 獲取中獎者的 email 和 name，並下載 CSV 檔案
// 修改 fetchWinnerEmails 函數，接收 allWinners 作為參數
async function fetchWinnerEmails() {

    try {
        // 查詢中獎者的 email 和 name
        const { data, error } = await supabase
            .from('users') // 假設表格名為 'users'
            .select('email') // 假設表格包含 'email' 和 'name' 欄位
            .in('name', allWinners); // 使用傳入的 allWinners 陣列

            console.log("allWinners",allWinners)
        if (error) {
            console.error("查詢中獎者失敗:", error);
            return;
        }

        // 檢查是否有資料
        if (data && data.length > 0) {
            console.log("中獎者資料：", data);
            // 將資料轉換為 CSV 格式，或執行其他處理
        } else {
            console.log("未查詢到任何中獎者資料。");
        }
    } catch (err) {
        console.error("發生錯誤：", err);
    }
}


// 將資料轉換成 CSV 格式
function convertToCSV(data) {
    // 先建立 CSV 表頭
    const header = ['Email'];
    const rows = data.map(item => [item.email]);

    // 將表頭和資料行合併成一個二維陣列
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");

    return csvContent;
}

// 下載 CSV 檔案
function downloadCSV(csvContent) {
    // 創建一個 Blob 物件來保存 CSV 資料
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // 創建一個連結並觸發下載
    const link = document.createElement('a');
    if (link.download !== undefined) {  // 確保支持下載屬性
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'winners_emails.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// 綁定按鈕事件，觸發 fetchWinnerEmails
document.getElementById("emailBtn").addEventListener("click", fetchWinnerEmails);



