import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (
    typeof err === 'object' &&
    err !== null &&
    'type' in err &&
    err.type === 'body' &&
    Array.isArray(err.errors)
  ) {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: err.errors.map(e => e.message),
    })
  }

  // Erro genérico
  return res.status(500).json({
    message: 'Erro interno do servidor',
    error:
      process.env.NODE_ENV === 'development'
        ? (err as Error).message
        : undefined,
  })
}
