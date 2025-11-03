import { useState, useEffect, useCallback } from "react";

const useForm = (initialForm, callback, validate) => {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      callback();
    }
  }, [errors]);

  const handleSubmit = useCallback(
    (event) => {
      setSubmitting(true);
      if (event) event.preventDefault();
      setErrors(validate("", values));
    },
    [submitting, errors, values]
  );

  const handleChange = (event) => {
    event.persist();
    setErrors(
      validate(event.target.name, {
        ...values,
        [event.target.name]: event.target.value,
      })
    );
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setSubmitting(false);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    submitting,
  };
};

export default useForm;
