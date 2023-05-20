/* HELPERS */
const fillNumberWithZero = (number) => String(number).padStart(2, '0');

const splitDateTime = (dateTime) => dateTime.split(' ');

const getDay = (date = '') => (date ? fillNumberWithZero(new Date(date).getUTCDate()) : new Date().getUTCDate());

const getMonth = (date = '') => (date ? fillNumberWithZero(new Date(date).getMonth() + 1) : new Date().getMonth() + 1);

const getYear = (date = '') => (date ? new Date(date).getFullYear() : new Date().getFullYear());

const getHours = (date) => fillNumberWithZero(new Date(date).getHours());

const getMinutes = (date) => fillNumberWithZero(new Date(date).getMinutes());

const getDefaultTime = () => '00:00';

const getTime = (date) => `${getHours(date)}:${getMinutes(date)}` || getDefaultTime();

const getTodayLocaleDate = () => new Date().toLocaleDateString('pt-BR');

const getTodayLocaleDateTime = () => (
  new Date().toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
);

const getLocaleDate = (date) => (
  new Date(date).toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
);

/**
 * @param {string} date // => DD/MM/YYYY
 * @returns {string} // => YYYY-MM-DD
 */
const parseLocaleDateToISO = (date) => {
  const dateArray = date.replaceAll('/', '-').split('-').reverse();
  return `${dateArray[0].slice(0, 4)}-${fillNumberWithZero(dateArray[1])}-${fillNumberWithZero(dateArray[2])}`;
};

/**
 * @param {string} date // => YYYY-MM-DD
 * @returns {string} // => DD/MM/YYYY
 */
const parseISOToLocaleDate = (date) => `${getDay(date)}/${getMonth(date)}/${getYear(date)}`;

const getLocaleDateFormatted = (date) => parseISOToLocaleDate(date);

const getLocaleDateTimeFormatted = (date) => `${parseISOToLocaleDate(date)} ${getTime(date)}`;

const getDateInISOFormat = (date) => parseLocaleDateToISO(date);

/**
 * @param {string} date // => DD/MM/YYYY HH:mm
 * @returns {string} // => YYYY-MM-DD HH:mm
 */
const getDateTimeInISOFormat = (dateTime) => {
  const [date, time] = splitDateTime(dateTime);

  return `${parseLocaleDateToISO(date)} ${time}`;
};

/**
 * @param {string} dateTime // => YYYY-MM-DD
 * @returns {string} // => DD/MM/YYYY
 */
const formatDateToLocaleString = (dateTime) => (
  new Date(dateTime).toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
);

/**
 * @param {string} dateTime // => YYYY-MM-DD HH:mm
 * @returns {string} // => DD/MM/YYYY HH:mm
 */
const formatDateTimeToLocaleString = (dateTime) => (
  new Date(dateTime).toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
);

/**
 * @param {string} dateTime // => DD/MM/YYYY HH:mm
 * @returns {string} // => YYYY-MM-DD HH:mm
 */
const formatToQalendarDateTime = (dateTime) => {
  const [date, time] = splitDateTime(dateTime);

  return time
    ? `${date.replaceAll('/', '-').split('-').reverse().join('-')} ${time}`
    : date.replaceAll('/', '-').split('-').reverse().join('-');
};

/**
 * @param {string} birthDate // => YYYY-MM-DD
 * @returns {number}
 */
const getAge = (birthDate) => {
  let age = getYear() - getYear(birthDate);
  const month = getMonth() - getMonth(birthDate);
  if (month < 0 || (month === 0 && getDay() < getDay(birthDate))) {
    age -= 1;
  }
  return age;
};

const hasFormDateFieldChanged = (initialDate, actualDate) => (
  (initialDate && getDateInISOFormat(initialDate) !== getDateInISOFormat(actualDate))
  || (initialDate && getDateTimeInISOFormat(initialDate) !== getDateTimeInISOFormat(actualDate))
);

export {
  getDefaultTime,
  getYear,
  getTodayLocaleDate,
  getTodayLocaleDateTime,
  getLocaleDate,
  getLocaleDateFormatted,
  getLocaleDateTimeFormatted,
  getDateInISOFormat,
  getDateTimeInISOFormat,
  formatDateToLocaleString,
  formatDateTimeToLocaleString,
  formatToQalendarDateTime,
  getAge,
  hasFormDateFieldChanged,
};
