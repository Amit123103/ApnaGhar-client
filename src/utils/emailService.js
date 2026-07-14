/**
 * Sends a welcome email automatically when a user signs up.
 * 
 * NOTE: This now securely calls our custom Node.js backend.
 */
export const sendEmailNotification = async (userEmail, userName, action = 'signup') => {
  try {
    const response = await fetch('http://localhost:5000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to_email: userEmail,
        to_name: userName,
        action: action
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log("✅ Welcome email request successful:", data.message);
      return true;
    } else {
      console.error("❌ Failed to send welcome email:", data.error);
      return false;
    }
  } catch (error) {
    console.error("❌ Failed to connect to email backend server. Make sure it is running on port 5000:", error);
    return false;
  }
};
