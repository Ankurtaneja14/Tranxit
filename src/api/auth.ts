/**
 * Mock Authentication Service
 * 
 * Simulates sending and verifying an OTP. 
 * This allows us to build out the frontend flow completely before 
 * integrating a paid SMS provider like Twilio or Firebase.
 */

export const AuthAPI = {
  /**
   * Simulates sending an OTP to a phone number.
   * @param phoneNumber The 10-digit mobile number
   */
  sendOtp: async (phoneNumber: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would hit our backend to trigger an SMS.
        console.log(`[Mock API] Sending OTP to +91 ${phoneNumber}`);
        resolve({ success: true, message: 'OTP Sent successfully' });
      }, 1500); // Simulate network delay
    });
  },

  /**
   * Simulates verifying an OTP.
   * Hardcoded to accept only '1234' for development testing.
   * @param phoneNumber The 10-digit mobile number
   * @param code The 4-digit code entered by the user
   */
  verifyOtp: async (phoneNumber: string, code: string): Promise<{ success: boolean; message?: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`[Mock API] Verifying code ${code} for +91 ${phoneNumber}`);
        
        if (code === '1234') {
          resolve({ success: true });
        } else {
          // Rejecting simulates an HTTP 400 or 401 error
          reject(new Error('Invalid verification code. Please try 1234.'));
        }
      }, 1500);
    });
  },
};
