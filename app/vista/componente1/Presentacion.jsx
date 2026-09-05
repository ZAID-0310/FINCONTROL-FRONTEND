const Presentacion = ({nombre, rol}) => {
    return (
        <div className="Tarjeta_info">
            <h2>TITULO DE INFORMACION</h2>
            <p>{nombre}</p>
            <p>Rol: {rol}</p>
        </div>

    )
}
export default Presentacion;