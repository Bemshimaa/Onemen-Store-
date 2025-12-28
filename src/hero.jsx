import heroImage from './assets/IMAGES/Hero-image-3.jpg'
import Button from './button'
import {Link} from 'react-router-dom'
export default function Hero(){
    return(
        <section className="hero flex flex-row relative h-[600px]">
           <img src={heroImage} alt="Hero-image" />

           <div className='hero-text absolute w-1/2 z-50  top-30 left-150 flex flex-col justify-center items-center'>
             <h1 className='text-[8rem] leading-none text-center'>STREET STYLE UNLEASHED</h1>

             <Link to = "/Products"><Button variant = "black">SHOP NOW</Button></Link>
           </div>
        </section>
    );
}