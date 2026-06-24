export function initSuppressWarnings() {
 if (typeof window === "undefined") return;

 const filterWarning = (message: string) => {
  const lowercaseMessage = message.toLowerCase();
  return (
   lowercaseMessage.includes("three.clock") ||
   lowercaseMessage.includes("three.timer") ||
   lowercaseMessage.includes("deprecated") ||
   lowercaseMessage.includes("three.webglprogram") ||
   lowercaseMessage.includes("accurately in double precision") ||
   lowercaseMessage.includes("x4122") ||
   lowercaseMessage.includes("devtools") ||
   lowercaseMessage.includes("[hmr]") ||
   lowercaseMessage.includes("hmr") ||
   lowercaseMessage.includes("tracking prevention") ||
   lowercaseMessage.includes("blocked access to storage")
  );
 };

 const methods: ("log" | "warn" | "error" | "info" | "debug")[] = [
  "log",
  "warn",
  "error",
  "info",
  "debug",
 ];

 methods.forEach((method) => {
  const original = console[method];
  // Avoid double wrapping
  if (original && !(original as any).__wrapped) {
   const wrapper = function (...args: unknown[]) {
    const message = args
     .map((arg) => {
      if (arg instanceof Error) return arg.stack || arg.message;
      return typeof arg === "object" && arg !== null
       ? JSON.stringify(arg)
       : String(arg);
     })
     .join(" ");
    if (filterWarning(message)) {
     return;
    }
    original.apply(console, args);
   };
   (wrapper as any).__wrapped = true;
   console[method] = wrapper;
  }
 });
}

// Run immediately upon import
initSuppressWarnings();
