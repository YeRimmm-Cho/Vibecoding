var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var API_KEY = ""; // OpenAI API 키 입력 필요
document.addEventListener("DOMContentLoaded", function () {
  var chatBox = document.getElementById("chat-box");
  var userInput = document.getElementById("user-input");
  var sendBtn = document.getElementById("send-btn");
  var toggleModeBtn = document.getElementById("toggle-mode");
  var quotes = [
    "오늘 할 수 있는 일을 내일로 미루지 마라. - 벤자민 프랭클린",
    "성공은 열정을 잃지 않고 실패를 거듭할 수 있는 능력이다. - 윈스턴 처칠",
    "행복은 습관이다. 그것을 몸에 지니라. - 허버드",
    "남을 이기려면 먼저 자신을 이겨야 한다. - 공자",
    "작은 변화가 큰 차이를 만든다. - 말콤 글래드웰",
  ];
  var quoteElement = document.getElementById("quote-box");
  if (quoteElement) {
    quoteElement.textContent =
      "\uD83D\uDCA1\uC624\uB298\uC758 \uBA85\uC5B8: ".concat(getRandomQuote());
  }
  sendBtn.addEventListener("click", handleSend);
  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") handleSend();
  });
  toggleModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    toggleModeBtn.textContent = document.body.classList.contains("dark")
      ? "☀️ 라이트 모드"
      : "🌙 다크 모드";
  });
  function getRandomQuote() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  function addMessage(text, role) {
    var message = document.createElement("div");
    message.className = "chat-message ".concat(role);
    message.innerText = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  function handleSend() {
    return __awaiter(this, void 0, void 0, function () {
      var message, reply;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            message = userInput.value.trim();
            if (!message) return [2 /*return*/];
            addMessage(message, "user");
            userInput.value = "";
            return [4 /*yield*/, getChatGPTReply(message)];
          case 1:
            reply = _a.sent();
            addMessage(reply, "bot");
            return [2 /*return*/];
        }
      });
    });
  }
  var messageHistory = [
    { role: "system", content: "You are a friendly Korean chatbot." },
  ];
  function getChatGPTReply(message) {
    return __awaiter(this, void 0, void 0, function () {
      var response, data, reply;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            messageHistory.push({ role: "user", content: message });
            return [
              4 /*yield*/,
              fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer ".concat(API_KEY),
                },
                body: JSON.stringify({
                  model: "gpt-3.5-turbo",
                  messages: messageHistory,
                }),
              }),
            ];
          case 1:
            response = _a.sent();
            return [4 /*yield*/, response.json()];
          case 2:
            data = _a.sent();
            reply = data.choices[0].message.content.trim();
            // assistant 응답도 저장
            messageHistory.push({ role: "assistant", content: reply });
            return [2 /*return*/, reply];
        }
      });
    });
  }
});
