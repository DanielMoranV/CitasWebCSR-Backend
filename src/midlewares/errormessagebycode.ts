// Codigos de error prisma
const errorCodes = [
  { code: "P2000", message: "Error genérico de la base de datos." },
  { code: "P2001", message: "Violación de la restricción de clave externa." },
  { code: "P2002", message: "Violación de la restricción única." },
  { code: "P2003", message: "Violación de la restricción de nulidad." },
  {
    code: "P2004",
    message: "Error de la base de datos: el valor es demasiado largo.",
  },
  {
    code: "P2005",
    message: "Error de la base de datos: el valor es demasiado corto.",
  },
  {
    code: "P2006",
    message: "Error de la base de datos: el valor está fuera de rango.",
  },
  {
    code: "P2007",
    message:
      "Error de la base de datos: el valor no es válido para el tipo de datos.",
  },
  {
    code: "P2008",
    message: "Error de la base de datos: la columna no se puede modificar.",
  },
  { code: "P2009", message: "Error de la base de datos: la tabla no existe." },
  {
    code: "P2010",
    message: "Error de la base de datos: la columna no existe.",
  },
  {
    code: "P2011",
    message: "Error de la base de datos: el valor no puede ser nulo.",
  },
  {
    code: "P2012",
    message: "Error de la base de datos: la columna no se puede eliminar.",
  },
];

export function getErrorMessageByCode(errorCode: any) {
  const error = errorCodes.find((error) => error.code === errorCode);
  return error ? error.message : `Codigo de error:  ${errorCode}`;
}
