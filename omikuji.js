const fortunes = [
  {
    name: "大吉",
    color: "red",
    messages: [
      "最高の運勢です！学祭も楽しもう！",
      "運気絶好調！素敵な1日になる予感！",
      "チャンス到来！思い切って行動してみて！",
      "笑顔が幸運を呼ぶよ！",
      "最高のスタートを切ろう！"
    ]
  },
  {
    name: "中吉",
    color: "orange",
    messages: [
      "いい感じ！準備もバッチリ！",
      "順調に進んでるよ。焦らず進もう。",
      "努力が実を結ぶ時期だよ！",
      "明るい未来が待ってる！",
      "小さな幸せを見つけてね。"
    ]
  },
  {
    name: "小吉",
    color: "green",
    messages: [
      "ほどほどに頑張ろう！",
      "ゆっくり確実に進めていこう。",
      "焦らずじっくりが吉。",
      "新しい挑戦が良い結果に繋がるよ。",
      "日々の積み重ねが大事だよ。"
    ]
  },
  {
    name: "凶",
    color: "blue",
    messages: [
      "気をつけて！でもきっと良くなる！",
      "注意深く行動しよう。",
      "失敗は次の成功の糧だよ。",
      "冷静さを忘れずにね。",
      "諦めずに挑戦し続けよう！"
    ]
  },
  {
    name: "大凶",
    color: "gray",
    messages: [
      "焦らずじっくりいこう！",
      "ゆっくり休んでリフレッシュ。",
      "辛い時期もやがて過ぎるよ。",
      "周りの助けを借りて乗り越えよう。",
      "ポジティブな気持ちを忘れずに！"
    ]
  }
];
 
// ローカルストレージキー
const STORAGE_KEY = "omikuji_history";
 
// 履歴を初期化・取得
function loadHistory() {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : {};
}
 
// 履歴を保存
function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}
 
// 履歴表示更新
function updateHistoryDisplay(history) {
  const ul = document.getElementById("historyList");
  ul.innerHTML = "";
  for (const [name, count] of Object.entries(history)) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${count}回`;
    ul.appendChild(li);
  }
}
 
document.getElementById("drawBtn").addEventListener("click", () => {
  const idx = Math.floor(Math.random() * fortunes.length);
  const fortune = fortunes[idx];
  
  // メッセージをランダムに選ぶ
  const msgIdx = Math.floor(Math.random() * fortune.messages.length);
  const message = fortune.messages[msgIdx];
 
  // 結果表示
  const resultDiv = document.getElementById("result");
resultDiv.textContent = `${fortune.name} - ${message}`;
resultDiv.style.color = fortune.color;
 
  // 履歴更新
  const history = loadHistory();
history[fortune.name] = (history[fortune.name] || 0) + 1;
  saveHistory(history);
  updateHistoryDisplay(history);
});
 
// ページロード時に履歴表示を更新
window.addEventListener("load", () => {
  const history = loadHistory();
  updateHistoryDisplay(history);
});
document.addEventListener("keydown", function(event) {
    if (event.shiftKey && event.key === "r") {
        localStorage.removeItem("omikujiHistory");
        updateHistoryDisplay();
        alert("履歴をリセットしました（Shift + R）");
    }
});
