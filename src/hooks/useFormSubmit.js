"use client";

import { useState } from 'react';
import { toast } from 'sonner';

/**
 * React hook for handling form submissions with loading, error, and success states
 * 
 * @param {Object} options - Configuration options
 * @param {Function} options.onSubmit - Function that handles the form submission (should return a Promise)
 * @param {Function} options.onSuccess - Function called on successful submission (optional)
 * @param {Function} options.onError - Function called on submission error (optional)
 * @param {string} options.successMessage - Message to display on success (optional)
 * @param {string} options.errorMessage - Message to display on error (optional)
 * @param {Object} options.initialValues - Initial form values (optional)
 * @returns {Object} Form state and handlers
 */
export function useFormSubmit({
  onSubmit,
  onSuccess,
  onError,
  successMessage = 'Successfully submitted!',
  errorMessage = 'Something went wrong. Please try again.',
  initialValues = {}
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      // Call the submit function with form values
      const result = await onSubmit(values);

      // Handle successful submission
      setSuccess(true);
      if (successMessage) toast.success(successMessage);
      if (onSuccess) onSuccess(result);

      return result;
    } catch (err) {
      // Handle submission error
      setError(err);
      const message = err?.message || errorMessage;
      if (message) toast.error(message);
      if (onError) onError(err);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = (newValues = {}) => {
    setValues(newValues);
    setError(null);
    setSuccess(false);
  };

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
    reset,
    isSubmitting,
    error,
    success
  };
}
