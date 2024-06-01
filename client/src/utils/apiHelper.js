export const api = async (
    path,
    method = "GET",
    body = null,
    credentials = null
) => {
    const options = {
        method,
        headers: {}
    };

    if (body && (method !== 'GET' && method !== 'HEAD')) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json; charset=utf-8";
      }
    
      if (credentials) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers.Authorization = `Basic ${encodedCredentials}`;
      }
    
      const response = await fetch(`http://localhost:5000/api${path}`, options);
      return response;
    };