export const variables = {
  BACKEND_URL: `${
    process.env.NODE_ENV == 'development'
      ? 'https://dev-loggr-api.axioned.com/'
      : 'https://loggr-api.axioned.com/'
  }`,
};
