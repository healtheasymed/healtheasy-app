export const populateTableColumnsForm = (columnsArray, formValues) => {
  const populatedRows = columnsArray.map((column) => ({ [column]: formValues[column] }));
  return Object.assign({}, ...populatedRows);
};
