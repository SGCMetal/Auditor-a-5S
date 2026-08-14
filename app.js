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


const MAX_PHOTOS_PER_QUESTION = 5;
const MAX_GENERAL_PHOTOS = 5;
const MAX_IMPROVEMENT_PHOTOS = 3;
const PUBLIC_PARAMS = new URLSearchParams(window.location.search);
const PUBLIC_TOKEN = PUBLIC_PARAMS.get("evidencia") || "";
const PUBLIC_DIRECTORY = PUBLIC_PARAMS.get("resultados") === "1";

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
  authError: "",
  aiStatus: "idle",
  aiMessage: "",
  publishStatus: "",
  publicMode: Boolean(PUBLIC_TOKEN) || PUBLIC_DIRECTORY,
  publicDirectory: PUBLIC_DIRECTORY,
  publicToken: PUBLIC_TOKEN,
  publicAreas: {},
  publicData: null,
  publicPhotos: [],
  publicPreviousData: null,
  publicPreviousPhotos: [],
  publicLoading: Boolean(PUBLIC_TOKEN) || PUBLIC_DIRECTORY,
  publicError: "",
  improvementOpen: false,
  improvementComment: "",
  improvementPhotos: [],
  improvementStatus: "",
  tourMode: false,
  tourAudit: null,
  tourIndex: 0,
  tourPhotoIndex: 0,
  tourLoading: false
};

const app = document.getElementById("app");
let dbPromise;
let cloudAuth = null;
let cloudDb = null;
let unsubscribeAudits = null;

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function publicUid() {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(36).padStart(2, "0")).join("");
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
    const request = indexedDB.open("mps-auditoria-5s", 2);
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

function initializeFirebase() {
  state.cloudConfigured = firebaseConfigReady();
  if (!state.cloudConfigured || !window.firebase) return false;
  if (!firebase.apps.length) firebase.initializeApp(window.MPS_CONFIG.FIREBASE);
  cloudAuth = firebase.auth();
  cloudDb = firebase.firestore();
  return true;
}

async function initCloud() {
  if (!initializeFirebase()) {
    state.authReady = true;
    state.cloudStatus = "local";
    return;
  }

  try {
    state.cloudEnabled = true;
    state.cloudStatus = navigator.onLine ? "connecting" : "offline";
    await cloudAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    try {
      await cloudDb.enablePersistence({ synchronizeTabs: true });
    } catch (error) {
      if (!["failed-precondition", "unimplemented"].includes(error.code)) console.warn("Persistencia Firebase:", error);
    }

    await new Promise((resolve) => {
      let resolved = false;
      let signingIn = false;
      const finish = () => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      cloudAuth.onAuthStateChanged(async (user) => {
        if (unsubscribeAudits) {
          unsubscribeAudits();
          unsubscribeAudits = null;
        }
        if (user) {
          state.user = user;
          state.authReady = true;
          state.cloudEnabled = true;
          state.authError = "";
          startCloudListener();
          finish();
          render();
          return;
        }

        state.user = null;
        if (signingIn) return;
        signingIn = true;
        try {
          await cloudAuth.signInAnonymously();
        } catch (error) {
          console.error("Acceso anónimo", error);
          state.authReady = true;
          state.cloudEnabled = false;
          state.cloudStatus = "auth-error";
          state.authError = error.code === "auth/operation-not-allowed"
            ? "Activa el método Anónimo en Firebase Authentication."
            : "No fue posible conectar la nube; la app continuará guardando en este dispositivo.";
          finish();
          render();
        } finally {
          signingIn = false;
        }
      });
    });
  } catch (error) {
    console.error("Inicio de Firebase", error);
    state.authReady = true;
    state.cloudEnabled = false;
    state.cloudStatus = "error";
    state.authError = "No fue posible iniciar Firebase; la app continuará en modo local.";
  }
}

async function initPublicPortal() {
  state.loading = false;
  state.authReady = true;
  if (!initializeFirebase()) {
    state.publicLoading = false;
    state.publicError = "La conexión del portal de evidencias no está configurada.";
    render();
    return;
  }

  try {
    await cloudAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    cloudAuth.onAuthStateChanged((user) => {
      state.user = user || null;
      render();
    });
    if (!cloudAuth.currentUser) cloudAuth.signInAnonymously().catch((error) => console.warn("Acceso anónimo público", error));

    if (state.publicDirectory) {
      const areaDocs = await Promise.all(AREAS.map(async (area) => {
        try {
          const doc = await cloudDb.collection("publicAreas").doc(area.id).get();
          return [area.id, doc.exists ? doc.data() : null];
        } catch (error) {
          console.warn(`No se pudo cargar el área ${area.id}`, error);
          return [area.id, null];
        }
      }));
      state.publicAreas = Object.fromEntries(areaDocs);
      return;
    }

    const ref = cloudDb.collection("publicAudits").doc(state.publicToken);
    const [auditDoc, photoSnapshot] = await Promise.all([
      ref.get(),
      ref.collection("photos").orderBy("order", "asc").get()
    ]);
    if (!auditDoc.exists) throw new Error("No se encontró la auditoría asociada con este enlace.");
    state.publicData = { id: auditDoc.id, ...auditDoc.data() };
    state.publicPhotos = photoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (state.publicData.previous?.publicId) {
      try {
        const previousRef = cloudDb.collection("publicAudits").doc(state.publicData.previous.publicId);
        const [previousDoc, previousPhotoSnapshot] = await Promise.all([
          previousRef.get(),
          previousRef.collection("photos").orderBy("order", "asc").get()
        ]);
        if (previousDoc.exists) {
          state.publicPreviousData = { id: previousDoc.id, ...previousDoc.data() };
          state.publicPreviousPhotos = previousPhotoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }
      } catch (previousError) {
        console.warn("No se pudo cargar la auditoría anterior", previousError);
      }
    }
  } catch (error) {
    console.error("Portal público", error);
    state.publicError = error.message || "No fue posible cargar las evidencias.";
  } finally {
    state.publicLoading = false;
    render();
  }
}

function preserveLocalPhotos(cloudAudit, localAudit) {
  if (!localAudit) return cloudAudit;
  const localAnswers = new Map((localAudit.answers || []).map((answer) => [answer.questionId, answer]));
  const answers = (cloudAudit.answers || []).map((answer) => {
    const local = localAnswers.get(answer.questionId);
    return {
      ...answer,
      photos: (answer.photos || []).map((photo) => {
        const match = local?.photos?.find((item) => item.id === photo.id && item.dataUrl);
        return match ? { ...photo, dataUrl: match.dataUrl } : photo;
      })
    };
  });
  const generalPhotos = (cloudAudit.generalPhotos || []).map((photo) => {
    const match = (localAudit.generalPhotos || []).find((item) => item.id === photo.id && item.dataUrl);
    return match ? { ...photo, dataUrl: match.dataUrl } : photo;
  });
  return { ...cloudAudit, answers, generalPhotos };
}

function startCloudListener() {
  if (!cloudDb || !state.user || state.publicMode) return;
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
          generalPhotos: data.generalPhotos || [],
          syncedAt: data.syncedAt?.toDate ? data.syncedAt.toDate().toISOString() : (data.syncedAt || null),
          syncStatus: doc.metadata.hasPendingWrites ? "pending" : "synced"
        };
        return preserveLocalPhotos(normalized, existing.get(doc.id));
      });
      const cloudIds = new Set(cloudAudits.map((audit) => audit.id));
      const onlyLocal = state.audits.filter((audit) => !cloudIds.has(audit.id) && audit.syncStatus !== "synced");
      state.audits = [...cloudAudits, ...onlyLocal].sort(sortAudits);
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

function sortAudits(a, b) {
  return new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt);
}

function emptyAnswers() {
  return QUESTIONS.map((question) => ({ questionId: question.id, score: null, observation: "", photos: [] }));
}

function normalizeDraft(draft) {
  if (!draft) return draft;
  draft.answers = draft.answers || emptyAnswers();
  draft.generalPhotos = draft.generalPhotos || [];
  draft.generalObservation = draft.generalObservation || "";
  draft.generalAnalysis = draft.generalAnalysis || "";
  draft.stage = draft.stage || "questions";
  return draft;
}

function calculateResult(answers) {
  const valid = (answers || []).filter((item) => item.score);
  if (!valid.length) return 0;
  return Math.round(valid.reduce((sum, item) => sum + Number(item.score), 0) / (valid.length * 5) * 100);
}

function resultLevel(result) {
  if (result >= 80) return { label: "Meta alcanzada", tone: "good" };
  if (result >= 60) return { label: "Requiere mejora", tone: "warn" };
  return { label: "Atención prioritaria", tone: "bad" };
}

