import NewImage from "./assets/IMAGES/New-In-img.jpg";
import Button from "./button";
export default function New() {
  return (
    <section className="w-full h-[350px] md:h-[450px] lg:h-[100vh] relative">
      <img
        className="w-full h-full object-cover object-[100%_35%] saturate-35"
        src={NewImage}
        alt="new collection"
      />
      <div className="absolute bottom-[45%] left-1/2 -translate-x-1/2 md:bottom-[40%] md:right-1/4 flex flex-col items-center gap-1 text-white text-center lg:scale-[300%] md:sca">
        <h1 className="md:text-[3rem] lg:text-[4rem] text-[2rem] leading-none text-shadow-sm text-shadow-slate">NEW IN</h1>
        <p className="text-[0.8rem] lg:text-[1rem] lg:leading-none sm:text-[0.9rem] pb-2 text-shadow-sm text-shadow-slate">Shop From our latest release - INAGI</p>
        <Button variant="white" className="py-1 px-2 md:py-3 md:px-4 lg:py-2 lg:px-3 lg:text-[] shadow-sm shadow-black cursor-pointer">SHOP NOW</Button>
      </div>
    </section>
  );
}
