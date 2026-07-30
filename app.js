"use strict";

const AREAS = [
  { id: "lineas-1-2", short: "Línea 1 y Línea 2", full: "Línea 1 y Línea 2", icon: "▥" },
  { id: "linea-3-enrackado", short: "Línea 3 y Enrackado", full: "Línea 3 y Área de enrackado", icon: "▤" },
  { id: "inspeccion-produccion", short: "Inspección Producción", full: "Área de inspección (producción) y perímetro exterior del área", icon: "⌕" },
  { id: "almacen-pc", short: "Almacén PC", full: "Almacén PC y perímetro exterior del área", icon: "▦" },
  { id: "inspeccion-empaque", short: "Inspección, Empaque y Vibrado", full: "Área de inspección y empaque, Pesaje y Vibrado", icon: "◫" },
  { id: "almacen-mp-lab", short: "Almacén MP y Laboratorio", full: "Almacén MP y Laboratorio", icon: "⚗" },
  { id: "oficinas", short: "Oficinas", full: "Oficinas", icon: "▧" },
  { id: "consumibles", short: "Almacén Consumibles", full: "Almacén Consumibles", icon: "▣" },
  { id: "mantenimiento", short: "Mantenimiento", full: "Mantenimiento", icon: "⚒" },
  { id: "linea-5", short: "Línea 5", full: "Línea 5", icon: "▥" },
  { id: "quimicos", short: "Almacén de Químicos", full: "Almacén de Químicos", icon: "⚗" }
];

