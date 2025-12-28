import NewImage from "./assets/IMAGES/New-In-img.jpg";
import Button from "./button";
export default function New() {
  return (
    <section className="w-full h-[500px] mt-[2rem] relative">
      <img
        className="w-full h-full object-cover object-[center_40%]"
        src={NewImage}
        alt="new collection"
      />
      <div className="absolute top-[150px] right-1/4 flex flex-col items-center gap-1">
        <h1 className="text-[7rem] leading-none">NEW IN</h1>
        <p>Shop From our latest release - INAGI</p>
        <Button>SHOP NOW</Button>
      </div>
    </section>
  );
}
