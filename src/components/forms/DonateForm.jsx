import React from 'react';
import PropTypes from 'prop-types';
import { Field, withFormik } from 'formik';
import { Form } from 'antd';

import yup from '../../utils/yup';
import MoneyInput from '../inputs/MoneyInput';
import SubmitButton from '../buttons/SubmitButton';

const DonateForm = ({ handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Field name="amount" label="Valor" component={MoneyInput} />
      <SubmitButton />
    </Form>
  );
};

DonateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .min(1)
    .required()
});

export default withFormik({
  validationSchema
})(DonateForm);