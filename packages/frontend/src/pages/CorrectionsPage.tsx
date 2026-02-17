import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockCorrections } from '../data/mockData';

export default function CorrectionsPage() {
  const { isSupervisor } = useAuth();
  const [corrections, setCorrections] = useState(mockCorrections);

  const handleApprove = (id: number) => {
    setCorrections(corrections.map(c => c.id === id ? { ...c, status: 'APPROVED' } : c));
  };

  const handleReject = (id: number) => {
    setCorrections(corrections.map(c => c.id === id ? { ...c, status: 'REJECTED' } : c));
  };

  const formatDateTime = (str: string) => {
    if (!str) return '-';
    return new Date(str).toLocaleString('es-DO', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Correcciones</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Estado</th>
              {isSupervisor && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {corrections.map((c) => (
              <tr key={c.id}>
                <td>{c.firstName} {c.lastName}</td>
                <td>{new Date(c.date).toLocaleDateString('es-DO')}</td>
                <td>{c.type}</td>
                <td>{c.description}</td>
                <td>
                  <span
                    className={`badge ${
                      c.status === 'PENDING'
                        ? 'badge-warning'
                        : c.status === 'APPROVED'
                          ? 'badge-success'
                          : 'badge-error'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                {isSupervisor && (
                  <td>
                    {c.status === 'PENDING' && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleApprove(c.id)}
                          className="btn btn-success btn-xs"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => handleReject(c.id)}
                          className="btn btn-error btn-xs"
                        >
                          Rechazar
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
