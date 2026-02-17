import { useState } from 'react';
import { mockEmployees } from '../data/mockData';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeCode: '',
    firstName: '',
    lastName: '',
    email: '',
    password: 'password123',
    role: 'EMPLOYEE' as const,
    hireDate: new Date().toISOString().split('T')[0],
    hourlyRate: 200,
  });

  const handleCreate = () => {
    // Simulate API call
    const newEmployee = {
      id: employees.length + 1,
      ...formData,
      department: 'General',
      status: 'ACTIVE',
    };
    setEmployees([...employees, newEmployee]);
    setShowModal(false);
    setFormData({
      employeeCode: '',
      firstName: '',
      lastName: '',
      email: '',
      password: 'password123',
      role: 'EMPLOYEE',
      hireDate: new Date().toISOString().split('T')[0],
      hourlyRate: 200,
    });
  };

  const handleDeactivate = (id: number) => {
    if (!confirm('Desactivar este empleado?')) return;
    // Simulate API call
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Empleados</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          + Nuevo Empleado
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Departamento</th>
              <th>Tarifa/Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employeeCode}</td>
                <td>
                  {emp.firstName} {emp.lastName}
                </td>
                <td>{emp.email}</td>
                <td>
                  <span className={`badge ${emp.role === 'SUPERVISOR' ? 'badge-primary' : 'badge-ghost'}`}>
                    {emp.role}
                  </span>
                </td>
                <td>{emp.department || '-'}</td>
                <td>RD${Number(emp.hourlyRate).toFixed(2)}</td>
                <td>
                  <span className={`badge ${emp.status === 'ACTIVE' ? 'badge-success' : 'badge-error'}`}>
                    {emp.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  {emp.status === 'ACTIVE' && (
                    <button
                      onClick={() => handleDeactivate(emp.id)}
                      className="btn btn-error btn-xs"
                    >
                      Desactivar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Employee Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Nuevo Empleado</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label"><span className="label-text">Código</span></label>
                <input
                  type="text"
                  className="input input-bordered input-sm"
                  placeholder="EMP-006"
                  value={formData.employeeCode}
                  onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Rol</span></label>
                <select
                  className="select select-bordered select-sm"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                >
                  <option value="EMPLOYEE">Empleado</option>
                  <option value="SUPERVISOR">Supervisor</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Nombre</span></label>
                <input
                  type="text"
                  className="input input-bordered input-sm"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Apellido</span></label>
                <input
                  type="text"
                  className="input input-bordered input-sm"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="form-control col-span-2">
                <label className="label"><span className="label-text">Email</span></label>
                <input
                  type="email"
                  className="input input-bordered input-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Fecha Ingreso</span></label>
                <input
                  type="date"
                  className="input input-bordered input-sm"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Tarifa/Hora (RD$)</span></label>
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setShowModal(false)} className="btn btn-ghost">
                Cancelar
              </button>
              <button onClick={handleCreate} className="btn btn-primary">
                Crear
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
