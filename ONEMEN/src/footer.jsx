export default function Footer() {
  return (
    <footer className="bg-black py-20 text-white relative flex items-center justify-center overflow-hidden">
      {/* Ghosted Background Text */}
      <h1 className="md:text-[13rem] text-[9rem] leading-none absolute top-[50%] left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-10 pointer-events-none tracking-tighter">
        ONEMEN
      </h1>

      <div className="flex flex-col items-center justify-center gap-12 max-w-[1440px] mx-auto px-5 text-center relative z-10">
        
        {/* Contact Us Section */}
        <div className="flex flex-col gap-2">
          <a href="#" onClick={(e) => e.preventDefault()} className="font-['Bebas_Neue'] text-xl tracking-[0.2em] opacity-30 cursor-not-allowed">CONTACT US</a>
        </div>

        {/* Brand Section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl md:text-6xl font-['Bebas_Neue'] tracking-tighter">ONEMEN</h1>
          <p className="font-['Oswald'] text-xs md:text-sm tracking-[0.4em] text-gray-500 uppercase">ONEMEN: ONE OF ONE</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-row gap-12 text-2xl">
          <a 
            href="https://www.instagram.com/1men.directory/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a 
            href="https://www.tiktok.com/@1men.directory" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity"
          >
            <i className="fa-brands fa-tiktok"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
