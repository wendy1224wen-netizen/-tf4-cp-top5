const CPS = [
  { id: "cp01", name: "奇文", pair: "左奇函 × 杨博文", image: "./assets/cp/IMG_7408.jpeg" },
  { id: "cp02", name: "杨桂", pair: "杨博文 × 张桂源", image: "./assets/cp/IMG_7409.jpeg" },
  { id: "cp03", name: "博瑞", pair: "杨博文 × 张函瑞", image: "./assets/cp/IMG_7410.jpeg" },
  { id: "cp04", name: "恒文", pair: "陈奕恒 × 杨博文", image: "./assets/cp/IMG_7411.jpeg" },
  { id: "cp05", name: "铭文", pair: "陈浚铭 × 杨博文", image: "./assets/cp/IMG_7412.jpeg" },
  { id: "cp06", name: "罕文", pair: "陈思罕 × 杨博文", image: "./assets/cp/IMG_7413.jpeg" },
  { id: "cp07", name: "杰文", pair: "王橹杰 × 杨博文", image: "./assets/cp/IMG_7414.jpeg" },
  { id: "cp08", name: "桂奇", pair: "张桂源 × 左奇函", image: "./assets/cp/IMG_7416.jpeg" },
  { id: "cp09", name: "复函", pair: "张函瑞 × 左奇函", image: "./assets/cp/IMG_7417.jpeg" },
  { id: "cp10", name: "恒奇", pair: "陈奕恒 × 左奇函", image: "./assets/cp/IMG_7418.jpeg" },
  { id: "cp11", name: "奇铭", pair: "左奇函 × 陈浚铭", image: "./assets/cp/IMG_7419.jpeg" },
  { id: "cp12", name: "奇罕", pair: "左奇函 × 陈思罕", image: "./assets/cp/IMG_7420.jpeg" },
  { id: "cp13", name: "奇橹", pair: "左奇函 × 王橹杰", image: "./assets/cp/IMG_7421.jpeg" },
  { id: "cp14", name: "桂瑞", pair: "张桂源 × 张函瑞", image: "./assets/cp/IMG_7422.jpeg" },
  { id: "cp15", name: "桂恒", pair: "张桂源 × 陈奕恒", image: "./assets/cp/IMG_7423.jpeg" },
  { id: "cp16", name: "桂铭", pair: "张桂源 × 陈浚铭", image: "./assets/cp/IMG_7425.jpeg" },
  { id: "cp17", name: "桂罕", pair: "张桂源 × 陈思罕", image: "./assets/cp/IMG_7426.jpeg" },
  { id: "cp18", name: "桂橹", pair: "张桂源 × 王橹杰", image: "./assets/cp/IMG_7427.jpeg" },
  { id: "cp19", name: "恒瑞", pair: "陈奕恒 × 张函瑞", image: "./assets/cp/IMG_7428.jpeg" },
  { id: "cp20", name: "铭瑞", pair: "陈浚铭 × 张函瑞", image: "./assets/cp/IMG_7429.jpeg" },
  { id: "cp21", name: "罕瑞", pair: "陈思罕 × 张函瑞", image: "./assets/cp/IMG_7430.jpeg" },
  { id: "cp22", name: "橹瑞", pair: "王橹杰 × 张函瑞", image: "./assets/cp/IMG_7431.jpeg" },
  { id: "cp23", name: "恒铭", pair: "陈奕恒 × 陈浚铭", image: "./assets/cp/IMG_7432.jpeg" },
  { id: "cp24", name: "恒罕", pair: "陈奕恒 × 陈思罕", image: "./assets/cp/IMG_7433.jpeg" },
  { id: "cp25", name: "恒橹", pair: "陈奕恒 × 王橹杰", image: "./assets/cp/IMG_7434.jpeg" },
  { id: "cp26", name: "铭罕", pair: "陈浚铭 × 陈思罕", image: "./assets/cp/IMG_7435.jpeg" },
  { id: "cp27", name: "铭橹", pair: "陈浚铭 × 王橹杰", image: "./assets/cp/IMG_7436.jpeg" },
  { id: "cp28", name: "橹罕", pair: "王橹杰 × 陈思罕", image: "./assets/cp/IMG_7437.jpeg" },
];

