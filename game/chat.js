const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

// Messages prédéfinis
const chatFlow = [
  { bot: "اكيد تحس في روحك خير تو" },
  { user: "اي خير", bot: "سايس روحك الفايدة في صحة الابدان 😄" }
];

let chatIndex = 0;

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.textContent = text;
  div.classList.add(sender === "bot" ? "bot" : "user");
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Premier message du bot
addMessage("bot", chatFlow[0].bot);

chatSend.addEventListener("click", () => {
  const userText = chatInput.value.trim();
  if (!userText) return;

  addMessage("user", userText);
  chatInput.value = "";

  chatIndex++;
  if (chatIndex < chatFlow.length) {
    addMessage("bot", chatFlow[chatIndex].bot);
  }
});
