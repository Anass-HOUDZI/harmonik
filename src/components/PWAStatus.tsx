
import React, { useEffect, useState } from "react";

type QueueTask = {
  id: string;
  action: string;
  payload: any;
};

const LOCAL_QUEUE_KEY = "suitefamille-sync-queue";

function getQueue(): QueueTask[] {
  try {
    const q = localStorage.getItem(LOCAL_QUEUE_KEY);
    return q ? JSON.parse(q) : [];
  } catch {
    return [];
  }
}
function setQueue(q: QueueTask[]) {
  localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(q));
}

function useNetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const onStatus = () => setOnline(navigator.onLine);
    window.addEventListener("online", onStatus);
    window.addEventListener("offline", onStatus);
    return () => {
      window.removeEventListener("online", onStatus);
      window.removeEventListener("offline", onStatus);
    };
  }, []);
  return online;
}

// Simulé : check la présence de données locales
function useLocalCacheStatus() {
  const [cached, setCached] = useState(false);
  useEffect(() => {
    if ("caches" in window) {
      caches.has && caches.has("static-v2-suitefamille").then(setCached);
    }
  }, []);
  return cached;
}

export default function PWAStatus() {
  const online = useNetworkStatus();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [queued, setQueued] = useState<QueueTask[]>(getQueue());
  const cached = useLocalCacheStatus();

  // Sync queue auto on reconnect
  useEffect(() => {
    if (online && queued.length > 0) {
      // Simuler la sync auto
      setTimeout(() => {
        setQueue([]); // efface après sync simulée
        setQueued([]);
      }, 1500);
    }
  }, [online, queued.length]);

  // Nouvelle version du SW ?
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (e) => {
        if (e.data === "sw-updated") setUpdateAvailable(true);
      });
    }
  }, []);

  return (
    <div className="fixed z-50 top-3 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl shadow flex items-center gap-3 select-none">
      {!online && (
        <span role="img" aria-label="offline" className="text-red-400 text-xl">🔌</span>
      )}
      {online && (
        <span role="img" aria-label="online" className="text-green-500 text-xl">🌐</span>
      )}
      <span className="text-gray-700 font-medium">
        {online ? "Connecté" : "Mode hors-ligne activé"}
      </span>
      {updateAvailable && (
        <button className="ml-3 px-2 py-1 bg-blue-600 text-white rounded" onClick={() => window.location.reload()}>
          Nouvelle version disponible – Cliquez pour mettre à jour
        </button>
      )}
      {queued.length > 0 && (
        <span className="text-yellow-600 text-sm ml-3">
          {queued.length} actions en attente de synchronisation…
        </span>
      )}
      {cached && (
        <span className="text-green-500 text-xs ml-3">🟢 Cache local prêt</span>
      )}
    </div>
  );
}