const STORAGE_KEY = "tf4-cp-top5-session-v1";
const HISTORY_KEY = "tf4-cp-top5-history-v1";
const SESSION_VERSION = 1;
const cpById = new Map(CPS.map((item) => [item.id, item]));

const elements = {
  startScreen: document.querySelector("#startScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  resultScreen: document.querySelector("#resultScreen"),
  startBtn: document.querySelector("#startBtn"),
  continueBtn: document.querySelector("#continueBtn"),
  resumeNote: document.querySelector("#resumeNote"),
  homeBtn: document.querySelector("#homeBtn"),
  choiceCount: document.querySelector("#choiceCount"),
  stageLabel: document.querySelector("#stageLabel"),
  progressLabel: document.querySelector("#progressLabel"),
  progressBar: document.querySelector("#progressBar"),
  roundLabel: document.querySelector("#roundLabel"),
  leftCard: document.querySelector("#leftCard"),
  rightCard: document.querySelector("#rightCard"),
  leftImage: document.querySelector("#leftImage"),
  rightImage: document.querySelector("#rightImage"),
  leftName: document.querySelector("#leftName"),
  rightName: document.querySelector("#rightName"),
  leftPair: document.querySelector("#leftPair"),
  rightPair: document.querySelector("#rightPair"),
  leftIndex: document.querySelector("#leftIndex"),
  rightIndex: document.querySelector("#rightIndex"),
  undoBtn: document.querySelector("#undoBtn"),
  saveBtn: document.querySelector("#saveBtn"),
  resultList: document.querySelector("#resultList"),
  posterBtn: document.querySelector("#posterBtn"),
  shareBtn: document.querySelector("#shareBtn"),
  resultUndoBtn: document.querySelector("#resultUndoBtn"),
  restartBtn: document.querySelector("#restartBtn"),
  posterDialog: document.querySelector("#posterDialog"),
  posterPreview: document.querySelector("#posterPreview"),
  closeDialogBtn: document.querySelector("#closeDialogBtn"),
  downloadBtn: document.querySelector("#downloadBtn"),
  resultCanvas: document.querySelector("#resultCanvas"),
  toast: document.querySelector("#toast"),
};

let session = loadSession();
let historyStack = loadHistory();
let activeScreen = "start";
let isChoosing = false;
let toastTimer = null;
let posterBlob = null;
let posterObjectUrl = null;
let posterSignature = "";

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function pairKey(firstId, secondId) {
  return [firstId, secondId].sort().join("__");
}

function createEngine(ids, purpose, targetRank = null) {
  return {
    purpose,
    targetRank,
    round: shuffle(ids),
    next: [],
    cursor: 0,
    startSize: ids.length,
    matchesDone: 0,
  };
}

function createSession() {
  const ids = shuffle(CPS.map((item) => item.id));
  const freshSession = {
    version: SESSION_VERSION,
    status: "playing",
    phase: "champion",
    engine: createEngine(ids, "champion", 1),
    defeated: Object.fromEntries(ids.map((id) => [id, []])),
    pairResults: {},
    ranking: [],
    frontier: [],
    currentPair: null,
    baseMatchesCompleted: 0,
    choices: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  advanceUntilChoice(freshSession);
  return freshSession;
}

function loadSession() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || parsed.version !== SESSION_VERSION) return null;
    if (!Array.isArray(parsed.ranking) || !parsed.defeated || !parsed.pairResults) return null;
    return parsed;
  } catch {
    return null;
  }
}

function loadHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSession(showConfirmation = false) {
  if (!session) return;
  session.updatedAt = Date.now();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyStack.slice(-60)));
    if (showConfirmation) showToast("进度已保存在当前设备");
  } catch {
    if (showConfirmation) showToast("当前浏览器暂时无法保存进度");
  }
}

function clearSavedSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // Local storage can be unavailable in strict privacy modes.
  }
}

