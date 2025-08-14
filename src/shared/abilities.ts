import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import { User, Product, Order, Roles } from "@/generated/prisma";

type AppSubjects =
  | "all"
  | Subjects<{ Product: Product; Order: Order; User: User }>;
type AppAbility = PureAbility<[string, AppSubjects], PrismaQuery>;

export function defineAbilityFor({ id, role }: { id: string; role: Roles }) {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  if (role === "Admin") {
    can("manage", "all");
  } else {
    can("update", "Product", { userId: id });
    can("delete", "Product", { userId: id });
  }

  return build();
}
