export default function Container({ children, className }) {
  return (
    <div className={`max-w-[1100px] mx-auto ${className}`}>{children}</div>
  );
}