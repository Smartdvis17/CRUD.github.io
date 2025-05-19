/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react/dist/iconify.js'


export const UsersTable = ({ registers, deleteRegister, selectRegister }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped mt-5 mb-5">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Url Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {registers.map((register, index) => (
            <tr key={register.id}>
              <td>{index + 1}</td>
              <td>{register.name}</td>
              <td>{register.email}</td>
              <td>
                <img src={register.imgUrl} width="150px" />
              </td>
              <td>{register.body}</td>
              <td>
                <Icon
                  icon="lucide:trash-2"
                  color="#dc2626"
                  fontSize={20}
                  className="lucide me-2"
                  onClick={() => deleteRegister(register.id)}
                />
                <Icon
                  icon="lucide:clipboard-pen-line"
                  color="#0d9488"
                  fontSize={20}
                  className="lucide me-2"
                  onClick={() => selectRegister(register)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
