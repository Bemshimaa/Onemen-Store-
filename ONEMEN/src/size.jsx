

export default function Size ({className, children, onClick}){
    return(
        <div className="flex ">
            <button onClick={onClick} className={`py-3 px-4 ${className} cursor-pointer border border-black-500`}>{children}</button>
        </div>
    );
}