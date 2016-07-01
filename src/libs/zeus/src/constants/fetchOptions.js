const baseUrl = `https://${process.env.ATHENA_HOST}:${process.env.HTTPS_PORT}`;

export const API_CREATE = `${baseUrl}/api/create`;
export const API_DELETE = `${baseUrl}/api/annotations?id=`;
