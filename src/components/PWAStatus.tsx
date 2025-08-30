
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
    if ("caches" in window && caches.keys) {
      caches.keys().then(cacheNames => {
        setCached(cacheNames.some(name => name.includes("suitefamille")));
      }).catch(() => setCached(false));
    } else {
      // Fallback pour les navigateurs sans support cache
      setCached(!!localStorage.getItem('app-cached'));
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
    <div className="w-full bg-white border-t border-gray-200 py-2 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs">
        {!online && (
          <span role="img" aria-label="offline" className="text-red-400 text-sm">🔌</span>
        )}
        {online && (
          <span role="img" aria-label="online" className="text-green-500 text-sm">🌐</span>
        )}
        <span className="text-gray-600 font-medium">
          {online ? "Connecté" : "Mode hors-ligne"}
        </span>
        {updateAvailable && (
          <button className="ml-2 px-2 py-1 bg-blue-600 text-white rounded text-xs" onClick={() => window.location.reload()}>
            Mise à jour disponible
          </button>
        )}
        {queued.length > 0 && (
          <span className="text-yellow-600 ml-2">
            {queued.length} en attente
          </span>
        )}
        {cached && (
          <span className="text-green-500 ml-2">🟢 Cache prêt</span>
        )}
      </div>
    </div>
  );
}
