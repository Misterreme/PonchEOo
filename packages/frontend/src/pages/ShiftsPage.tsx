import { useState } from 'react';
import { mockShifts } from '../data/mockData';

export default function ShiftsPage() {
  const [templates] = useState(mockShifts);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Turnos</h1>

      {/* Shift Templates */}
      <h2 className="text-lg font-semibold mb-3">Plantillas de Turnos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {templates.map((t) => (
          <div key={t.id} className="card bg-base-200 p-4">
            <h3 className="font-bold">{t.name}</h3>
            <p className="text-sm">
              {t.startTime} - {t.endTime}
            </p>
            <p className="text-sm opacity-70">
              Tipo: {t.shiftType} | Descanso: {t.breakMinutes}min | Gracia: {t.gracePeriodMinutes}min
            </p>
          </div>
        ))}
      </div>

      {/* Recent Assignments */}
      <h2 className="text-lg font-semibold mb-3">Asignaciones Recientes</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-sm">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Turno</th>
              <th>Horario</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {assignments.slice(0, 20).map((a) => (
              <tr key={a.id}>
                <td>
                  {a.employee?.firstName} {a.employee?.lastName}
                </td>
                <td>{a.shiftTemplate?.name}</td>
                <td>
                  {a.shiftTemplate?.startTime} - {a.shiftTemplate?.endTime}
                </td>
                <td>{new Date(a.date).toLocaleDateString('es-DO')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
