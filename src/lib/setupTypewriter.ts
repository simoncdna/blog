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
