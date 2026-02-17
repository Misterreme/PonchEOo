import { useState } from 'react';
import { mockShifts } from '../data/mockData';

export default function ShiftsPage() {
  const [templates] = useState(mockShifts);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Turnos</h1>

      <h2 className="text-lg font-semibold mb-3">Plantillas de Turnos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {templates.map((t) => (
          <div key={t.id} className="card bg-base-200 p-4">
            <h3 className="font-bold">{t.name}</h3>
            <p className="text-sm">
              {t.startTime} - {t.endTime}
            </p>
            <p className="text-sm opacity-70">{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
