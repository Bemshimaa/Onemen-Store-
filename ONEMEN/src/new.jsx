import NewImage from "./assets/IMAGES/New-In-img.jpg";
import Button from "./button";
export default function New() {
  return (
    <section className="w-full h-[350px] lg:h-[400px] relative">
      <img
        className="w-full h-full object-cover object-[center_40%]"
        src={NewImage}
        alt="new collection"
      />
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 md:top-[150px] md:right-1/4 flex flex-col items-center gap-1 text-white text-center">
        <h1 className="md:text-[3rem] lg:text-[4rem] text-[2rem] leading-none">NEW IN</h1>
        <p className="text-[0.8rem] lg:text-[1rem] lg:leading-none sm:text-[0.9rem] pb-2">Shop From our latest release - INAGI</p>
        <Button variant="white" className="py-1 px-2 md:py-3 md:px-4 lg:py-2 lg:px-3 lg:text-[]">SHOP NOW</Button>
      </div>
    </section>
  );
}
