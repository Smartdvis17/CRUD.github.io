import { useCallback, useRef, useState } from "react";
import { UsersTable } from "./components/UsersTable";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

// * ESTADO INICIAL DEL FORMULARIO
const inicialState = {
  name: "",
  email: "",
  imgUrl: "",
  body: "",
};
function App() {
  // ** ESTADO PARA GUARDAR LA DATA DEL FORMULARIO
  const [dataForm, setDataForm] = useState(inicialState);
  // ** ESTADO PARA VERIFICAR SI ES EDICION O CREACION
  const [isEditRegister, setIsEditRegister] = useState(false);
  //** ESTADO DE LOS REGISTROS
  const [registers, setRegisters] = useState([
    {
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      imgUrl:
        "https://randompicturegenerator.com/img/dog-generator/g99442cbd4e951ff69e7086fa4d26b258bd724db174492a2e621acb7edd2027fbb7c045d83d7bea73796a337514b0db49_640.jpg",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium",
    },
    {
      id: 2,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      imgUrl:
        "https://randompicturegenerator.com/img/dog-generator/g99442cbd4e951ff69e7086fa4d26b258bd724db174492a2e621acb7edd2027fbb7c045d83d7bea73796a337514b0db49_640.jpg",
      body: "est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et",
    },
  ]);
  const inputRef = useRef(null);
  const handleChange = useCallback(
    (e) => {
      setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    },
    [dataForm]
  );
  const actions = (e) => {
    e.preventDefault();
    isEditRegister ? updateRegister() : addRegister();
  };
  const addRegister = () => {
    const idRegister = registers.length
      ? registers[registers.length - 1].id + 1
      : 1;
    setRegisters([...registers, { id: idRegister, ...dataForm }]);
    resetState();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Registro creado con ID: ${idRegister}, !Exitoso¡`,
      showConfirmButton: false,
      timer: 3500,
    });
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999,
    });
  };
  const deleteRegister = (id) => {
    Swal.fire({
      title: "!Estas a punto de eliminar este registro¡",
      text: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#65a30d",
      confirmButtonText: "Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Registro Eliminado!",
          text: "El registro ha sido eliminado exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        });
        const newRegisters = registers.filter((register) => register.id !== id);
        setRegisters(newRegisters);
      }
    });
  };
 
  const selectRegister = (register) => {
    setDataForm(register);
    setIsEditRegister(true);
  };
  const updateRegister = () => {
    const newRegisters = registers.map((register) => {
      if (register.id === dataForm.id) {
        return dataForm;
      }
      return register;
    });
    setRegisters(newRegisters);
    resetState();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Registro actualizado con exito`,
      showConfirmButton: false,
      timer: 2500,
    });
  };
   const resetState = () => {
     setDataForm(inicialState);
     setIsEditRegister(false);
     inputRef.current.focus();
   };
  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center align-items-center">
        <h1 className="text-center">CRUD</h1>
        <div className="card col-6 ms-6">
          <div className="card-body">
            <form onSubmit={actions}>
              <div className="mb-3">
                {/* imput del name */}
                <label className="form label">Nombre:</label>
                <input
                  ref={inputRef}
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Ingrese el nombre"
                  value={dataForm.name}
                  required
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                {/* imput del Email */}
                <label className="form label">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Ingrese el nombre"
                  value={dataForm.email}
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                {/* imput del imgUrl */}
                <label className="form label">Url Image:</label>
                <input
                  className="form-control"
                  type="url"
                  name="imgUrl"
                  placeholder="Ingrese la url"
                  value={dataForm.imgUrl}
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                {/* imput del body */}
                <label className="form label">Body:</label>
                <textarea
                  className="form-control"
                  rows="auto"
                  name="body"
                  placeholder="Ingrese la descripción"
                  value={dataForm.body}
                  required
                  onChange={(e) => handleChange(e)}
                ></textarea>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary mt-3">
                    {isEditRegister ? "actualizar" : "crear"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <UsersTable
          registers={registers}
          deleteRegister={deleteRegister}
          selectRegister={selectRegister}
        />
      </div>
    </div>
  );
}

export default App;
