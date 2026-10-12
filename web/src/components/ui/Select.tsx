"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

export type SelectOption = { value: string; label: string; detail?: ReactNode };
export type SelectGroup = { label?: string; icon?: IconName; options: SelectOption[] };

/**
 * Styled replacement for <select>: the closed control looks like .form-field and
 * the open list matches the site (grouped headings with icons, two-line options,
 * highlighted and selected states). Follows the WAI-ARIA "select-only combobox"
 * pattern: arrows, Home/End, PageUp/PageDown, Enter/Space, Esc, Tab and
 * type-to-jump all work, and screen readers announce the active option.
 */
export function Select({
  id,
  value,
  onChange,
  groups,
  icon,
  variant = "field",
  ariaLabel,
  className = "",
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  groups: SelectGroup[];
  /** Icon shown at the start of the closed control */
  icon?: IconName;
  /** "field" matches form inputs; "pill" matches the round toolbar controls on /experiences */
  variant?: "field" | "pill";
  ariaLabel?: string;
  className?: string;
}) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const listId = `${baseId}-list`;
  const flat = useMemo(() => groups.flatMap((g) => g.options), [groups]);
  const selectedIndex = Math.max(0, flat.findIndex((o) => o.value === value));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(selectedIndex);
  const [up, setUp] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });

  const show = (index = selectedIndex) => {
    const r = button.current?.getBoundingClientRect();
    // Open upwards when there isn't room below (e.g. near the bottom of a phone screen).
    if (r) setUp(window.innerHeight - r.bottom < 300 && r.top > window.innerHeight - r.bottom);
    setActive(index);
    setOpen(true);
  };
  const choose = (index: number) => {
    const o = flat[index];
    if (o && o.value !== value) onChange(o.value);
    setOpen(false);
  };

  // Close when clicking or tapping anywhere else.
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  // Keep the highlighted option visible inside the list without scrolling the page.
  useEffect(() => {
    if (!open || !list.current) return;
    const el = list.current.querySelector<HTMLElement>(`#${CSS.escape(`${baseId}-opt-${active}`)}`);
    if (!el) return;
    const l = list.current;
    const head = el.closest("li[role=group]")?.querySelector<HTMLElement>("[data-group-label]")?.offsetHeight ?? 0;
    if (el.offsetTop - head < l.scrollTop) l.scrollTop = el.offsetTop - head - 4;
    else if (el.offsetTop + el.offsetHeight > l.scrollTop + l.clientHeight) l.scrollTop = el.offsetTop + el.offsetHeight - l.clientHeight + 4;
  }, [open, active, baseId]);

  const jumpTo = (key: string) => {
    const now = Date.now();
    typed.current = { text: (now - typed.current.at > 700 ? "" : typed.current.text) + key.toLowerCase(), at: now };
    const start = open ? active : selectedIndex;
    const order = [...flat.slice(start + 1), ...flat.slice(0, start + 1)];
    const hit = order.find((o) => o.label.toLowerCase().startsWith(typed.current.text));
    return hit ? flat.indexOf(hit) : -1;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = flat.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show(e.key === "ArrowUp" && !e.altKey ? Math.max(0, selectedIndex - 1) : selectedIndex);
      } else if (e.key.length === 1 && /\S/.test(e.key) && !e.ctrlKey && !e.metaKey) {
        const i = jumpTo(e.key);
        if (i >= 0) onChange(flat[i].value);
      }
      return;
    }
    const move = (i: number) => {
      e.preventDefault();
      setActive(Math.min(last, Math.max(0, i)));
    };
    switch (e.key) {
      case "ArrowDown": return move(active + 1);
      case "ArrowUp": return e.altKey ? (e.preventDefault(), choose(active)) : move(active - 1);
      case "Home": return move(0);
      case "End": return move(last);
      case "PageDown": return move(active + 8);
      case "PageUp": return move(active - 8);
      case "Enter":
      case " ":
        e.preventDefault();
        return choose(active);
      case "Escape":
        e.preventDefault();
        return setOpen(false);
      case "Tab":
        return choose(active);
      default:
        if (e.key.length === 1 && /\S/.test(e.key) && !e.ctrlKey && !e.metaKey) {
          const i = jumpTo(e.key);
          if (i >= 0) setActive(i);
        }
    }
  };

  const current = flat[selectedIndex];
  let n = -1;

  return (
    <div ref={root} className={`select ${variant === "pill" ? "select-pill" : "mt-1.5"} ${className}`}>
      <button
        ref={button}
        id={baseId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${baseId}-opt-${active}` : undefined}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={`select-trigger ${variant === "pill" ? "" : "form-field"} ${icon ? "has-icon" : ""}`}
      >
        {icon && <Icon name={icon} className="select-icon" />}
        <span className={`block truncate text-left ${current?.value === "" ? "text-ink-500" : ""}`}>{current?.label}</span>
        <span aria-hidden className="form-select-chevron select-chevron">
          <Icon name="chevron" className={`size-3.5 transition-transform duration-200 ${open ? "-rotate-90" : "rotate-90"}`} />
        </span>
      </button>
      <ul
        ref={list}
        id={listId}
        role="listbox"
        aria-labelledby={ariaLabel ? undefined : baseId}
        aria-label={ariaLabel}
        tabIndex={-1}
        hidden={!open}
        className={`select-list ${up ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"}`}
      >
        {groups.map((g, gi) => {
          const items = g.options.map((o) => {
            n += 1;
            const i = n;
            const isSelected = o.value === value;
            return (
              <li
                key={o.value || "__none"}
                id={`${baseId}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                data-active={i === active || undefined}
                onPointerMove={() => i !== active && setActive(i)}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => {
                  choose(i);
                  button.current?.focus();
                }}
                className="select-option"
              >
                <span className="min-w-0 flex-1">
                  <span className="select-option-label">{o.label}</span>
                  {o.detail && <span className="select-option-detail">{o.detail}</span>}
                </span>
                <Icon name="check" className="select-option-check" />
              </li>
            );
          });
          return g.label ? (
            <li key={g.label} role="group" aria-labelledby={`${baseId}-g-${gi}`} className="select-group">
              <div id={`${baseId}-g-${gi}`} data-group-label className="select-group-label">
                {g.icon && (
                  <span aria-hidden className="grid size-6 place-items-center rounded-lg bg-saffron-100 text-saffron-700">
                    <Icon name={g.icon} className="size-3.5" />
                  </span>
                )}
                {g.label}
                <span className="ml-auto font-medium normal-case tracking-normal text-ink-300">{g.options.length}</span>
              </div>
              <ul role="presentation">{items}</ul>
            </li>
          ) : (
            items
          );
        })}
      </ul>
    </div>
  );
}