function advanceUntilChoice(targetSession) {
  let guard = 0;
  targetSession.currentPair = null;

  while (targetSession.status === "playing" && guard < 1000) {
    guard += 1;
    const engine = targetSession.engine;

    if (!engine || engine.round.length === 0) {
      throw new Error("测试进度出现异常，请重新开始。");
    }

    if (engine.cursor >= engine.round.length) {
      if (engine.next.length === 1) {
        finishTournament(targetSession, engine.next[0]);
        continue;
      }

      engine.round = engine.next;
      engine.next = [];
      engine.cursor = 0;
      continue;
    }

    if (engine.cursor === engine.round.length - 1) {
      engine.next.push(engine.round[engine.cursor]);
      engine.cursor += 1;
      continue;
    }

    const firstId = engine.round[engine.cursor];
    const secondId = engine.round[engine.cursor + 1];
    engine.cursor += 2;

    const knownWinner = targetSession.pairResults[pairKey(firstId, secondId)];
    if (knownWinner === firstId || knownWinner === secondId) {
      engine.next.push(knownWinner);
      engine.matchesDone += 1;
      continue;
    }

    targetSession.currentPair = [firstId, secondId];
    return;
  }

  if (guard >= 1000) throw new Error("无法继续生成下一组对决。");
}

function finishTournament(targetSession, winnerId) {
  const purpose = targetSession.engine.purpose;

  if (purpose === "champion") {
    targetSession.ranking = [winnerId];
    targetSession.frontier = [...new Set(targetSession.defeated[winnerId])];
    targetSession.phase = "ranking";
    targetSession.engine = createEngine(targetSession.frontier, "ranking", 2);
    return;
  }

  targetSession.ranking.push(winnerId);
  const selected = new Set(targetSession.ranking);
  const nextFrontier = targetSession.frontier.filter((id) => id !== winnerId && !selected.has(id));

  for (const defeatedId of targetSession.defeated[winnerId] || []) {
    if (!selected.has(defeatedId) && !nextFrontier.includes(defeatedId)) {
      nextFrontier.push(defeatedId);
    }
  }

  targetSession.frontier = nextFrontier;

  if (targetSession.ranking.length >= 5) {
    targetSession.status = "done";
    targetSession.phase = "done";
    targetSession.engine = null;
    targetSession.currentPair = null;
    return;
  }

  targetSession.engine = createEngine(
    targetSession.frontier,
    "ranking",
    targetSession.ranking.length + 1,
  );
}

function applyChoice(winnerId) {
  if (!session || session.status !== "playing" || !session.currentPair) return;
  const [firstId, secondId] = session.currentPair;
  if (winnerId !== firstId && winnerId !== secondId) return;

  const snapshot = JSON.stringify(session);
  historyStack.push(snapshot);
  if (historyStack.length > 60) historyStack.shift();

  const loserId = winnerId === firstId ? secondId : firstId;
  session.pairResults[pairKey(firstId, secondId)] = winnerId;

  if (session.engine.purpose === "champion") {
    session.defeated[winnerId].push(loserId);
    session.baseMatchesCompleted += 1;
  }

  session.engine.next.push(winnerId);
  session.engine.matchesDone += 1;
  session.choices += 1;
  session.currentPair = null;
  advanceUntilChoice(session);
  invalidatePoster();
  saveSession();
}

function chooseCard(winnerId, cardElement) {
  if (isChoosing || !session?.currentPair) return;
  isChoosing = true;
  cardElement.classList.add("is-picked");
  elements.leftCard.disabled = true;
  elements.rightCard.disabled = true;

  window.setTimeout(() => {
    try {
      applyChoice(winnerId);
      if (session.status === "done") {
        renderResult();
        showScreen("result");
      } else {
        renderGame();
      }
    } catch (error) {
      showToast(error.message || "测试暂时无法继续，请重新开始");
    } finally {
      elements.leftCard.classList.remove("is-picked");
      elements.rightCard.classList.remove("is-picked");
      elements.leftCard.disabled = false;
      elements.rightCard.disabled = false;
      isChoosing = false;
    }
  }, 170);
}

function undoChoice() {
  if (isChoosing || historyStack.length === 0) return;
  try {
    session = JSON.parse(historyStack.pop());
    invalidatePoster();
    saveSession();
    renderGame();
    showToast("已撤回上一次选择");
  } catch {
    showToast("这一步暂时无法撤回");
  }
}

