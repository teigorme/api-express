import { User, Order, Product } from "@/generated/prisma";
import { PureAbility, AbilityBuilder } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Product: Product;
      Order: Order;
    }>
  ],
  PrismaQuery
>;
const { build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

export const ability = build();
