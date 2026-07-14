import "./Button.css"
function Button ({children, funcion}) {
    
    return(
        <button className="boton"
        onClick={funcion}
        >{children}</button>
    )
}
export default Button
