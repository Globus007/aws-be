export default {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'integer', minimum: 1 },
    count: { type: 'integer', minimum: 1 },
  },
  required: ['title', 'price', 'count'],
} as const;
