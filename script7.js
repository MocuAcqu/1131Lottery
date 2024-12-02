document.getElementById("generate-button").addEventListener("click", function () {
    const startNumber = parseInt(document.getElementById("start-number").value);
    const endNumber = parseInt(document.getElementById("end-number").value);

    if (isNaN(startNumber) || isNaN(endNumber)) {
        alert("請輸入有效的數字範圍！");
        return;
    }

    if (startNumber > endNumber) {
        alert("起始數字應小於或等於結尾數字！");
        return;
    }

    const randomNumberElement = document.getElementById("random-number");
    randomNumberElement.textContent = "0"; // 重置為初始值
    randomNumberElement.classList.remove("roll");

    // 模擬滾動效果
    let rollingInterval = setInterval(() => {
        const rollingNumber = Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber;
        randomNumberElement.textContent = rollingNumber;
    }, 100);

    setTimeout(() => {
        clearInterval(rollingInterval);
        const finalNumber = Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber;
        randomNumberElement.textContent = finalNumber;
        randomNumberElement.classList.add("roll"); // 添加滾動效果
    }, 2000); // 滾動 2 秒後顯示最終結果
});
