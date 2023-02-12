import { getClassForDocument } from "@typegoose/typegoose";
import { HydratedDocument } from "mongoose";
import { MiddlewareFn } from "type-graphql";
import { ActionLogModel } from "../modules/actionLog/actionLog.model";
import { ResolverContext } from "./graphql";

// TODO: support action results as an array of docs
export function UserActionLog<T extends { companyId: string }>(
  logTitle: string
): MiddlewareFn<ResolverContext> {
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
    void new ActionLogModel({
      title: logTitle,
      companyId,
      userId,
      entityId,
      entityType,
    }).save();
  };
}
