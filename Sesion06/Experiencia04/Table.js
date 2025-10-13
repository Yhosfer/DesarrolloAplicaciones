import React from "react";

const TableHeader = () => (
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Trabajo</th>
      <th>Acción</th>
    </tr>
  </thead>
);

const TableBody = ({ characterData, removeCharacter }) => (
  <tbody>
    {characterData.map((row, index) => (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
);

class Table extends React.Component {
  render() {
    const { characterData, removeCharacter } = this.props;
    return (
      <table>
        <TableHeader />
        <TableBody
          characterData={characterData}
          removeCharacter={removeCharacter}
        />
      </table>
    );
  }
}

export default Table;
