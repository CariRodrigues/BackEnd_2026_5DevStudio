const socket = io();
const chatOverlay = document.getElementById("chatOverlay");
const mensajesList = document.getElementById("mensajes");
const mensajeInput = document.getElementById("mensaje");
const CHAT_STORAGE_KEY = "todostock-chat-mensajes";
const CHAT_OPEN_KEY = "todostock-chat-abierto";
let mensajesCache = [];

function enviar() {
  if (!mensajeInput) return;
  const texto = mensajeInput.value.trim();
  if (!texto) return;
  const mensaje = { usuario: usuarioLogueado, texto };

  // console.log("Enviando:", mensaje);

  socket.emit("mensaje", mensaje);
  mensajeInput.value = "";
}

function guardarMensajes() {
  try {
    sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(mensajesCache));
  } catch (error) {
    console.warn("No se pudo guardar el chat:", error);
  }
}

function cargarMensajes() {
  try {
    const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("No se pudo cargar el chat:", error);
    return [];
  }
}

function setChatOpen(abierto) {
  if (!chatOverlay) return;
  chatOverlay.classList.toggle("hidden", !abierto);
  if (abierto && mensajeInput) {
    mensajeInput.focus();
  }
  try {
    sessionStorage.setItem(CHAT_OPEN_KEY, abierto ? "1" : "0");
  } catch (error) {
    console.warn("No se pudo guardar estado del chat:", error);
  }
}

function clearChatStorage() {
  try {
    sessionStorage.removeItem(CHAT_STORAGE_KEY);
    sessionStorage.removeItem(CHAT_OPEN_KEY);
    mensajesCache = [];
    if (mensajesList) {
      mensajesList.innerHTML = "";
    }
  } catch (error) {
    console.warn("No se pudo limpiar el chat:", error);
  }
}

function toggleChat() {
  if (!chatOverlay) return;
  const abierto = !chatOverlay.classList.contains("hidden");
  setChatOpen(!abierto);
}

function renderMensaje(mensaje) {
  if (!mensajesList) return;
  const item = document.createElement("li");
  item.classList.add(
    mensaje.usuario === usuarioLogueado ? "mensaje-propio" : "mensaje-externo",
  );
  const strong = document.createElement("strong");
  strong.textContent = mensaje.usuario;
  item.appendChild(strong);
  item.append(mensaje.texto);

  mensajesList.appendChild(item);
}

function agregarMensaje(mensaje) {
  if (!mensaje || !mensaje.texto) return;
  mensajesCache.push(mensaje);
  guardarMensajes();
  renderMensaje(mensaje);
  if (mensajesList) {
    mensajesList.scrollTop = mensajesList.scrollHeight;
  }
}

function cargarMensajesGuardados() {
  mensajesCache = cargarMensajes();
  mensajesCache.forEach(renderMensaje);
  const chatAbierto = sessionStorage.getItem(CHAT_OPEN_KEY) === "1";
  setChatOpen(chatAbierto);
}

cargarMensajesGuardados();

if (mensajeInput) {
  mensajeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      enviar();
    }
  });
}

socket.on("mensaje", (mensaje) => {
  console.log("Recibido:", mensaje);

  if (typeof mensaje === "string") {
    agregarMensaje({ usuario: usuarioLogueado, texto: mensaje });
  } else {
    agregarMensaje(mensaje);
  }
});
