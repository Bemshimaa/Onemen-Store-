import { useState } from "react";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-200 w-full py-4 last:border-b">
      <div 
        className="flex justify-between items-center cursor-pointer group" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-['Bebas_Neue'] tracking-wider uppercase group-hover:opacity-60 transition-all">
          {title}
        </h2>
        <i className={`fas fa-chevron-down text-sm transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}></i>
      </div>
      <div className={`mt-4 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="pb-4 font-['Oswald'] text-sm tracking-wide text-gray-600 uppercase">
          {children}
        </div>
      </div>
    </div>
  );
}