export const apiPost = async<T>(url: string, data: any): Promise<T> => {
  try {
    const { email, password } = data;
    return (email === 'datphamquoc92@gmail.com' && password === '123456') as T;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in API POST request: ', error);
    throw error;
  }
}