function getProgress() {
  if (!session) return 0;
  if (session.status === "done") return 100;

  if (session.phase === "champion") {
    return Math.min(55, (session.baseMatchesCompleted / (CPS.length - 1)) * 55);
  }

  const completedRankingSlots = Math.max(0, session.ranking.length - 1);
  const engine = session.engine;
  const currentSlotProgress =
    engine && engine.startSize > 1 ? Math.min(1, engine.matchesDone / (engine.startSize - 1)) : 0;
  return Math.min(99, 55 + ((completedRankingSlots + currentSlotProgress) / 4) * 45);
}

function renderStart() {
  if (!session) {
    elements.continueBtn.classList.add("is-hidden");
    elements.resumeNote.classList.add("is-hidden");
    elements.startBtn.querySelector("span").textContent = "开始测试";
    return;
  }

  elements.continueBtn.classList.remove("is-hidden");
  elements.resumeNote.classList.remove("is-hidden");
  elements.startBtn.querySelector("span").textContent = "重新开始";

  if (session.status === "done") {
    elements.continueBtn.textContent = "查看上次 TOP 5";
    elements.resumeNote.textContent = "上次测试已经完成，结果仍保存在这台设备上。";
  } else {
    const progress = Math.round(getProgress());
    elements.continueBtn.textContent = "继续上次进度";
    elements.resumeNote.textContent = `上次已完成约 ${progress}% · 第 ${session.choices + 1} 次选择待继续`;
  }
}

function renderGame() {
  if (!session || session.status !== "playing") return;
  if (!session.currentPair) advanceUntilChoice(session);

  const [leftId, rightId] = session.currentPair;
  const left = cpById.get(leftId);
  const right = cpById.get(rightId);
  const leftNumber = CPS.findIndex((item) => item.id === leftId) + 1;
  const rightNumber = CPS.findIndex((item) => item.id === rightId) + 1;

  elements.leftImage.src = left.image;
  elements.leftImage.alt = `${left.name}，${left.pair}合照`;
  elements.leftName.textContent = left.name;
  elements.leftPair.textContent = left.pair;
  elements.leftIndex.textContent = String(leftNumber).padStart(2, "0");
  elements.leftCard.setAttribute("aria-label", `选择${left.name}，${left.pair}`);

  elements.rightImage.src = right.image;
  elements.rightImage.alt = `${right.name}，${right.pair}合照`;
  elements.rightName.textContent = right.name;
  elements.rightPair.textContent = right.pair;
  elements.rightIndex.textContent = String(rightNumber).padStart(2, "0");
  elements.rightCard.setAttribute("aria-label", `选择${right.name}，${right.pair}`);

  elements.choiceCount.textContent = String(session.choices);
  const progress = Math.round(getProgress());
  elements.progressBar.style.width = `${progress}%`;
  elements.progressLabel.textContent = `${progress}%`;

  if (session.phase === "champion") {
    elements.stageLabel.textContent = "全员初筛";
    elements.roundLabel.textContent = `ROUND ${String(session.baseMatchesCompleted + 1).padStart(2, "0")}`;
  } else {
    const targetRank = session.ranking.length + 1;
    elements.stageLabel.textContent = `TOP 5 定序 · 锁定第 ${targetRank} 名`;
    elements.roundLabel.textContent = `FINAL PICK · TOP ${targetRank}`;
  }

  elements.undoBtn.disabled = historyStack.length === 0;
}

function renderResult() {
  if (!session || session.ranking.length < 5) return;
  elements.resultList.replaceChildren();

  session.ranking.slice(0, 5).forEach((id, index) => {
    const item = cpById.get(id);
    const card = document.createElement("li");
    card.className = "result-card";

    const badge = document.createElement("span");
    badge.className = "rank-badge";
    badge.textContent = `#${index + 1}`;

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = `${item.name}，${item.pair}合照`;

    const copy = document.createElement("div");
    copy.className = "result-copy";
    const name = document.createElement("strong");
    name.textContent = item.name;
    const pair = document.createElement("span");
    pair.textContent = item.pair;
    copy.append(name, pair);
    card.append(badge, image, copy);
    elements.resultList.append(card);
  });
}

