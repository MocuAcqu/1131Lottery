document.addEventListener("DOMContentLoaded", () => {
    const prizeInput = document.getElementById("prize-input");
    const prizeCount = document.getElementById("prize-count");
    const nameList = document.getElementById("name-list");
    const nameCount = document.getElementById("name-count");
    const prizeImportButton = document.querySelector(".prize-import-button"); // 獎項內容匯入按鈕
    const nameImportButton = document.querySelector(".name-import-button"); // 抽獎名單匯入按鈕
    const clearButton = document.querySelector(".clear-button");

    // 更新獎項數量顯示
    prizeInput.addEventListener("input", () => {
        let totalPrizeCount = 0;
        const prizes = prizeInput.value.trim().split("\n").filter(line => line);

        prizes.forEach(line => {
            const parts = line.split(",");
            if (parts.length === 2) {
                const quantity = parseInt(parts[1].trim(), 10);
                if (!isNaN(quantity)) {
                    totalPrizeCount += quantity;
                }
            }
        });

        prizeCount.textContent = `目前獎項數: ${totalPrizeCount}`;
    });

    // 更新抽獎名單人數
    nameList.addEventListener("input", () => {
        const names = nameList.value.trim().split("\n").filter(line => line);
        nameCount.textContent = `目前人數: ${names.length}`;
    });

    // 獎項內容匯入功能
    prizeImportButton.addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".txt,.csv";

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    prizeInput.value = e.target.result.trim();
                    let totalPrizeCount = 0;
                    const prizes = prizeInput.value.split("\n").filter(line => line);

                    prizes.forEach(line => {
                        const parts = line.split(",");
                        if (parts.length === 2) {
                            const quantity = parseInt(parts[1].trim(), 10);
                            if (!isNaN(quantity)) {
                                totalPrizeCount += quantity;
                            }
                        }
                    });

                    prizeCount.textContent = `目前獎項數: ${totalPrizeCount}`;
                };
                reader.readAsText(file);
            }
        });

        fileInput.click();
    });

    // 抽獎名單匯入功能
    nameImportButton.addEventListener("click", () => {

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".txt,.csv";

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    nameList.value = e.target.result.trim();
                    const names = nameList.value.split("\n").filter(line => line);
                    nameCount.textContent = `目前人數: ${names.length}`;
                };
                reader.readAsText(file);
            }
        });

        fileInput.click();
    });

    // 清除資料按鈕功能
    clearButton.addEventListener("click", () => {
        prizeInput.value = "";
        nameList.value = "";
        prizeCount.textContent = "目前獎項數: 0";
        nameCount.textContent = "目前人數: 0";
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const nameList = document.getElementById("name-list");
    const nameCount = document.getElementById("name-count");
    const generateNumbersButton = document.getElementById("generate-numbers");
    const fileInput = document.getElementById("file-input");

    // 讀取文件並更新目前人數
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                nameList.value = e.target.result.trim(); // 設置名單內容
                updateNameCount(); // 更新人數顯示
            };
            reader.readAsText(file);
        }
    });

    // 產生編號按鈕點擊事件
    generateNumbersButton.addEventListener("click", () => {
        let startNumber = prompt("請輸入起始編號（必須為整數且不小於 0）：");
        let endNumber = prompt("請輸入結束編號（必須為整數且不小於起始編號）：");

        // 驗證輸入值是否為有效的整數且範圍正確
        startNumber = parseInt(startNumber, 10);
        endNumber = parseInt(endNumber, 10);

        if (isNaN(startNumber) || isNaN(endNumber) || startNumber < 0 || endNumber < startNumber) {
            alert("無效的輸入！請確認輸入的是整數且範圍正確。");
            return;
        }

        // 產生編號範圍並加入到抽獎名單
        const numberList = [];
        for (let i = startNumber; i <= endNumber; i++) {
            numberList.push(i);
        }

        // 把新編號添加到現有的名單
        const existingNames = nameList.value.split("\n").filter(line => line);
        nameList.value = [...existingNames, ...numberList].join("\n");

        // 更新目前人數顯示
        updateNameCount();
    });

    // 更新目前人數的顯示
    function updateNameCount() {
        const names = nameList.value.split("\n").filter(line => line); // 根據換行符號分割
        nameCount.textContent = `目前人數: ${names.length}`; // 更新目前人數
    }
});

