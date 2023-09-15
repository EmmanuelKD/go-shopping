export default function Logo({className,variant="normal"}:{className?:string,variant?:"normal"|"white"}){
    return(   <img
        className={`mx-auto h-10 md:h-14 w-auto  ${className}`}
        src={variant=="normal"?"/logo.png":"/logo-white.png"}
        alt="Your Company"
      />)
}