function showScreen(name) {
  activeScreen = name;
  elements.startScreen.classList.toggle("is-hidden", name !== "start");
  elements.gameScreen.classList.toggle("is-hidden", name !== "game");
  elements.resultScreen.classList.toggle("is-hidden", name !== "result");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startNewSession(force = false) {
  if (!force && session) {
    const accepted = window.confirm("重新开始会清除当前进度和结果，确定吗？");
    if (!accepted) return;
  }

  clearSavedSession();
  historyStack = [];
  session = createSession();
  invalidatePoster();
  saveSession();
  renderGame();
  showScreen("game");
}

function continueSession() {
  if (!session) {
    startNewSession(true);
    return;
  }

  if (session.status === "done") {
    renderResult();
    showScreen("result");
  } else {
    renderGame();
    showScreen("game");
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2200);
}

function invalidatePoster() {
  posterBlob = null;
  posterSignature = "";
  if (posterObjectUrl) {
    URL.revokeObjectURL(posterObjectUrl);
    posterObjectUrl = null;
  }
}

function getResultSignature() {
  return session?.ranking?.slice(0, 5).join("|") || "";
}

function getShareText() {
  const lines = session.ranking.slice(0, 5).map((id, index) => {
    const item = cpById.get(id);
    return `${index + 1}. ${item.name}（${item.pair}）`;
  });
  return `我的四代一班CP心选TOP 5：\n${lines.join("\n")}`;
}

function getStructuredState() {
  const currentOptions = session?.currentPair?.map((id) => {
    const item = cpById.get(id);
    return { id: item.id, name: item.name, pair: item.pair };
  }) || [];
  const topFive = session?.ranking?.slice(0, 5).map((id, index) => {
    const item = cpById.get(id);
    return { rank: index + 1, id: item.id, name: item.name, pair: item.pair };
  }) || [];

  return {
    status: session?.status || "not_started",
    screen: activeScreen,
    progressPercent: Math.round(getProgress()),
    choicesMade: session?.choices || 0,
    currentOptions,
    topFive: session?.status === "done" ? topFive : [],
  };
}

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();

  const register = (tool) => {
    try {
      void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {});
    } catch {
      // Unsupported implementations should not affect the visible game.
    }
  };

  register({
    name: "read_cp_test_state",
    title: "查看CP测试状态",
    description: "查看四代一班CP心选测试的当前进度、这一轮的两个选项或已完成的TOP 5。",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute() {
      return getStructuredState();
    },
  });

  register({
    name: "open_cp_test",
    title: "进入CP测试",
    description: "开始一场尚未开始的CP测试，或打开设备上已有的测试进度。不会清除已有结果。",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute() {
      if (!session) startNewSession(true);
      else continueSession();
      return getStructuredState();
    },
  });

  register({
    name: "choose_current_cp",
    title: "选择当前CP",
    description: "在当前二选一对决中选择指定CP，并推进到下一轮。cpId必须来自当前选项。",
    inputSchema: {
      type: "object",
      properties: { cpId: { type: "string", description: "当前选项的CP编号，例如cp01。" } },
      required: ["cpId"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!session || session.status !== "playing" || !session.currentPair) {
        throw new Error("当前没有可以选择的CP对决。");
      }
      if (!input || typeof input.cpId !== "string" || !session.currentPair.includes(input.cpId)) {
        throw new Error(`cpId必须是当前选项之一：${session.currentPair.join(" 或 ")}`);
      }
      applyChoice(input.cpId);
      if (session.status === "done") {
        renderResult();
        showScreen("result");
      } else {
        renderGame();
        showScreen("game");
      }
      return getStructuredState();
    },
  });

  register({
    name: "undo_last_cp_choice",
    title: "撤回上次CP选择",
    description: "撤回最近一次CP选择并回到对应的二选一画面。",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute() {
      if (historyStack.length === 0) throw new Error("当前没有可以撤回的选择。");
      undoChoice();
      showScreen("game");
      return getStructuredState();
    },
  });
}

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

function roundedRectPath(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(x + width, y + height, x, y + height, safeRadius);
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
}

