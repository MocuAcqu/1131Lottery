document.addEventListener("DOMContentLoaded", () => {
    const clearButton = document.querySelector(".clear-button");
    
// 清除資料按鈕功能
clearButton.addEventListener("click", () => {
    prizeInput.value = "";
    nameList.value = "";
    prizeCount.textContent = "目前獎項數: 0";
    nameCount.textContent = "目前人數: 0";
});
};