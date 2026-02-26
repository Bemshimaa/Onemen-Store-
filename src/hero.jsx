import heroImage from './assets/IMAGES/Hero-image-3.jpg'
import Button from './button'
import {Link} from 'react-router-dom'
export default function Hero(){
    return(
        <section className="hero relative md:h-[100vh] h-[97vh]">
           <img src={heroImage} alt="Hero-image" className='h-full w-full object-cover md:object-top saturate-10 contrast-90 blur-8'/>

           <div className='hero-text absolute bottom-[5%] left-1/2 -translate-x-1/2 flex flex-col items-center w-1/2 text-white'>
             <h1 className='text-5xl md:text-8xl leading-none text-center sm:text-white'>STREET STYLE UNLEASHED</h1>

             <Link to = "/Products"><Button className="py-3 px-4 border border-white-500" variant = "black">SHOP NOW</Button></Link>
           </div>
        </section>
    );
}