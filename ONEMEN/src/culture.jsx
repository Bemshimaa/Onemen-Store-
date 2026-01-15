import Button from './button'

export default function Culture (){
    return(
        <section className="h-[350px] bg-black text-white flex flex-col gap-2 items-center justify-center relative">
            <h1 className='p-0 text-[9rem] md:text-[18rem] absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[0.7] opacity-10'>ONEMEN</h1>
            <p className='md:text-[1rem] lg:text-[1.5rem]'>Onemen: One of None</p>
            <Button className="py-1 px-2 md:py-3 md:px-4 lg:py-2 lg:px-3 lg:text-[1rem]" variant ="white">Our Story</Button>
        </section>
    );
}