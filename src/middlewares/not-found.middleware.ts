import type {
	Request,
	Response,
} from 'express'

export function notFoundHandler(
	req: Request,
	res: Response
) {
	return res
		.status(
			404
		)
		.json(
			{
				status: 404,
				message:
					'Not Found',
				path: req.originalUrl,
			}
		)
}
