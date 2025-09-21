// Calcula la propina y el total a pagar
function calcularPropina(montoCuenta, porcentajePropina) {
  const propina = montoCuenta * (porcentajePropina / 100);
  const total = montoCuenta + propina;
  return { propina, total };
}
