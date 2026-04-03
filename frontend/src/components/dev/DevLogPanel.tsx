import { useEffect, useMemo, useRef, useState } from "react";
import {
  logger,
  type LogEntry,
  type LogLevel,
} from "../../lib/logger";

const MAX_PANEL_LOGS = 200;

type LevelFilter = "all" | LogLevel;

const LEVEL_FILTERS: LevelFilter[] = [
  "all",
  "debug",
  "info",
  "warn",
  "error",
];

function isNearBottom(el: HTMLDivElement) {
  return el.scrollHeight - el.scrollTop - el.clientHeight < 40;
}

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString();
}

function levelLabel(level: LevelFilter) {
  return level === "all" ? "All" : level.toUpperCase();
}

function levelToneClasses(level: LogLevel) {
  switch (level) {
    case "debug":
      return "bg-black/[0.04] text-black/60 border-black/5";
    case "info":
      return "bg-sky-500/10 text-sky-700 border-sky-500/10";
    case "warn":
      return "bg-amber-500/12 text-amber-700 border-amber-500/10";
    case "error":
      return "bg-rose-500/12 text-rose-700 border-rose-500/10";
    default:
      return "bg-black/[0.04] text-black/60 border-black/5";
  }
}

function segmentClasses(isActive: boolean) {
  return [
    "relative rounded-full px-3 py-1.5 text-[11px] font-medium transition",
    isActive
      ? "bg-white text-black shadow-sm"
      : "text-black/55 hover:text-black/75",
  ].join(" ");
}

function scopeChipClasses(isActive: boolean) {
  return [
    "rounded-full border px-3 py-1.5 text-[11px] font-medium transition",
    isActive
      ? "bg-white text-black shadow-sm border-black/10"
      : "bg-black/[0.04] text-black/55 border-black/8 hover:text-black/75",
  ].join(" ");
}

function getDurationValue(meta: unknown): number | null {
  if (!meta || typeof meta !== "object") return null;

  const maybeDuration = (meta as Record<string, unknown>).duration;
  return typeof maybeDuration === "number" ? maybeDuration : null;
}

function getDurationToneClasses(duration: number) {
  if (duration >= 800) {
    return "text-rose-700 bg-rose-500/10 border-rose-500/10";
  }

  if (duration >= 200) {
    return "text-amber-700 bg-amber-500/10 border-amber-500/10";
  }

  return "text-black/55 bg-black/[0.04] border-black/5";
}

function getMetaWithoutDuration(meta: unknown): unknown {
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) {
    return meta;
  }

  const { duration, ...rest } = meta as Record<string, unknown>;
  return Object.keys(rest).length > 0 ? rest : null;
}

function stringifySearchableMeta(meta: unknown) {
  if (meta === undefined || meta === null) return "";
  if (typeof meta === "string") return meta;

  try {
    return JSON.stringify(meta, null, 2);
  } catch {
    return String(meta);
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${escapeRegExp(query)})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === query.toLowerCase();

    if (!isMatch) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    return (
      <mark
        key={`${part}-${index}`}
        className="rounded bg-amber-200/80 px-0.5 text-inherit"
      >
        {part}
      </mark>
    );
  });
}

