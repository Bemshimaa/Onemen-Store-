export default function Footer() {
  return (
    <footer className="bg-black w-full h-[300px] text-white relative flex items-center justify-center">
      <h1 className="md:text-[13rem] text-[9rem] leading-none absolute top-[55%] left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-10">
        ONEMEN
      </h1>
      <div className=" grid grid-cols-3 gap-2 items-center justify-items-center text-[0.8rem] md:text-[1.2rem] max-w-[1440px] mx-auto ">
        <div className="">
          <h1 className="text-[2rem]">ONEMEN</h1>
          <p>ONEMEN: ONE OF NONE</p>
          <a href="https://www.instagram.com/1men.directory/?hl=en" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-tiktok"></i>
          </a>
        </div>

        <ul className="">
          <li>
            <a href="">Tank-tops</a>
          </li>
          <li>
            <a href="">Tee-shirts</a>
          </li>
          <li>
            <a href="">Joggers</a>
          </li>
        </ul>

        <ul className="">
          <li>
            <a href="">Size Guide</a>
          </li>
          <li>
            <a href="">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