const QUESTIONS = [
  {
    id: 1,
    title: "Objetos innecesarios en el área",
    question: "¿Hay artículos sin uso en espacios de trabajo?",
    criteria: {
      1: "Existen muchos objetos sin uso o ajenos a la operación del área. Más de 8 objetos fuera de lugar.",
      2: "Existen varios objetos innecesarios, aunque algunos ya fueron retirados. De 6 a 8 objetos.",
      3: "Se observan pocos objetos innecesarios o existen dudas sobre la utilidad de algunos artículos. De 3 a 5 objetos.",
      4: "El área está casi libre de objetos innecesarios; solamente existen detalles menores. De 1 a 2 objetos.",
      5: "No existen objetos innecesarios; únicamente permanece lo requerido para la operación. 0 objetos."
    },
    suggestions: {
      1: ["Realizar una depuración inmediata y retirar los objetos ajenos a la operación.", "Clasificar los artículos dudosos mediante Red Tags."],
      2: ["Retirar los objetos sin uso identificados durante el recorrido.", "Definir qué artículos deben permanecer por necesidad operativa."],
      3: ["Validar la utilidad de los artículos dudosos y retirar los que no sean necesarios.", "Reducir los objetos fuera de lugar a un máximo de dos."],
      4: ["Retirar o reubicar los detalles menores observados para dejar únicamente lo requerido."],
      5: ["Mantener la revisión diaria para evitar nuevas acumulaciones."]
    }
  },
  {
    id: 2,
    title: "Aplicación de Red Tags",
    question: "¿Se identificaron y etiquetaron artículos dudosos y se han cerrado los Red Tags?",
    criteria: {
      1: "No se utiliza el sistema de Red Tags; no existen registros ni seguimiento de cierre.",
      2: "Los Red Tags se utilizan de manera ocasional o incorrecta. Existen de 1 a 3 y llevan más de un mes sin cerrarse.",
      3: "Existen Red Tags, pero algunos no están actualizados, atendidos o cerrados. Hay de 4 a 6 y al menos uno no tiene actualización.",
      4: "Los Red Tags se utilizan correctamente, con pocos pendientes de seguimiento. Hay de 4 a 6 y presentan de 2 a 3 semanas sin actualización.",
      5: "El sistema está activo, actualizado y cuenta con seguimiento y cierre documentado. Más de 7 Red Tags con seguimiento activo."
    },
    suggestions: {
      1: ["Iniciar el uso de Red Tags para los artículos cuya utilidad o disposición sea dudosa.", "Definir una fecha de revisión para cada etiqueta."],
      2: ["Regularizar los Red Tags existentes y cerrar los que tengan más de un mes sin atención.", "Recordar al equipo cuándo utilizar una etiqueta roja."],
      3: ["Actualizar el estatus de los Red Tags pendientes y documentar su disposición.", "Programar una revisión semanal hasta cerrar los pendientes."],
      4: ["Dar seguimiento a los pocos Red Tags pendientes y documentar su cierre."],
      5: ["Mantener el seguimiento activo y conservar la evidencia de cierre."]
    }
  },
  {
    id: 3,
    title: "Organización y lugar definido",
    question: "¿Cada artículo tiene un lugar específico y visible?",
    criteria: {
      1: "Los artículos no tienen un lugar asignado. Más de 8 objetos sin ubicación.",
      2: "Algunos artículos tienen lugar asignado, pero no está claramente identificado o no se respeta. De 6 a 8 objetos.",
      3: "La mayoría tiene un lugar, pero existen artículos fuera de ubicación. De 3 a 5 objetos.",
      4: "Casi todos los artículos están en su lugar definido y visible. De 1 a 2 objetos fuera de ubicación.",
      5: "Todos los artículos tienen un lugar definido y visible, y se respeta consistentemente."
    },
    suggestions: {
      1: ["Definir y señalizar una ubicación para cada artículo necesario.", "Separar los artículos por tipo y frecuencia de uso."],
      2: ["Completar la identificación de ubicaciones y reforzar que sean respetadas.", "Reubicar los objetos encontrados fuera de lugar."],
      3: ["Asignar ubicación a los artículos restantes y corregir los objetos fuera de lugar.", "Realizar una verificación al finalizar el turno."],
      4: ["Corregir los uno o dos objetos fuera de ubicación y mantener el estándar."],
      5: ["Mantener las ubicaciones visibles y verificar diariamente que se respeten."]
    }
  },
  {
    id: 4,
    title: "Señalización e identificación",
    question: "¿Existen etiquetas, letreros y líneas de piso?",
    criteria: {
      1: "No existen etiquetas, letreros, delimitaciones o líneas de identificación. Más de 8 áreas no señalizadas.",
      2: "La señalización es parcial, insuficiente o está deteriorada. De 6 a 8 áreas no señalizadas.",
      3: "Existe señalización, pero está incompleta, desactualizada o no cubre toda el área. De 3 a 5 áreas.",
      4: "La señalización es clara, con detalles menores por corregir. De 1 a 2 áreas no señalizadas.",
      5: "La señalización está completa, visible, limpia, legible y actualizada."
    },
    suggestions: {
      1: ["Implementar etiquetas, letreros y delimitaciones en los puntos principales del área.", "Priorizar zonas de riesgo, almacenamiento y flujo de materiales."],
      2: ["Completar o reemplazar la señalización faltante y deteriorada.", "Verificar que las líneas y etiquetas sean visibles y legibles."],
      3: ["Actualizar y completar la señalización de las zonas pendientes.", "Retirar etiquetas obsoletas o duplicadas."],
      4: ["Corregir los detalles menores de señalización para completar el estándar."],
      5: ["Mantener la señalización limpia, visible y actualizada."]
    }
  },
  {
    id: 5,
    title: "Shadow boards / tableros",
    question: "¿Las herramientas tienen su lugar visual marcado?",
    criteria: {
      1: "No existen tableros, espacios delimitados o lugares visuales para las herramientas.",
      2: "Existen lugares visuales, pero están incompletos o no se utilizan. Faltan de 6 a 8 identificaciones.",
      3: "Los lugares visuales se utilizan parcialmente; faltan herramientas, marcas o identificaciones. De 3 a 5 pendientes.",
      4: "Los tableros funcionan correctamente, con uno o dos detalles pendientes.",
      5: "Las herramientas están completas, identificadas, marcadas y colocadas correctamente."
    },
    suggestions: {
      1: ["Crear espacios visuales o shadow boards para las herramientas de uso frecuente.", "Identificar cada posición con nombre o silueta."],
      2: ["Completar las ubicaciones visuales faltantes y asegurar que el personal las utilice.", "Retirar herramientas que no correspondan al área."],
      3: ["Completar las marcas e identificaciones pendientes y colocar las herramientas en su ubicación."],
      4: ["Corregir los últimos detalles del tablero o de las ubicaciones visuales."],
      5: ["Mantener el tablero completo y verificar faltantes al cierre del turno."]
    }
  },
  {
    id: 6,
    title: "Limpieza de área y equipos",
    question: "¿Pisos, mesas y equipos están limpios?",
    criteria: {
      1: "El área está sucia, con residuos o acumulaciones evidentes.",
      2: "La limpieza es deficiente y se observan varios puntos sucios.",
      3: "La limpieza es aceptable, pero existen hallazgos puntuales.",
      4: "El área está limpia y únicamente presenta detalles menores.",
      5: "El área y los equipos están limpios, sin hallazgos visibles."
    },
    suggestions: {
      1: ["Realizar una limpieza profunda inmediata de pisos, mesas y equipos.", "Retirar residuos y dividir el área en zonas de limpieza."],
      2: ["Atender todos los puntos sucios detectados y reforzar la frecuencia de limpieza.", "Registrar la limpieza realizada."],
      3: ["Corregir los hallazgos puntuales y revisar las zonas que suelen omitirse."],
      4: ["Atender los detalles menores para alcanzar una condición sin hallazgos visibles."],
      5: ["Mantener la rutina y validar visualmente el área antes de finalizar el turno."]
    }
  },
  {
    id: 7,
    title: "Fuentes de suciedad controladas",
    question: "¿Se identificaron y eliminaron las fuentes de suciedad?",
    criteria: {
      1: "Las fuentes de suciedad no se identifican ni se controlan.",
      2: "Se identifican algunas fuentes, pero no se realizan acciones. Existen de 6 a 8 fuentes.",
      3: "Existe control parcial, pero continúan presentes varias fuentes. De 3 a 5.",
      4: "Las principales fuentes están controladas, con uno o dos detalles pendientes.",
      5: "Las fuentes de suciedad han sido eliminadas o controladas de manera sostenida."
    },
    suggestions: {
      1: ["Identificar el origen de derrames, residuos, polvo o acumulaciones recurrentes.", "Definir acciones para eliminar o contener cada origen."],
      2: ["Actuar sobre las fuentes ya identificadas.", "Evitar limitarse a limpiar sin corregir el origen."],
      3: ["Completar el control de las fuentes restantes y verificar que no reaparezcan."],
      4: ["Corregir las una o dos fuentes pendientes y confirmar la efectividad del control."],
      5: ["Mantener controles preventivos y revisar que las fuentes no reaparezcan."]
    }
  },
  {
    id: 8,
    title: "Estándares visuales en el área",
    question: "¿Hay fotografías de estándar o LUP visibles?",
    criteria: {
      1: "No existen fotografías, LUP o estándares visibles.",
      2: "Existen algunos estándares, pero están incompletos o no son visibles. Faltan de 6 a 8.",
      3: "Los estándares existen, pero no están actualizados o no cubren toda el área. Faltan de 3 a 5.",
      4: "Los estándares son visibles y útiles, con uno o dos ajustes pendientes.",
      5: "Los estándares están completos, visibles, actualizados y son entendidos por el personal."
    },
    suggestions: {
      1: ["Crear estándares visuales que muestren claramente la condición esperada del área.", "Colocarlos en puntos visibles y cercanos al lugar de aplicación."],
      2: ["Completar los estándares faltantes y reubicar los que no sean visibles."],
      3: ["Actualizar las fotografías o LUP y cubrir los puntos pendientes del área."],
      4: ["Realizar los ajustes menores pendientes y validar que el personal comprenda el estándar."],
      5: ["Mantener los estándares actualizados y reemplazarlos cuando cambie el proceso."]
    }
  },
  {
    id: 9,
    title: "Checklist diario actualizado",
    question: "¿El checklist está firmado y al corriente?",
    criteria: {
      1: "El checklist no existe o no se llena.",
      2: "El checklist se llena ocasionalmente o presenta muchos faltantes. Faltan de 4 a 5 días.",
      3: "El checklist está parcialmente actualizado y contiene omisiones. Faltan de 2 a 3 días.",
      4: "El checklist está actualizado, con un día pendiente.",
      5: "El checklist está completo."
    },
    suggestions: {
      1: ["Implementar o reactivar el checklist diario y comunicar cómo debe llenarse.", "Definir un horario y punto de resguardo."],
      2: ["Completar los días faltantes y reforzar el llenado diario."],
      3: ["Regularizar los dos o tres días omitidos y revisar el checklist al cierre de cada turno."],
      4: ["Completar el día faltante y mantener la revisión diaria."],
      5: ["Mantener el checklist completo, firmado y disponible para consulta."]
    }
  },
  {
    id: 10,
    title: "Disciplina y hábito observado",
    question: "¿El equipo cumple espontáneamente las 5S?",
    criteria: {
      1: "El equipo no cumple las 5S sin supervisión directa.",
      2: "El equipo cumple únicamente cuando recibe una indicación.",
      3: "El equipo cumple parcialmente y requiere recordatorios frecuentes.",
      4: "El equipo cumple de forma general y requiere pocos recordatorios.",
      5: "El equipo cumple espontáneamente y mantiene el estándar como un hábito de trabajo."
    },
    suggestions: {
      1: ["Explicar nuevamente las responsabilidades 5S y realizar acompañamiento diario.", "Definir rutinas simples al inicio y cierre del turno."],
      2: ["Reducir la dependencia de indicaciones mediante recordatorios visibles y rutinas definidas."],
      3: ["Reforzar los puntos donde aún se requieren recordatorios y reconocer el cumplimiento oportuno."],
      4: ["Mantener el seguimiento y trabajar los pocos hábitos que todavía requieren recordatorio."],
      5: ["Reconocer al equipo y conservar las rutinas que sostienen el estándar."]
    }
  }
];


