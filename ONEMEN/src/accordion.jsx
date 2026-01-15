import { Children, useState } from "react";

export default function Accordion ({title, children}){
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div className="text-[1.1rem] border-b border-gray-500 mb-4 w-1/2">
            <div className="cursor-pointer" onClick = {() => setIsOpen(!isOpen)}>
                <h2>{title} <span><i className={`fa fa-angle-down ${isOpen ? 'rotate-180' : ''
                }`}></i></span></h2>
            </div>
            <div className={`text-[1rem] ${isOpen ? 'block' :'hidden'}`}>
                {children}
            </div>
        </div>
    );
}