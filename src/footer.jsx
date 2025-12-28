export default function Footer(){
    return(
        <footer className="mt-5 bg-black w-full h-[300px] text-white relative grid grid-cols-3 gap-2 items-center justify-items-center text-[1.2rem]">
            <h1 className="text-[13rem] leading-none absolute top-[55%] left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-20">ONEMEN</h1>
            <div className="pl-[15rem]">
                <h1 className="text-[2rem]">ONEMEN</h1>
                <p>ONEMEN: ONE OF NONE</p>
                <a href=""><i className="fa-brands fa-instagram"></i></a>
                <a href=""><i className="fa-brands fa-tiktok"></i></a>
            </div>

            <ul className="">
                <li><a href="">Tank-tops</a></li>
                <li><a href="">Tee-shirts</a></li>
                <li><a href="">Joggers</a></li>
            </ul>

            <ul className=" pr-[15rem]">
                <li><a href="">Size Guide</a></li>
                <li><a href="">Contact Us</a></li>
            </ul>
        </footer>
    );
}