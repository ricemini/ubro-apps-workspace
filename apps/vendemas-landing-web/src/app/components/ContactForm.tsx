'use client';

import React, { useState } from 'react';
import { submitContactForm } from '../actions';

export default function ContactForm(): React.JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData): Promise<void> {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await submitContactForm(formData);

      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message,
      });

      if (result.success) {
        // Reset form on success
        const form = document.getElementById('contact-form') as HTMLFormElement;
        form?.reset();
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='contact-form-container'>
      <h2>Get Started with Vendemás</h2>
      <p>Join thousands of street vendors already using our platform</p>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form id='contact-form' action={handleSubmit} className='contact-form'>
        <div className='form-group'>
          <label htmlFor='name'>Full Name *</label>
          <input
            type='text'
            id='name'
            name='name'
            required
            placeholder='Enter your full name'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email Address *</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            placeholder='Enter your email address'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='business'>Business Type *</label>
          <select id='business' name='business' required>
            <option value=''>Select your business type</option>
            <option value='food-vendor'>Food Vendor</option>
            <option value='retail-vendor'>Retail Vendor</option>
            <option value='service-provider'>Service Provider</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='message'>Message (Optional)</label>
          <textarea
            id='message'
            name='message'
            rows={4}
            placeholder='Tell us about your business needs...'
          />
        </div>

        <button type='submit' disabled={isSubmitting} className='submit-button'>
          {isSubmitting ? 'Sending...' : 'Get Started'}
        </button>
      </form>
    </div>
  );
}
