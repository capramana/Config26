export const GUEST_BOOK_BACK_CLOSED_STEP = -1;

export const GUEST_BOOK_TURN_MS = 450;
export const GUEST_BOOK_COVER_TURN_MS = 600;
export const GUEST_BOOK_SEARCH_FLIP_STAGGER_RATIO = 0.15;
/** Enter-to-submit: scale down/up, then pause before riffle (Enter only). */
export const GUEST_BOOK_SEARCH_SUBMIT_PULSE_DOWN_MS = 75;
export const GUEST_BOOK_SEARCH_SUBMIT_PULSE_UP_MS = 40;
export const GUEST_BOOK_SEARCH_SUBMIT_PULSE_MS =
  GUEST_BOOK_SEARCH_SUBMIT_PULSE_DOWN_MS + GUEST_BOOK_SEARCH_SUBMIT_PULSE_UP_MS;
/** After the pill pulse finishes, before navigation/riffle. */
export const GUEST_BOOK_SEARCH_SUBMIT_PULSE_DELAY_MS = 200;
export const GUEST_BOOK_SEARCH_SUBMIT_BEFORE_RIFFLE_MS =
  GUEST_BOOK_SEARCH_SUBMIT_PULSE_MS + GUEST_BOOK_SEARCH_SUBMIT_PULSE_DELAY_MS;
export const GUEST_BOOK_ANIMATION_BUFFER_MS = 50;
export const GUEST_BOOK_FRONT_COVER_IDLE_HINT_MS = 15_000;
/** Demo route: surface the open hint sooner for live walkthroughs. */
export const GUEST_BOOK_DEMO_FRONT_COVER_IDLE_HINT_MS = 2_000;
export const GUEST_BOOK_CLICK_HINT_FADE_MS = 250;
export const GUEST_BOOK_NAVIGATION_WAIT_TIMEOUT_MS = 30_000;

const TURN_EASE = [0.45, 0, 0.25, 1] as const;

export const GUEST_BOOK_TURN_TRANSITION = {
  duration: GUEST_BOOK_TURN_MS / 1000,
  ease: TURN_EASE,
} as const;

export const GUEST_BOOK_COVER_TURN_TRANSITION = {
  duration: GUEST_BOOK_COVER_TURN_MS / 1000,
  ease: TURN_EASE,
} as const;

export function guestBookPause(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export async function guestBookWaitUntil(
  condition: () => boolean,
  options?: { intervalMs?: number; timeoutMs?: number },
): Promise<boolean> {
  const intervalMs = options?.intervalMs ?? 40;
  const timeoutMs = options?.timeoutMs;
  const startedAt = timeoutMs !== undefined ? performance.now() : null;

  while (!condition()) {
    if (
      startedAt !== null &&
      timeoutMs !== undefined &&
      performance.now() - startedAt >= timeoutMs
    ) {
      return false;
    }
    await guestBookPause(intervalMs);
  }
  return true;
}

export function guestBookAfterCoverAnimationMs(): number {
  return GUEST_BOOK_COVER_TURN_MS + GUEST_BOOK_ANIMATION_BUFFER_MS;
}

/** Clicks on these targets should not trigger backdrop dismiss. */
export const GUEST_BOOK_INTERACTIVE_SELECTORS = [
  ".guest-book-search",
  ".guest-book-turn-margin",
  ".guest-book-turn-surface",
  ".guest-book-leather-panel--interactive",
  ".guest-book-back-cover--interactive",
  ".guest-book-page",
  "[data-guest-book-drawing]",
  ".guest-book-contributor",
] as const;

export function isGuestBookInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return GUEST_BOOK_INTERACTIVE_SELECTORS.some((selector) =>
    target.closest(selector),
  );
}
