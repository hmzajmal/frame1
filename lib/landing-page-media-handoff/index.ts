import {
  MEDIA_HANDOFF_DATABASE_NAME,
  MEDIA_HANDOFF_MAX_AGE_MS,
  MEDIA_HANDOFF_QUERY_PARAM,
  MEDIA_HANDOFF_RECORD_VERSION,
  MEDIA_HANDOFF_STORE_NAME,
} from "./landing-page-media-handoff.constants";
import type { MediaHandoffFile, MediaHandoffRecord } from "./landing-page-media-handoff.types";

function openMediaHandoffDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(MEDIA_HANDOFF_DATABASE_NAME, 1);
    openRequest.onupgradeneeded = () => {
      if (!openRequest.result.objectStoreNames.contains(MEDIA_HANDOFF_STORE_NAME)) {
        openRequest.result.createObjectStore(MEDIA_HANDOFF_STORE_NAME);
      }
    };
    openRequest.onsuccess = () => resolve(openRequest.result);
    openRequest.onerror = () => reject(openRequest.error);
  });
}

function createMediaHandoffId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function deleteExpiredMediaHandoffs(store: IDBObjectStore) {
  const oldestKeptCreatedAt = Date.now() - MEDIA_HANDOFF_MAX_AGE_MS;
  const cursorRequest = store.openCursor();
  cursorRequest.onsuccess = () => {
    const cursor = cursorRequest.result;
    if (!cursor) return;
    const record = cursor.value as Partial<MediaHandoffRecord> | undefined;
    if (typeof record?.createdAt !== "number" || record.createdAt < oldestKeptCreatedAt) {
      cursor.delete();
    }
    cursor.continue();
  };
}

async function writeMediaHandoff(mediaFiles: MediaHandoffFile[]): Promise<string> {
  const database = await openMediaHandoffDatabase();
  const handoffId = createMediaHandoffId();
  const record: MediaHandoffRecord = {
    v: MEDIA_HANDOFF_RECORD_VERSION,
    id: handoffId,
    createdAt: Date.now(),
    items: mediaFiles.map(({ slot, file }) => ({
      slot,
      type: file.type,
      name: file.name,
      size: file.size,
      blob: file,
    })),
  };

  return new Promise<string>((resolve, reject) => {
    const transaction = database.transaction(MEDIA_HANDOFF_STORE_NAME, "readwrite");
    const store = transaction.objectStore(MEDIA_HANDOFF_STORE_NAME);
    deleteExpiredMediaHandoffs(store);
    store.put(record, handoffId);
    transaction.oncomplete = () => {
      database.close();
      resolve(handoffId);
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

export async function navigateToStudioWithMedia(href: string, mediaFiles: MediaHandoffFile[]) {
  if (mediaFiles.length === 0) {
    window.location.href = href;
    return;
  }

  try {
    const handoffId = await writeMediaHandoff(mediaFiles);
    const url = new URL(href, window.location.href);
    url.searchParams.set(MEDIA_HANDOFF_QUERY_PARAM, handoffId);
    window.location.href = url.toString();
  } catch {
    window.location.href = href;
  }
}
