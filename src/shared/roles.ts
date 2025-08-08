import type {
	User,
	Order,
	Product,
} from '@/generated/prisma'
import {
	type PureAbility,
	AbilityBuilder,
} from '@casl/ability'
import {
	createPrismaAbility,
	type PrismaQuery,
	type Subjects,
} from '@casl/prisma'

type AppAbility =
	PureAbility<
		[
			string,
			Subjects<{
				User: User
				Product: Product
				Order: Order
			}>,
		],
		PrismaQuery
	>
const {
	build,
} =
	new AbilityBuilder<AppAbility>(
		createPrismaAbility
	)

export const ability =
	build()
