export const api = async (endpoint, method = 'GET', body = null, credentials = null) => {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    if (body && (method !== 'GET' && method !== 'HEAD')) {
      config.body = JSON.stringify(body);
    }
  
    if (credentials) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      config.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
  
    const response = await fetch(`http://localhost:5000/api${endpoint}`, config);
    return response;
  };
  