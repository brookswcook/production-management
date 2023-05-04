import { getClassForDocument } from "@typegoose/typegoose";
import { UserRole } from "dashboard-core";
import { HydratedDocument } from "mongoose";
import { MiddlewareFn, ResolverData } from "type-graphql";
import Container from "typedi";
import { ActionLogService } from "../modules/actionLog/actionLog.service";
import { IMultiTenant } from "../modules/common/types";
import { ResolverContext } from "./graphql";


async function getActionMetadata<T extends IMultiTenant>(
    {
      context: {
        user: { id: userId },
      },
  }: ResolverData<ResolverContext>,
  next: () => Promise<HydratedDocument<T>>
) {
  const document = await next();
    const documentClass = getClassForDocument(document);
    if (documentClass == null) throw Error("Document doesn't have a class?");
    const entityType = documentClass.name;
    const entityId = String(document.id);
    const { companyId } = document;
  return {
      companyId,
      userId,
      entityId,
      entityType,
  };
}

// TODO: support action function results as an array of mongo docs
export function UserActionLogWithNotification<T extends IMultiTenant>(
  logTitle: string,
  userRolesToNotify: UserRole[]
): MiddlewareFn<ResolverContext> {
  return async (action, next) => {
    const actionMetadata = await getActionMetadata<T>(action, next);
    const actionLogService = Container.get(ActionLogService);
    const actionLogRecord = {
      title: logTitle,
      ...actionMetadata,
    };
    void actionLogService.createLogRecordWithNotification(actionLogRecord, {
      roles: userRolesToNotify,
      payload: {
        title: "Production management app notification",
        body: logTitle,
      },
    });
  };
}

// TODO: support action function results as an array of mongo docs
export function UserActionLog<T extends { companyId: string }>(
  logTitle: string
): MiddlewareFn<ResolverContext> {
  return async (action, next) => {
    const actionMetadata = await getActionMetadata<T>(action, next);
    const actionLogService = Container.get(ActionLogService);
    const actionLogRecord = {
      title: logTitle,
      ...actionMetadata,
    };
    void actionLogService.createLogRecord(actionLogRecord);
  };
}