const state = {
  view: "home",
  auditor: localStorage.getItem("mps-5s-auditor") || "",
  audits: [],
  draft: null,
  pendingDraft: null,
  summary: false,
  currentPlan: null,
  selectedAudit: null,
  loading: true,
  authReady: false,
  user: null,
  cloudConfigured: false,
  cloudEnabled: false,
  cloudStatus: "local",
  loginError: ""
};

const app = document.getElementById("app");
let dbPromise;
let cloudAuth = null;
let cloudDb = null;
let unsubscribeAudits = null;

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open("mps-auditoria-5s", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("audits")) db.createObjectStore("audits", { keyPath: "id" });
      if (!db.objectStoreNames.contains("settings")) db.createObjectStore("settings", { keyPath: "key" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

async function idbGetAll(storeName) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const request = tx.objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function idbGet(storeName, key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const request = tx.objectStore(storeName).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function idbPut(storeName, value) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(value);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbDelete(storeName, key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function firebaseConfigReady() {
  const cfg = window.MPS_CONFIG?.FIREBASE || {};
  return Boolean(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId);
}

async function initCloud() {
  state.cloudConfigured = firebaseConfigReady();
  if (!state.cloudConfigured || !window.firebase) {
    state.authReady = true;
    state.cloudStatus = "local";
    return;
  }

  try {
    if (!firebase.apps.length) firebase.initializeApp(window.MPS_CONFIG.FIREBASE);
    cloudAuth = firebase.auth();
    cloudDb = firebase.firestore();
    state.cloudEnabled = true;
    state.cloudStatus = navigator.onLine ? "connecting" : "offline";

    try {
      await cloudDb.enablePersistence({ synchronizeTabs: true });
    } catch (error) {
      if (!['failed-precondition', 'unimplemented'].includes(error.code)) console.warn("Persistencia Firebase:", error);
    }

    await new Promise((resolve) => {
      let first = true;
      cloudAuth.onAuthStateChanged(async (user) => {
        state.user = user || null;
        state.authReady = true;
        state.loginError = "";
        if (unsubscribeAudits) {
          unsubscribeAudits();
          unsubscribeAudits = null;
        }
        if (user) {
          if (!state.auditor) {
            state.auditor = user.email?.split("@")[0]?.replace(/[._-]+/g, " ") || "Auditor";
            localStorage.setItem("mps-5s-auditor", state.auditor);
          }
          startCloudListener();
        } else {
          state.cloudStatus = "signed-out";
        }
        if (first) { first = false; resolve(); }
        render();
      });
    });
  } catch (error) {
    console.error("No fue posible iniciar Firebase", error);
    state.authReady = true;
    state.cloudEnabled = false;
    state.cloudStatus = "error";
  }
}

function preserveLocalPhotos(cloudAudit, localAudit) {
  if (!localAudit) return cloudAudit;
  const localAnswers = new Map((localAudit.answers || []).map((answer) => [answer.questionId, answer]));
  return {
    ...cloudAudit,
    answers: (cloudAudit.answers || []).map((answer) => {
      const local = localAnswers.get(answer.questionId);
      const photos = (answer.photos || []).map((photo) => {
        const match = local?.photos?.find((item) => item.id === photo.id && item.dataUrl);
        return match ? { ...photo, dataUrl: match.dataUrl } : photo;
      });
      return { ...answer, photos };
    })
  };
}

function startCloudListener() {
  if (!cloudDb || !state.user) return;
  state.cloudStatus = navigator.onLine ? "connecting" : "offline";
  unsubscribeAudits = cloudDb.collection("audits").orderBy("completedAt", "desc").onSnapshot(
    { includeMetadataChanges: true },
    (snapshot) => {
      const existing = new Map(state.audits.map((audit) => [audit.id, audit]));
      const cloudAudits = snapshot.docs.map((doc) => {
        const data = doc.data();
        const normalized = {
          id: doc.id,
          ...data,
          syncedAt: data.syncedAt?.toDate ? data.syncedAt.toDate().toISOString() : (data.syncedAt || null),
          syncStatus: doc.metadata.hasPendingWrites ? "pending" : "synced"
        };
        return preserveLocalPhotos(normalized, existing.get(doc.id));
      });
      const cloudIds = new Set(cloudAudits.map((audit) => audit.id));
      const onlyLocal = state.audits.filter((audit) => !cloudIds.has(audit.id) && audit.syncStatus !== "synced");
      state.audits = [...cloudAudits, ...onlyLocal].sort((a, b) => new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt));
      state.cloudStatus = !navigator.onLine ? "offline" : snapshot.metadata.fromCache ? "cached" : "synced";
      render();
    },
    (error) => {
      console.error("Sincronización Firestore", error);
      state.cloudStatus = "error";
      render();
    }
  );
  syncPendingAudits().catch(console.error);
}

function emptyAnswers() {
  return QUESTIONS.map((question) => ({ questionId: question.id, score: null, observation: "", photos: [] }));
}

function calculateResult(answers) {
  const valid = answers.filter((item) => item.score);
  if (!valid.length) return 0;
  return Math.round(valid.reduce((sum, item) => sum + Number(item.score), 0) / (valid.length * 5) * 100);
}

function resultLevel(result) {
  if (result >= 80) return { label: "Meta alcanzada", tone: "good" };
  if (result >= 60) return { label: "Requiere mejora", tone: "warn" };
  return { label: "Atención prioritaria", tone: "bad" };
}

function buildPlan(answers, aiSuggestions = []) {
  const aiMap = new Map(aiSuggestions.map((item) => [Number(item.questionId), item]));
  return answers.filter((answer) => answer.score).map((answer) => {
    const question = QUESTIONS.find((item) => item.id === answer.questionId);
    const score = Number(answer.score);
    const ai = aiMap.get(answer.questionId);
    const actions = [...(ai?.suggestions || []), ...(question.suggestions[score] || [])];
    return {
      questionId: answer.questionId,
      title: question.title,
      score,
      priority: score <= 2 ? "Alta" : score === 3 ? "Media" : score === 4 ? "Baja" : "Mantener",
      finding: ai?.finding || answer.observation || (score < 5 ? `Se obtuvo ${score} de 5 en este criterio.` : "El estándar se cumple actualmente."),
      actions: [...new Set(actions)].slice(0, 4),
      target: score < 5 ? `Subir de ${score} a ${Math.min(5, score + 1)} en la siguiente revisión.` : "Conservar la calificación de 5.",
      possibleGain: score < 5 ? 2 : 0,
      evidenceCount: answer.photos?.length || 0,
      source: ai ? "IA + criterios" : "Criterios de evaluación"
    };
  }).sort((a, b) => a.score - b.score || a.questionId - b.questionId);
}

function cloudLabel() {
  const labels = {
    synced: ["☁", "Sincronizado"],
    connecting: ["◌", "Conectando"],
    cached: ["☁", "Datos en caché"],
    offline: ["↻", "Sin conexión"],
    error: ["!", "Error de nube"],
    local: ["⌂", "Modo local"],
    "signed-out": ["○", "Sin sesión"]
  };
  return labels[state.cloudStatus] || labels.local;
}

function header(title, subtitle = "", back = false) {
  const [icon, label] = cloudLabel();
  return `<header class="topbar"><div class="topbar-inner ${back ? "has-back" : "has-brand"}">
    ${back ? `<button class="icon-button" data-action="back" aria-label="Regresar">←</button>` : `<div class="brand-mark"><img src="./logo-mps-header.png" alt="Metal Plating y Servicios"></div>`}
    <div class="topbar-copy"><strong>${escapeHtml(title)}</strong>${subtitle ? `<span>${escapeHtml(subtitle)}</span>` : ""}</div>
    ${state.user ? `<button class="topbar-action cloud-action" data-action="logout" title="${escapeHtml(label)} · Cerrar sesión"><b>${icon}</b></button>` : `<div class="topbar-action" title="${escapeHtml(label)}">${icon}</div>`}
  </div></header>`;
}

function bottomNav() {
  return `<nav class="bottom-nav">
    <button data-view="home" class="${state.view === "home" ? "active" : ""}"><b>✓</b><span>Auditar</span></button>
    <button data-view="history" class="${state.view === "history" ? "active" : ""}"><b>◷</b><span>Historial</span></button>
    <button data-view="dashboard" class="${state.view === "dashboard" ? "active" : ""}"><b>▥</b><span>Resultados</span></button>
  </nav>`;
}

function renderLogin() {
  app.innerHTML = `<main class="login-page">
    <section class="login-card">
      <img class="login-logo" src="./logo-mps-full.png" alt="Metal Plating y Servicios">
      <p class="eyebrow">Acceso interno</p>
      <h1>Auditoría 5S MPS</h1>
      <p>Ingresa con una cuenta autorizada para registrar auditorías y consultar los resultados desde cualquier dispositivo.</p>
      <form id="loginForm" class="login-form">
        <label class="field-label" for="loginEmail">Correo</label>
        <input id="loginEmail" class="text-input" type="email" autocomplete="username" required placeholder="usuario@metalplating.mx">
        <label class="field-label" for="loginPassword">Contraseña</label>
        <input id="loginPassword" class="text-input" type="password" autocomplete="current-password" required placeholder="Contraseña">
        <button class="primary-button" type="submit">Entrar</button>
      </form>
      ${state.loginError ? `<div class="error-message">${escapeHtml(state.loginError)}</div>` : ""}
      <p class="login-note">Las cuentas se crean en Firebase; la app no permite registro público.</p>
    </section>
  </main>`;
  document.getElementById("loginForm").addEventListener("submit", handleLogin);
}

function renderHome() {
  const cards = AREAS.map((area) => {
    const latest = state.audits.find((audit) => audit.area.id === area.id);
    return `<button class="area-card" data-area="${area.id}" ${state.auditor.trim() ? "" : "disabled"}>
      <div class="area-icon">${area.icon}</div><strong>${escapeHtml(area.short)}</strong>
      <span>${latest ? `Último resultado: ${latest.result}%` : "Sin auditorías"}</span><i>›</i>
    </button>`;
  }).join("");
  const [cloudIcon, cloudText] = cloudLabel();

  app.innerHTML = `${header("Auditoría 5S MPS", "Recorrido semanal con criterios claros")}
    <main class="page page-with-nav">
      <section class="welcome-card"><div class="welcome-icon">✦</div><div><p class="eyebrow">Bienvenido</p><h1>Comencemos el recorrido</h1><p>Selecciona el área. La app te guiará pregunta por pregunta y al final preparará la retroalimentación.</p></div></section>
      <section class="sync-card ${state.cloudStatus}"><b>${cloudIcon}</b><div><strong>${escapeHtml(cloudText)}</strong><span>${state.cloudEnabled ? `Sesión: ${escapeHtml(state.user?.email || "cuenta autorizada")}` : "Configura Firebase para compartir resultados entre dispositivos."}</span></div></section>
      <label class="field-label" for="auditor">Nombre del auditor</label>
      <input id="auditor" class="text-input" value="${escapeHtml(state.auditor)}" placeholder="Ej. Nombre de la auditora">
      ${state.pendingDraft ? `<button class="resume-card" data-action="resume"><div><strong>Continuar auditoría pendiente</strong><span>${escapeHtml(state.pendingDraft.value.area.full)} · Pregunta ${state.pendingDraft.value.index + 1} de 10</span></div><b>›</b></button>` : ""}
      <div class="section-heading"><div><p class="eyebrow">11 áreas configuradas</p><h2>¿Qué área vas a auditar?</h2></div></div>
      <div class="area-grid">${cards}</div>
      ${state.auditor.trim() ? "" : `<p class="helper-message">Escribe el nombre del auditor para habilitar las áreas.</p>`}
    </main>${bottomNav()}`;

  document.getElementById("auditor").addEventListener("input", (event) => {
    state.auditor = event.target.value;
    localStorage.setItem("mps-5s-auditor", state.auditor);
    document.querySelectorAll("[data-area]").forEach((button) => button.disabled = !state.auditor.trim());
  });
}

function renderWizard() {
  const draft = state.draft;
  const question = QUESTIONS[draft.index];
  const answer = draft.answers[draft.index];
  const progress = Math.round((draft.index + 1) / QUESTIONS.length * 100);
  const criteria = [1,2,3,4,5].map((score) => `<button class="criterion-row ${Number(answer.score) === score ? "selected" : ""}" data-score="${score}">
    <span class="score-badge">${score}</span><span>${escapeHtml(question.criteria[score])}</span>${Number(answer.score) === score ? `<b>✓</b>` : `<b></b>`}
  </button>`).join("");
  const photos = (answer.photos || []).map((photo) => `<div class="photo-thumb"><img src="${photo.dataUrl}" alt="Evidencia"><button data-remove-photo="${photo.id}" aria-label="Eliminar foto">×</button></div>`).join("");

  app.innerHTML = `${header("Auditoría en proceso", draft.area.short, true)}
    <main class="page audit-page">
      <div class="progress-meta"><span>Pregunta ${draft.index + 1} de ${QUESTIONS.length}</span><strong>${progress}%</strong></div><div class="progress-track"><div style="width:${progress}%"></div></div>
      <section class="question-card"><p class="question-number">Criterio ${question.id}</p><h1>${escapeHtml(question.title)}</h1><p class="question-text">${escapeHtml(question.question)}</p></section>
      <section class="criteria-card"><div class="section-heading compact"><div><p class="eyebrow">Guía de evaluación</p><h2>Selecciona lo que observas</h2></div></div><div class="criteria-list">${criteria}</div></section>
      <section class="input-card">
        <label class="field-label" for="observation">¿Qué observaste?</label>
        <textarea id="observation" maxlength="500" placeholder="Describe brevemente el hallazgo o lo que está funcionando bien…">${escapeHtml(answer.observation)}</textarea>
        <div class="char-count"><span id="charCount">${answer.observation.length}</span>/500</div>
        <div class="photo-heading"><div><strong>Evidencia fotográfica</strong><span>Hasta 2 fotos por pregunta</span></div><span>${answer.photos.length}/2</span></div>
        <div class="photo-grid">${photos}${answer.photos.length < 2 ? `<button class="add-photo" data-action="add-photo"><b>＋</b><span>Tomar o elegir foto</span></button>` : ""}</div>
        <input id="photoInput" class="hidden-input" type="file" accept="image/*" capture="environment" multiple>
      </section>
      <div class="sticky-actions"><button class="secondary-button" data-action="save-exit">Guardar y salir</button><button class="primary-button" data-action="next" ${answer.score ? "" : "disabled"}>${draft.index === QUESTIONS.length - 1 ? "Ver resultado" : "Siguiente"}<b>›</b></button></div>
    </main>`;

  const observation = document.getElementById("observation");
  observation.addEventListener("input", async (event) => {
    answer.observation = event.target.value;
    document.getElementById("charCount").textContent = answer.observation.length;
    await saveCurrentDraft();
  });
  document.getElementById("photoInput").addEventListener("change", (event) => addPhotos(event.target.files));
}

function renderSummary() {
  const result = calculateResult(state.draft.answers);
  const level = resultLevel(result);
  const estimated = Math.min(100, result + state.currentPlan.filter((item) => item.score < 5).length * 2);
  const opportunities = state.currentPlan.filter((item) => item.score < 5);
  const cards = state.currentPlan.map((item) => `<article class="plan-card priority-${item.priority.toLowerCase()}">
    <div class="plan-card-top"><div><span class="question-chip">Pregunta ${item.questionId}</span><h3>${escapeHtml(item.title)}</h3></div><div class="mini-score">${item.score}/5</div></div>
    <p class="finding"><strong>Lo observado:</strong> ${escapeHtml(item.finding)}</p>
    <div class="target-row"><span>Objetivo sugerido</span><strong>${escapeHtml(item.target)}</strong></div>
    <div class="recommendation-box"><strong>${item.score < 5 ? "Para mejorar:" : "Para conservar el resultado:"}</strong><ul>${item.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ul></div>
    <div class="plan-meta"><span>Prioridad: ${item.priority}</span><span>${item.evidenceCount} evidencia(s)</span><span>${item.source}</span></div>
  </article>`).join("");

  app.innerHTML = `${header("Resultado y plan de mejora", state.draft.area.short, true)}
    <main class="page summary-page">
      <section class="result-card ${level.tone}"><div class="result-ring" style="--score:${result * 3.6}deg"><div><strong>${result}%</strong><span>Resultado</span></div></div><div><p class="eyebrow">Auditoría terminada</p><h1>${level.label}</h1><p>Meta semanal: 80%. La retroalimentación muestra qué puede mejorar el área en la siguiente revisión.</p></div></section>
      <section class="projection-card"><b>💡</b><div><strong>Proyección orientativa</strong><p>Si cada criterio con oportunidad sube un nivel, el resultado podría acercarse a <b>${estimated}%</b>.</p></div></section>
      <button class="ai-button" data-action="analyze-ai"><b>✦</b><span>Analizar fotos y mejorar recomendaciones</span></button>
      <div id="aiMessage"></div>
      <div class="section-heading"><div><p class="eyebrow">Retroalimentación automática</p><h2>Plan de mejora 5S</h2></div><span class="count-pill">${opportunities.length} oportunidades</span></div>
      <div class="plan-list">${cards}</div>
      <div class="sticky-actions"><button class="secondary-button" data-action="review">Revisar respuestas</button><button class="primary-button" data-action="save-audit">Guardar y sincronizar<b>✓</b></button></div>
    </main>`;
}

function renderHistory() {
  const rows = state.audits.map((audit) => {
    const level = resultLevel(audit.result);
    const sync = audit.syncStatus === "pending" ? " · Pendiente de nube" : audit.syncStatus === "local" ? " · Solo local" : "";
    return `<button class="audit-list-card" data-audit="${audit.id}"><div class="audit-list-icon">▥</div><div><strong>${escapeHtml(audit.area.short)}</strong><span>${formatDate(audit.completedAt || audit.createdAt)} · ${escapeHtml(audit.auditor)}</span><small>${audit.plan.filter((item) => item.score < 5).length} recomendaciones${sync}</small></div><div class="audit-result ${level.tone}"><strong>${audit.result}%</strong><b>›</b></div></button>`;
  }).join("");
  app.innerHTML = `${header("Historial 5S", "Información compartida entre dispositivos")}<main class="page page-with-nav"><div class="history-actions"><div><p class="eyebrow">Consulta y seguimiento</p><h1>Resultados por área</h1></div><button class="export-button" data-action="export" ${state.audits.length ? "" : "disabled"}>▣ Excel</button></div>
    ${state.audits.length ? `<div class="audit-list">${rows}</div>` : `<section class="empty-state"><b>◷</b><h2>Aún no hay auditorías</h2><p>Cuando se complete la primera, aquí aparecerán el resultado, las evidencias y el plan de mejora.</p></section>`}</main>${bottomNav()}`;
}

function renderDetail() {
  const audit = state.selectedAudit;
  const cards = audit.plan.map((item) => `<article class="plan-card"><div class="plan-card-top"><div><span class="question-chip">Pregunta ${item.questionId}</span><h3>${escapeHtml(item.title)}</h3></div><div class="mini-score">${item.score}/5</div></div><p class="finding">${escapeHtml(item.finding)}</p><ul>${item.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ul></article>`).join("");
  const evidenceAnswers = (audit.answers || []).filter((answer) => answer.photos?.length);
  const evidence = evidenceAnswers.map((answer) => {
    const q = QUESTIONS.find((item) => item.id === answer.questionId);
    const photos = answer.photos.map((photo) => photo.dataUrl ? `<img src="${photo.dataUrl}" alt="Evidencia de ${escapeHtml(q.title)}">` : `<div class="evidence-placeholder">Cargando evidencia…</div>`).join("");
    return `<article class="evidence-card"><div><span class="question-chip">Pregunta ${q.id}</span><h3>${escapeHtml(q.title)}</h3><p>${escapeHtml(answer.observation || "Sin observación escrita")}</p></div><div class="evidence-grid">${photos}</div></article>`;
  }).join("");
  app.innerHTML = `${header("Detalle de auditoría", audit.area.short, true)}<main class="page detail-page"><section class="detail-header"><div><p class="eyebrow">Resultado semanal</p><h1>${audit.result}%</h1><p>${escapeHtml(audit.area.full)}</p></div><div class="detail-meta"><span>Auditor</span><strong>${escapeHtml(audit.auditor)}</strong><span>Fecha</span><strong>${formatDate(audit.completedAt || audit.createdAt)}</strong></div></section>
    ${evidenceAnswers.length ? `<div class="section-heading"><div><p class="eyebrow">Evidencia</p><h2>Fotografías registradas</h2></div></div><div class="evidence-list">${evidence}</div>` : ""}
    <div class="section-heading"><div><p class="eyebrow">Retroalimentación</p><h2>Recomendaciones registradas</h2></div></div><div class="plan-list">${cards}</div></main>`;
}

function renderDashboard() {
  const globalAverage = state.audits.length ? Math.round(state.audits.reduce((sum, item) => sum + item.result, 0) / state.audits.length) : 0;
  const rows = AREAS.map((area) => {
    const areaAudits = state.audits.filter((audit) => audit.area.id === area.id);
    const latest = areaAudits[0];
    const average = areaAudits.length ? Math.round(areaAudits.reduce((sum, item) => sum + item.result, 0) / areaAudits.length) : null;
    return `<div class="dashboard-row"><div><strong>${escapeHtml(area.short)}</strong><span>${latest ? `Último: ${latest.result}% · Promedio: ${average}%` : "Sin datos"}</span></div><div class="dashboard-bar"><div style="width:${latest?.result || 0}%"></div></div><strong class="dashboard-value">${latest ? `${latest.result}%` : "—"}</strong></div>`;
  }).join("");
  app.innerHTML = `${header("Resultados 5S", "Vista general de las áreas")}<main class="page page-with-nav"><section class="dashboard-hero"><div><p class="eyebrow">Promedio registrado</p><h1>${globalAverage}%</h1><p>${state.audits.length ? `${state.audits.length} auditorías consideradas` : "Completa auditorías para comenzar a medir"}</p></div><b>▥</b></section><div class="section-heading"><div><p class="eyebrow">Desempeño</p><h2>Último resultado por área</h2></div></div><div class="dashboard-list">${rows}</div></main>${bottomNav()}`;
}

function render() {
  if (state.loading || !state.authReady) return;
  if (state.cloudConfigured && !state.user) return renderLogin();
  if (state.selectedAudit) return renderDetail();
  if (state.draft && state.summary) return renderSummary();
  if (state.draft) return renderWizard();
  if (state.view === "history") return renderHistory();
  if (state.view === "dashboard") return renderDashboard();
  return renderHome();
}

async function handleLogin(event) {
  event.preventDefault();
  state.loginError = "";
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const button = event.submitter || event.currentTarget.querySelector("button[type='submit']");
  if (button) { button.disabled = true; button.textContent = "Ingresando…"; }
  try {
    await cloudAuth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error(error);
    state.loginError = "No fue posible iniciar sesión. Revisa el correo, la contraseña y que la cuenta esté habilitada.";
    renderLogin();
  }
}

async function saveCurrentDraft() {
  if (state.draft) await idbPut("settings", { key: "draft", value: state.draft });
}

async function startAudit(areaId) {
  const area = AREAS.find((item) => item.id === areaId);
  state.draft = { id: uid(), area, auditor: state.auditor.trim(), createdAt: new Date().toISOString(), index: 0, answers: emptyAnswers() };
  state.currentPlan = null;
  state.summary = false;
  await saveCurrentDraft();
  render();
}

async function fileToImage(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

async function resizeImage(file) {
  const image = await fileToImage(file);
  const maxSize = 640;
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  let quality = 0.52;
  let output = canvas.toDataURL("image/jpeg", quality);
  while (output.length > 700000 && quality > 0.24) {
    quality -= 0.07;
    output = canvas.toDataURL("image/jpeg", quality);
  }
  if (output.length > 900000) throw new Error("La fotografía continúa siendo demasiado pesada. Intenta tomarla nuevamente.");
  return output;
}

async function addPhotos(fileList) {
  const answer = state.draft.answers[state.draft.index];
  const remaining = Math.max(0, 2 - answer.photos.length);
  const files = Array.from(fileList || []).slice(0, remaining);
  if (!files.length) return;
  app.classList.add("busy");
  try {
    for (const file of files) answer.photos.push({ id: uid(), name: file.name || "evidencia.jpg", dataUrl: await resizeImage(file), createdAt: new Date().toISOString() });
    await saveCurrentDraft();
  } catch (error) {
    alert(`No fue posible procesar la fotografía: ${error.message}`);
  } finally {
    app.classList.remove("busy");
    render();
  }
}

async function analyzeWithAI() {
  const message = document.getElementById("aiMessage");
  const endpoint = window.MPS_CONFIG?.AI_ENDPOINT?.trim();
  if (!endpoint) {
    message.innerHTML = `<div class="info-message">El plan ya se generó con las calificaciones, criterios y observaciones. El análisis visual se activará al conectar una función segura de inteligencia artificial.</div>`;
    return;
  }
  const button = document.querySelector('[data-action="analyze-ai"]');
  button.disabled = true;
  button.innerHTML = `<span class="loader light"></span><span>Analizando evidencias…</span>`;
  try {
    const answers = state.draft.answers.filter((answer) => answer.photos.length || answer.observation).map((answer) => {
      const q = QUESTIONS.find((item) => item.id === answer.questionId);
      return { questionId: q.id, title: q.title, question: q.question, score: answer.score, selectedCriterion: q.criteria[answer.score], observation: answer.observation, images: answer.photos.map((photo) => photo.dataUrl) };
    });
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ area: state.draft.area, answers }) });
    if (!response.ok) throw new Error(`respuesta ${response.status}`);
    const data = await response.json();
    state.currentPlan = buildPlan(state.draft.answers, Array.isArray(data.suggestions) ? data.suggestions : []);
    render();
    document.getElementById("aiMessage").innerHTML = `<div class="success-message">Las fotografías fueron analizadas y el plan de mejora se actualizó.</div>`;
  } catch (error) {
    message.innerHTML = `<div class="error-message">No fue posible analizar las imágenes: ${escapeHtml(error.message)}.</div>`;
    button.disabled = false;
    button.innerHTML = `<b>✦</b><span>Analizar fotos y mejorar recomendaciones</span>`;
  }
}

