const getObjIgnoringDateFields = (obj) => (
  Object.entries(obj).filter(([key]) => !key.includes('_date'))
);

const areTheObjectsDifferent = (objA, objB) => (
  getObjIgnoringDateFields(objA).toString() !== getObjIgnoringDateFields(objB).toString()
);

const hasFormChanged = (initialForm, form) => (
  !initialForm || !form ? true : areTheObjectsDifferent(initialForm, form)
);

const mountObjFormWithTableColumns = (columns) => {
  const populatedColumns = columns.map((column) => ({ [column]: null }));
  return Object.assign({}, ...populatedColumns);
};

const mountObjFormWithTableColumnsWithCustomValue = (columns) => {
  const populatedColumns = columns.map(({ column, value }) => ({ [column]: value }));
  return Object.assign({}, ...populatedColumns);
};

export {
  hasFormChanged,
  mountObjFormWithTableColumns,
  mountObjFormWithTableColumnsWithCustomValue,
};
