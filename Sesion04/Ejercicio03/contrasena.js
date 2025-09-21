// Genera una contraseña simple y flexible
function generarContrasena(longitud, usarMayus = true, usarMinus = true, usarNumeros = true, usarSimbolos = true) {
  let letrasMayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let letrasMinus = "abcdefghijklmnopqrstuvwxyz";
  let numeros = "0123456789";
  let simbolos = "!@#$%^&*()-_=+[]{};:,.?/";

  let bolsa = "";
  if (usarMayus) bolsa += letrasMayus;
  if (usarMinus) bolsa += letrasMinus;
  if (usarNumeros) bolsa += numeros;
  if (usarSimbolos) bolsa += simbolos;

  if (!bolsa) return "Elige al menos un tipo de carácter.";

  let pass = "";
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * bolsa.length);
    pass += bolsa[indice];
  }
  return pass;
}