function auditForCloud(audit) {
  return {
    ...audit,
    answers: audit.answers.map((answer) => ({
      ...answer,
      photos: (answer.photos || []).map(({ id, name, createdAt }) => ({ id, name, createdAt }))
    })),
    createdBy: state.user.uid,
    createdByEmail: state.user.email || "",
    syncedAt: firebase.firestore.FieldValue.serverTimestamp()
  };
}

function withTimeout(promise, milliseconds, message = "Tiempo de espera agotado") {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), milliseconds);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

async function syncPendingAudits() {
  if (!cloudDb || !state.user || !navigator.onLine) return;
  const pending = state.audits.filter((audit) => audit.syncStatus === "pending");
  for (const audit of pending) {
    try {
      await withTimeout(saveAuditToCloud(audit), 15000, "No se confirmó la conexión con Firebase");
      audit.syncStatus = "synced";
      await idbPut("audits", audit);
    } catch (error) {
      console.warn(`Auditoría ${audit.id} pendiente de sincronización`, error);
      state.cloudStatus = "offline";
      break;
    }
  }
}

async function saveAuditToCloud(audit) {
  if (!cloudDb || !state.user) return false;
  const batch = cloudDb.batch();
  const auditRef = cloudDb.collection("audits").doc(audit.id);
  batch.set(auditRef, auditForCloud(audit), { merge: true });
  for (const answer of audit.answers) {
    for (const photo of answer.photos || []) {
      const photoRef = auditRef.collection("photos").doc(photo.id);
      batch.set(photoRef, {
        id: photo.id,
        questionId: answer.questionId,
        name: photo.name || "evidencia.jpg",
        createdAt: photo.createdAt || new Date().toISOString(),
        dataUrl: photo.dataUrl,
        createdBy: state.user.uid
      }, { merge: true });
    }
  }
  await batch.commit();
  return true;
}

