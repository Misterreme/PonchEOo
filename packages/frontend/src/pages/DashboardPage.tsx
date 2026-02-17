import { useAuth } from '../context/AuthContext';
import { mockDashboardSupervisor, mockDashboardEmployee } from '../data/mockData';

export default function DashboardPage() {
  const { user, isSupervisor } = useAuth();
  const stats = isSupervisor ? mockDashboardSupervisor : mockDashboardEmployee;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Bienvenido, {user?.firstName} {user?.lastName}
      </h1>

      {isSupervisor ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-title">Ponches Abiertos</div>
            <div className="stat-value text-warning">{stats?.openPunches || 0}</div>
            <div className="stat-desc">Empleados actualmente fichados</div>
          </div>
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-title">Correcciones Pendientes</div>
            <div className="stat-value text-error">{stats?.pendingCorrections || 0}</div>
            <div className="stat-desc">Requieren aprobación</div>
          </div>
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-title">Faltas Hoy</div>
            <div className="stat-value text-info">{stats?.todayAbsences || 0}</div>
            <div className="stat-desc">Empleados ausentes</div>
          </div>
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-title">Próximos Feriados</div>
            <div className="stat-value">{stats?.upcomingHolidays || 0}</div>
            <div className="stat-desc">Próximas 4 semanas</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-title">Horas Trabajadas Hoy</div>
            <div className="stat-value">{stats?.hoursWorked || 0}h</div>
            <div className="stat-desc">De 8h esperadas</div>
          </div>
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-title">Horas Esta Semana</div>
            <div className="stat-value">{stats?.totalHoursWeek || 0}h</div>
            <div className="stat-desc">De 40h semanales</div>
          </div>
        </div>
      )}
    </div>
  );
}
