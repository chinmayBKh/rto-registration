function Toast({ type = "success", message }) {
    if (!message) return null;
  
    const base =
      "fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-sm animate-slideIn";
    const styles =
      type === "error"
        ? "bg-red-600 text-white"
        : "bg-green-600 text-white";
  
    return <div className={`${base} ${styles}`}>{message}</div>;
  }
  
  export default Toast;
  