async function saveAudit() {
  const result = calculateResult(state.draft.answers);
  const audit = { ...state.draft, result, plan: state.currentPlan || buildPlan(state.draft.answers), completedAt: new Date().toISOString(), syncStatus: state.cloudEnabled ? "pending" : "local" };
  delete audit.index;
  await idbPut("audits", audit);
  await idbDelete("settings", "draft");
  state.audits = [audit, ...state.audits.filter((item) => item.id !== audit.id)];

  if (state.cloudEnabled && state.user) {
    state.cloudStatus = navigator.onLine ? "connecting" : "offline";
    if (navigator.onLine) {
      try {
        await withTimeout(saveAuditToCloud(audit), 15000, "No se confirmó la conexión con Firebase");
        audit.syncStatus = "synced";
        await idbPut("audits", audit);
        state.cloudStatus = "synced";
      } catch (error) {
        console.error("Guardado en nube", error);
        audit.syncStatus = "pending";
        await idbPut("audits", audit);
        alert("La auditoría quedó guardada en este dispositivo, pero no se confirmó la sincronización. Se volverá a intentar al recuperar conexión.");
      }
    } else {
      audit.syncStatus = "pending";
      await idbPut("audits", audit);
    }
  }

  state.selectedAudit = audit;
  state.draft = null;
  state.summary = false;
  state.currentPlan = null;
  state.view = "history";
  state.pendingDraft = null;
  render();
}

