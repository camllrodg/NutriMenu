export default function AlertaDisplay({ alerta, onClose, variant = 'success' }) {
  const bg = variant === 'warning' ? '#fff3cd' : '#d4edda';
  const border = variant === 'warning' ? '#ffeeba' : 'transparent';

  if (!alerta) return null;

  return (
    <div style={{ background: bg, border: `1px solid ${border}`, color: '#000', padding: 12, borderRadius: 6 }}>
      <strong>Alerta POE:</strong>
      <div style={{ marginTop: 6 }}>{alerta.text}</div>
      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 8 }}>
        <small style={{ color: '#333' }}>{new Date(alerta.ts).toLocaleTimeString()}</small>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
