'use server';

export async function logOnServer(formData: FormData) {
  const message = formData.get('message');
  console.log('--------------------------------------------------');
  console.log('📝 Server Action Triggered!');
  console.log(`📩 Received Message: "${message}"`);
  console.log('🕒 Time:', new Date().toLocaleString());
  console.log('--------------------------------------------------');

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    message: `Server logged: "${message}"`
  };
}
