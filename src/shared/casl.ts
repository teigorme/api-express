import type { User, Order, Product, Roles } from "@/generated/prisma";
import { type PureAbility, AbilityBuilder } from "@casl/ability";
import {
    createPrismaAbility,
    type PrismaQuery,
    type Subjects,
} from "@casl/prisma";

export type PermActions = "manage" | "create" | "read" | "update" | "delete";

export type PermissionResource =
    | Subjects<{
          User: User;
          Product: Product;
          Order: Order;
      }>
    | "all";

export type AppAbility = PureAbility<[PermActions, PermissionResource]>;

export type DefinePermissions = (
    user: User,
    builder: AbilityBuilder<AppAbility>
) => void;

const rolePermissionsMap: Record<Roles, DefinePermissions> = {
    Admin(user, { can }) {
        can("manage", "all");
    },
    User(user, { can }) {
        can("create", "Product");
        can("update", "Product", { userId: user.id });
        can("delete", "Product", { userId: user.id });
    },
};

function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
  rolePermissionsMap[user.role](user, builder);
  return builder.build({
    detectSubjectType: (item) =>
      item!.constructor as Extract<PermissionResource, string>,
  });
}
