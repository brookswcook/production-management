import { getClassForDocument } from "@typegoose/typegoose";
import { UserRole } from "dashboard-core";
import { HydratedDocument } from "mongoose";
import { MiddlewareFn, ResolverData } from "type-graphql";
import Container from "typedi";
import { ActionLogService } from "../modules/actionLog/actionLog.service";
import { IMultiTenant, ISlug } from "../modules/common/types";
import { ResolverContext } from "./graphql";



async function getActionMetadata<T>(
    {
      context: {
        user: { id: userId },
      },
  }: ResolverData<ResolverContext>,
  // TODO: support action function return values as an array of mongo docs
  next: () => Promise<HydratedDocument<T>>
): Promise<{
  userId: string;
  entityId: string;
  entityType: string;
  document: HydratedDocument<T>;
}> {
  const document = await next();
    const documentClass = getClassForDocument(document);
    if (documentClass == null) throw Error("Document doesn't have a class?");
    const entityType = documentClass.name;
    const entityId = String(document.id);
  return {
    document,
      userId,
      entityId,
      entityType,
  };
}

export function UserActionLogWithNotification<T extends IMultiTenant & ISlug>(
  logTitle: string,
  userRolesToNotify: UserRole[]
): MiddlewareFn<ResolverContext> {
  return async (action, next) => {
    const {
      document: { companyId, code },
      entityType,
      ...restActionMetadata
    } = await getActionMetadata<T>(action, next);
    const actionLogService = Container.get(ActionLogService);
    const actionLogRecord = {
      title: logTitle,
      companyId,
      entityType,
      ...restActionMetadata,
    };
    void actionLogService.createLogRecordWithNotification(actionLogRecord, {
      roles: userRolesToNotify,
      payload: {
        title: "Production management app notification",
        body: `${logTitle}
${entityType} code: ${code}`,
      },
    });
  };
}

export function UserActionLog<T extends { companyId: string }>(
  logTitle: string
): MiddlewareFn<ResolverContext> {
  return async (action, next) => {
    const {
      document: { companyId },
      ...restActionMetadata
    } = await getActionMetadata<T>(action, next);
    const actionLogService = Container.get(ActionLogService);
    const actionLogRecord = {
      title: logTitle,
      companyId,
      ...restActionMetadata,
    };
    void actionLogService.createLogRecord(actionLogRecord);
  };
}
