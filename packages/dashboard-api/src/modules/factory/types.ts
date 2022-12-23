/**
 * This interface created to mark entities which require factory filtering in get queries
 * If user has factory role then only related to that factory entities should be visible for that user
 */
export interface IFactoryTenant {
  factoryCode: string;
}