async function loadCloudPhotos(audit) {
  if (!cloudDb || !state.user) return audit;
  const missing = (audit.answers || []).some((answer) => (answer.photos || []).some((photo) => !photo.dataUrl));
  if (!missing) return audit;
  try {
    const snapshot = await cloudDb.collection("audits").doc(audit.id).collection("photos").get();
    const photos = snapshot.docs.map((doc) => doc.data());
    const hydrated = {
      ...audit,
      answers: audit.answers.map((answer) => ({
        ...answer,
        photos: (answer.photos || []).map((photo) => ({ ...photo, ...photos.find((item) => item.id === photo.id) }))
      }))
    };
    await idbPut("audits", hydrated);
    state.audits = state.audits.map((item) => item.id === hydrated.id ? hydrated : item);
    return hydrated;
  } catch (error) {
    console.error("Carga de evidencias", error);
    return audit;
  }
}

async function selectAudit(id) {
  const audit = state.audits.find((item) => item.id === id);
  if (!audit) return;
  state.selectedAudit = audit;
  render();
  state.selectedAudit = await loadCloudPhotos(audit);
  render();
}

function formatDate(value) {
  if (!value) return "Fecha no disponible";
  const date = value?.toDate ? value.toDate() : new Date(value);
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) { let crc = 0xffffffff; for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8); return (crc ^ 0xffffffff) >>> 0; }
function u16(value) { return [value & 255, (value >>> 8) & 255]; }
function u32(value) { return [value & 255, (value >>> 8) & 255, (value >>> 16) & 255, (value >>> 24) & 255]; }
function bytesFrom(text) { return new TextEncoder().encode(text); }