function buildPlan(answers, aiSuggestions = []) {
  const aiMap = new Map((aiSuggestions || []).map((item) => [Number(item.questionId), item]));
  return (answers || []).filter((answer) => answer.score).map((answer) => {
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
      relatedQuestionIds: Array.isArray(ai?.relatedQuestionIds) ? ai.relatedQuestionIds : [],
      actions: [...new Set(actions.filter(Boolean))].slice(0, 5),
      target: score < 5 ? `Subir de ${score} a ${Math.min(5, score + 1)} en la siguiente revisión.` : "Conservar la calificación de 5.",
      evidenceCount: answer.photos?.length || 0,
      source: ai ? "Análisis visual + criterios" : "Criterios de evaluación"
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
    "auth-error": ["!", "Acceso anónimo no disponible"]
  };
  return labels[state.cloudStatus] || labels.local;
}

function header(title, subtitle = "", back = false) {
  const [icon, label] = cloudLabel();
  return `<header class="topbar"><div class="topbar-inner ${back ? "has-back" : "has-brand"}">
    ${back ? `<button class="icon-button" data-action="back" aria-label="Regresar">←</button>` : `<div class="brand-mark"><img src="./logo-mps-header.png" alt="Metal Plating y Servicios"></div>`}
    <div class="topbar-copy"><strong>${escapeHtml(title)}</strong>${subtitle ? `<span>${escapeHtml(subtitle)}</span>` : ""}</div>
    <div class="topbar-action cloud-action" title="${escapeHtml(label)}"><b>${icon}</b></div>
  </div></header>`;
}

function bottomNav() {
  return `<nav class="bottom-nav">
    <button data-view="home" class="${state.view === "home" ? "active" : ""}"><b>✓</b><span>Auditar</span></button>
    <button data-view="history" class="${state.view === "history" ? "active" : ""}"><b>◷</b><span>Historial</span></button>
    <button data-view="dashboard" class="${state.view === "dashboard" ? "active" : ""}"><b>▥</b><span>Resultados</span></button>
  </nav>`;
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

  app.innerHTML = `${header("Auditoría 5S MPS", "Recorrido semanal con evidencia visual")}
    <main class="page page-with-nav">
      <section class="welcome-card"><div class="welcome-icon">✦</div><div><p class="eyebrow">Bienvenido</p><h1>Comencemos el recorrido</h1><p>Evalúa con criterios claros, registra hasta cinco fotografías por pregunta y agrega vistas generales del área.</p></div></section>
      <section class="sync-card ${state.cloudStatus}"><b>${cloudIcon}</b><div><strong>${escapeHtml(cloudText)}</strong><span>${state.user ? "Acceso anónimo activo. Los resultados se sincronizan entre dispositivos." : state.authError ? escapeHtml(state.authError) : "Configura Firebase para compartir resultados."}</span></div></section>
      <label class="field-label" for="auditor">Nombre del auditor</label>
      <input id="auditor" class="text-input" value="${escapeHtml(state.auditor)}" placeholder="Ej. Nombre de la auditora">
      ${state.pendingDraft ? `<button class="resume-card" data-action="resume"><div><strong>Continuar auditoría pendiente</strong><span>${escapeHtml(state.pendingDraft.value.area.full)} · ${state.pendingDraft.value.stage === "general" ? "Evidencia general" : `Pregunta ${state.pendingDraft.value.index + 1} de 10`}</span></div><b>›</b></button>` : ""}
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

function renderPhotoGrid(photos, removeAttribute, addAction, max, label) {
  const thumbs = (photos || []).map((photo) => `<div class="photo-thumb"><img src="${photo.dataUrl}" alt="${escapeHtml(label)}"><button ${removeAttribute}="${photo.id}" aria-label="Eliminar foto">×</button></div>`).join("");
  const add = photos.length < max ? `<button class="add-photo" data-action="${addAction}"><b>＋</b><span>Tomar o elegir foto</span></button>` : "";
  return `<div class="photo-grid">${thumbs}${add}</div>`;
}

function renderWizard() {
  const draft = state.draft;
  const question = QUESTIONS[draft.index];
  const answer = draft.answers[draft.index];
  const progress = Math.round((draft.index + 1) / QUESTIONS.length * 100);
  const criteria = [1, 2, 3, 4, 5].map((score) => `<button class="criterion-row ${Number(answer.score) === score ? "selected" : ""}" data-score="${score}">
    <span class="score-badge">${score}</span><span>${escapeHtml(question.criteria[score])}</span>${Number(answer.score) === score ? `<b>✓</b>` : `<b></b>`}
  </button>`).join("");

  app.innerHTML = `${header("Auditoría en proceso", draft.area.short, true)}
    <main class="page audit-page">
      <div class="progress-meta"><span>Pregunta ${draft.index + 1} de ${QUESTIONS.length}</span><strong>${progress}%</strong></div><div class="progress-track"><div style="width:${progress}%"></div></div>
      <section class="question-card"><p class="question-number">Criterio ${question.id}</p><h1>${escapeHtml(question.title)}</h1><p class="question-text">${escapeHtml(question.question)}</p></section>
      <section class="criteria-card"><div class="section-heading compact"><div><p class="eyebrow">Guía de evaluación</p><h2>Selecciona lo que observas</h2></div></div><div class="criteria-list">${criteria}</div></section>
      <section class="input-card">
        <label class="field-label" for="observation">¿Qué observaste?</label>
        <textarea id="observation" maxlength="600" placeholder="Describe brevemente el hallazgo o lo que está funcionando bien…">${escapeHtml(answer.observation)}</textarea>
        <div class="char-count"><span id="charCount">${answer.observation.length}</span>/600</div>
        <div class="photo-heading"><div><strong>Evidencia de esta pregunta</strong><span>Hasta ${MAX_PHOTOS_PER_QUESTION} fotos</span></div><span>${answer.photos.length}/${MAX_PHOTOS_PER_QUESTION}</span></div>
        ${renderPhotoGrid(answer.photos, "data-remove-photo", "add-photo", MAX_PHOTOS_PER_QUESTION, "Evidencia")}
        <input id="photoInput" class="hidden-input" type="file" accept="image/*" capture="environment" multiple>
      </section>
      <div class="sticky-actions"><button class="secondary-button" data-action="save-exit">Guardar y salir</button><button class="primary-button" data-action="next" ${answer.score ? "" : "disabled"}>${draft.index === QUESTIONS.length - 1 ? "Evidencia general" : "Siguiente"}<b>›</b></button></div>
    </main>`;

  const observation = document.getElementById("observation");
  observation.addEventListener("input", async (event) => {
    answer.observation = event.target.value;
    document.getElementById("charCount").textContent = answer.observation.length;
    await saveCurrentDraft();
  });
  document.getElementById("photoInput").addEventListener("change", (event) => addQuestionPhotos(event.target.files));
}

function renderGeneralEvidence() {
  const draft = state.draft;
  app.innerHTML = `${header("Vista general del área", draft.area.short, true)}
    <main class="page audit-page">
      <section class="question-card general-intro"><p class="question-number">Evidencia complementaria</p><h1>Registra la condición general</h1><p class="question-text">Estas fotografías permitirán comparar la evolución visual del área entre semanas. Son opcionales y no cambian automáticamente la calificación.</p></section>
      <section class="input-card">
        <label class="field-label" for="generalObservation">Comentario general del recorrido</label>
        <textarea id="generalObservation" maxlength="700" placeholder="Ej. El área mejoró en orden; continúa pendiente la delimitación del pasillo…">${escapeHtml(draft.generalObservation)}</textarea>
        <div class="char-count"><span id="generalCharCount">${draft.generalObservation.length}</span>/700</div>
        <div class="photo-heading"><div><strong>Fotografías generales</strong><span>Hasta ${MAX_GENERAL_PHOTOS} vistas del área</span></div><span>${draft.generalPhotos.length}/${MAX_GENERAL_PHOTOS}</span></div>
        ${renderPhotoGrid(draft.generalPhotos, "data-remove-general-photo", "add-general-photo", MAX_GENERAL_PHOTOS, "Vista general")}
        <input id="generalPhotoInput" class="hidden-input" type="file" accept="image/*" capture="environment" multiple>
      </section>
      <section class="tip-card"><b>↔</b><div><strong>Consejo para comparar mejor</strong><p>Procura tomar las fotografías desde posiciones similares cada semana.</p></div></section>
      <div class="sticky-actions"><button class="secondary-button" data-action="skip-general">Continuar sin fotos</button><button class="primary-button" data-action="finish-general">Ver resultado<b>✓</b></button></div>
    </main>`;

  document.getElementById("generalObservation").addEventListener("input", async (event) => {
    draft.generalObservation = event.target.value;
    document.getElementById("generalCharCount").textContent = draft.generalObservation.length;
    await saveCurrentDraft();
  });
  document.getElementById("generalPhotoInput").addEventListener("change", (event) => addGeneralPhotos(event.target.files));
}

function aiStatusMarkup() {
  if (state.aiStatus === "loading") return `<div class="info-message ai-live"><span class="loader"></span><span>Analizando las evidencias al finalizar el recorrido…</span></div>`;
  if (state.aiStatus === "success") return `<div class="success-message">${escapeHtml(state.aiMessage || "Las fotografías fueron analizadas y las recomendaciones se actualizaron.")}</div>`;
  if (state.aiStatus === "error") return `<div class="error-message">${escapeHtml(state.aiMessage || "No fue posible analizar las fotografías.")} Puedes guardar la auditoría con las recomendaciones basadas en los criterios.</div>`;
  if (!window.MPS_CONFIG?.AI_ENDPOINT?.trim()) return `<div class="info-message">La app ya genera recomendaciones con los criterios y observaciones. Para activar el análisis visual automático debe publicarse la función segura incluida en el proyecto.</div>`;
  return "";
}

function renderPlanCards(plan, editable = false) {
  return (plan || []).map((item) => `<article class="plan-card priority-${item.priority.toLowerCase()}">
    <div class="plan-card-top"><div><span class="question-chip">Pregunta ${item.questionId}</span><h3>${escapeHtml(item.title)}</h3></div><div class="mini-score">${item.score}/5</div></div>
    <p class="finding"><strong>Lo observado:</strong> ${escapeHtml(item.finding)}</p>
    ${item.relatedQuestionIds?.length ? `<p class="related-note">También puede relacionarse con: ${item.relatedQuestionIds.map((id) => `P${id}`).join(", ")}.</p>` : ""}
    <div class="target-row"><span>Objetivo sugerido</span><strong>${escapeHtml(item.target)}</strong></div>
    <div class="recommendation-box"><strong>${item.score < 5 ? "Para mejorar:" : "Para conservar el resultado:"}</strong><ul>${item.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ul></div>
    <div class="plan-meta"><span>Prioridad: ${item.priority}</span><span>${item.evidenceCount} evidencia(s)</span><span>${item.source}</span></div>
    ${editable ? `<div class="plan-edit-actions"><button data-edit-plan="${item.questionId}">Editar</button><button data-remove-plan="${item.questionId}">Ocultar recomendación</button></div>` : ""}
  </article>`).join("");
}

function renderSummary() {
  const result = calculateResult(state.draft.answers);
  const level = resultLevel(result);
  const plan = state.currentPlan || buildPlan(state.draft.answers, state.draft.aiSuggestions || []);
  state.currentPlan = plan;
  const estimated = Math.min(100, result + plan.filter((item) => item.score < 5).length * 2);
  const opportunities = plan.filter((item) => item.score < 5);
  const hasPhotos = state.draft.generalPhotos.length || state.draft.answers.some((answer) => answer.photos.length);

  app.innerHTML = `${header("Resultado y plan de mejora", state.draft.area.short, true)}
    <main class="page summary-page">
      <section class="result-card ${level.tone}"><div class="result-ring" style="--score:${result * 3.6}deg"><div><strong>${result}%</strong><span>Resultado</span></div></div><div><p class="eyebrow">Auditoría terminada</p><h1>${level.label}</h1><p>Meta semanal: 80%. La retroalimentación explica qué mantener y qué puede mejorar el área.</p></div></section>
      <section class="projection-card"><b>💡</b><div><strong>Proyección orientativa</strong><p>Si cada criterio con oportunidad sube un nivel, el resultado podría acercarse a <b>${estimated}%</b>.</p></div></section>
      <section class="evidence-summary"><div><strong>${state.draft.answers.reduce((sum, answer) => sum + answer.photos.length, 0)}</strong><span>Fotos por pregunta</span></div><div><strong>${state.draft.generalPhotos.length}</strong><span>Fotos generales</span></div><div><strong>${opportunities.length}</strong><span>Oportunidades</span></div></section>
      ${hasPhotos ? `<button class="ai-button" data-action="analyze-ai" ${state.aiStatus === "loading" ? "disabled" : ""}><b>✦</b><span>${state.aiStatus === "success" ? "Volver a analizar evidencias" : "Analizar fotos y mejorar recomendaciones"}</span></button>` : ""}
      <div id="aiMessage">${aiStatusMarkup()}</div>
      ${state.draft.generalAnalysis ? `<section class="general-analysis"><p class="eyebrow">Lectura general de las fotografías</p><p>${escapeHtml(state.draft.generalAnalysis)}</p></section>` : ""}
      <div class="section-heading"><div><p class="eyebrow">Retroalimentación automática</p><h2>Plan de mejora 5S</h2></div><span class="count-pill">${opportunities.length} oportunidades</span></div>
      <div class="plan-list">${renderPlanCards(plan, true)}</div>
      <div class="sticky-actions"><button class="secondary-button" data-action="review">Revisar recorrido</button><button class="primary-button" data-action="save-audit">Guardar y sincronizar<b>✓</b></button></div>
    </main>`;

  const endpoint = window.MPS_CONFIG?.AI_ENDPOINT?.trim();
  if (endpoint && hasPhotos && state.aiStatus === "idle") setTimeout(() => analyzeWithAI(true), 120);
}

function renderHistory() {
  const rows = state.audits.map((audit) => {
    const level = resultLevel(audit.result);
    const sync = audit.syncStatus === "pending" ? " · Pendiente de nube" : audit.syncStatus === "local" ? " · Solo local" : "";
    const publicMark = audit.publicId ? " · QR publicado" : "";
    return `<button class="audit-list-card" data-audit="${audit.id}"><div class="audit-list-icon">▥</div><div><strong>${escapeHtml(audit.area.short)}</strong><span>${formatDate(audit.completedAt || audit.createdAt)} · ${escapeHtml(audit.auditor)}</span><small>${(audit.plan || []).filter((item) => item.score < 5).length} recomendaciones${sync}${publicMark}</small></div><div class="audit-result ${level.tone}"><strong>${audit.result}%</strong><b>›</b></div></button>`;
  }).join("");
  app.innerHTML = `${header("Historial 5S", "Resultados, evidencias y códigos QR")}<main class="page page-with-nav"><div class="history-actions"><div><p class="eyebrow">Consulta y seguimiento</p><h1>Resultados por área</h1></div><button class="export-button" data-action="export" ${state.audits.length ? "" : "disabled"}>▣ Excel</button></div>
    ${state.audits.length ? `<div class="audit-list">${rows}</div>` : `<section class="empty-state"><b>◷</b><h2>Aún no hay auditorías</h2><p>Cuando se complete la primera, aquí aparecerán el resultado, las evidencias y el plan de mejora.</p></section>`}</main>${bottomNav()}`;
}

function evidenceCard(answer) {
  const q = QUESTIONS.find((item) => item.id === answer.questionId);
  const planItem = (state.selectedAudit?.plan || []).find((item) => item.questionId === answer.questionId);
  const photos = (answer.photos || []).map((photo) => photo.dataUrl ? `<img src="${photo.dataUrl}" alt="Evidencia de ${escapeHtml(q.title)}">` : `<div class="evidence-placeholder">Cargando evidencia…</div>`).join("");
  return `<article class="evidence-card"><div class="evidence-card-title"><div><span class="question-chip">Pregunta ${q.id}</span><h3>${escapeHtml(q.title)}</h3></div><div class="mini-score">${answer.score}/5</div></div><p><strong>Criterio aplicado:</strong> ${escapeHtml(q.criteria[answer.score])}</p><p><strong>Observación:</strong> ${escapeHtml(answer.observation || "Sin observación escrita")}</p>${planItem?.finding ? `<p><strong>Análisis:</strong> ${escapeHtml(planItem.finding)}</p>` : ""}<div class="evidence-grid">${photos}</div></article>`;
}

function publicUrlFor(publicId) {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}?evidencia=${encodeURIComponent(publicId)}`;
}

function publicDirectoryUrl() {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}?resultados=1`;
}

function renderQrCard(audit) {
  if (!audit.publicId) {
    return `<section class="qr-card unpublished"><div class="qr-copy"><p class="eyebrow">Portal general para responsables</p><h2>Publicar esta auditoría</h2><p>Al publicarla, esta área quedará disponible en el QR general de Resultados 5S. El porcentaje se mostrará únicamente después de elegir el área.</p><button class="primary-button inline-button" data-action="publish-evidence" ${state.publishStatus === "loading" ? "disabled" : ""}>${state.publishStatus === "loading" ? "Publicando…" : "Publicar resultados y evidencias"}</button>${state.publishStatus === "error" ? `<div class="error-message">No fue posible publicar las evidencias.</div>` : ""}</div></section>`;
  }
  return `<section class="qr-card published"><div class="qr-copy"><p class="eyebrow">Publicada en el portal general</p><h2>${escapeHtml(audit.area.short)} ya está disponible</h2><p>El QR general llevará a una página para elegir el área. Al entrar a esta área se mostrarán su resultado más reciente, las 10 preguntas y las evidencias.</p><div class="qr-actions"><button class="secondary-button" data-action="open-public-directory">Abrir portal general</button><button class="primary-button" data-action="copy-public-directory">Copiar enlace general</button></div></div></section>`;
}

function renderDetail() {
  const audit = state.selectedAudit;
  const evidenceAnswers = (audit.answers || []).filter((answer) => answer.photos?.length || answer.observation || Number(answer.score) < 5);
  const generalPhotos = (audit.generalPhotos || []).map((photo) => photo.dataUrl ? `<img src="${photo.dataUrl}" alt="Vista general del área">` : `<div class="evidence-placeholder">Cargando vista general…</div>`).join("");
  const improvements = (audit.improvements || []).map((item) => `<article class="improvement-card"><div><span class="status-pill">Pendiente de revisión</span><strong>${formatDate(item.createdAt)}</strong></div><p>${escapeHtml(item.comment || "Evidencia fotográfica compartida por el área")}</p>${item.photos?.length ? `<div class="evidence-grid">${item.photos.map((photo) => `<img src="${photo.dataUrl}" alt="Evidencia de mejora">`).join("")}</div>` : ""}</article>`).join("");
  app.innerHTML = `${header("Detalle de auditoría", audit.area.short, true)}<main class="page detail-page"><section class="detail-header"><div><p class="eyebrow">Resultado semanal</p><h1>${audit.result}%</h1><p>${escapeHtml(audit.area.full)}</p></div><div class="detail-meta"><span>Auditor</span><strong>${escapeHtml(audit.auditor)}</strong><span>Fecha</span><strong>${formatDate(audit.completedAt || audit.createdAt)}</strong></div></section>
    ${renderQrCard(audit)}
    ${audit.generalPhotos?.length || audit.generalObservation ? `<div class="section-heading"><div><p class="eyebrow">Vista general</p><h2>Condición global del área</h2></div></div><article class="evidence-card"><p>${escapeHtml(audit.generalObservation || "Sin comentario general")}</p>${audit.generalAnalysis ? `<p><strong>Análisis visual:</strong> ${escapeHtml(audit.generalAnalysis)}</p>` : ""}<div class="evidence-grid general-grid">${generalPhotos}</div></article>` : ""}
    ${evidenceAnswers.length ? `<div class="section-heading"><div><p class="eyebrow">Evidencia por criterio</p><h2>Por qué se obtuvo el resultado</h2></div></div><div class="evidence-list">${evidenceAnswers.map(evidenceCard).join("")}</div>` : ""}
    <div class="section-heading"><div><p class="eyebrow">Retroalimentación</p><h2>Recomendaciones registradas</h2></div></div><div class="plan-list">${renderPlanCards(audit.plan || [])}</div>
    ${audit.publicId ? `<div class="section-heading"><div><p class="eyebrow">Participación opcional</p><h2>Evidencias compartidas por el área</h2></div><span class="count-pill">${audit.improvements?.length || 0}</span></div>${improvements || `<section class="empty-inline">Todavía no se han compartido evidencias de mejora.</section>`}` : ""}
  </main>`;
  drawCurrentQr();
}

function renderMasterQrCard() {
  return `<section class="master-qr-card"><div class="master-qr-visual"><canvas id="masterQrCanvas" aria-label="QR general de Resultados 5S"></canvas></div><div><p class="eyebrow">Un solo QR para todos los tableros</p><h2>Portal general de Resultados 5S</h2><p>Quien lo escanee verá primero las 11 áreas sin porcentajes. Al elegir un área, abrirá su auditoría publicada más reciente con las evidencias y recomendaciones.</p><div class="qr-actions"><button class="secondary-button" data-action="open-public-directory">Vista previa</button><button class="secondary-button" data-action="copy-public-directory">Copiar enlace</button><button class="primary-button" data-action="download-master-qr">Descargar QR general</button></div></div></section>`;
}

function drawMasterQr() {
  const canvas = document.getElementById("masterQrCanvas");
  if (!canvas || !window.MPS_QR) return;
  window.MPS_QR.drawCanvas(canvas, publicDirectoryUrl(), { size: 320, dark: "#0b356d", level: "M" });
}

function renderDashboard() {
  const globalAverage = state.audits.length ? Math.round(state.audits.reduce((sum, item) => sum + item.result, 0) / state.audits.length) : 0;
  const rows = AREAS.map((area) => {
    const areaAudits = state.audits.filter((audit) => audit.area.id === area.id);
    const latest = areaAudits[0];
    const average = areaAudits.length ? Math.round(areaAudits.reduce((sum, item) => sum + item.result, 0) / areaAudits.length) : null;
    return `<div class="dashboard-row"><div><strong>${escapeHtml(area.short)}</strong><span>${latest ? `Último: ${latest.result}% · Promedio: ${average}%` : "Sin datos"}</span></div><div class="dashboard-bar"><div style="width:${latest?.result || 0}%"></div></div><strong class="dashboard-value">${latest ? `${latest.result}%` : "—"}</strong></div>`;
  }).join("");
  app.innerHTML = `${header("Resultados 5S", "Vista general de las áreas")}<main class="page page-with-nav"><section class="dashboard-hero"><div><p class="eyebrow">Promedio registrado</p><h1>${globalAverage}%</h1><p>${state.audits.length ? `${state.audits.length} auditorías consideradas` : "Completa auditorías para comenzar a medir"}</p><div class="dashboard-hero-actions"><button class="tour-launch" data-action="start-tour" ${state.audits.length ? "" : "disabled"}>▶ Iniciar Recorrido Visual 5S</button><button class="tour-launch secondary" data-action="start-tour-fullscreen" ${state.audits.length ? "" : "disabled"}>⛶ Presentar en pantalla completa</button></div></div><b>▥</b></section>
    <div class="section-heading"><div><p class="eyebrow">Presentación</p><h2>Recorrido visual por las áreas</h2></div></div><p class="dashboard-help">Avanza por las áreas en el orden del recorrido físico. Se mostrarán fotografías, resultado, observaciones, recomendaciones y las 10 preguntas evaluadas.</p>
    ${renderMasterQrCard()}
    <div class="section-heading"><div><p class="eyebrow">Desempeño</p><h2>Último resultado por área</h2></div></div><div class="dashboard-list">${rows}</div></main>${bottomNav()}`;
  drawMasterQr();
}

function publicPhotoGroups() {
  const general = state.publicPhotos.filter((photo) => photo.kind === "general");
  const byQuestion = new Map();
  for (const photo of state.publicPhotos.filter((photo) => photo.kind === "question")) {
    if (!byQuestion.has(Number(photo.questionId))) byQuestion.set(Number(photo.questionId), []);
    byQuestion.get(Number(photo.questionId)).push(photo);
  }
  return { general, byQuestion };
}

function publicHeader(detail = false) {
  return `<header class="public-header"><div><img src="./logo-mps-header.png" alt="Metal Plating y Servicios"><div><strong>${detail ? "Evidencias de Auditoría 5S" : "Resultados 5S MPS"}</strong><span>${detail ? "Consulta de resultados y oportunidades de mejora" : "Selecciona tu área para consultar la evaluación más reciente"}</span></div></div></header>`;
}

function renderPublicDirectory() {
  const cards = AREAS.map((area) => {
    const published = state.publicAreas[area.id];
    if (!published?.publicId) {
      return `<article class="public-area-card disabled"><div class="public-area-icon">${area.icon}</div><div><strong>${escapeHtml(area.short)}</strong><span>Sin evaluación publicada</span></div></article>`;
    }
    return `<a class="public-area-card" href="${escapeHtml(publicUrlFor(published.publicId))}"><div class="public-area-icon">${area.icon}</div><div><strong>${escapeHtml(area.short)}</strong><span>Ver resultado y evidencias</span></div><b>›</b></a>`;
  }).join("");
  app.innerHTML = `${publicHeader(false)}<main class="public-page public-directory-page"><section class="directory-hero"><p class="eyebrow">Portal de retroalimentación</p><h1>Elige tu área</h1><p>Consulta la auditoría 5S más reciente, las fotografías que respaldan el resultado y las recomendaciones para mejorar. El porcentaje se mostrará al entrar al área.</p></section><div class="public-area-grid">${cards}</div><footer class="public-footer">Metal Plating y Servicios · Auditoría 5S</footer></main>`;
}

function renderPublicPortal() {
  document.body.classList.add("public-mode");
  if (state.publicLoading) {
    app.innerHTML = `${publicHeader(!state.publicDirectory)}<main class="public-page"><section class="public-loading"><span class="loader"></span><h1>Cargando resultados…</h1></section></main>`;
    return;
  }
  if (state.publicError) {
    app.innerHTML = `${publicHeader(!state.publicDirectory)}<main class="public-page"><section class="empty-state"><b>!</b><h1>No fue posible abrir los resultados</h1><p>${escapeHtml(state.publicError)}</p></section></main>`;
    return;
  }
  if (state.publicDirectory) return renderPublicDirectory();
  if (!state.publicData) {
    app.innerHTML = `${publicHeader(true)}<main class="public-page"><section class="empty-state"><b>!</b><h1>No fue posible abrir las evidencias</h1><p>El enlace no es válido.</p></section></main>`;
    return;
  }

  const data = state.publicData;
  const level = resultLevel(Number(data.result));
  const { general, byQuestion } = publicPhotoGroups();
  const answerMap = new Map((data.answers || []).map((answer) => [Number(answer.questionId), answer]));
  const planMap = new Map((data.plan || []).map((item) => [Number(item.questionId), item]));
  const answerCards = QUESTIONS.map((q) => {
    const answer = answerMap.get(q.id) || { questionId: q.id, score: "—", criterion: "Sin registro", observation: "", photoCount: 0 };
    const photos = (byQuestion.get(q.id) || []).map((photo) => `<img src="${photo.dataUrl}" alt="Evidencia de ${escapeHtml(q.title)}">`).join("");
    const plan = planMap.get(q.id);
    return `<article class="public-evidence-card"><div class="public-card-heading"><div><span class="question-chip">Pregunta ${q.id} de 10</span><h2>${escapeHtml(q.title)}</h2></div><div class="mini-score">${answer.score}/5</div></div><p class="public-question">${escapeHtml(q.question)}</p><div class="criterion-public"><strong>Criterio aplicado</strong><span>${escapeHtml(answer.criterion || "Sin criterio registrado")}</span></div>${answer.observation ? `<p><strong>Observación del recorrido:</strong> ${escapeHtml(answer.observation)}</p>` : `<p class="muted-inline">Sin observaciones adicionales.</p>`}${plan?.finding ? `<p><strong>Análisis / retroalimentación:</strong> ${escapeHtml(plan.finding)}</p>` : ""}${photos ? `<div class="public-photo-grid">${photos}</div>` : `<div class="no-photo-note">Sin fotografías asociadas a esta pregunta.</div>`}${plan?.actions?.length ? `<div class="public-recommendations"><strong>Para mejorar el resultado</strong><ul>${plan.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ul></div>` : ""}</article>`;
  }).join("");

  const generalPhotos = general.map((photo) => `<img src="${photo.dataUrl}" alt="Vista general del área">`).join("");
  const previousGeneral = state.publicPreviousPhotos.filter((photo) => photo.kind === "general");
  const previousGeneralPhotos = previousGeneral.map((photo) => `<img src="${photo.dataUrl}" alt="Vista general de la auditoría anterior">`).join("");
  const strengths = (data.plan || []).filter((item) => Number(item.score) >= 4).slice(0, 4);
  const opportunities = (data.plan || []).filter((item) => Number(item.score) < 4).slice(0, 5);

  app.innerHTML = `${publicHeader(true)}<main class="public-page">
    <a class="directory-back-link" href="${escapeHtml(publicDirectoryUrl())}">‹ Elegir otra área</a>
    <section class="public-hero ${level.tone}"><div><p class="eyebrow">Auditoría semanal más reciente</p><h1>${escapeHtml(data.area.full)}</h1><p>${formatDate(data.completedAt)}</p></div><div class="public-result"><strong>${data.result}%</strong><span>${level.label}</span></div></section>
    <section class="public-summary-grid"><article><b>✓</b><div><strong>Fortalezas</strong><ul>${strengths.length ? strengths.map((item) => `<li>${escapeHtml(item.title)} (${item.score}/5)</li>`).join("") : "<li>Continúa trabajando en los criterios evaluados.</li>"}</ul></div></article><article><b>↗</b><div><strong>Oportunidades principales</strong><ul>${opportunities.length ? opportunities.map((item) => `<li>${escapeHtml(item.title)} (${item.score}/5)</li>`).join("") : "<li>El área alcanzó resultados sólidos en todos los criterios.</li>"}</ul></div></article></section>
    ${general.length || data.generalObservation ? `<div class="public-section-title"><p class="eyebrow">Vista general</p><h2>Condición del área</h2></div><section class="public-general-card">${data.generalObservation ? `<p>${escapeHtml(data.generalObservation)}</p>` : ""}${data.generalAnalysis ? `<div class="general-analysis-public"><strong>Análisis visual</strong><p>${escapeHtml(data.generalAnalysis)}</p></div>` : ""}${previousGeneral.length && general.length ? `<div class="visual-comparison"><article><div class="comparison-label"><span>Auditoría anterior</span><strong>${state.publicPreviousData?.result ?? data.previous?.result ?? "—"}%</strong></div><div class="public-photo-grid comparison">${previousGeneralPhotos}</div></article><article><div class="comparison-label"><span>Auditoría actual</span><strong>${data.result}%</strong></div><div class="public-photo-grid comparison">${generalPhotos}</div></article></div>` : generalPhotos ? `<div class="public-photo-grid general">${generalPhotos}</div>` : ""}</section>` : ""}
    <div class="public-section-title"><p class="eyebrow">Las 10 preguntas</p><h2>¿Cómo se obtuvo este resultado?</h2></div>
    <div class="public-evidence-list">${answerCards}</div>
    <section class="optional-improvement"><div><p class="eyebrow">Participación opcional</p><h2>¿Ya realizaron alguna mejora?</h2><p>Pueden compartir un comentario o fotografías. Esto no cambia la calificación y quedará pendiente de revisión por el SGC.</p></div><button class="secondary-button" data-action="toggle-improvement">${state.improvementOpen ? "Cerrar formulario" : "Agregar evidencia de mejora"}</button></section>
    ${state.improvementOpen ? `<section class="improvement-form"><label class="field-label" for="improvementComment">Comentario opcional</label><textarea id="improvementComment" maxlength="800" placeholder="Describe brevemente lo que mejoraron…">${escapeHtml(state.improvementComment)}</textarea><div class="photo-heading"><div><strong>Fotografías de mejora</strong><span>Hasta ${MAX_IMPROVEMENT_PHOTOS} fotos opcionales</span></div><span>${state.improvementPhotos.length}/${MAX_IMPROVEMENT_PHOTOS}</span></div>${renderPhotoGrid(state.improvementPhotos, "data-remove-improvement-photo", "add-improvement-photo", MAX_IMPROVEMENT_PHOTOS, "Evidencia de mejora")}<input id="improvementPhotoInput" class="hidden-input" type="file" accept="image/*" capture="environment" multiple><button class="primary-button full-button" data-action="submit-improvement" ${state.improvementStatus === "loading" ? "disabled" : ""}>${state.improvementStatus === "loading" ? "Enviando evidencia…" : "Enviar evidencia para revisión"}</button>${state.improvementStatus && state.improvementStatus !== "loading" ? `<div class="${state.improvementStatus === "success" ? "success-message" : "error-message"}">${state.improvementStatus === "success" ? "La evidencia se envió correctamente y quedó pendiente de revisión." : "No fue posible enviar la evidencia. Intenta nuevamente."}</div>` : ""}</section>` : ""}
    <footer class="public-footer">Metal Plating y Servicios · Auditoría 5S</footer>
  </main>`;

  if (state.improvementOpen) {
    document.getElementById("improvementComment").addEventListener("input", (event) => { state.improvementComment = event.target.value; });
    document.getElementById("improvementPhotoInput").addEventListener("change", (event) => addImprovementPhotos(event.target.files));
  }
}

function latestAuditsInAreaOrder() {
  return AREAS.map((area) => state.audits.find((audit) => audit.area.id === area.id)).filter(Boolean);
}

function tourPhotos(audit) {
  const photos = [];
  for (const photo of audit?.generalPhotos || []) if (photo.dataUrl) photos.push({ ...photo, label: "Vista general" });
  for (const answer of audit?.answers || []) {
    const q = QUESTIONS.find((item) => item.id === Number(answer.questionId));
    for (const photo of answer.photos || []) if (photo.dataUrl) photos.push({ ...photo, label: q ? `${q.id}. ${q.title}` : "Evidencia" });
  }
  return photos;
}

async function loadTourAudit(index) {
  const audits = latestAuditsInAreaOrder();
  if (!audits.length) return;
  state.tourLoading = true;
  state.tourIndex = Math.max(0, Math.min(index, audits.length - 1));
  state.tourPhotoIndex = 0;
  render();
  state.tourAudit = await loadCloudPhotos(audits[state.tourIndex]);
  state.tourLoading = false;
  render();
}

async function startVisualTour(fullscreen = false) {
  if (fullscreen && document.documentElement.requestFullscreen) {
    try { await document.documentElement.requestFullscreen(); } catch (error) { console.warn("Pantalla completa", error); }
  }
  state.tourMode = true;
  state.selectedAudit = null;
  await loadTourAudit(0);
}

async function changeTourArea(delta) {
  const audits = latestAuditsInAreaOrder();
  const next = state.tourIndex + delta;
  if (next < 0 || next >= audits.length) return;
  await loadTourAudit(next);
}

function renderTour() {
  document.body.classList.add("tour-active");
  const audits = latestAuditsInAreaOrder();
  if (state.tourLoading || !state.tourAudit) {
    app.innerHTML = `<main class="tour-shell"><section class="tour-loading"><span class="loader"></span><h1>Preparando recorrido visual…</h1></section></main>`;
    return;
  }
  const audit = state.tourAudit;
  const photos = tourPhotos(audit);
  const currentPhoto = photos[state.tourPhotoIndex] || null;
  const planMap = new Map((audit.plan || []).map((item) => [Number(item.questionId), item]));
  const answerMap = new Map((audit.answers || []).map((answer) => [Number(answer.questionId), answer]));
  const questions = QUESTIONS.map((q) => {
    const answer = answerMap.get(q.id) || {};
    const plan = planMap.get(q.id);
    return `<article class="tour-question-row"><div><span>${q.id}</span><div><strong>${escapeHtml(q.title)}</strong><small>${escapeHtml(answer.observation || plan?.finding || "Sin observaciones adicionales")}</small></div></div><b>${answer.score || "—"}/5</b></article>`;
  }).join("");
  const recommendations = (audit.plan || []).filter((item) => Number(item.score) < 5).slice(0, 5).flatMap((item) => (item.actions || []).slice(0, 1).map((action) => `<li><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(action)}</li>`)).join("");
  const thumbStrip = photos.map((photo, index) => `<button class="tour-thumb ${index === state.tourPhotoIndex ? "active" : ""}" data-tour-photo="${index}"><img src="${photo.dataUrl}" alt="${escapeHtml(photo.label)}"><span>${escapeHtml(photo.label)}</span></button>`).join("");
  const level = resultLevel(audit.result);
  app.innerHTML = `<main class="tour-shell">
    <header class="tour-topbar"><div class="tour-brand"><img src="./logo-mps-header.png" alt="MPS"><div><strong>Recorrido Visual 5S</strong><span>${state.tourIndex + 1} de ${audits.length} áreas con auditoría</span></div></div><div class="tour-top-actions"><button data-action="toggle-fullscreen">⛶ Pantalla completa</button><button data-action="close-tour">✕ Salir</button></div></header>
    <section class="tour-stage"><div class="tour-photo-stage">${currentPhoto ? `<img src="${currentPhoto.dataUrl}" alt="${escapeHtml(currentPhoto.label)}"><div class="tour-photo-caption"><span>${escapeHtml(currentPhoto.label)}</span><strong>${state.tourPhotoIndex + 1} / ${photos.length}</strong></div>` : `<div class="tour-no-photo"><b>▧</b><h2>Sin fotografías cargadas</h2><p>La auditoría sí puede presentarse con sus calificaciones y recomendaciones.</p></div>`}${photos.length > 1 ? `<button class="tour-photo-nav prev" data-action="tour-photo-prev">‹</button><button class="tour-photo-nav next" data-action="tour-photo-next">›</button>` : ""}</div>
      <aside class="tour-summary"><span class="tour-area-counter">Área ${state.tourIndex + 1}</span><h1>${escapeHtml(audit.area.full)}</h1><div class="tour-score ${level.tone}"><strong>${audit.result}%</strong><span>${level.label}</span></div><p>${formatDate(audit.completedAt || audit.createdAt)} · ${escapeHtml(audit.auditor)}</p>${audit.generalObservation ? `<div class="tour-observation"><strong>Comentario general</strong><p>${escapeHtml(audit.generalObservation)}</p></div>` : ""}<div class="tour-recommendations"><strong>Sugerencias principales</strong>${recommendations ? `<ul>${recommendations}</ul>` : `<p>El área mantiene resultados sólidos. Continuar sosteniendo los estándares.</p>`}</div></aside>
    </section>
    ${photos.length ? `<div class="tour-thumbs">${thumbStrip}</div>` : ""}
    <section class="tour-questions"><div class="tour-section-title"><div><span>Evaluación completa</span><h2>Las 10 preguntas</h2></div><p>Calificación, observación y retroalimentación por criterio.</p></div><div class="tour-question-list">${questions}</div></section>
    <footer class="tour-footer"><button class="secondary-button" data-action="tour-prev" ${state.tourIndex === 0 ? "disabled" : ""}>‹ Área anterior</button><div class="tour-dots">${audits.map((item, index) => `<button data-tour-area="${index}" class="${index === state.tourIndex ? "active" : ""}" aria-label="${escapeHtml(item.area.short)}"></button>`).join("")}</div><button class="primary-button" data-action="tour-next" ${state.tourIndex === audits.length - 1 ? "disabled" : ""}>Siguiente área ›</button></footer>
  </main>`;
}

function render() {
  if (state.publicMode) return renderPublicPortal();
  if (state.tourMode) return renderTour();
  document.body.classList.remove("public-mode", "tour-active");
  if (state.loading || !state.authReady) return;
  if (state.selectedAudit) return renderDetail();
  if (state.draft && state.summary) return renderSummary();
  if (state.draft?.stage === "general") return renderGeneralEvidence();
  if (state.draft) return renderWizard();
  if (state.view === "history") return renderHistory();
  if (state.view === "dashboard") return renderDashboard();
  return renderHome();
}

async function saveCurrentDraft() {
  if (state.draft) await idbPut("settings", { key: "draft", value: state.draft });
}

async function startAudit(areaId) {
  const area = AREAS.find((item) => item.id === areaId);
  state.draft = normalizeDraft({ id: uid(), area, auditor: state.auditor.trim(), createdAt: new Date().toISOString(), index: 0, stage: "questions", answers: emptyAnswers(), generalPhotos: [], generalObservation: "", generalAnalysis: "" });
  state.currentPlan = null;
  state.summary = false;
  state.aiStatus = "idle";
  state.aiMessage = "";
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

async function resizeImage(file, options = {}) {
  const image = await fileToImage(file);
  const maxSize = options.maxSize || 720;
  const maxLength = options.maxLength || 620000;
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  let quality = options.quality || 0.55;
  let output = canvas.toDataURL("image/jpeg", quality);
  while (output.length > maxLength && quality > 0.22) {
    quality -= 0.06;
    output = canvas.toDataURL("image/jpeg", quality);
  }
  if (output.length > 900000) throw new Error("La fotografía continúa siendo demasiado pesada. Intenta tomarla nuevamente.");
  return output;
}

async function appendPhotos(target, fileList, max, options = {}) {
  const remaining = Math.max(0, max - target.length);
  const files = Array.from(fileList || []).slice(0, remaining);
  if (!files.length) return;
  app.classList.add("busy");
  try {
    for (const file of files) {
      target.push({ id: uid(), name: file.name || "evidencia.jpg", dataUrl: await resizeImage(file, options), createdAt: new Date().toISOString() });
    }
    if (!state.publicMode) await saveCurrentDraft();
  } catch (error) {
    alert(`No fue posible procesar la fotografía: ${error.message}`);
  } finally {
    app.classList.remove("busy");
    render();
  }
}

async function addQuestionPhotos(fileList) {
  const answer = state.draft.answers[state.draft.index];
  return appendPhotos(answer.photos, fileList, MAX_PHOTOS_PER_QUESTION);
}

async function addGeneralPhotos(fileList) {
  return appendPhotos(state.draft.generalPhotos, fileList, MAX_GENERAL_PHOTOS);
}

async function addImprovementPhotos(fileList) {
  return appendPhotos(state.improvementPhotos, fileList, MAX_IMPROVEMENT_PHOTOS, { maxSize: 640, maxLength: 500000, quality: 0.5 });
}

async function analyzeWithAI(automatic = false) {
  const endpoint = window.MPS_CONFIG?.AI_ENDPOINT?.trim();
  if (!endpoint) {
    state.aiStatus = "unavailable";
    state.aiMessage = "El análisis visual requiere publicar la función segura incluida en el proyecto.";
    render();
    return;
  }
  if (state.aiStatus === "loading") return;
  state.aiStatus = "loading";
  state.aiMessage = automatic ? "Analizando automáticamente las evidencias…" : "Analizando evidencias…";
  render();
  try {
    const answers = state.draft.answers.filter((answer) => answer.photos.length || answer.observation).map((answer) => {
      const q = QUESTIONS.find((item) => item.id === answer.questionId);
      return { questionId: q.id, title: q.title, question: q.question, score: answer.score, selectedCriterion: q.criteria[answer.score], observation: answer.observation, images: answer.photos.map((photo) => photo.dataUrl) };
    });
    const token = state.user ? await state.user.getIdToken() : "";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({
        area: state.draft.area,
        answers,
        general: { observation: state.draft.generalObservation, images: state.draft.generalPhotos.map((photo) => photo.dataUrl) }
      })
    });
    if (!response.ok) throw new Error(`El servicio respondió ${response.status}`);
    const data = await response.json();
    state.draft.aiSuggestions = Array.isArray(data.suggestions) ? data.suggestions : [];
    state.draft.generalAnalysis = data.generalSummary || "";
    state.draft.aiAnalyzedAt = new Date().toISOString();
    state.currentPlan = buildPlan(state.draft.answers, state.draft.aiSuggestions);
    state.aiStatus = "success";
    state.aiMessage = `Análisis completado${data.imagesAnalyzed ? ` con ${data.imagesAnalyzed} fotografía(s)` : ""}. Revisa las sugerencias antes de guardar.`;
    await saveCurrentDraft();
  } catch (error) {
    console.error("Análisis visual", error);
    state.aiStatus = "error";
    state.aiMessage = `No fue posible completar el análisis visual: ${error.message}`;
  }
  render();
}

function auditForCloud(audit) {
  return {
    ...audit,
    answers: audit.answers.map((answer) => ({
      ...answer,
      photos: (answer.photos || []).map(({ id, name, createdAt }) => ({ id, name, createdAt }))
    })),
    generalPhotos: (audit.generalPhotos || []).map(({ id, name, createdAt }) => ({ id, name, createdAt })),
    createdBy: state.user.uid,
    authenticationMode: state.user.isAnonymous ? "anonymous" : "authenticated",
    syncedAt: firebase.firestore.FieldValue.serverTimestamp()
  };
}

function withTimeout(promise, milliseconds, message = "Tiempo de espera agotado") {
  let timeoutId;
  const timeout = new Promise((_, reject) => { timeoutId = setTimeout(() => reject(new Error(message)), milliseconds); });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

async function syncPendingAudits() {
  if (!cloudDb || !state.user || !navigator.onLine) return;
  const pending = state.audits.filter((audit) => audit.syncStatus === "pending");
  for (const audit of pending) {
    try {
      await withTimeout(saveAuditToCloud(audit), 30000, "No se confirmó la conexión con Firebase");
      audit.syncStatus = "synced";
      await idbPut("audits", audit);
    } catch (error) {
      console.warn(`Auditoría ${audit.id} pendiente de sincronización`, error);
      state.cloudStatus = "offline";
      break;
    }
  }
}

async function savePhotoDocuments(auditRef, audit) {
  const entries = [];
  for (const answer of audit.answers || []) {
    for (let index = 0; index < (answer.photos || []).length; index++) {
      const photo = answer.photos[index];
      entries.push({ photo, kind: "question", questionId: answer.questionId, order: index });
    }
  }
  for (let index = 0; index < (audit.generalPhotos || []).length; index++) {
    entries.push({ photo: audit.generalPhotos[index], kind: "general", questionId: null, order: index });
  }
  for (let i = 0; i < entries.length; i += 8) {
    const chunk = entries.slice(i, i + 8);
    await Promise.all(chunk.map(({ photo, kind, questionId, order }) => auditRef.collection("photos").doc(photo.id).set({
      id: photo.id,
      kind,
      questionId,
      order,
      name: photo.name || "evidencia.jpg",
      createdAt: photo.createdAt || new Date().toISOString(),
      dataUrl: photo.dataUrl,
      createdBy: state.user.uid
    }, { merge: true })));
  }
}

async function saveAuditToCloud(audit) {
  if (!cloudDb || !state.user) return false;
  const auditRef = cloudDb.collection("audits").doc(audit.id);
  await auditRef.set(auditForCloud(audit), { merge: true });
  await savePhotoDocuments(auditRef, audit);
  return true;
}

async function saveAudit() {
  const result = calculateResult(state.draft.answers);
  const audit = {
    ...state.draft,
    result,
    plan: state.currentPlan || buildPlan(state.draft.answers, state.draft.aiSuggestions || []),
    completedAt: new Date().toISOString(),
    syncStatus: state.cloudEnabled ? "pending" : "local"
  };
  delete audit.index;
  delete audit.stage;
  await idbPut("audits", audit);
  await idbDelete("settings", "draft");
  state.audits = [audit, ...state.audits.filter((item) => item.id !== audit.id)].sort(sortAudits);

  if (state.cloudEnabled && state.user) {
    state.cloudStatus = navigator.onLine ? "connecting" : "offline";
    if (navigator.onLine) {
      try {
        await withTimeout(saveAuditToCloud(audit), 45000, "No se confirmó la conexión con Firebase");
        audit.syncStatus = "synced";
        await idbPut("audits", audit);
        state.cloudStatus = "synced";
      } catch (error) {
        console.error("Guardado en nube", error);
        audit.syncStatus = "pending";
        await idbPut("audits", audit);
        alert("La auditoría quedó guardada en este dispositivo, pero no se confirmó la sincronización. Se volverá a intentar cuando haya conexión.");
      }
    }
  }

  state.selectedAudit = audit;
  state.draft = null;
  state.summary = false;
  state.currentPlan = null;
  state.view = "history";
  state.pendingDraft = null;
  state.aiStatus = "idle";
  await loadPublicImprovements(audit);
  render();
}

async function loadCloudPhotos(audit) {
  if (!cloudDb || !state.user) return audit;
  const answerMissing = (audit.answers || []).some((answer) => (answer.photos || []).some((photo) => !photo.dataUrl));
  const generalMissing = (audit.generalPhotos || []).some((photo) => !photo.dataUrl);
  if (!answerMissing && !generalMissing) return audit;
  try {
    const snapshot = await cloudDb.collection("audits").doc(audit.id).collection("photos").get();
    const photos = snapshot.docs.map((doc) => doc.data());
    const hydrated = {
      ...audit,
      answers: audit.answers.map((answer) => ({
        ...answer,
        photos: (answer.photos || []).map((photo) => ({ ...photo, ...photos.find((item) => item.id === photo.id) }))
      })),
      generalPhotos: (audit.generalPhotos || []).map((photo) => ({ ...photo, ...photos.find((item) => item.id === photo.id) }))
    };
    await idbPut("audits", hydrated);
    state.audits = state.audits.map((item) => item.id === hydrated.id ? hydrated : item);
    return hydrated;
  } catch (error) {
    console.error("Carga de evidencias", error);
    return audit;
  }
}

async function loadPublicImprovements(audit) {
  if (!cloudDb || !audit.publicId || !state.user) return audit;
  try {
    const snapshot = await cloudDb.collection("publicAudits").doc(audit.publicId).collection("improvements").orderBy("createdAt", "desc").get();
    const improvements = [];
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const photoSnapshot = await doc.ref.collection("photos").orderBy("order", "asc").get();
      improvements.push({ id: doc.id, ...data, photos: photoSnapshot.docs.map((photoDoc) => photoDoc.data()) });
    }
    audit.improvements = improvements;
    return audit;
  } catch (error) {
    console.warn("Carga de evidencias de mejora", error);
    audit.improvements = audit.improvements || [];
    return audit;
  }
}

async function selectAudit(id) {
  let audit = state.audits.find((item) => item.id === id);
  if (!audit) return;
  state.selectedAudit = audit;
  state.publishStatus = "";
  render();
  audit = await loadCloudPhotos(audit);
  audit = await loadPublicImprovements(audit);
  state.selectedAudit = audit;
  render();
}

async function publishEvidence() {
  if (!cloudDb || !state.user || !state.selectedAudit) {
    alert("Se necesita conexión con Firebase para generar el portal público de evidencias.");
    return;
  }
  state.publishStatus = "loading";
  render();
  try {
    let audit = await loadCloudPhotos(state.selectedAudit);
    const publicId = audit.publicId || publicUid();
    const publicUrl = publicUrlFor(publicId);
    const previous = state.audits.find((item) => item.area.id === audit.area.id && item.id !== audit.id && item.publicId);
    const publicRef = cloudDb.collection("publicAudits").doc(publicId);
    const publicDoc = {
      auditId: audit.id,
      area: audit.area,
      result: audit.result,
      completedAt: audit.completedAt || audit.createdAt,
      generalObservation: audit.generalObservation || "",
      generalAnalysis: audit.generalAnalysis || "",
      answers: (audit.answers || []).map((answer) => {
        const question = QUESTIONS.find((item) => item.id === answer.questionId);
        return {
          questionId: answer.questionId,
          score: Number(answer.score),
          criterion: question.criteria[answer.score],
          observation: answer.observation || "",
          photoCount: answer.photos?.length || 0
        };
      }),
      plan: (audit.plan || []).map((item) => ({
        questionId: item.questionId,
        title: item.title,
        score: item.score,
        finding: item.finding,
        actions: item.actions,
        target: item.target,
        priority: item.priority
      })),
      previous: previous ? { publicId: previous.publicId, result: previous.result, completedAt: previous.completedAt || previous.createdAt } : null,
      publishedAt: new Date().toISOString(),
      createdBy: state.user.uid,
      version: "1.5"
    };
    await publicRef.set(publicDoc, { merge: true });
    await cloudDb.collection("publicAreas").doc(audit.area.id).set({
      areaId: audit.area.id,
      publicId,
      completedAt: publicDoc.completedAt,
      updatedAt: publicDoc.publishedAt
    }, { merge: true });

    const photos = [];
    for (const answer of audit.answers || []) {
      for (let index = 0; index < (answer.photos || []).length; index++) photos.push({ photo: answer.photos[index], kind: "question", questionId: answer.questionId, order: answer.questionId * 100 + index });
    }
    for (let index = 0; index < (audit.generalPhotos || []).length; index++) photos.push({ photo: audit.generalPhotos[index], kind: "general", questionId: null, order: index });
    for (let i = 0; i < photos.length; i += 8) {
      await Promise.all(photos.slice(i, i + 8).map(({ photo, kind, questionId, order }) => publicRef.collection("photos").doc(photo.id).set({ id: photo.id, kind, questionId, order, dataUrl: photo.dataUrl, createdAt: photo.createdAt || new Date().toISOString() }, { merge: true })));
    }

    audit = { ...audit, publicId, publicUrl, publishedAt: publicDoc.publishedAt };
    await cloudDb.collection("audits").doc(audit.id).set({ publicId, publicUrl, publishedAt: publicDoc.publishedAt }, { merge: true });
    await idbPut("audits", audit);
    state.audits = state.audits.map((item) => item.id === audit.id ? audit : item);
    state.selectedAudit = audit;
    state.publishStatus = "success";
  } catch (error) {
    console.error("Publicación de evidencias", error);
    state.publishStatus = "error";
  }
  render();
}

function drawCurrentQr() {
  const canvas = document.getElementById("qrCanvas");
  if (!canvas || !state.selectedAudit?.publicId || !window.MPS_QR) return;
  window.MPS_QR.drawCanvas(canvas, state.selectedAudit.publicUrl || publicUrlFor(state.selectedAudit.publicId), { size: 320, dark: "#0b356d", level: "M" });
}

async function copyPublicLink() {
  const url = state.selectedAudit?.publicUrl || publicUrlFor(state.selectedAudit.publicId);
  try {
    await navigator.clipboard.writeText(url);
    alert("Enlace copiado.");
  } catch {
    const input = document.getElementById("publicUrl");
    input.select();
    document.execCommand("copy");
    alert("Enlace copiado.");
  }
}

async function copyPublicDirectory() {
  const url = publicDirectoryUrl();
  try {
    await navigator.clipboard.writeText(url);
    alert("Enlace general copiado.");
  } catch {
    prompt("Copia este enlace:", url);
  }
}

function openPublicDirectory() {
  window.open(publicDirectoryUrl(), "_blank", "noopener");
}

function downloadMasterQr() {
  const canvas = document.getElementById("masterQrCanvas");
  if (!canvas) return;
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "QR-General-Resultados-5S-MPS.png";
  link.click();
}

function downloadQr() {
  const canvas = document.getElementById("qrCanvas");
  if (!canvas) return;
  const area = state.selectedAudit.area.short.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  canvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `QR-Evidencias-5S-${area}-${new Date(state.selectedAudit.completedAt).toISOString().slice(0, 10)}.png`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }, "image/png");
}

async function submitImprovement() {
  if (!state.improvementComment.trim() && !state.improvementPhotos.length) {
    alert("Agrega un comentario o al menos una fotografía.");
    return;
  }
  state.improvementStatus = "loading";
  render();
  try {
    if (!state.user) await cloudAuth.signInAnonymously();
    const user = cloudAuth.currentUser;
    if (!user) throw new Error("No fue posible iniciar la sesión anónima.");
    const improvementId = uid();
    const ref = cloudDb.collection("publicAudits").doc(state.publicToken).collection("improvements").doc(improvementId);
    await ref.set({
      publicId: state.publicToken,
      comment: state.improvementComment.trim(),
      photoCount: state.improvementPhotos.length,
      status: "pending-review",
      createdAt: new Date().toISOString(),
      createdBy: user.uid
    });
    for (let index = 0; index < state.improvementPhotos.length; index++) {
      const photo = state.improvementPhotos[index];
      await ref.collection("photos").doc(photo.id).set({ id: photo.id, dataUrl: photo.dataUrl, order: index, createdAt: photo.createdAt });
    }
    state.improvementComment = "";
    state.improvementPhotos = [];
    state.improvementStatus = "success";
  } catch (error) {
    console.error("Evidencia opcional", error);
    state.improvementStatus = "error";
  }
  render();
}

function formatDate(value) {
  if (!value) return "Fecha no disponible";
  const date = value?.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; table[n] = c >>> 0; }
  return table;
})();
function crc32(bytes) { let crc = 0xffffffff; for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8); return (crc ^ 0xffffffff) >>> 0; }
function u16(value) { return [value & 255, (value >>> 8) & 255]; }
function u32(value) { return [value & 255, (value >>> 8) & 255, (value >>> 16) & 255, (value >>> 24) & 255]; }
function bytesFrom(text) { return new TextEncoder().encode(text); }
function makeZip(files) {
  const chunks = []; const central = []; let offset = 0;
  for (const file of files) {
    const name = bytesFrom(file.name); const data = typeof file.content === "string" ? bytesFrom(file.content) : file.content; const crc = crc32(data);
    const local = new Uint8Array([...u32(0x04034b50), ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0), ...name]);
    chunks.push(local, data);
    const header = new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(offset), ...name]);
    central.push(header); offset += local.length + data.length;
  }
  const centralSize = central.reduce((sum, item) => sum + item.length, 0);
  const end = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length), ...u32(centralSize), ...u32(offset), ...u16(0)]);
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
    rowXml.push(`<row r="${r}">${headers.map((h, cIndex) => { const value = row[h]; const ref = `${columnName(cIndex)}${r}`; return typeof value === "number" ? `<c r="${ref}"><v>${value}</v></c>` : `<c r="${ref}" t="inlineStr"><is><t>${xmlEscape(value)}</t></is></c>`; }).join("")}</row>`);
  });
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rowXml.join("")}</sheetData></worksheet>`;
}

