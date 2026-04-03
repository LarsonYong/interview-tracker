
export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogEntry = {
  id: string;
  level: LogLevel;
  scope: string;
  message: string;
  meta?: unknown;
  timestamp: number;
  env: "dev" | "prod";
};

function createLogEntry(
  level: LogLevel,
  scope: string,
  message: string,
  meta?: unknown
): LogEntry {
  return {
    id: crypto.randomUUID(),
    level,
    scope,
    message,
    meta,
    timestamp: Date.now(),
    env: isDev ? "dev" : "prod",
  };
}

const isDev = import.meta.env.DEV;
// const isProd = import.meta.env.PROD;

function shouldLog(level: LogLevel): boolean {
    if (isDev) return true;

    return level === "warn" || level === "error"
}

function formatMessage(level: LogLevel, scope: string, message: string) {
    return `[${level.toUpperCase()}][${scope}] ${message}`;
}

const listeners = new Set<(entry: LogEntry) => void>();
const MAX_LOG_ENTRIES = 200;
const logBuffer: LogEntry[] = [];

function pushToBuffer(entry: LogEntry) {
  logBuffer.push(entry);

  if (logBuffer.length > MAX_LOG_ENTRIES) {
    logBuffer.shift();
  }
}

function notifyListeners(entry: LogEntry) {
  listeners.forEach((listener) => {
    listener(entry);
  });
}

function baseLog(
    level: LogLevel,
    scope: string,
    message: string,
    meta?: unknown
) {
    if (!shouldLog(level)) return;

    const entry = createLogEntry(level, scope, message, meta);
    pushToBuffer(entry);
    notifyListeners(entry);

    const formatted = formatMessage(level, scope, message);

    if (level === "error"){
        console.error(formatted, meta)
    }else if (level === "warn"){
        console.warn(formatted, meta)
    }else {
        console.log(formatted, meta)
    }
}

export const logger = {
  subscribe(listener: (entry: LogEntry) => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },

    getLogs() {
      return [...logBuffer];
    },

    clearLogs() {
      logBuffer.length = 0;
    },

  debug(scope: string, message: string, meta?: unknown) {
    baseLog("debug", scope, message, meta);
  },

  info(scope: string, message: string, meta?: unknown) {
    baseLog("info", scope, message, meta);
  },

  warn(scope: string, message: string, meta?: unknown) {
    baseLog("warn", scope, message, meta);
  },

  error(scope: string, message: string, meta?: unknown) {
    baseLog("error", scope, message, meta);
  },
};