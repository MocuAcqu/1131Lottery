document.addEventListener("DOMContentLoaded", () => {
    const nameList = document.getElementById("name-list");
    const nameCount = document.getElementById("name-count");
    const spinButton = document.getElementById("spinButton");
    const canvas = document.getElementById("wheelCanvas");
    const resultText = document.getElementById("resultText"); // 顯示中獎者的文字
    const importButton = document.querySelector(".name-import-button");
    const generateNumbersButton = document.getElementById("generate-numbers");
    const ctx = canvas.getContext("2d");

    let names = [];
    let currentAngle = 0; // 旋轉角度，控制輪盤的轉動
    let isSpinning = false; // 是否正在旋轉

    // 更新人數
    nameList.addEventListener("input", () => {
        names = nameList.value.split("\n").filter(line => line.trim() !== "");
        nameCount.textContent = `目前人數: ${names.length}`;
        drawWheel(); // 重新繪製輪盤
        // 繪製固定指針（不會跟輪盤一起轉動）
        drawFixedPointer();
    });

    // 匯入資料按鈕功能
    importButton.addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".txt, .csv";
        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    nameList.value = reader.result.trim();
                    nameList.dispatchEvent(new Event("input")); // 觸發更新
                };
                reader.readAsText(file);
            }
        });
        fileInput.click();
    });

    // 產生編號按鈕功能
    generateNumbersButton.addEventListener("click", () => {
        const start = parseInt(prompt("請輸入起始編號(必須大於0)："), 10);
        const end = parseInt(prompt("請輸入結束編號(必須大於起始編號)："), 10);

        if (isNaN(start) || isNaN(end) || start < 0 || end < 0 || start > end) {
            alert("請輸入有效的範圍，且不可為負數");
            return;
        }

        const numberList = Array.from({ length: end - start + 1 }, (_, i) => start + i).join("\n");
        nameList.value += (nameList.value ? "\n" : "") + numberList; // 加到輸入框
        nameList.dispatchEvent(new Event("input")); // 觸發更新
    });

    // 計算中獎者索引的修正版本
    function getWinnerIndex(rotation) {
        const segmentAngle = 360 / names.length; // 每個扇形的角度

        // 歸一化角度到 [0, 360) 區間
        const normalizedRotation = (rotation % 360 + 360) % 360;

        // 假設指針位於正上方 (90°)，修正基準點
        const pointerAngle = 90;
        const correctedRotation = (normalizedRotation + pointerAngle) % 360;

        // 計算正確的中獎扇形索引
        const winnerIndex = Math.floor(correctedRotation / segmentAngle);

        // 扇形的索引方向修正為順時針
        return (names.length - winnerIndex - 1 + names.length) % names.length;
    }

    // 轉盤的旋轉與結果顯示
    spinButton.addEventListener("click", () => {
        resultText.textContent = ''; // 每次旋轉前清空中獎文字
        const rotation = Math.floor(Math.random() * 3600); // 模擬旋轉 10 圈
        const winnerIndex = getWinnerIndex(rotation); // 取得中獎者索引
        const winner = names[winnerIndex]; // 取得中獎者名稱

        rotateWheel(rotation, winner); // 執行轉盤旋轉
    });

    // 畫轉盤
    function drawWheel() {
        const radius = canvas.width / 2;
        const segmentAngle = 360 / names.length;
    
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
    
        // 繪製每個扇形，根據 currentAngle 旋轉
        names.forEach((name, index) => {
            const angleStart = segmentAngle * index + currentAngle; // 根據 currentAngle 旋轉扇形
            const angleEnd = segmentAngle * (index + 1) + currentAngle;
    
            // 設定顏色，讓每個扇形顏色不同
            ctx.fillStyle = `hsl(${(index * 360) / names.length}, 70%, 70%)`;
    
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius, (angleStart * Math.PI) / 180, (angleEnd * Math.PI) / 180);
            ctx.fill();
    
            // 寫上名稱
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.fillText(name, radius + Math.cos((angleStart + segmentAngle / 2) * Math.PI / 180) * radius / 1.5, 
                          radius + Math.sin((angleStart + segmentAngle / 2) * Math.PI / 180) * radius / 1.5);
        });

    }

    // 畫固定指針（不受旋轉影響）
    function drawFixedPointer() {
    const radius = canvas.width / 2;
    const pointerPositionX = radius;
    const pointerPositionY = 0;

    const pointerLength = 20;

    // 取得指針的 90 度角位置，並繪製指針
    const pointerAngle = Math.PI / 2; // 90度
    ctx.fillStyle = "red";  // 設置指針顏色為紅色
    ctx.beginPath();
    ctx.moveTo(pointerPositionX, pointerPositionY);
    ctx.lineTo(pointerPositionX - pointerLength / 2, pointerPositionY + pointerLength); // 指針左邊
    ctx.lineTo(pointerPositionX + pointerLength / 2, pointerPositionY + pointerLength); // 指針右邊
    ctx.closePath();
    ctx.fill();

    drawFixedPointer()
    }


    // 執行轉盤旋轉
    function rotateWheel(rotation, winner) {
        canvas.style.transition = "transform 5s ease-out"; // 添加平滑的過渡效果
        canvas.style.transform = `rotate(${rotation}deg)`; // 旋轉轉盤

        // 轉盤旋轉結束後，顯示中獎者，取消過渡效果
        setTimeout(() => {
            resultText.textContent = `恭喜 ${winner} 中獎！`; // 顯示中獎者
            canvas.style.transition = "none"; // 取消過渡效果，避免影響後續旋轉
        }, 5000); // 等待動畫結束後顯示中獎結果
    }

});
