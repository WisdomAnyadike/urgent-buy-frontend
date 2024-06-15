import React from 'react';
import PropTypes from 'prop-types';

const FormattedNumber = ({ number, locale = 'en-US', minimumFractionDigits, maximumFractionDigits }) => {
  const options = {
    minimumFractionDigits,
    maximumFractionDigits,
  };

  const formattedNumber = new Intl.NumberFormat(locale, options).format(number);

  return <>{formattedNumber}</>;
};

FormattedNumber.propTypes = {
  number: PropTypes.number.isRequired,
  locale: PropTypes.string,
  minimumFractionDigits: PropTypes.number,
  maximumFractionDigits: PropTypes.number,
};

export default FormattedNumber;
