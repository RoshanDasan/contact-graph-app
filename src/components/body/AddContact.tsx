import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setUser } from '../../state/stateManage';
import './AddContact.css'

interface FormValues {
  firstName: string;
  lastName: string;
  status: string;
  id?: string;
}

const MyForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      status: 'active',
    },
    validate: (values: FormValues) => {
      const errors: Partial<FormValues> = {};

      if (!values.firstName) {
        errors.firstName = 'First Name is Required';
      }

      if (!values.lastName) {
        errors.lastName = 'Last Name is Required';
      }

      return errors;
    },

    onSubmit: (values) => {
      const objectId = uuid();
      values.id = objectId;
      console.log(values);
      dispatch(setUser({ contact: values }));
      formik.resetForm(); // Clear input fields after dispatching
    },
  });

  return (
    <div className="container">
      <form className="form" onSubmit={formik.handleSubmit}>
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="error">{formik.errors.firstName}</div>
        )}
        <input
          type="text"
          placeholder="First Name"
          className="inputField"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="error">{formik.errors.lastName}</div>
        )}

        <input
          type="text"
          placeholder="Last Name"
          className="inputField"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className="radioGroup">
          <label>
            <input
              type="radio"
              name="status"
              value="active"
              checked={formik.values.status === 'active'}
              onChange={formik.handleChange}
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={formik.values.status === 'inactive'}
              onChange={formik.handleChange}
            />
            Inactive
          </label>
        </div>

        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm;