function drawCover(context, image, x, y, width, height) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const frameRatio = width / height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > frameRatio) {
    sourceWidth = image.naturalHeight * frameRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / frameRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

async function generatePosterBlob() {
  const signature = getResultSignature();
  if (posterBlob && posterSignature === signature) return posterBlob;
  if (!session || session.ranking.length < 5) throw new Error("还没有完整的TOP 5结果");

  const canvas = elements.resultCanvas;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  const background = context.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#090a12");
  background.addColorStop(0.52, "#121426");
  background.addColorStop(1, "#1a0d1c");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const glowOne = context.createRadialGradient(940, 90, 0, 940, 90, 420);
  glowOne.addColorStop(0, "rgba(255,79,154,0.34)");
  glowOne.addColorStop(1, "rgba(255,79,154,0)");
  context.fillStyle = glowOne;
  context.fillRect(0, 0, width, height);

  const glowTwo = context.createRadialGradient(80, 1250, 0, 80, 1250, 500);
  glowTwo.addColorStop(0, "rgba(111,233,255,0.2)");
  glowTwo.addColorStop(1, "rgba(111,233,255,0)");
  context.fillStyle = glowTwo;
  context.fillRect(0, 0, width, height);

  context.fillStyle = "#6fe9ff";
  context.font = '800 25px system-ui, "PingFang SC", sans-serif';
  context.letterSpacing = "3px";
  context.fillText("四代一班 · CP心选局", 70, 78);

  context.fillStyle = "#f7f7fb";
  context.font = '900 68px system-ui, "PingFang SC", sans-serif';
  context.letterSpacing = "-3px";
  context.fillText("我的心选 TOP 5", 68, 160);

  context.fillStyle = "#a5a7b5";
  context.font = '500 25px system-ui, "PingFang SC", sans-serif';
  context.letterSpacing = "0px";
  context.fillText("28组CP · 二选一 · 每一次偏爱都算数", 70, 206);

  const rowY = 246;
  const rowHeight = 188;
  const rowGap = 15;
  const ranking = session.ranking.slice(0, 5);

  for (let index = 0; index < ranking.length; index += 1) {
    const item = cpById.get(ranking[index]);
    const y = rowY + index * (rowHeight + rowGap);
    const isFirst = index === 0;

    const rowGradient = context.createLinearGradient(55, y, 1025, y + rowHeight);
    rowGradient.addColorStop(0, isFirst ? "rgba(255,79,154,0.2)" : "rgba(255,255,255,0.075)");
    rowGradient.addColorStop(1, isFirst ? "rgba(111,233,255,0.11)" : "rgba(255,255,255,0.035)");
    roundedRectPath(context, 55, y, 970, rowHeight, 28);
    context.fillStyle = rowGradient;
    context.fill();
    context.strokeStyle = isFirst ? "rgba(255,79,154,0.65)" : "rgba(255,255,255,0.13)";
    context.lineWidth = 2;
    context.stroke();

    try {
      const image = await loadImage(item.image);
      context.save();
      roundedRectPath(context, 70, y + 15, 158, 158, 21);
      context.clip();
      drawCover(context, image, 70, y + 15, 158, 158);
      context.restore();
    } catch {
      context.fillStyle = "#242638";
      roundedRectPath(context, 70, y + 15, 158, 158, 21);
      context.fill();
    }

    const badgeGradient = context.createLinearGradient(252, y + 45, 326, y + 118);
    badgeGradient.addColorStop(0, "#6fe9ff");
    badgeGradient.addColorStop(0.55, "#ffffff");
    badgeGradient.addColorStop(1, "#ff4f9a");
    context.fillStyle = badgeGradient;
    context.beginPath();
    context.arc(289, y + 94, 38, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#090a12";
    context.textAlign = "center";
    context.font = '950 30px system-ui, "PingFang SC", sans-serif';
    context.fillText(String(index + 1), 289, y + 104);
    context.textAlign = "left";

    context.fillStyle = "#f7f7fb";
    context.font = `${isFirst ? 900 : 820} ${isFirst ? 51 : 45}px system-ui, "PingFang SC", sans-serif`;
    context.fillText(item.name, 350, y + 86);

    context.fillStyle = "#a5a7b5";
    context.font = '500 27px system-ui, "PingFang SC", sans-serif';
    context.fillText(item.pair, 350, y + 132);

    context.fillStyle = isFirst ? "#ff8fbd" : "#6fe9ff";
    context.font = '800 21px system-ui, "PingFang SC", sans-serif';
    context.fillText(isFirst ? "MY ONE PICK" : `TOP ${index + 1}`, 830, y + 101);
  }

  context.fillStyle = "rgba(255,255,255,0.38)";
  context.font = '600 21px system-ui, "PingFang SC", sans-serif';
  context.fillText("TF4 CP PICK · PERSONAL RESULT", 70, 1308);
  context.textAlign = "right";
  context.fillText("TOP 5", 1010, 1308);
  context.textAlign = "left";

  posterBlob = await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("结果图生成失败"))), "image/png", 1);
  });
  posterSignature = signature;
  return posterBlob;
}