function makeZip(files) {
  const chunks = []; const central = []; let offset = 0;
  for (const file of files) {
    const name = bytesFrom(file.name); const data = bytesFrom(file.content); const crc = crc32(data);
    const local = new Uint8Array([80,75,3,4,20,0,0,0,0,0,0,0,0,0,...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),0,0]);
    chunks.push(local, name, data);
    const centralHeader = new Uint8Array([80,75,1,2,20,0,20,0,0,0,0,0,0,0,0,0,...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),0,0,0,0,0,0,0,0,0,0,0,0,...u32(offset)]);
    central.push(centralHeader, name);
    offset += local.length + name.length + data.length;
  }
  const centralSize = central.reduce((sum, chunk) => sum + chunk.length, 0);
  const end = new Uint8Array([80,75,5,6,0,0,0,0,...u16(files.length),...u16(files.length),...u32(centralSize),...u32(offset),0,0]);
  return new Blob([...chunks, ...central, end], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

function xmlEscape(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }
function columnName(index) { let name = ""; let n = index + 1; while (n) { const r = (n - 1) % 26; name = String.fromCharCode(65 + r) + name; n = Math.floor((n - 1) / 26); } return name; }

function sheetXml(rows) {
  const all = rows.length ? rows : [{ Mensaje: "Sin datos" }];
  const headers = Object.keys(all[0]);
  const rowXml = [`<row r="1">${headers.map((h, i) => `<c r="${columnName(i)}1" t="inlineStr" s="1"><is><t>${xmlEscape(h)}</t></is></c>`).join("")}</row>`];
  all.forEach((row, rIndex) => {
    const r = rIndex + 2;
    rowXml.push(`<row r="${r}">${headers.map((h, cIndex) => {
      const value = row[h]; const ref = `${columnName(cIndex)}${r}`;
      return typeof value === "number" ? `<c r="${ref}"><v>${value}</v></c>` : `<c r="${ref}" t="inlineStr"><is><t>${xmlEscape(value)}</t></is></c>`;
    }).join("")}</row>`);
  });
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rowXml.join("")}</sheetData></worksheet>`;
}

function exportExcel() {
  const summary = state.audits.map((audit) => ({ Folio: audit.id, Fecha: formatDate(audit.completedAt || audit.createdAt), Área: audit.area.full, Auditor: audit.auditor, Resultado: audit.result / 100, Meta: 0.8, Estado: audit.result >= 80 ? "Meta alcanzada" : "Requiere mejora", Recomendaciones: audit.plan.filter((item) => item.score < 5).length }));
  const detail = state.audits.flatMap((audit) => audit.answers.map((answer) => {
    const q = QUESTIONS.find((item) => item.id === answer.questionId);
    return { Folio: audit.id, Fecha: formatDate(audit.completedAt || audit.createdAt), Área: audit.area.full, Pregunta: `${q.id}. ${q.title}`, "Pregunta de auditoría": q.question, Calificación: Number(answer.score), "Criterio aplicado": q.criteria[answer.score], Observación: answer.observation || "", Evidencias: answer.photos.length };
  }));
  const plans = state.audits.flatMap((audit) => audit.plan.flatMap((item) => item.actions.map((action, index) => ({ Folio: audit.id, Fecha: formatDate(audit.completedAt || audit.createdAt), Área: audit.area.full, Pregunta: `${item.questionId}. ${item.title}`, Calificación: item.score, Prioridad: item.priority, Hallazgo: item.finding, "Recomendación No.": index + 1, "Recomendación de mejora": action, Objetivo: item.target, Fuente: item.source }))));
  const sheets = [{ name: "Resumen semanal", rows: summary }, { name: "Detalle auditoría", rows: detail }, { name: "Plan de mejora 5S", rows: plans }];
  const files = [
    { name: "[Content_Types].xml", content: `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>` },
    { name: "_rels/.rels", content: `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
    { name: "xl/workbook.xml", content: `<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((sheet, i) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join("")}</sheets></workbook>` },
    { name: "xl/_rels/workbook.xml.rels", content: `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
    { name: "xl/styles.xml", content: `<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0B356D"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs></styleSheet>` }
  ];
  sheets.forEach((sheet, i) => files.push({ name: `xl/worksheets/sheet${i+1}.xml`, content: sheetXml(sheet.rows) }));
  const blob = makeZip(files);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Auditorias_5S_MPS_${new Date().toISOString().slice(0,10)}.xlsx`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

app.addEventListener("click", async (event) => {
  const areaButton = event.target.closest("[data-area]");
  if (areaButton) return startAudit(areaButton.dataset.area);
  const scoreButton = event.target.closest("[data-score]");
  if (scoreButton) {
    state.draft.answers[state.draft.index].score = Number(scoreButton.dataset.score);
    await saveCurrentDraft(); render(); return;
  }
  const removePhoto = event.target.closest("[data-remove-photo]");
  if (removePhoto) {
    const answer = state.draft.answers[state.draft.index];
    answer.photos = answer.photos.filter((photo) => photo.id !== removePhoto.dataset.removePhoto);
    await saveCurrentDraft(); render(); return;
  }
  const auditButton = event.target.closest("[data-audit]");
  if (auditButton) return selectAudit(auditButton.dataset.audit);
  const nav = event.target.closest("[data-view]");
  if (nav) { state.view = nav.dataset.view; state.selectedAudit = null; render(); return; }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "logout") { if (cloudAuth) await cloudAuth.signOut(); return; }
  if (action === "add-photo") return document.getElementById("photoInput").click();
  if (action === "next") {
    const answer = state.draft.answers[state.draft.index];
    if (!answer.score) return;
    if (state.draft.index === QUESTIONS.length - 1) { state.summary = true; state.currentPlan = buildPlan(state.draft.answers); }
    else state.draft.index += 1;
    await saveCurrentDraft(); render(); return;
  }
  if (action === "save-exit") { await saveCurrentDraft(); state.pendingDraft = { key: "draft", value: state.draft }; state.draft = null; state.view = "home"; render(); return; }
  if (action === "resume") { state.draft = state.pendingDraft.value; state.summary = false; state.currentPlan = null; render(); return; }
  if (action === "review") { state.summary = false; state.draft.index = QUESTIONS.length - 1; render(); return; }
  if (action === "save-audit") return saveAudit();
  if (action === "analyze-ai") return analyzeWithAI();
  if (action === "export") return exportExcel();
  if (action === "back") {
    if (state.selectedAudit) state.selectedAudit = null;
    else if (state.summary) state.summary = false;
    else if (state.draft && state.draft.index > 0) state.draft.index -= 1;
    else if (state.draft) { await saveCurrentDraft(); state.pendingDraft = { key: "draft", value: state.draft }; state.draft = null; }
    render();
  }
});

window.addEventListener("online", () => {
  if (state.cloudEnabled && state.user) {
    state.cloudStatus = "connecting";
    syncPendingAudits().catch(console.error);
  }
  render();
});
window.addEventListener("offline", () => { if (state.cloudEnabled) state.cloudStatus = "offline"; render(); });

async function init() {
  try {
    const audits = await idbGetAll("audits");
    state.audits = audits.sort((a, b) => new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt));
    state.pendingDraft = await idbGet("settings", "draft");
  } catch (error) {
    console.error(error);
    alert("No fue posible abrir el almacenamiento local de la aplicación.");
  }
  await initCloud();
  state.loading = false;
  state.authReady = true;
  render();
  if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("./sw.js").catch(console.error);
}

init();
