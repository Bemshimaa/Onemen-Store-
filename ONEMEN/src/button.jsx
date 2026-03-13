export default function Button({ variant = "black", children, className, onClick, disabled }) {
  const baseStyles = "p-4 transition-all duration-300";

  const variants = {
    black: "bg-black text-white",
    white: "bg-white text-black",
  };

  const disabledStyles = disabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}