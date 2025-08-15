'use server';

import { revalidatePath } from 'next/cache';

export interface ContactFormData {
  name: string;
  email: string;
  business: string;
  message: string;
}

export async function submitContactForm(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    // Simulate server-side processing
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const business = formData.get('business') as string;
    // Note: message field is optional and not used in this demo

    // Validate required fields
    if (!name || !email || !business) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
      };
    }

    // Simulate API call to save contact form
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Revalidate the page to show updated content
    revalidatePath('/');

    return {
      success: true,
      message: "Thank you for your interest! We'll get back to you soon.",
    };
  } catch {
    // Log error for debugging (in production, use proper error logging)
    // console.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}

export async function getServerTime(): Promise<string> {
  // This demonstrates server-side data fetching
  const now = new Date();
  return now.toLocaleString('en-US', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export async function getVendorStats(): Promise<{
  totalVendors: number;
  totalSales: number;
  activeUsers: number;
}> {
  // Simulate fetching vendor statistics from database
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    totalVendors: 1247,
    totalSales: 2847500,
    activeUsers: 892,
  };
}
