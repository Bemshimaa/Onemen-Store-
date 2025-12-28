export default function Button ({variant="black" , children, className, onClick }){

     const baseStyles = "p-4";

     const variants = {
        black: "bg-black text-white",
        white: "bg-white text-black",
     };
    return(

       
        <>
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`} href="index.html">{children}</button>
        </>
    );
}