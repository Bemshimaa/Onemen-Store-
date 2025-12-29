import heroImage from './assets/IMAGES/Hero-image-3.jpg'
import Button from './button'
import {Link} from 'react-router-dom'
export default function Hero(){
    return(
        <section className="hero relative md:h-[600px] h-[50vh]">
           <img src={heroImage} alt="Hero-image" className='absolute inset-0 h-full'/>

           <div className='hero-text absolute top-[22%] right-[0.5%] md:top-[22%] md:right-[0.5%] flex flex-col items-center w-1/2 h-full z-10'>
             <h1 className='text-2xl md:text-8xl leading-none text-center'>STREET STYLE UNLEASHED</h1>

             <Link to = "/Products"><Button variant = "black">SHOP NOW</Button></Link>
           </div>
        </section>
    );
}