function exportExcel() {
  const summary = state.audits.map((audit) => ({ Folio: audit.id, Fecha: formatDate(audit.completedAt || audit.createdAt), Área: audit.area.full, Auditor: audit.auditor, Resultado: audit.result / 100, Meta: 0.8, Estado: audit.result >= 80 ? "Meta alcanzada" : "Requiere mejora", "Fotos por pregunta": audit.answers.reduce((sum, answer) => sum + (answer.photos?.length || 0), 0), "Fotos generales": audit.generalPhotos?.length || 0, "Enlace de evidencias": audit.publicUrl || "No publicado" }));
  const detail = state.audits.flatMap((audit) => audit.answers.map((answer) => {
    const q = QUESTIONS.find((item) => item.id === answer.questionId);
    return { Folio: audit.id, Fecha: formatDate(audit.completedAt || audit.createdAt), Área: audit.area.full, Pregunta: `${q.id}. ${q.title}`, "Pregunta de auditoría": q.question, Calificación: Number(answer.score), "Criterio aplicado": q.criteria[answer.score], Observación: answer.observation || "", Evidencias: answer.photos.length };
  }));
  const plans = state.audits.flatMap((audit) => (audit.plan || []).flatMap((item) => item.actions.map((action, index) => ({ Folio: audit.id, Fecha: formatDate(audit.completedAt || audit.createdAt), Área: audit.area.full, Pregunta: `${item.questionId}. ${item.title}`, Calificación: item.score, Prioridad: item.priority, Hallazgo: item.finding, "Recomendación No.": index + 1, "Recomendación de mejora": action, Objetivo: item.target, Fuente: item.source }))));
  const evidence = state.audits.flatMap((audit) => [
    ...audit.answers.map((answer) => ({ Folio: audit.id, Área: audit.area.full, Tipo: "Pregunta", Pregunta: answer.questionId, "Cantidad de fotos": answer.photos?.length || 0, "Comentario general": "", "Enlace QR": audit.publicUrl || "" })),
    { Folio: audit.id, Área: audit.area.full, Tipo: "Vista general", Pregunta: "", "Cantidad de fotos": audit.generalPhotos?.length || 0, "Comentario general": audit.generalObservation || "", "Enlace QR": audit.publicUrl || "" }
  ]);
  const sheets = [{ name: "Resumen semanal", rows: summary }, { name: "Detalle auditoría", rows: detail }, { name: "Plan de mejora 5S", rows: plans }, { name: "Evidencias y QR", rows: evidence }];
  const files = [
    { name: "[Content_Types].xml", content: `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>` },
    { name: "_rels/.rels", content: `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
    { name: "xl/workbook.xml", content: `<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((sheet, i) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets></workbook>` },
    { name: "xl/_rels/workbook.xml.rels", content: `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
    { name: "xl/styles.xml", content: `<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0B356D"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs></styleSheet>` }
  ];
  sheets.forEach((sheet, i) => files.push({ name: `xl/worksheets/sheet${i + 1}.xml`, content: sheetXml(sheet.rows) }));
  const blob = makeZip(files);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Auditorias_5S_MPS_${new Date().toISOString().slice(0, 10)}.xlsx`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function editPlanItem(questionId) {
  const item = state.currentPlan.find((planItem) => planItem.questionId === Number(questionId));
  if (!item) return;
  const finding = prompt("Edita la descripción de lo observado:", item.finding);
  if (finding === null) return;
  const actions = prompt("Edita las recomendaciones. Escribe una por línea:", item.actions.join("\n"));
  item.finding = finding.trim() || item.finding;
  if (actions !== null) item.actions = actions.split(/\n+/).map((value) => value.trim()).filter(Boolean).slice(0, 5);
  render();
}

app.addEventListener("click", async (event) => {
  if (state.publicMode) {
    const removeImprovement = event.target.closest("[data-remove-improvement-photo]");
    if (removeImprovement) {
      state.improvementPhotos = state.improvementPhotos.filter((photo) => photo.id !== removeImprovement.dataset.removeImprovementPhoto);
      render();
      return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "toggle-improvement") { state.improvementOpen = !state.improvementOpen; state.improvementStatus = ""; render(); return; }
    if (action === "add-improvement-photo") { document.getElementById("improvementPhotoInput")?.click(); return; }
    if (action === "submit-improvement") { await submitImprovement(); return; }
    return;
  }

  if (state.tourMode) {
    const areaDot = event.target.closest("[data-tour-area]");
    if (areaDot) { await loadTourAudit(Number(areaDot.dataset.tourArea)); return; }
    const photoButton = event.target.closest("[data-tour-photo]");
    if (photoButton) { state.tourPhotoIndex = Number(photoButton.dataset.tourPhoto); render(); return; }
    const tourAction = event.target.closest("[data-action]")?.dataset.action;
    if (tourAction === "close-tour") { state.tourMode = false; state.tourAudit = null; if (document.fullscreenElement) await document.exitFullscreen().catch(() => {}); render(); return; }
    if (tourAction === "toggle-fullscreen") { if (document.fullscreenElement) await document.exitFullscreen().catch(() => {}); else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen().catch(() => {}); return; }
    if (tourAction === "tour-prev") { await changeTourArea(-1); return; }
    if (tourAction === "tour-next") { await changeTourArea(1); return; }
    if (tourAction === "tour-photo-prev") { const photos = tourPhotos(state.tourAudit); state.tourPhotoIndex = (state.tourPhotoIndex - 1 + photos.length) % photos.length; render(); return; }
    if (tourAction === "tour-photo-next") { const photos = tourPhotos(state.tourAudit); state.tourPhotoIndex = (state.tourPhotoIndex + 1) % photos.length; render(); return; }
    return;
  }

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
  const removeGeneral = event.target.closest("[data-remove-general-photo]");
  if (removeGeneral) {
    state.draft.generalPhotos = state.draft.generalPhotos.filter((photo) => photo.id !== removeGeneral.dataset.removeGeneralPhoto);
    await saveCurrentDraft(); render(); return;
  }
  const editPlan = event.target.closest("[data-edit-plan]");
  if (editPlan) { editPlanItem(editPlan.dataset.editPlan); return; }
  const removePlan = event.target.closest("[data-remove-plan]");
  if (removePlan) {
    state.currentPlan = state.currentPlan.filter((item) => item.questionId !== Number(removePlan.dataset.removePlan));
    render(); return;
  }
  const auditButton = event.target.closest("[data-audit]");
  if (auditButton) return selectAudit(auditButton.dataset.audit);
  const nav = event.target.closest("[data-view]");
  if (nav) { state.view = nav.dataset.view; state.selectedAudit = null; render(); return; }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "add-photo") return document.getElementById("photoInput")?.click();
  if (action === "add-general-photo") return document.getElementById("generalPhotoInput")?.click();
  if (action === "next") {
    const answer = state.draft.answers[state.draft.index];
    if (!answer.score) return;
    if (state.draft.index === QUESTIONS.length - 1) state.draft.stage = "general";
    else state.draft.index += 1;
    await saveCurrentDraft(); render(); return;
  }
  if (action === "skip-general" || action === "finish-general") {
    state.summary = true;
    state.currentPlan = buildPlan(state.draft.answers, state.draft.aiSuggestions || []);
    state.aiStatus = state.draft.aiAnalyzedAt ? "success" : "idle";
    await saveCurrentDraft(); render(); return;
  }
  if (action === "save-exit") {
    await saveCurrentDraft(); state.pendingDraft = { key: "draft", value: state.draft }; state.draft = null; state.view = "home"; render(); return;
  }
  if (action === "resume") { state.draft = normalizeDraft(state.pendingDraft.value); state.summary = false; state.currentPlan = null; render(); return; }
  if (action === "review") { state.summary = false; state.draft.stage = "questions"; state.draft.index = QUESTIONS.length - 1; render(); return; }
  if (action === "save-audit") return saveAudit();
  if (action === "analyze-ai") return analyzeWithAI(false);
  if (action === "export") return exportExcel();
  if (action === "publish-evidence") return publishEvidence();
  if (action === "copy-public-link") return copyPublicLink();
  if (action === "download-qr") return downloadQr();
  if (action === "start-tour") return startVisualTour(false);
  if (action === "start-tour-fullscreen") return startVisualTour(true);
  if (action === "open-public-directory") return openPublicDirectory();
  if (action === "copy-public-directory") return copyPublicDirectory();
  if (action === "download-master-qr") return downloadMasterQr();
  if (action === "back") {
    if (state.selectedAudit) state.selectedAudit = null;
    else if (state.summary) { state.summary = false; state.draft.stage = "general"; }
    else if (state.draft?.stage === "general") { state.draft.stage = "questions"; state.draft.index = QUESTIONS.length - 1; }
    else if (state.draft && state.draft.index > 0) state.draft.index -= 1;
    else if (state.draft) { await saveCurrentDraft(); state.pendingDraft = { key: "draft", value: state.draft }; state.draft = null; }
    render();
  }
});

window.addEventListener("online", () => {
  if (state.publicMode) return;
  if (state.cloudConfigured && cloudAuth && !state.user) {
    state.cloudEnabled = true;
    state.cloudStatus = "connecting";
    cloudAuth.signInAnonymously().catch(console.error);
  } else if (state.cloudEnabled && state.user) {
    state.cloudStatus = "connecting";
    syncPendingAudits().catch(console.error);
  }
  render();
});
window.addEventListener("offline", () => { if (!state.publicMode && state.cloudEnabled) state.cloudStatus = "offline"; render(); });

async function init() {
  if (state.publicMode) {
    await initPublicPortal();
  } else {
    try {
      const audits = await idbGetAll("audits");
      state.audits = audits.map((audit) => ({ ...audit, generalPhotos: audit.generalPhotos || [] })).sort(sortAudits);
      state.pendingDraft = await idbGet("settings", "draft");
      if (state.pendingDraft?.value) state.pendingDraft.value = normalizeDraft(state.pendingDraft.value);
    } catch (error) {
      console.error(error);
      alert("No fue posible abrir el almacenamiento local de la aplicación.");
    }
    await initCloud();
    state.loading = false;
    state.authReady = true;
    render();
  }
  if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("./sw.js").catch(console.error);
}

init();
