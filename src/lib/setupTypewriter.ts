/**
 * Sets up a typewriter effect that reveals a target element when complete.
 * Listens for "typewriter:done" event and removes "hidden" class from target.
 * @param typewriterId - ID of the typewriter element
 * @param targetId - ID of the element to reveal after typing completes
 */
export function setupTypewriter(typewriterId: string, targetId: string) {
  const typewriter = document.getElementById(typewriterId);
  const target = document.getElementById(targetId);

  if (!typewriter || !target) return;

  typewriter.addEventListener(
    "typewriter:done",
    () => {
      setTimeout(() => {
        target.classList.remove("hidden");
      }, 150);
    },
    { once: true },
  );
}
