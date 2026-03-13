import Button from './button'

export default function Culture (){
    return(
        <section className="h-[350px] bg-black text-white flex flex-col gap-2 items-center justify-center relative animate-fade-up">
            {/* Top blend */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black to-transparent opacity-50 pointer-events-none"></div>

            <h1 className='p-0 text-[9rem] md:text-[18rem] absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[0.7] opacity-10'>ONEMEN</h1>
            <p className="md:text-[1rem] lg:text-[1.5rem] font-['Oswald'] uppercase tracking-[0.5em]">Onemen: One of One</p>
            <Button onClick={(e) => e.preventDefault()} className="py-2 px-6 font-['Bebas_Neue'] tracking-widest opacity-40 cursor-not-allowed hover-expand active:scale-95 transition-transform" variant ="white" disabled>Our Story</Button>

            {/* Bottom blend */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none"></div>
        </section>
    );
}