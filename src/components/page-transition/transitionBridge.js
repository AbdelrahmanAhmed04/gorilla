// Small pub/sub bridge so components can delay GSAP animations until the
// page transition reveal completes.
const listeners = new Set();
let revealed = false;

export function onReveal(cb) {
  if (revealed) {
    // already revealed — call immediately
    try {
      cb();
    } catch (e) {
      console.error(e);
    }
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function emitReveal() {
  revealed = true;
  for (const cb of Array.from(listeners)) {
    try {
      cb();
    } catch (e) {
      console.error(e);
    }
  }
  listeners.clear();
}

export function isRevealed() {
  return revealed;
}

export default { onReveal, emitReveal, isRevealed };
