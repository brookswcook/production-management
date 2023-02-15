import { Model, Document } from "mongoose";
import { getClassForDocument } from "@typegoose/typegoose";

export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
  const result = await next();

  if (Array.isArray(result)) {
    return result.map<unknown>(item =>
      item instanceof Model ? convertDocument(item as Document) : item
    );
  }

  if (result instanceof Model) {
    return convertDocument(result as Document);
  }

  return result;
};

function convertDocument(doc: Document) {
  const convertedDocument = doc.toObject({ getters: true, virtuals: true });
  const DocumentClass = getClassForDocument(doc)!;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
  return convertedDocument;
}

export type MiddlewareFn = (
  action: unknown,
  next: () => Promise<unknown>
) => Promise<unknown>;
