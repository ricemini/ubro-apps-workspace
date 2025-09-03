'use client';

import React from 'react';

interface FormAccessibilityProps {
  id: string;
  label: string;
  error?: string;
  description?: string;
  required?: boolean;
  invalid?: boolean;
  children: React.ReactNode;
}

/**
 * FormAccessibility Component - Provides consistent accessibility features for form elements
 *
 * Features:
 * - Proper label association with form controls
 * - Error state management with aria-invalid
 * - Error message association with aria-describedby
 * - Required field indication
 * - Screen reader support for validation feedback
 *
 * @param id - Unique identifier for the form control
 * @param label - Accessible label for the form control
 * @param error - Error message to display
 * @param description - Additional description or help text
 * @param required - Whether the field is required
 * @param invalid - Whether the field has validation errors
 * @param children - The form control element
 */
export default function FormAccessibility({
  id,
  label,
  error,
  description,
  required = false,
  invalid = false,
  children,
}: FormAccessibilityProps): React.JSX.Element {
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;
  const describedBy = [description && descriptionId, error && errorId]
    .filter(Boolean)
    .join(' ');

  return (
    <div className='space-y-2'>
      {/* Label with required indicator */}
      <label
        htmlFor={id}
        className='block text-sm font-medium text-gray-700 dark:text-gray-300'
      >
        {label}
        {required && (
          <span className='text-red-500 ml-1' aria-label='campo requerido'>
            *
          </span>
        )}
      </label>

      {/* Form control with accessibility attributes */}
      <div>
        {React.cloneElement(children as React.ReactElement, {
          id,
          'aria-describedby': describedBy || undefined,
          'aria-invalid': invalid,
          'aria-required': required,
        })}
      </div>

      {/* Description text */}
      {description && (
        <p
          id={descriptionId}
          className='text-sm text-gray-500 dark:text-gray-400'
        >
          {description}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p
          id={errorId}
          className='text-sm text-red-600 dark:text-red-400'
          role='alert'
          aria-live='polite'
        >
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * useFormAccessibility Hook - Custom hook for managing form accessibility state
 *
 * @param initialValues - Initial form values
 * @returns Form accessibility state and handlers
 */
export function useFormAccessibility<T extends Record<string, unknown>>(
  initialValues: T
) {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>(
    {}
  );
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof T, boolean>>
  >({});

  const handleChange = (field: keyof T, value: unknown): void => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof T): void => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateField = (
    field: keyof T,
    validator: (value: unknown) => string | undefined
  ): boolean => {
    const error = validator(values[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const isFieldInvalid = (field: keyof T): boolean => {
    return touched[field] && !!errors[field];
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateField,
    isFieldInvalid,
    setErrors,
    setTouched,
  };
}
