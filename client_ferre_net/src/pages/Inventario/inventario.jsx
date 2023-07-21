const FerreteriaCliente = () => {
    const [productos, setProductos] = React.useState([]);
    const [nuevoProducto, setNuevoProducto] = React.useState({
      cantidad: '',
      fechaEntrada: '',
      fechaUltimaActualizacion: '',
      id: '',
    });
  
    const agregarProducto = () => {
      const productoConId = { ...nuevoProducto, id: generarId() };
      setProductos([...productos, productoConId]);
      limpiarFormulario();
    };
  
    const generarId = () => {
      // Genera un ID único utilizando la fecha actual y un número aleatorio
      const timestamp = Date.now().toString();
      const numeroAleatorio = Math.floor(Math.random() * 1000).toString();
      return timestamp + numeroAleatorio;
    };
  
    const limpiarFormulario = () => {
      setNuevoProducto({
        cantidad: '',
        fechaEntrada: '',
        fechaUltimaActualizacion: '',
        id: '',
      });
    };
  
    return (
      <div className="container">
        <h1 className="title">Administrador de Inventario</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cantidad</th>
              <th>Fecha de Entrada</th>
              <th>Fecha de Última Actualización</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.fechaEntrada}</td>
                <td>{producto.fechaUltimaActualizacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Agregar Producto</h2>
        <form className="form">
          <label className="form-label">
            Cantidad:
            <input
              type="text"
              className="form-input"
              value={nuevoProducto.cantidad}
              onChange={(e) =>
                setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })
              }
            />
          </label>
          <label className="form-label">
            Fecha de Entrada:
            <input
              type="text"
              className="form-input"
              value={nuevoProducto.fechaEntrada}
              onChange={(e) =>
                setNuevoProducto({ ...nuevoProducto, fechaEntrada: e.target.value })
              }
            />
          </label>
          <label className="form-label">
            Fecha de Última Actualización:
            <input
              type="text"
              className="form-input"
              value={nuevoProducto.fechaUltimaActualizacion}
              onChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  fechaUltimaActualizacion: e.target.value,
                })
              }
            />
          </label>
          <button type="button" className="form-button" onClick={agregarProducto}>
            Agregar
          </button>
        </form>
      </div>
    );
  };
  
  ReactDOM.render(
    <FerreteriaCliente />,
    document.getElementById('root')
  );
  