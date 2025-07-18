"use strict";
const API_KEY = ""; // OpenAI API 키 입력 필요
document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const toggleModeBtn = document.getElementById("toggle-mode");
  const quotes = [
    "오늘 할 수 있는 일을 내일로 미루지 마라. - 벤자민 프랭클린",
    "성공은 열정을 잃지 않고 실패를 거듭할 수 있는 능력이다. - 윈스턴 처칠",
    "행복은 습관이다. 그것을 몸에 지니라. - 허버드",
    "남을 이기려면 먼저 자신을 이겨야 한다. - 공자",
    "작은 변화가 큰 차이를 만든다. - 말콤 글래드웰",
    "당신의 미래는 당신이 만든다. - 파블로 피카소",
  ];
  const quoteElement = document.getElementById("quote-box");
  if (quoteElement) {
    quoteElement.textContent = `💡오늘의 명언: ${getRandomQuote()}`;
  }
  sendBtn.addEventListener("click", handleSend);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
  toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleModeBtn.textContent = document.body.classList.contains("dark")
      ? "☀️ 라이트 모드"
      : "🌙 다크 모드";
  });
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  function addMessage(text, role) {
    const message = document.createElement("div");
    message.className = `chat-message ${role}`;
    message.innerText = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  async function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;
    addMessage(message, "user");
    userInput.value = "";
    const reply = await getChatGPTReply(message);
    addMessage(reply, "bot");
  }
  let messageHistory = [
    { role: "system", content: "You are a friendly Korean chatbot." },
  ];
  async function getChatGPTReply(message) {
    messageHistory.push({ role: "user", content: message });
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messageHistory,
      }),
    });
    const data = await response.json();
    const reply = data.choices[0].message.content.trim();
    // assistant 응답도 저장
    messageHistory.push({ role: "assistant", content: reply });
    return reply;
  }
});
