import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'
import { registry } from '@/src/docs/registry'

const generator =
	new OpenApiGeneratorV3(
		registry.definitions
	)

export const openApiSpec =
	generator.generateDocument(
		{
			openapi:
				'3.0.0',
			info: {
				title:
					'API Express',
				version:
					'1.0.0',
			},
		}
	)
