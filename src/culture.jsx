import Button from './button'

export default function Culture (){
    return(
        <section className="mt-[2rem] h-[350px] bg-black text-white flex flex-col gap-2 items-center justify-center relative">
            <h1 className='p-0 text-[18rem] absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[0.7] opacity-10 border border-blue-500'>ONEMEN</h1>
            <p>Onemen: One of None</p>
            <Button variant ="white">Our Story</Button>
        </section>
    );
}