import ControlesAlertas from './ControlesAlertas';

export default function StudentAccessPanel() {
  return (
    <div style={{ width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', background: '#f7f7f7', padding: 14, borderRadius: 8 }}>
        <h2 style={{ margin: 0 }}>Panel de Acceso Estudiante</h2>
        <div style={{ marginTop: 12 }}>
          <ControlesAlertas />
        </div>
      </div>
    </div>
  );
}
