import { User as AuthUser } from "lucia";

interface Entity {
  userId: string | null;
}

export default function isOwner(
  authUser: AuthUser | null | undefined,
  entity: Entity | null | undefined
) {
  if (!authUser || !entity) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }

  return entity.userId === authUser.id;
}
