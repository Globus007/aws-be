export const formatJSONResponse = (code: number, response: unknown) => {
  return {
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    statusCode: code,
    body: JSON.stringify(response),
  };
};
