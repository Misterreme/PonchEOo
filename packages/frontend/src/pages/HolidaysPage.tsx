import { useState } from 'react';
import { mockHolidays } from '../data/mockData';

export default function HolidaysPage() {
  const [holidays] = useState(mockHolidays);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Feriados</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Recurrente</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((h) => (
              <tr key={h.id}>
                <td>
                  {new Date(h.date).toLocaleDateString('es-DO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td>{h.name}</td>
                <td>{h.isRecurring ? 'Si' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