export function DevLogPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>(() => logger.getLogs());
  const [followLatest, setFollowLatest] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = logger.subscribe((entry) => {
      setLogs((prev) => {
        const next = [...prev, entry];
        return next.length > MAX_PANEL_LOGS
          ? next.slice(-MAX_PANEL_LOGS)
          : next;
      });

      if (!followLatest) {
        setUnreadCount((count) => count + 1);
      }
    });

    return unsubscribe;
  }, [followLatest]);

  const scopes = useMemo(() => {
    const set = new Set<string>();
    logs.forEach((log) => set.add(log.scope));
    return Array.from(set);
  }, [logs]);

  const filteredLogs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return logs.filter((log) => {
      const levelMatch =
        levelFilter === "all" || log.level === levelFilter;

      const scopeMatch =
        selectedScopes.length === 0 ||
        selectedScopes.includes(log.scope);

      const searchableText = [
        log.level,
        log.scope,
        log.message,
        stringifySearchableMeta(log.meta),
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      return levelMatch && scopeMatch && searchMatch;
    });
  }, [logs, levelFilter, selectedScopes, searchQuery]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isOpen || !followLatest) return;

    el.scrollTop = el.scrollHeight;
  }, [filteredLogs, isOpen, followLatest]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isOpen) return;

    el.scrollTop = el.scrollHeight;
  }, [isOpen, levelFilter, selectedScopes, searchQuery]);

  function handleScroll() {
    const el = containerRef.current;
    if (!el) return;

    const nearBottom = isNearBottom(el);
    setFollowLatest(nearBottom);

    if (nearBottom) {
      setUnreadCount(0);
    }
  }

  function scrollToBottom() {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
    setFollowLatest(true);
    setUnreadCount(0);
  }

  function handleClear() {
    logger.clearLogs();
    setLogs([]);
    setFollowLatest(true);
    setUnreadCount(0);
  }

  function toggleScope(scope: string) {
    setSelectedScopes((prev) => {
      if (prev.includes(scope)) {
        return prev.filter((item) => item !== scope);
      }

      return [...prev, scope];
    });
  }

  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div className="relative w-[500px] rounded-[24px] border border-white/60 bg-white/78 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold tracking-[-0.01em] text-black">
              Dev Log Panel
            </div>
            <div className="mt-1 text-xs text-black/55">
              Showing {filteredLogs.length} / {logs.length} logs
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] font-medium text-black/70 transition hover:bg-black/[0.04]"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] font-medium text-black/70 transition hover:bg-black/[0.04]"
            >
              {isOpen ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>

        {isOpen ? (
          <>
            <div className="mt-4">
              <div className="inline-flex rounded-full border border-black/8 bg-black/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                {LEVEL_FILTERS.map((level) => {
                  const isActive = levelFilter === level;

                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setLevelFilter(level)}
                      className={segmentClasses(isActive)}
                    >
                      {levelLabel(level)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3">
              <div className="inline-flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedScopes([])}
                  className={scopeChipClasses(selectedScopes.length === 0)}
                >
                  All
                </button>

                {scopes.map((scope) => {
                  const isActive = selectedScopes.includes(scope);

                  return (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => toggleScope(scope)}
                      className={scopeChipClasses(isActive)}
                    >
                      {scope}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center rounded-[18px] border border-white/70 bg-white/75 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                <svg
                  className="h-4 w-4 shrink-0 text-black/35"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14.1667 14.1667L17.5 17.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="8.75"
                    cy="8.75"
                    r="5.75"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs, scope, message, meta..."
                  className="ml-2 w-full bg-transparent text-xs text-black/85 outline-none placeholder:text-black/35"
                />

                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="ml-2 rounded-full px-2 py-1 text-[11px] text-black/45 transition hover:bg-black/[0.04] hover:text-black/70"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>

            {!followLatest && unreadCount > 0 ? (
              <button
                type="button"
                onClick={scrollToBottom}
                className="absolute bottom-6 right-6 z-10 rounded-full border border-black/10 bg-white/95 px-3 py-1.5 text-[11px] font-medium text-black/75 shadow-lg transition hover:bg-black/[0.04]"
              >
                ↓ Jump to latest ({unreadCount})
              </button>
            ) : null}

            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="mt-4 max-h-80 overflow-y-auto rounded-[18px] border border-black/8 bg-black/[0.03] p-2"
            >
              {filteredLogs.length === 0 ? (
                <div className="px-3 py-6 text-center text-xs text-black/45">
                  No logs for current filters
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredLogs.map((log) => {
                    const duration = getDurationValue(log.meta);
                    const metaWithoutDuration = getMetaWithoutDuration(log.meta);
                    const metaText =
                      metaWithoutDuration !== null &&
                      metaWithoutDuration !== undefined
                        ? stringifySearchableMeta(metaWithoutDuration)
                        : "";

                    return (
                      <div
                        key={log.id}
                        className="rounded-2xl border border-black/8 bg-white/88 px-3 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.55)]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={[
                                "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]",
                                levelToneClasses(log.level),
                              ].join(" ")}
                            >
                              {log.level}
                            </span>

                            <span className="text-[11px] font-medium text-black/60">
                              {highlightText(log.scope, searchQuery)}
                            </span>

                            {duration !== null ? (
                              <span
                                className={[
                                  "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                                  getDurationToneClasses(duration),
                                ].join(" ")}
                              >
                                {duration}ms
                              </span>
                            ) : null}
                          </div>

                          <span className="text-[11px] text-black/45">
                            {formatTime(log.timestamp)}
                          </span>
                        </div>

                        <div className="mt-1.5 text-xs leading-5 text-black/85">
                          {highlightText(log.message, searchQuery)}
                        </div>

                        {metaText ? (
                          <pre className="mt-2 overflow-x-auto rounded-xl border border-black/6 bg-black/[0.03] px-2.5 py-2 text-[10px] leading-4 text-black/60 whitespace-pre-wrap break-words">
                            {highlightText(metaText, searchQuery)}
                          </pre>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}