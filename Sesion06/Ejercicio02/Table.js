export default function Table({ data, onDelete }) {
  return (
    <table border="1" cellPadding="6">
      <thead><tr><th>Nombre</th><th>Trabajo</th><th></th></tr></thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={i}>
            <td>{r.name}</td><td>{r.job}</td>
            <td>{onDelete && <button onClick={() => onDelete(i)}>Delete</button>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
