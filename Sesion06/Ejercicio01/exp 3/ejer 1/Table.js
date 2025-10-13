function Table({ data }) {
  return (
    <table border="1" cellPadding="6">
      <thead><tr><th>Nombre</th><th>Trabajo</th></tr></thead>
      <tbody>
        {data.map((r,i)=>(
          <tr key={i}><td>{r.name}</td><td>{r.job}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;