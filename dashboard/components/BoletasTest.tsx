
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type Boleta = {
  id: number;
  merchant: string;
  total_amount: number;
  date: string;
  user_id: string;
};

export default function BoletasTest() {
  const [boletas, setBoletas] = useState<Boleta[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBoletas() {
      const { data, error } = await supabase.from('boletas').select('*');
      if (error) setError(error.message);
      else setBoletas((data as Boleta[]) || []);
    }
    fetchBoletas();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2>Test conexión Supabase - Tabla Boletas</h2>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <table style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Comercio</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {boletas.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.merchant}</td>
              <td>{b.total_amount}</td>
              <td>{b.date}</td>
              <td>{b.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {boletas.length === 0 && !error && <div>No hay boletas registradas.</div>}
    </div>
  );
}