async function openPoster() {
  try {
    showToast("正在生成结果图…");
    const blob = await generatePosterBlob();
    if (posterObjectUrl) URL.revokeObjectURL(posterObjectUrl);
    posterObjectUrl = URL.createObjectURL(blob);
    elements.posterPreview.src = posterObjectUrl;
    elements.posterDialog.showModal();
  } catch (error) {
    showToast(error.message || "结果图生成失败");
  }
}

async function downloadPoster() {
  try {
    const blob = await generatePosterBlob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "四代一班-CP心选TOP5.png";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast("结果图已生成，可以保存啦");
  } catch (error) {
    showToast(error.message || "图片保存失败");
  }
}

async function shareResult() {
  const text = getShareText();
  try {
    const blob = await generatePosterBlob();
    const file = new File([blob], "四代一班-CP心选TOP5.png", { type: "image/png" });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: "我的四代一班CP心选TOP 5",
        text,
        files: [file],
      });
      return;
    }

    if (navigator.share) {
      await navigator.share({ title: "我的四代一班CP心选TOP 5", text, url: window.location.href });
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      showToast("结果文字和链接已复制");
      return;
    }

    await openPoster();
  } catch (error) {
    if (error?.name !== "AbortError") showToast("没有成功分享，可以先保存结果图");
  }
}

elements.startBtn.addEventListener("click", () => startNewSession(false));
elements.continueBtn.addEventListener("click", continueSession);
elements.homeBtn.addEventListener("click", () => {
  if (isChoosing) return;
  saveSession();
  renderStart();
  showScreen("start");
});
elements.leftCard.addEventListener("click", () => chooseCard(session.currentPair[0], elements.leftCard));
elements.rightCard.addEventListener("click", () => chooseCard(session.currentPair[1], elements.rightCard));
elements.undoBtn.addEventListener("click", undoChoice);
elements.saveBtn.addEventListener("click", () => saveSession(true));
elements.posterBtn.addEventListener("click", openPoster);
elements.shareBtn.addEventListener("click", shareResult);
elements.resultUndoBtn.addEventListener("click", () => {
  undoChoice();
  if (session?.status === "playing") showScreen("game");
});
elements.restartBtn.addEventListener("click", () => startNewSession(false));
elements.closeDialogBtn.addEventListener("click", () => elements.posterDialog.close());
elements.downloadBtn.addEventListener("click", downloadPoster);
elements.posterDialog.addEventListener("click", (event) => {
  if (event.target === elements.posterDialog) elements.posterDialog.close();
});

document.addEventListener("keydown", (event) => {
  if (activeScreen !== "game" || isChoosing || !session?.currentPair) return;
  if (event.key === "ArrowLeft" || event.key === "1") {
    event.preventDefault();
    chooseCard(session.currentPair[0], elements.leftCard);
  } else if (event.key === "ArrowRight" || event.key === "2") {
    event.preventDefault();
    chooseCard(session.currentPair[1], elements.rightCard);
  } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
    event.preventDefault();
    undoChoice();
  }
});

for (const item of CPS.slice(0, 8)) {
  const image = new Image();
  image.src = item.image;
}

registerWebMcpTools();
renderStart();
showScreen("start");
