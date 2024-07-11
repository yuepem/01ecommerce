const methodNotAllowed = (res, method, allowedMethod) => {
  res.setHeader('Allow', [allowedMethod]);
  res.status(405).end(`Method ${method} Not Allowed`);
}

const handleError = (res, status, message) => {
  res.status(status).json({ error: message })
}

const sendResponse = (res, status, data) => {
  res.status(status).json(data)
}