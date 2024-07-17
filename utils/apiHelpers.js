

export const sendResponse = (status, data) => {
  return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' }
  });
}

export const handleError = (status, message) => {
  return sendResponse(status, { error: message });
}


/* export const sendResponse = (status, data, method = 'GET', additionalHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  // Add method-specific headers
  switch (method) {
    case 'POST':
      if (status === 201 && data.id) {
        headers['Location'] = `/api/resource/${data.id}`;
      }
      break;
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      headers['ETag'] = `"${generateETag(data)}"`; // You'd need to implement generateETag
      break;
  }

  return new Response(JSON.stringify(data), { 
    status, 
    headers 
  });
}; */