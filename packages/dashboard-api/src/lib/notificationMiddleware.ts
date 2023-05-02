import { MiddlewareFn } from "type-graphql";

export function Notification<
  T extends { companyId: string }
>(): MiddlewareFn<ResolverContext> {
  return async (
    {
      context: {
        user: { id: userId },
      },
    },
    next
  ) => {
    const document = (await next()) as HydratedDocument<T>;
    const documentClass = getClassForDocument(document);
    if (documentClass == null) throw Error("Document doesn't have a class?");
    const entityType = documentClass.name;
    const entityId = String(document.id);
    const { companyId } = document;
  };
}
