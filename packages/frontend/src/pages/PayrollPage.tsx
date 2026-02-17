import { useState } from 'react';
import { mockPayroll } from '../data/mockData';

export default function PayrollPage() {
  const [summaries] = useState(mockPayroll);

  const formatMoney = (val: number) => `RD$${Number(val).toFixed(2)}`;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Nómina</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Período</th>
              <th>Horas</th>
              <th>Tarifa/hr</th>
              <th>Bruto</th>
              <th>Deducciones</th>
              <th>Neto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((summary) => (
              <tr key={summary.id}>
                <td>{summary.firstName} {summary.lastName}</td>
                <td>{new Date(summary.period).toLocaleDateString('es-DO')}</td>
                <td>{summary.hoursWorked}h</td>
                <td>{formatMoney(summary.hourlyRate)}</td>
                <td className="font-semibold">{formatMoney(summary.grossSalary)}</td>
                <td>{formatMoney(summary.deductions)}</td>
                <td className="font-bold text-green-600">{formatMoney(summary.netSalary)}</td>
                <td>
                  <span className={`badge ${
                    summary.status === 'PAID' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {summary.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {summaries.length === 0 && (
        <div className="alert">
          <span>No hay registros de nómina</span>
        </div>
      )}
    </div>
  );
}
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nomina</h1>

      <div className="card bg-base-200 p-4 mb-6">
        <h2 className="font-semibold mb-3">Generar Nomina</h2>
        <div className="flex gap-3 items-end flex-wrap">
          <div className="form-control">
            <label className="label"><span className="label-text">Inicio</span></label>
            <input
              type="date"
              className="input input-bordered input-sm"
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Fin</span></label>
            <input
              type="date"
              className="input input-bordered input-sm"
              value={periodEnd}
              onChange={(e) => setPeriodEnd(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Tipo</span></label>
            <select
              className="select select-bordered select-sm"
              value={periodType}
              onChange={(e) => setPeriodType(e.target.value as 'WEEKLY' | 'BIWEEKLY')}
            >
              <option value="WEEKLY">Semanal</option>
              <option value="BIWEEKLY">Quincenal</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            className={`btn btn-primary btn-sm ${generating ? 'loading' : ''}`}
            disabled={generating}
          >
            Generar
          </button>

          <button
            onClick={() => fetchPayroll()}
            className="btn btn-ghost btn-sm"
          >
            Ver registros
          </button>

          <button
            onClick={handleExportCsv}
            className={`btn btn-outline btn-sm ${exportingCsv ? 'loading' : ''}`}
            disabled={exportingCsv}
          >
            Exportar CSV
          </button>

          <button
            onClick={handleExportPdf}
            className={`btn btn-outline btn-sm ${exportingPdf ? 'loading' : ''}`}
            disabled={exportingPdf}
          >
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra table-sm">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Depto.</th>
              <th>Total Horas</th>
              <th>Regular</th>
              <th>Extras</th>
              <th>Noche</th>
              <th>Feriado</th>
              <th>Bruto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((s) => (
              <tr key={s.id}>
                <td>
                  {s.employee?.firstName} {s.employee?.lastName}
                </td>
                <td>{s.employee?.department?.name || '-'}</td>
                <td>{formatHours(s.totalWorkedMinutes)}</td>
                <td>{formatMoney(s.regularPay)}</td>
                <td>{formatMoney(s.overtimePay)}</td>
                <td>{formatMoney(s.nightPremiumPay)}</td>
                <td>{formatMoney(s.holidayPay)}</td>
                <td className="font-bold">{formatMoney(s.grossPay)}</td>
                <td>
                  <span
                    className={`badge ${s.status === 'DRAFT' ? 'badge-warning' : 'badge-success'}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td>
                  {s.status === 'DRAFT' && (
                    <button
                      onClick={() => handleFinalize(s.id)}
                      className="btn btn-success btn-xs"
                    >
                      Finalizar
                    </button>
                  )}
                  {s.status === 'FINALIZED' && (
                    <button
                      onClick={() => handleRevert(s.id)}
                      className="btn btn-warning btn-xs"
                    >
                      Revertir
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {summaries.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center opacity-50">
                  No hay registros de nomina
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
