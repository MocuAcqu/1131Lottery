document.addEventListener("DOMContentLoaded", () => {
    const nameList = document.getElementById("name-list");
    const nameCount = document.getElementById("name-count");
    const spinButton = document.getElementById("spinButton");
    const canvas = document.getElementById("wheelCanvas");
    const resultText = document.getElementById("resultText");
    const importButton = document.querySelector(".name-import-button");
    const generateNumbersButton = document.getElementById("generate-numbers");
    const clearDataButton = document.getElementById("clear-data");
    const ctx = canvas.getContext("2d");

    let names = [];
    let currentAngle = 0; // 旋轉角度
    const duration = 5000; // 旋轉動畫時長 (毫秒)

    window.addEventListener('load', async () => {
        nameList.value = "1\n"+"2\n"+"3\n"; // 加到輸入框
        nameList.dispatchEvent(new Event("input"));
      });

    // 更新人數並重新繪製轉盤
    nameList.addEventListener("input", () => {
        names = nameList.value.split("\n").filter(line => line.trim() !== "");
        nameCount.textContent = `目前人數: ${names.length}`;
        drawWheel();
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

    // 清除資料功能
    clearDataButton.addEventListener("click", () => {
        names = [];
        nameList.value = "";
        nameCount.textContent = "目前人數: 0";
        resultText.textContent = "";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        currentAngle = 0;
    });

    // 繪製轉盤
    function drawWheel() {
        const radius = canvas.width / 2;
        const segmentAngle = 360 / names.length;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布

        // 繪製每個扇形
        names.forEach((name, index) => {
            const startAngle = (segmentAngle * index + currentAngle) * (Math.PI / 180);
            const endAngle = (segmentAngle * (index + 1) + currentAngle) * (Math.PI / 180);

            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius, startAngle, endAngle);
            ctx.fillStyle = `hsl(${(index * 360) / names.length}, 70%, 70%)`;
            ctx.fill();

            // 添加文字
            const textAngle = startAngle + (endAngle - startAngle) / 2;
            ctx.save();
            ctx.translate(
                radius + Math.cos(textAngle) * (radius - 30),
                radius + Math.sin(textAngle) * (radius - 30)
            );
            ctx.rotate(textAngle);
            ctx.fillStyle = "#000";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(name, 0, 5);
            ctx.restore();
        });

        // 繪製固定指針（藍色倒三角形）
        drawFixedPointer();
    }

    // 繪製固定指針（藍色倒三角形）
    function drawFixedPointer() {
        const radius = canvas.width / 2;
        const pointerHeight = 30; // 指針高度
        const pointerWidth = 20; // 指針底邊寬度
        const pointerX = radius - pointerWidth / 2; // 指針 X 座標
        const pointerY = -pointerHeight; // 指針 Y 座標，讓指針一半超出轉盤

        ctx.fillStyle = "blue"; // 設置指針顏色為藍色
        ctx.beginPath();
        ctx.moveTo(pointerX, pointerY); // 指針頂端位置
        ctx.lineTo(pointerX - pointerWidth / 2, pointerY + pointerHeight); // 左邊
        ctx.lineTo(pointerX + pointerWidth / 2, pointerY + pointerHeight); // 右邊
        ctx.closePath();
        ctx.fill();
    }

    // 轉盤旋轉邏輯
    spinButton.addEventListener("click", () => {
        if (names.length === 0) {
            alert("請輸入或匯入名單！");
            return;
        }

        const totalRotation = Math.random() * 3600 + 3600; // 隨機旋轉角度 (10圈以上)
        const winnerIndex = getWinnerIndex(totalRotation);
        const winnerName = names[winnerIndex];

        canvas.style.transition = `transform ${duration / 1000}s ease-out`;
        canvas.style.transform = `rotate(${totalRotation}deg)`;

        setTimeout(() => {
            resultText.textContent = `恭喜 ${winnerName} 中獎！`;
            alert(`恭喜 ${winnerName} 中獎！`); // 顯示網頁提示
            currentAngle = totalRotation % 360; // 更新當前角度
            canvas.style.transition = "none";
            canvas.style.transform = `rotate(${currentAngle}deg)`;
        }, duration);
    });

    // 計算中獎者索引
    function getWinnerIndex(rotation) {
        const segmentAngle = 360 / names.length;
        const normalizedRotation = (rotation % 360 + 360) % 360;
        const pointerAngle = 90;
        const correctedRotation = (normalizedRotation + pointerAngle) % 360;
        const index = Math.floor(correctedRotation / segmentAngle);
        return (names.length - index - 1 + names.length) % names.length;
    }

    drawWheel(); // 初始繪製
});

