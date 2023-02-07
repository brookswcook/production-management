import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Attribute = {
  __typename?: 'Attribute';
  key: Scalars['String'];
  unit: Scalars['String'];
  value: Scalars['String'];
};

export type AttributeDefinition = {
  __typename?: 'AttributeDefinition';
  name: Scalars['String'];
  unit: Maybe<Scalars['String']>;
  values: Maybe<Array<Scalars['String']>>;
};

export type Company = {
  __typename?: 'Company';
  address: Scalars['String'];
  code: Scalars['String'];
  contacts: Array<User>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isRoot: Scalars['Boolean'];
  name: Scalars['String'];
  parentId: Maybe<Scalars['String']>;
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};

export type CreateAttributeInput = {
  key: Scalars['String'];
  unit: InputMaybe<Scalars['String']>;
  value: Scalars['String'];
};

export type CreateCompanyInput = {
  address: Scalars['String'];
  name: Scalars['String'];
};

export type CreateFabricInput = {
  code: Scalars['String'];
  colorCode: InputMaybe<Scalars['String']>;
  colorName: Scalars['String'];
  factoryCode: Scalars['String'];
  print: InputMaybe<FileUploadInput>;
  title: Scalars['String'];
  type: InputMaybe<Scalars['String']>;
};

export type CreateNoteInput = {
  images: InputMaybe<Array<FileUploadInput>>;
  parentId: Scalars['String'];
  text: Scalars['String'];
  type: Scalars['String'];
};

export type CreateOrderItemInput = {
  orderUid: Scalars['Float'];
  price: Scalars['Float'];
  productCode: Scalars['String'];
  quantity: InputMaybe<Scalars['Float']>;
  variantAttributes: InputMaybe<Array<CreateAttributeInput>>;
};

export type CreateProductInput = {
  deliveryDate: Scalars['DateTime'];
  fabricCode: Scalars['String'];
  factoryId: Scalars['String'];
  styleCode: Scalars['String'];
};

export type CreatePurchaseOrderInput = {
  expectedDeliveryDate: Scalars['DateTime'];
  factoryId: Scalars['String'];
};

export type CreateStyleInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  techPack: InputMaybe<Array<FileUploadInput>>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  factoryCode: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role: Scalars['String'];
};

export type DeleteUserInput = {
  email: Scalars['String'];
};

export type Fabric = {
  __typename?: 'Fabric';
  code: Scalars['String'];
  colorCode: Maybe<Scalars['String']>;
  colorName: Scalars['String'];
  colorType: Scalars['String'];
  factory: Company;
  id: Scalars['String'];
  notes: Array<Note>;
  printFileName: Maybe<Scalars['String']>;
  productCodes: Array<Scalars['String']>;
  samples: Array<FabricSample>;
  stage: Scalars['String'];
  title: Scalars['String'];
  type: Maybe<Scalars['String']>;
};

export type FabricProduction = {
  __typename?: 'FabricProduction';
  actualStartDate: Maybe<Scalars['DateTime']>;
  lastStartDate: Scalars['DateTime'];
  onTime: Maybe<Scalars['Boolean']>;
  started: Maybe<Scalars['Boolean']>;
  sufficientFabric: Maybe<Scalars['Boolean']>;
};

export type FabricSample = {
  __typename?: 'FabricSample';
  approved: Maybe<Scalars['Boolean']>;
  delivered: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  note: Maybe<Note>;
  parentCode: Scalars['String'];
  sku: Scalars['String'];
  trackNumber: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  createdAt: Maybe<Scalars['DateTime']>;
  extName: Scalars['String'];
  id: Scalars['String'];
  link: Scalars['String'];
  name: Scalars['String'];
  parentId: Scalars['String'];
  type: Scalars['String'];
  uploadingKey: Scalars['String'];
  user: Maybe<User>;
  userId: Scalars['String'];
};

export type FileUploadInput = {
  file: Scalars['Upload'];
  fileSize: Scalars['Float'];
};

export type FirebaseUser = {
  __typename?: 'FirebaseUser';
  disabled: Scalars['Boolean'];
  emailVerified: Scalars['Boolean'];
  metadata: FirebaseUserMetadata;
  uid: Scalars['String'];
};

export type FirebaseUserMetadata = {
  __typename?: 'FirebaseUserMetadata';
  creationTime: Maybe<Scalars['String']>;
  lastSignInTime: Maybe<Scalars['String']>;
};

export type FitSample = {
  __typename?: 'FitSample';
  approved: Maybe<Scalars['Boolean']>;
  delivered: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  note: Maybe<Note>;
  parentCode: Scalars['String'];
  sku: Scalars['String'];
  trackNumber: Scalars['String'];
};

export type GetOrderItemsInput = {
  orderUid: Scalars['Float'];
};

export type GetPurchaseOrderInput = {
  uid: Scalars['Float'];
};

export type LoginInput = {
  token: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveFabricSample: FabricSample;
  approveFitSample: FitSample;
  createCompany: Company;
  createFabric: Fabric;
  createFactory: Company;
  createNote: Note;
  createOrderItem: OrderItem;
  createProduct: Product;
  createPurchaseOrder: PurchaseOrder;
  createStyle: Style;
  createUser: User;
  deleteUser: Scalars['Boolean'];
  login: LoginResult;
  markFabricSampleAsDelivered: FabricSample;
  markFitSampleAsDelivered: FitSample;
  pushPurchaseOrderToNextStage: PurchaseOrder;
  rejectFabricSample: FabricSample;
  rejectFitSample: FitSample;
  sendFabricSample: FabricSample;
  sendFitSample: FitSample;
  startFabricProduction: Product;
  startProduction: Product;
  updateUser: User;
  uploadPrint: Fabric;
  uploadTechPack: Style;
};


export type MutationApproveFabricSampleArgs = {
  data: UniqueSampleInput;
};


export type MutationApproveFitSampleArgs = {
  data: UniqueSampleInput;
};


export type MutationCreateCompanyArgs = {
  data: CreateCompanyInput;
};


export type MutationCreateFabricArgs = {
  data: CreateFabricInput;
};


export type MutationCreateFactoryArgs = {
  data: CreateCompanyInput;
};


export type MutationCreateNoteArgs = {
  data: CreateNoteInput;
};


export type MutationCreateOrderItemArgs = {
  data: CreateOrderItemInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreatePurchaseOrderArgs = {
  data: CreatePurchaseOrderInput;
};


export type MutationCreateStyleArgs = {
  data: CreateStyleInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  data: DeleteUserInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationMarkFabricSampleAsDeliveredArgs = {
  data: UniqueSampleInput;
};


export type MutationMarkFitSampleAsDeliveredArgs = {
  data: UniqueSampleInput;
};


export type MutationPushPurchaseOrderToNextStageArgs = {
  uid: Scalars['Int'];
};


export type MutationRejectFabricSampleArgs = {
  data: UniqueSampleInput;
};


export type MutationRejectFitSampleArgs = {
  data: UniqueSampleInput;
};


export type MutationSendFabricSampleArgs = {
  data: SendSampleInput;
};


export type MutationSendFitSampleArgs = {
  data: SendSampleInput;
};


export type MutationStartFabricProductionArgs = {
  data: StartFabricProductionInput;
};


export type MutationStartProductionArgs = {
  data: StartProductionInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUploadPrintArgs = {
  data: UploadPrintInput;
};


export type MutationUploadTechPackArgs = {
  data: UploadTechPackInput;
};

export type Note = {
  __typename?: 'Note';
  createdAt: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  imageFileNames: Array<Scalars['String']>;
  parentId: Scalars['String'];
  text: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Maybe<Scalars['DateTime']>;
  user: Maybe<User>;
  userId: Scalars['String'];
};

export type OperationLog = {
  __typename?: 'OperationLog';
  createdAt: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  name: Scalars['String'];
  user: Maybe<User>;
  userId: Scalars['String'];
  variables: Scalars['String'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['String'];
  price: Scalars['Float'];
  product: Product;
  quantity: Scalars['Float'];
  variantAttributes: Array<Attribute>;
};

export type Product = {
  __typename?: 'Product';
  code: Scalars['String'];
  company: Company;
  deliveryDate: Scalars['DateTime'];
  dueIn: Scalars['Int'];
  fabric: Fabric;
  fabricCode: Scalars['String'];
  fabricProduction: Maybe<FabricProduction>;
  fabricSampleDelivered: Scalars['Boolean'];
  factory: Company;
  fitSampleDelivered: Scalars['Boolean'];
  fitSamples: Array<FitSample>;
  id: Scalars['String'];
  name: Scalars['String'];
  notes: Array<Note>;
  onTime: Scalars['Boolean'];
  preProductionSample: Maybe<FitSample>;
  production: Maybe<ProductProduction>;
  qualityControl: Maybe<ProductQualityControl>;
  shipping: Maybe<ProductShipping>;
  stage: Scalars['String'];
  style: Style;
  styleCode: Scalars['String'];
  techPackUploaded: Scalars['Boolean'];
};

export type ProductProduction = {
  __typename?: 'ProductProduction';
  actualStartDate: Maybe<Scalars['DateTime']>;
  lastStartDate: Scalars['DateTime'];
  onTime: Maybe<Scalars['Boolean']>;
  started: Maybe<Scalars['Boolean']>;
};

export type ProductQualityControl = {
  __typename?: 'ProductQualityControl';
  lastVisitDate: Scalars['DateTime'];
  notes: Maybe<Array<Scalars['String']>>;
  passed: Maybe<Scalars['Boolean']>;
  scheduledVisitDate: Maybe<Scalars['DateTime']>;
  visited: Scalars['Boolean'];
};

export type ProductShipping = {
  __typename?: 'ProductShipping';
  actualShippingDate: Maybe<Scalars['DateTime']>;
  delivered: Maybe<Scalars['Boolean']>;
  lastShippingDate: Scalars['DateTime'];
  shipped: Scalars['Boolean'];
  trackNumber: Maybe<Scalars['String']>;
};

export type PurchaseOrder = {
  __typename?: 'PurchaseOrder';
  company: Company;
  createdAt: Scalars['DateTime'];
  expectedDeliveryDate: Scalars['DateTime'];
  factory: Company;
  items: Array<OrderItem>;
  nextStatus: Maybe<Scalars['String']>;
  status: Scalars['String'];
  uid: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  attributeDefinition: Array<AttributeDefinition>;
  attributeDefinitions: Array<AttributeDefinition>;
  companies: Array<Company>;
  fabric: Fabric;
  fabrics: Array<Fabric>;
  factories: Array<Company>;
  imageLink: Scalars['String'];
  operationLogs: Array<OperationLog>;
  orderItems: Array<OrderItem>;
  printLink: Scalars['String'];
  product: Product;
  products: Array<Product>;
  purchaseOrder: PurchaseOrder;
  purchaseOrders: Array<PurchaseOrder>;
  style: Style;
  styles: Array<Style>;
  users: Array<User>;
};


export type QueryAttributeDefinitionArgs = {
  name: Scalars['String'];
};


export type QueryFabricArgs = {
  code: Scalars['String'];
};


export type QueryImageLinkArgs = {
  fileName: Scalars['String'];
};


export type QueryOrderItemsArgs = {
  data: InputMaybe<GetOrderItemsInput>;
};


export type QueryPrintLinkArgs = {
  fileName: Scalars['String'];
};


export type QueryProductArgs = {
  code: Scalars['String'];
};


export type QueryPurchaseOrderArgs = {
  uid: Scalars['Int'];
};


export type QueryStyleArgs = {
  code: Scalars['String'];
};

export type Sample = {
  __typename?: 'Sample';
  approved: Maybe<Scalars['Boolean']>;
  delivered: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  note: Maybe<Note>;
  parentCode: Scalars['String'];
  sku: Scalars['String'];
  trackNumber: Scalars['String'];
};

export type SendSampleInput = {
  parentCode: Scalars['String'];
  sku: Scalars['String'];
  trackNumber: Scalars['String'];
};

export type StartFabricProductionInput = {
  productName: Scalars['String'];
};

export type StartProductionInput = {
  productName: Scalars['String'];
};

export type Style = {
  __typename?: 'Style';
  code: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  productCodes: Array<Scalars['String']>;
  techPackUploaded: Scalars['Boolean'];
  techPacks: Array<File>;
};

export type UniqueSampleInput = {
  parentCode: Scalars['String'];
  sku: Scalars['String'];
};

export type UpdateUserInput = {
  disabled: Scalars['Boolean'];
  email: Scalars['String'];
  role: Scalars['String'];
};

export type UploadPrintInput = {
  code: Scalars['String'];
  print: FileUploadInput;
};

export type UploadTechPackInput = {
  code: Scalars['String'];
  techPack: Array<FileUploadInput>;
};

export type User = {
  __typename?: 'User';
  companyId: Scalars['String'];
  createdAt: Maybe<Scalars['DateTime']>;
  deleted: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  email: Scalars['String'];
  firebaseUser: Maybe<FirebaseUser>;
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  phone: Maybe<Scalars['String']>;
  pointOfContact: Scalars['Boolean'];
  role: Scalars['String'];
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type UserContactDetails = {
  __typename?: 'UserContactDetails';
  email: Scalars['String'];
  fullName: Scalars['String'];
  phone: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', token: string } };

export type FabricQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type FabricQuery = { __typename?: 'Query', fabric: { __typename?: 'Fabric', code: string, colorName: string, id: string, title: string, colorType: string, colorCode: string | null, printFileName: string | null, productCodes: Array<string>, stage: string, factory: { __typename?: 'Company', code: string }, notes: Array<{ __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null }>, samples: Array<{ __typename?: 'FabricSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null }> } };

export type CreateFabricMutationVariables = Exact<{
  data: CreateFabricInput;
}>;


export type CreateFabricMutation = { __typename?: 'Mutation', createFabric: { __typename?: 'Fabric', code: string, colorName: string } };

export type FabricFieldsFragment = { __typename?: 'Fabric', id: string, code: string, title: string, colorName: string, colorType: string, colorCode: string | null, printFileName: string | null, productCodes: Array<string>, stage: string, factory: { __typename?: 'Company', code: string }, notes: Array<{ __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null }>, samples: Array<{ __typename?: 'FabricSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null }> };

export type FabricsQueryVariables = Exact<{ [key: string]: never; }>;


export type FabricsQuery = { __typename?: 'Query', fabrics: Array<{ __typename?: 'Fabric', id: string, code: string, title: string, colorName: string, colorType: string, colorCode: string | null, printFileName: string | null, productCodes: Array<string>, stage: string, factory: { __typename?: 'Company', code: string }, notes: Array<{ __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null }>, samples: Array<{ __typename?: 'FabricSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null }> }> };

export type FactoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FactoriesQuery = { __typename?: 'Query', factories: Array<{ __typename?: 'Company', id: string, code: string, name: string, address: string, contacts: Array<{ __typename?: 'User', email: string }> }> };

export type FactoryCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type FactoryCodesQuery = { __typename?: 'Query', factories: Array<{ __typename?: 'Company', code: string }> };

export type CreateFactoryMutationVariables = Exact<{
  data: CreateCompanyInput;
}>;


export type CreateFactoryMutation = { __typename?: 'Mutation', createFactory: { __typename?: 'Company', code: string } };

export type FactoryListFieldsFragment = { __typename?: 'Company', id: string, code: string, name: string, address: string, contacts: Array<{ __typename?: 'User', email: string }> };

export type FactoryCodesFragment = { __typename?: 'Company', code: string };

export type FileFieldsFragment = { __typename?: 'File', id: string, name: string, extName: string, uploadingKey: string, link: string, createdAt: string | null, user: { __typename?: 'User', fullName: string } | null };

export type OperationLogFieldsFragment = { __typename?: 'OperationLog', id: string, name: string, variables: string, createdAt: string | null, user: { __typename?: 'User', firstName: string } | null };

export type OperationLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type OperationLogsQuery = { __typename?: 'Query', operationLogs: Array<{ __typename?: 'OperationLog', id: string, name: string, variables: string, createdAt: string | null, user: { __typename?: 'User', firstName: string } | null }> };

export type OrderItemsQueryVariables = Exact<{
  data: InputMaybe<GetOrderItemsInput>;
}>;


export type OrderItemsQuery = { __typename?: 'Query', orderItems: Array<{ __typename?: 'OrderItem', id: string, quantity: number, price: number, product: { __typename?: 'Product', code: string }, variantAttributes: Array<{ __typename?: 'Attribute', key: string, value: string }> }> };

export type OrderItemListFieldsFragment = { __typename?: 'OrderItem', id: string, quantity: number, price: number, product: { __typename?: 'Product', code: string }, variantAttributes: Array<{ __typename?: 'Attribute', key: string, value: string }> };

export type OrderItemOwnFieldsFragment = { __typename?: 'OrderItem', id: string, quantity: number, price: number, variantAttributes: Array<{ __typename?: 'Attribute', key: string, value: string }> };

export type CreateOrderItemMutationVariables = Exact<{
  data: CreateOrderItemInput;
}>;


export type CreateOrderItemMutation = { __typename?: 'Mutation', createOrderItem: { __typename?: 'OrderItem', id: string, quantity: number, price: number, variantAttributes: Array<{ __typename?: 'Attribute', key: string, value: string }> } };

export type PrintLinkQueryVariables = Exact<{
  fileName: Scalars['String'];
}>;


export type PrintLinkQuery = { __typename?: 'Query', printLink: string };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', code: string } };

export type NoteFieldsFragment = { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null };

export type SampleFieldsFragment = { __typename?: 'Sample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null };

export type FitSampleFieldsFragment = { __typename?: 'FitSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null };

export type FabricSampleFieldsFragment = { __typename?: 'FabricSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null };

export type ProductFieldsFragment = { __typename?: 'Product', id: string, code: string, name: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, factory: { __typename?: 'Company', code: string, name: string }, style: { __typename?: 'Style', code: string, name: string }, fabric: { __typename?: 'Fabric', code: string, title: string, colorName: string, type: string | null, colorType: string, colorCode: string | null, printFileName: string | null, stage: string, samples: Array<{ __typename?: 'FabricSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null }> }, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null }>, preProductionSample: { __typename?: 'FitSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null } | null, notes: Array<{ __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null }>, fabricProduction: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric: boolean | null, started: boolean | null, actualStartDate: string | null, onTime: boolean | null } | null, production: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate: string | null, onTime: boolean | null, started: boolean | null } | null, qualityControl: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate: string | null, visited: boolean, passed: boolean | null, notes: Array<string> | null } | null, shipping: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate: string | null, shipped: boolean, trackNumber: string | null, delivered: boolean | null } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, code: string, name: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, factory: { __typename?: 'Company', code: string, name: string }, style: { __typename?: 'Style', code: string, name: string }, fabric: { __typename?: 'Fabric', code: string, title: string, colorName: string, type: string | null, colorType: string, colorCode: string | null, printFileName: string | null, stage: string, samples: Array<{ __typename?: 'FabricSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null }> }, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null }>, preProductionSample: { __typename?: 'FitSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null } | null, notes: Array<{ __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null }>, fabricProduction: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric: boolean | null, started: boolean | null, actualStartDate: string | null, onTime: boolean | null } | null, production: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate: string | null, onTime: boolean | null, started: boolean | null } | null, qualityControl: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate: string | null, visited: boolean, passed: boolean | null, notes: Array<string> | null } | null, shipping: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate: string | null, shipped: boolean, trackNumber: string | null, delivered: boolean | null } | null }> };

export type ProductQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, code: string, name: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, factory: { __typename?: 'Company', code: string, name: string }, style: { __typename?: 'Style', code: string, name: string }, fabric: { __typename?: 'Fabric', code: string, title: string, colorName: string, type: string | null, colorType: string, colorCode: string | null, printFileName: string | null, stage: string, samples: Array<{ __typename?: 'FabricSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null }> }, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null }>, preProductionSample: { __typename?: 'FitSample', sku: string, approved: boolean | null, trackNumber: string, delivered: boolean | null, note: { __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null } | null } | null, notes: Array<{ __typename?: 'Note', id: string, type: string, text: string, imageFileNames: Array<string>, createdAt: string | null, user: { __typename?: 'User', firstName: string, fullName: string } | null }>, fabricProduction: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric: boolean | null, started: boolean | null, actualStartDate: string | null, onTime: boolean | null } | null, production: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate: string | null, onTime: boolean | null, started: boolean | null } | null, qualityControl: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate: string | null, visited: boolean, passed: boolean | null, notes: Array<string> | null } | null, shipping: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate: string | null, shipped: boolean, trackNumber: string | null, delivered: boolean | null } | null } };

export type PurchaseOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type PurchaseOrdersQuery = { __typename?: 'Query', purchaseOrders: Array<{ __typename?: 'PurchaseOrder', uid: number, createdAt: string, expectedDeliveryDate: string, status: string, nextStatus: string | null, company: { __typename?: 'Company', name: string }, factory: { __typename?: 'Company', name: string } }> };

export type PurchaseOrderQueryVariables = Exact<{
  uid: Scalars['Int'];
}>;


export type PurchaseOrderQuery = { __typename?: 'Query', purchaseOrder: { __typename?: 'PurchaseOrder', uid: number, createdAt: string, expectedDeliveryDate: string, status: string, nextStatus: string | null, company: { __typename?: 'Company', name: string, address: string, contacts: Array<{ __typename?: 'User', fullName: string, email: string, phone: string | null }> }, factory: { __typename?: 'Company', name: string, address: string, contacts: Array<{ __typename?: 'User', fullName: string, email: string, phone: string | null }> } } };

export type CreatePurchaseOrderMutationVariables = Exact<{
  data: CreatePurchaseOrderInput;
}>;


export type CreatePurchaseOrderMutation = { __typename?: 'Mutation', createPurchaseOrder: { __typename?: 'PurchaseOrder', uid: number, createdAt: string, expectedDeliveryDate: string, status: string, nextStatus: string | null } };

export type PurchaseOrderDetailFieldsFragment = { __typename?: 'PurchaseOrder', uid: number, createdAt: string, expectedDeliveryDate: string, status: string, nextStatus: string | null, company: { __typename?: 'Company', name: string, address: string, contacts: Array<{ __typename?: 'User', fullName: string, email: string, phone: string | null }> }, factory: { __typename?: 'Company', name: string, address: string, contacts: Array<{ __typename?: 'User', fullName: string, email: string, phone: string | null }> } };

export type PurchaseOrderListFieldsFragment = { __typename?: 'PurchaseOrder', uid: number, createdAt: string, expectedDeliveryDate: string, status: string, nextStatus: string | null, company: { __typename?: 'Company', name: string }, factory: { __typename?: 'Company', name: string } };

export type PurchaseOrderScalarFieldsFragment = { __typename?: 'PurchaseOrder', uid: number, createdAt: string, expectedDeliveryDate: string, status: string, nextStatus: string | null };

export type AttributeDefinitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AttributeDefinitionsQuery = { __typename?: 'Query', attributeDefinitions: Array<{ __typename?: 'AttributeDefinition', name: string, values: Array<string> | null, unit: string | null }> };

export type AttributeDefinitionQueryVariables = Exact<{ [key: string]: never; }>;


export type AttributeDefinitionQuery = { __typename?: 'Query', attributeDefinitions: Array<{ __typename?: 'AttributeDefinition', name: string, values: Array<string> | null, unit: string | null }> };

export type AttributeDefinitionsListFieldsFragment = { __typename?: 'AttributeDefinition', name: string, values: Array<string> | null, unit: string | null };

export type PushPurchaseOrderToNextStageMutationVariables = Exact<{
  uid: Scalars['Int'];
}>;


export type PushPurchaseOrderToNextStageMutation = { __typename?: 'Mutation', pushPurchaseOrderToNextStage: { __typename?: 'PurchaseOrder', status: string, nextStatus: string | null } };

export type SendFabricSampleMutationVariables = Exact<{
  data: SendSampleInput;
}>;


export type SendFabricSampleMutation = { __typename?: 'Mutation', sendFabricSample: { __typename?: 'FabricSample', sku: string } };

export type SendFitSampleMutationVariables = Exact<{
  data: SendSampleInput;
}>;


export type SendFitSampleMutation = { __typename?: 'Mutation', sendFitSample: { __typename?: 'FitSample', sku: string } };

export type ApproveFitSampleMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type ApproveFitSampleMutation = { __typename?: 'Mutation', approveFitSample: { __typename?: 'FitSample', id: string, sku: string } };

export type RejectFitSampleMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type RejectFitSampleMutation = { __typename?: 'Mutation', rejectFitSample: { __typename?: 'FitSample', id: string, sku: string } };

export type MarkFitSampleAsDeliveredMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type MarkFitSampleAsDeliveredMutation = { __typename?: 'Mutation', markFitSampleAsDelivered: { __typename?: 'FitSample', id: string, sku: string } };

export type ApproveFabricSampleMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type ApproveFabricSampleMutation = { __typename?: 'Mutation', approveFabricSample: { __typename?: 'FabricSample', id: string, sku: string } };

export type RejectFabricSampleMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type RejectFabricSampleMutation = { __typename?: 'Mutation', rejectFabricSample: { __typename?: 'FabricSample', id: string, sku: string } };

export type MarkFabricSampleAsDeliveredMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type MarkFabricSampleAsDeliveredMutation = { __typename?: 'Mutation', markFabricSampleAsDelivered: { __typename?: 'FabricSample', id: string, sku: string } };

export type CreateNoteMutationVariables = Exact<{
  data: CreateNoteInput;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'Note', parentId: string } };

export type ImageLinkQueryVariables = Exact<{
  fileName: Scalars['String'];
}>;


export type ImageLinkQuery = { __typename?: 'Query', imageLink: string };

export type StyleQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type StyleQuery = { __typename?: 'Query', style: { __typename?: 'Style', id: string, code: string, name: string, techPackUploaded: boolean, productCodes: Array<string>, techPacks: Array<{ __typename?: 'File', id: string, name: string, extName: string, uploadingKey: string, link: string, createdAt: string | null, user: { __typename?: 'User', fullName: string } | null }> } };

export type StylesQueryVariables = Exact<{ [key: string]: never; }>;


export type StylesQuery = { __typename?: 'Query', styles: Array<{ __typename?: 'Style', id: string, code: string, name: string, techPackUploaded: boolean, productCodes: Array<string>, techPacks: Array<{ __typename?: 'File', id: string, name: string, extName: string, uploadingKey: string, link: string, createdAt: string | null, user: { __typename?: 'User', fullName: string } | null }> }> };

export type StyleFieldsFragment = { __typename?: 'Style', id: string, code: string, name: string, techPackUploaded: boolean, productCodes: Array<string>, techPacks: Array<{ __typename?: 'File', id: string, name: string, extName: string, uploadingKey: string, link: string, createdAt: string | null, user: { __typename?: 'User', fullName: string } | null }> };

export type CreateStyleMutationVariables = Exact<{
  data: CreateStyleInput;
}>;


export type CreateStyleMutation = { __typename?: 'Mutation', createStyle: { __typename?: 'Style', code: string, name: string } };

export type UploadTechPackMutationVariables = Exact<{
  data: UploadTechPackInput;
}>;


export type UploadTechPackMutation = { __typename?: 'Mutation', uploadTechPack: { __typename?: 'Style', code: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, fullName: string, role: string, disabled: boolean, firebaseUser: { __typename?: 'FirebaseUser', emailVerified: boolean, metadata: { __typename?: 'FirebaseUserMetadata', creationTime: string | null, lastSignInTime: string | null } } | null }> };

export type UserListFieldsFragment = { __typename?: 'User', id: string, email: string, fullName: string, role: string, disabled: boolean, firebaseUser: { __typename?: 'FirebaseUser', emailVerified: boolean, metadata: { __typename?: 'FirebaseUserMetadata', creationTime: string | null, lastSignInTime: string | null } } | null };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, role: string } };

export const NoteFieldsFragmentDoc = gql`
    fragment noteFields on Note {
  id
  type
  text
  imageFileNames
  createdAt
  user {
    firstName
    fullName
  }
}
    `;
export const FabricSampleFieldsFragmentDoc = gql`
    fragment fabricSampleFields on FabricSample {
  sku
  approved
  trackNumber
  delivered
  note {
    ...noteFields
  }
}
    ${NoteFieldsFragmentDoc}`;
export const FabricFieldsFragmentDoc = gql`
    fragment fabricFields on Fabric {
  id
  code
  title
  factory {
    code
  }
  colorName
  colorType
  colorCode
  printFileName
  productCodes
  stage
  notes {
    ...noteFields
  }
  samples {
    ...fabricSampleFields
  }
}
    ${NoteFieldsFragmentDoc}
${FabricSampleFieldsFragmentDoc}`;
export const FactoryListFieldsFragmentDoc = gql`
    fragment FactoryListFields on Company {
  id
  code
  name
  address
  contacts {
    email
  }
}
    `;
export const FactoryCodesFragmentDoc = gql`
    fragment FactoryCodes on Company {
  code
}
    `;
export const OperationLogFieldsFragmentDoc = gql`
    fragment operationLogFields on OperationLog {
  id
  name
  variables
  user {
    firstName
  }
  createdAt
}
    `;
export const OrderItemOwnFieldsFragmentDoc = gql`
    fragment OrderItemOwnFields on OrderItem {
  id
  quantity
  price
  variantAttributes {
    key
    value
  }
}
    `;
export const OrderItemListFieldsFragmentDoc = gql`
    fragment OrderItemListFields on OrderItem {
  ...OrderItemOwnFields
  product {
    code
  }
}
    ${OrderItemOwnFieldsFragmentDoc}`;
export const SampleFieldsFragmentDoc = gql`
    fragment sampleFields on Sample {
  sku
  approved
  trackNumber
  delivered
  note {
    ...noteFields
  }
}
    ${NoteFieldsFragmentDoc}`;
export const FitSampleFieldsFragmentDoc = gql`
    fragment fitSampleFields on FitSample {
  sku
  approved
  trackNumber
  delivered
  note {
    ...noteFields
  }
}
    ${NoteFieldsFragmentDoc}`;
export const ProductFieldsFragmentDoc = gql`
    fragment productFields on Product {
  id
  code
  name
  deliveryDate
  dueIn
  onTime
  stage
  factory {
    code
    name
  }
  techPackUploaded
  fabricSampleDelivered
  fitSampleDelivered
  style {
    code
    name
  }
  fabric {
    code
    title
    colorName
    type
    colorType
    colorCode
    printFileName
    stage
    samples {
      ...fabricSampleFields
    }
  }
  fitSamples {
    ...fitSampleFields
  }
  preProductionSample {
    ...fitSampleFields
  }
  notes {
    ...noteFields
  }
  fabricProduction {
    lastStartDate
    sufficientFabric
    started
    actualStartDate
    onTime
  }
  production {
    lastStartDate
    actualStartDate
    onTime
    started
  }
  qualityControl {
    lastVisitDate
    scheduledVisitDate
    visited
    passed
    notes
  }
  shipping {
    lastShippingDate
    actualShippingDate
    shipped
    trackNumber
    delivered
  }
}
    ${FabricSampleFieldsFragmentDoc}
${FitSampleFieldsFragmentDoc}
${NoteFieldsFragmentDoc}`;
export const PurchaseOrderScalarFieldsFragmentDoc = gql`
    fragment PurchaseOrderScalarFields on PurchaseOrder {
  uid
  createdAt
  expectedDeliveryDate
  status
  nextStatus
}
    `;
export const PurchaseOrderDetailFieldsFragmentDoc = gql`
    fragment PurchaseOrderDetailFields on PurchaseOrder {
  ...PurchaseOrderScalarFields
  company {
    name
    address
    contacts {
      fullName
      email
      phone
    }
  }
  factory {
    name
    address
    contacts {
      fullName
      email
      phone
    }
  }
}
    ${PurchaseOrderScalarFieldsFragmentDoc}`;
export const PurchaseOrderListFieldsFragmentDoc = gql`
    fragment PurchaseOrderListFields on PurchaseOrder {
  ...PurchaseOrderScalarFields
  company {
    name
  }
  factory {
    name
  }
}
    ${PurchaseOrderScalarFieldsFragmentDoc}`;
export const AttributeDefinitionsListFieldsFragmentDoc = gql`
    fragment AttributeDefinitionsListFields on AttributeDefinition {
  name
  values
  unit
}
    `;
export const FileFieldsFragmentDoc = gql`
    fragment fileFields on File {
  id
  name
  extName
  uploadingKey
  link
  createdAt
  user {
    fullName
  }
}
    `;
export const StyleFieldsFragmentDoc = gql`
    fragment styleFields on Style {
  id
  code
  name
  techPackUploaded
  techPacks {
    ...fileFields
  }
  productCodes
}
    ${FileFieldsFragmentDoc}`;
export const UserListFieldsFragmentDoc = gql`
    fragment UserListFields on User {
  id
  email
  fullName
  role
  disabled
  firebaseUser {
    emailVerified
    metadata {
      creationTime
      lastSignInTime
    }
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const FabricDocument = gql`
    query Fabric($code: String!) {
  fabric(code: $code) {
    code
    colorName
    ...fabricFields
  }
}
    ${FabricFieldsFragmentDoc}`;

/**
 * __useFabricQuery__
 *
 * To run a query within a React component, call `useFabricQuery` and pass it any options that fit your needs.
 * When your component renders, `useFabricQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFabricQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useFabricQuery(baseOptions: Apollo.QueryHookOptions<FabricQuery, FabricQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FabricQuery, FabricQueryVariables>(FabricDocument, options);
      }
export function useFabricLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FabricQuery, FabricQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FabricQuery, FabricQueryVariables>(FabricDocument, options);
        }
export type FabricQueryHookResult = ReturnType<typeof useFabricQuery>;
export type FabricLazyQueryHookResult = ReturnType<typeof useFabricLazyQuery>;
export type FabricQueryResult = Apollo.QueryResult<FabricQuery, FabricQueryVariables>;
export const CreateFabricDocument = gql`
    mutation CreateFabric($data: CreateFabricInput!) {
  createFabric(data: $data) {
    code
    colorName
  }
}
    `;
export type CreateFabricMutationFn = Apollo.MutationFunction<CreateFabricMutation, CreateFabricMutationVariables>;

/**
 * __useCreateFabricMutation__
 *
 * To run a mutation, you first call `useCreateFabricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFabricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFabricMutation, { data, loading, error }] = useCreateFabricMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFabricMutation(baseOptions?: Apollo.MutationHookOptions<CreateFabricMutation, CreateFabricMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFabricMutation, CreateFabricMutationVariables>(CreateFabricDocument, options);
      }
export type CreateFabricMutationHookResult = ReturnType<typeof useCreateFabricMutation>;
export type CreateFabricMutationResult = Apollo.MutationResult<CreateFabricMutation>;
export type CreateFabricMutationOptions = Apollo.BaseMutationOptions<CreateFabricMutation, CreateFabricMutationVariables>;
export const FabricsDocument = gql`
    query Fabrics {
  fabrics {
    ...fabricFields
  }
}
    ${FabricFieldsFragmentDoc}`;

/**
 * __useFabricsQuery__
 *
 * To run a query within a React component, call `useFabricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFabricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFabricsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFabricsQuery(baseOptions?: Apollo.QueryHookOptions<FabricsQuery, FabricsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FabricsQuery, FabricsQueryVariables>(FabricsDocument, options);
      }
export function useFabricsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FabricsQuery, FabricsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FabricsQuery, FabricsQueryVariables>(FabricsDocument, options);
        }
export type FabricsQueryHookResult = ReturnType<typeof useFabricsQuery>;
export type FabricsLazyQueryHookResult = ReturnType<typeof useFabricsLazyQuery>;
export type FabricsQueryResult = Apollo.QueryResult<FabricsQuery, FabricsQueryVariables>;
export const FactoriesDocument = gql`
    query Factories {
  factories {
    ...FactoryListFields
  }
}
    ${FactoryListFieldsFragmentDoc}`;

/**
 * __useFactoriesQuery__
 *
 * To run a query within a React component, call `useFactoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFactoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFactoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFactoriesQuery(baseOptions?: Apollo.QueryHookOptions<FactoriesQuery, FactoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FactoriesQuery, FactoriesQueryVariables>(FactoriesDocument, options);
      }
export function useFactoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FactoriesQuery, FactoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FactoriesQuery, FactoriesQueryVariables>(FactoriesDocument, options);
        }
export type FactoriesQueryHookResult = ReturnType<typeof useFactoriesQuery>;
export type FactoriesLazyQueryHookResult = ReturnType<typeof useFactoriesLazyQuery>;
export type FactoriesQueryResult = Apollo.QueryResult<FactoriesQuery, FactoriesQueryVariables>;
export const FactoryCodesDocument = gql`
    query FactoryCodes {
  factories {
    ...FactoryCodes
  }
}
    ${FactoryCodesFragmentDoc}`;

/**
 * __useFactoryCodesQuery__
 *
 * To run a query within a React component, call `useFactoryCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFactoryCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFactoryCodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFactoryCodesQuery(baseOptions?: Apollo.QueryHookOptions<FactoryCodesQuery, FactoryCodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FactoryCodesQuery, FactoryCodesQueryVariables>(FactoryCodesDocument, options);
      }
export function useFactoryCodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FactoryCodesQuery, FactoryCodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FactoryCodesQuery, FactoryCodesQueryVariables>(FactoryCodesDocument, options);
        }
export type FactoryCodesQueryHookResult = ReturnType<typeof useFactoryCodesQuery>;
export type FactoryCodesLazyQueryHookResult = ReturnType<typeof useFactoryCodesLazyQuery>;
export type FactoryCodesQueryResult = Apollo.QueryResult<FactoryCodesQuery, FactoryCodesQueryVariables>;
export const CreateFactoryDocument = gql`
    mutation CreateFactory($data: CreateCompanyInput!) {
  createFactory(data: $data) {
    code
  }
}
    `;
export type CreateFactoryMutationFn = Apollo.MutationFunction<CreateFactoryMutation, CreateFactoryMutationVariables>;

/**
 * __useCreateFactoryMutation__
 *
 * To run a mutation, you first call `useCreateFactoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFactoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFactoryMutation, { data, loading, error }] = useCreateFactoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFactoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateFactoryMutation, CreateFactoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFactoryMutation, CreateFactoryMutationVariables>(CreateFactoryDocument, options);
      }
export type CreateFactoryMutationHookResult = ReturnType<typeof useCreateFactoryMutation>;
export type CreateFactoryMutationResult = Apollo.MutationResult<CreateFactoryMutation>;
export type CreateFactoryMutationOptions = Apollo.BaseMutationOptions<CreateFactoryMutation, CreateFactoryMutationVariables>;
export const OperationLogsDocument = gql`
    query OperationLogs {
  operationLogs {
    ...operationLogFields
  }
}
    ${OperationLogFieldsFragmentDoc}`;

/**
 * __useOperationLogsQuery__
 *
 * To run a query within a React component, call `useOperationLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOperationLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOperationLogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOperationLogsQuery(baseOptions?: Apollo.QueryHookOptions<OperationLogsQuery, OperationLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OperationLogsQuery, OperationLogsQueryVariables>(OperationLogsDocument, options);
      }
export function useOperationLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OperationLogsQuery, OperationLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OperationLogsQuery, OperationLogsQueryVariables>(OperationLogsDocument, options);
        }
export type OperationLogsQueryHookResult = ReturnType<typeof useOperationLogsQuery>;
export type OperationLogsLazyQueryHookResult = ReturnType<typeof useOperationLogsLazyQuery>;
export type OperationLogsQueryResult = Apollo.QueryResult<OperationLogsQuery, OperationLogsQueryVariables>;
export const OrderItemsDocument = gql`
    query OrderItems($data: GetOrderItemsInput) {
  orderItems(data: $data) {
    ...OrderItemListFields
  }
}
    ${OrderItemListFieldsFragmentDoc}`;

/**
 * __useOrderItemsQuery__
 *
 * To run a query within a React component, call `useOrderItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderItemsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useOrderItemsQuery(baseOptions?: Apollo.QueryHookOptions<OrderItemsQuery, OrderItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderItemsQuery, OrderItemsQueryVariables>(OrderItemsDocument, options);
      }
export function useOrderItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderItemsQuery, OrderItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderItemsQuery, OrderItemsQueryVariables>(OrderItemsDocument, options);
        }
export type OrderItemsQueryHookResult = ReturnType<typeof useOrderItemsQuery>;
export type OrderItemsLazyQueryHookResult = ReturnType<typeof useOrderItemsLazyQuery>;
export type OrderItemsQueryResult = Apollo.QueryResult<OrderItemsQuery, OrderItemsQueryVariables>;
export const CreateOrderItemDocument = gql`
    mutation CreateOrderItem($data: CreateOrderItemInput!) {
  createOrderItem(data: $data) {
    ...OrderItemOwnFields
  }
}
    ${OrderItemOwnFieldsFragmentDoc}`;
export type CreateOrderItemMutationFn = Apollo.MutationFunction<CreateOrderItemMutation, CreateOrderItemMutationVariables>;

/**
 * __useCreateOrderItemMutation__
 *
 * To run a mutation, you first call `useCreateOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderItemMutation, { data, loading, error }] = useCreateOrderItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderItemMutation, CreateOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderItemMutation, CreateOrderItemMutationVariables>(CreateOrderItemDocument, options);
      }
export type CreateOrderItemMutationHookResult = ReturnType<typeof useCreateOrderItemMutation>;
export type CreateOrderItemMutationResult = Apollo.MutationResult<CreateOrderItemMutation>;
export type CreateOrderItemMutationOptions = Apollo.BaseMutationOptions<CreateOrderItemMutation, CreateOrderItemMutationVariables>;
export const PrintLinkDocument = gql`
    query PrintLink($fileName: String!) {
  printLink(fileName: $fileName)
}
    `;

/**
 * __usePrintLinkQuery__
 *
 * To run a query within a React component, call `usePrintLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrintLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrintLinkQuery({
 *   variables: {
 *      fileName: // value for 'fileName'
 *   },
 * });
 */
export function usePrintLinkQuery(baseOptions: Apollo.QueryHookOptions<PrintLinkQuery, PrintLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrintLinkQuery, PrintLinkQueryVariables>(PrintLinkDocument, options);
      }
export function usePrintLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrintLinkQuery, PrintLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrintLinkQuery, PrintLinkQueryVariables>(PrintLinkDocument, options);
        }
export type PrintLinkQueryHookResult = ReturnType<typeof usePrintLinkQuery>;
export type PrintLinkLazyQueryHookResult = ReturnType<typeof usePrintLinkLazyQuery>;
export type PrintLinkQueryResult = Apollo.QueryResult<PrintLinkQuery, PrintLinkQueryVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($data: CreateProductInput!) {
  createProduct(data: $data) {
    code
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const ProductsDocument = gql`
    query Products {
  products {
    ...productFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const ProductDocument = gql`
    query Product($code: String!) {
  product(code: $code) {
    ...productFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const PurchaseOrdersDocument = gql`
    query PurchaseOrders {
  purchaseOrders {
    ...PurchaseOrderListFields
  }
}
    ${PurchaseOrderListFieldsFragmentDoc}`;

/**
 * __usePurchaseOrdersQuery__
 *
 * To run a query within a React component, call `usePurchaseOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePurchaseOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePurchaseOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function usePurchaseOrdersQuery(baseOptions?: Apollo.QueryHookOptions<PurchaseOrdersQuery, PurchaseOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PurchaseOrdersQuery, PurchaseOrdersQueryVariables>(PurchaseOrdersDocument, options);
      }
export function usePurchaseOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PurchaseOrdersQuery, PurchaseOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PurchaseOrdersQuery, PurchaseOrdersQueryVariables>(PurchaseOrdersDocument, options);
        }
export type PurchaseOrdersQueryHookResult = ReturnType<typeof usePurchaseOrdersQuery>;
export type PurchaseOrdersLazyQueryHookResult = ReturnType<typeof usePurchaseOrdersLazyQuery>;
export type PurchaseOrdersQueryResult = Apollo.QueryResult<PurchaseOrdersQuery, PurchaseOrdersQueryVariables>;
export const PurchaseOrderDocument = gql`
    query PurchaseOrder($uid: Int!) {
  purchaseOrder(uid: $uid) {
    ...PurchaseOrderDetailFields
  }
}
    ${PurchaseOrderDetailFieldsFragmentDoc}`;

/**
 * __usePurchaseOrderQuery__
 *
 * To run a query within a React component, call `usePurchaseOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `usePurchaseOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePurchaseOrderQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function usePurchaseOrderQuery(baseOptions: Apollo.QueryHookOptions<PurchaseOrderQuery, PurchaseOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PurchaseOrderQuery, PurchaseOrderQueryVariables>(PurchaseOrderDocument, options);
      }
export function usePurchaseOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PurchaseOrderQuery, PurchaseOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PurchaseOrderQuery, PurchaseOrderQueryVariables>(PurchaseOrderDocument, options);
        }
export type PurchaseOrderQueryHookResult = ReturnType<typeof usePurchaseOrderQuery>;
export type PurchaseOrderLazyQueryHookResult = ReturnType<typeof usePurchaseOrderLazyQuery>;
export type PurchaseOrderQueryResult = Apollo.QueryResult<PurchaseOrderQuery, PurchaseOrderQueryVariables>;
export const CreatePurchaseOrderDocument = gql`
    mutation CreatePurchaseOrder($data: CreatePurchaseOrderInput!) {
  createPurchaseOrder(data: $data) {
    ...PurchaseOrderScalarFields
  }
}
    ${PurchaseOrderScalarFieldsFragmentDoc}`;
export type CreatePurchaseOrderMutationFn = Apollo.MutationFunction<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>;

/**
 * __useCreatePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useCreatePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPurchaseOrderMutation, { data, loading, error }] = useCreatePurchaseOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePurchaseOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>(CreatePurchaseOrderDocument, options);
      }
export type CreatePurchaseOrderMutationHookResult = ReturnType<typeof useCreatePurchaseOrderMutation>;
export type CreatePurchaseOrderMutationResult = Apollo.MutationResult<CreatePurchaseOrderMutation>;
export type CreatePurchaseOrderMutationOptions = Apollo.BaseMutationOptions<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>;
export const AttributeDefinitionsDocument = gql`
    query AttributeDefinitions {
  attributeDefinitions {
    ...AttributeDefinitionsListFields
  }
}
    ${AttributeDefinitionsListFieldsFragmentDoc}`;

/**
 * __useAttributeDefinitionsQuery__
 *
 * To run a query within a React component, call `useAttributeDefinitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributeDefinitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributeDefinitionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAttributeDefinitionsQuery(baseOptions?: Apollo.QueryHookOptions<AttributeDefinitionsQuery, AttributeDefinitionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttributeDefinitionsQuery, AttributeDefinitionsQueryVariables>(AttributeDefinitionsDocument, options);
      }
export function useAttributeDefinitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttributeDefinitionsQuery, AttributeDefinitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttributeDefinitionsQuery, AttributeDefinitionsQueryVariables>(AttributeDefinitionsDocument, options);
        }
export type AttributeDefinitionsQueryHookResult = ReturnType<typeof useAttributeDefinitionsQuery>;
export type AttributeDefinitionsLazyQueryHookResult = ReturnType<typeof useAttributeDefinitionsLazyQuery>;
export type AttributeDefinitionsQueryResult = Apollo.QueryResult<AttributeDefinitionsQuery, AttributeDefinitionsQueryVariables>;
export const AttributeDefinitionDocument = gql`
    query AttributeDefinition {
  attributeDefinitions {
    ...AttributeDefinitionsListFields
  }
}
    ${AttributeDefinitionsListFieldsFragmentDoc}`;

/**
 * __useAttributeDefinitionQuery__
 *
 * To run a query within a React component, call `useAttributeDefinitionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributeDefinitionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributeDefinitionQuery({
 *   variables: {
 *   },
 * });
 */
export function useAttributeDefinitionQuery(baseOptions?: Apollo.QueryHookOptions<AttributeDefinitionQuery, AttributeDefinitionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttributeDefinitionQuery, AttributeDefinitionQueryVariables>(AttributeDefinitionDocument, options);
      }
export function useAttributeDefinitionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttributeDefinitionQuery, AttributeDefinitionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttributeDefinitionQuery, AttributeDefinitionQueryVariables>(AttributeDefinitionDocument, options);
        }
export type AttributeDefinitionQueryHookResult = ReturnType<typeof useAttributeDefinitionQuery>;
export type AttributeDefinitionLazyQueryHookResult = ReturnType<typeof useAttributeDefinitionLazyQuery>;
export type AttributeDefinitionQueryResult = Apollo.QueryResult<AttributeDefinitionQuery, AttributeDefinitionQueryVariables>;
export const PushPurchaseOrderToNextStageDocument = gql`
    mutation PushPurchaseOrderToNextStage($uid: Int!) {
  pushPurchaseOrderToNextStage(uid: $uid) {
    status
    nextStatus
  }
}
    `;
export type PushPurchaseOrderToNextStageMutationFn = Apollo.MutationFunction<PushPurchaseOrderToNextStageMutation, PushPurchaseOrderToNextStageMutationVariables>;

/**
 * __usePushPurchaseOrderToNextStageMutation__
 *
 * To run a mutation, you first call `usePushPurchaseOrderToNextStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePushPurchaseOrderToNextStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pushPurchaseOrderToNextStageMutation, { data, loading, error }] = usePushPurchaseOrderToNextStageMutation({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function usePushPurchaseOrderToNextStageMutation(baseOptions?: Apollo.MutationHookOptions<PushPurchaseOrderToNextStageMutation, PushPurchaseOrderToNextStageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PushPurchaseOrderToNextStageMutation, PushPurchaseOrderToNextStageMutationVariables>(PushPurchaseOrderToNextStageDocument, options);
      }
export type PushPurchaseOrderToNextStageMutationHookResult = ReturnType<typeof usePushPurchaseOrderToNextStageMutation>;
export type PushPurchaseOrderToNextStageMutationResult = Apollo.MutationResult<PushPurchaseOrderToNextStageMutation>;
export type PushPurchaseOrderToNextStageMutationOptions = Apollo.BaseMutationOptions<PushPurchaseOrderToNextStageMutation, PushPurchaseOrderToNextStageMutationVariables>;
export const SendFabricSampleDocument = gql`
    mutation SendFabricSample($data: SendSampleInput!) {
  sendFabricSample(data: $data) {
    sku
  }
}
    `;
export type SendFabricSampleMutationFn = Apollo.MutationFunction<SendFabricSampleMutation, SendFabricSampleMutationVariables>;

/**
 * __useSendFabricSampleMutation__
 *
 * To run a mutation, you first call `useSendFabricSampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFabricSampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFabricSampleMutation, { data, loading, error }] = useSendFabricSampleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendFabricSampleMutation(baseOptions?: Apollo.MutationHookOptions<SendFabricSampleMutation, SendFabricSampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFabricSampleMutation, SendFabricSampleMutationVariables>(SendFabricSampleDocument, options);
      }
export type SendFabricSampleMutationHookResult = ReturnType<typeof useSendFabricSampleMutation>;
export type SendFabricSampleMutationResult = Apollo.MutationResult<SendFabricSampleMutation>;
export type SendFabricSampleMutationOptions = Apollo.BaseMutationOptions<SendFabricSampleMutation, SendFabricSampleMutationVariables>;
export const SendFitSampleDocument = gql`
    mutation SendFitSample($data: SendSampleInput!) {
  sendFitSample(data: $data) {
    sku
  }
}
    `;
export type SendFitSampleMutationFn = Apollo.MutationFunction<SendFitSampleMutation, SendFitSampleMutationVariables>;

/**
 * __useSendFitSampleMutation__
 *
 * To run a mutation, you first call `useSendFitSampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFitSampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFitSampleMutation, { data, loading, error }] = useSendFitSampleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendFitSampleMutation(baseOptions?: Apollo.MutationHookOptions<SendFitSampleMutation, SendFitSampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFitSampleMutation, SendFitSampleMutationVariables>(SendFitSampleDocument, options);
      }
export type SendFitSampleMutationHookResult = ReturnType<typeof useSendFitSampleMutation>;
export type SendFitSampleMutationResult = Apollo.MutationResult<SendFitSampleMutation>;
export type SendFitSampleMutationOptions = Apollo.BaseMutationOptions<SendFitSampleMutation, SendFitSampleMutationVariables>;
export const ApproveFitSampleDocument = gql`
    mutation ApproveFitSample($data: UniqueSampleInput!) {
  approveFitSample(data: $data) {
    id
    sku
  }
}
    `;
export type ApproveFitSampleMutationFn = Apollo.MutationFunction<ApproveFitSampleMutation, ApproveFitSampleMutationVariables>;

/**
 * __useApproveFitSampleMutation__
 *
 * To run a mutation, you first call `useApproveFitSampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveFitSampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveFitSampleMutation, { data, loading, error }] = useApproveFitSampleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useApproveFitSampleMutation(baseOptions?: Apollo.MutationHookOptions<ApproveFitSampleMutation, ApproveFitSampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveFitSampleMutation, ApproveFitSampleMutationVariables>(ApproveFitSampleDocument, options);
      }
export type ApproveFitSampleMutationHookResult = ReturnType<typeof useApproveFitSampleMutation>;
export type ApproveFitSampleMutationResult = Apollo.MutationResult<ApproveFitSampleMutation>;
export type ApproveFitSampleMutationOptions = Apollo.BaseMutationOptions<ApproveFitSampleMutation, ApproveFitSampleMutationVariables>;
export const RejectFitSampleDocument = gql`
    mutation RejectFitSample($data: UniqueSampleInput!) {
  rejectFitSample(data: $data) {
    id
    sku
  }
}
    `;
export type RejectFitSampleMutationFn = Apollo.MutationFunction<RejectFitSampleMutation, RejectFitSampleMutationVariables>;

/**
 * __useRejectFitSampleMutation__
 *
 * To run a mutation, you first call `useRejectFitSampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectFitSampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectFitSampleMutation, { data, loading, error }] = useRejectFitSampleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRejectFitSampleMutation(baseOptions?: Apollo.MutationHookOptions<RejectFitSampleMutation, RejectFitSampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectFitSampleMutation, RejectFitSampleMutationVariables>(RejectFitSampleDocument, options);
      }
export type RejectFitSampleMutationHookResult = ReturnType<typeof useRejectFitSampleMutation>;
export type RejectFitSampleMutationResult = Apollo.MutationResult<RejectFitSampleMutation>;
export type RejectFitSampleMutationOptions = Apollo.BaseMutationOptions<RejectFitSampleMutation, RejectFitSampleMutationVariables>;
export const MarkFitSampleAsDeliveredDocument = gql`
    mutation MarkFitSampleAsDelivered($data: UniqueSampleInput!) {
  markFitSampleAsDelivered(data: $data) {
    id
    sku
  }
}
    `;
export type MarkFitSampleAsDeliveredMutationFn = Apollo.MutationFunction<MarkFitSampleAsDeliveredMutation, MarkFitSampleAsDeliveredMutationVariables>;

/**
 * __useMarkFitSampleAsDeliveredMutation__
 *
 * To run a mutation, you first call `useMarkFitSampleAsDeliveredMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkFitSampleAsDeliveredMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markFitSampleAsDeliveredMutation, { data, loading, error }] = useMarkFitSampleAsDeliveredMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMarkFitSampleAsDeliveredMutation(baseOptions?: Apollo.MutationHookOptions<MarkFitSampleAsDeliveredMutation, MarkFitSampleAsDeliveredMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkFitSampleAsDeliveredMutation, MarkFitSampleAsDeliveredMutationVariables>(MarkFitSampleAsDeliveredDocument, options);
      }
export type MarkFitSampleAsDeliveredMutationHookResult = ReturnType<typeof useMarkFitSampleAsDeliveredMutation>;
export type MarkFitSampleAsDeliveredMutationResult = Apollo.MutationResult<MarkFitSampleAsDeliveredMutation>;
export type MarkFitSampleAsDeliveredMutationOptions = Apollo.BaseMutationOptions<MarkFitSampleAsDeliveredMutation, MarkFitSampleAsDeliveredMutationVariables>;
export const ApproveFabricSampleDocument = gql`
    mutation ApproveFabricSample($data: UniqueSampleInput!) {
  approveFabricSample(data: $data) {
    id
    sku
  }
}
    `;
export type ApproveFabricSampleMutationFn = Apollo.MutationFunction<ApproveFabricSampleMutation, ApproveFabricSampleMutationVariables>;

/**
 * __useApproveFabricSampleMutation__
 *
 * To run a mutation, you first call `useApproveFabricSampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveFabricSampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveFabricSampleMutation, { data, loading, error }] = useApproveFabricSampleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useApproveFabricSampleMutation(baseOptions?: Apollo.MutationHookOptions<ApproveFabricSampleMutation, ApproveFabricSampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveFabricSampleMutation, ApproveFabricSampleMutationVariables>(ApproveFabricSampleDocument, options);
      }
export type ApproveFabricSampleMutationHookResult = ReturnType<typeof useApproveFabricSampleMutation>;
export type ApproveFabricSampleMutationResult = Apollo.MutationResult<ApproveFabricSampleMutation>;
export type ApproveFabricSampleMutationOptions = Apollo.BaseMutationOptions<ApproveFabricSampleMutation, ApproveFabricSampleMutationVariables>;
export const RejectFabricSampleDocument = gql`
    mutation RejectFabricSample($data: UniqueSampleInput!) {
  rejectFabricSample(data: $data) {
    id
    sku
  }
}
    `;
export type RejectFabricSampleMutationFn = Apollo.MutationFunction<RejectFabricSampleMutation, RejectFabricSampleMutationVariables>;

/**
 * __useRejectFabricSampleMutation__
 *
 * To run a mutation, you first call `useRejectFabricSampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectFabricSampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectFabricSampleMutation, { data, loading, error }] = useRejectFabricSampleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRejectFabricSampleMutation(baseOptions?: Apollo.MutationHookOptions<RejectFabricSampleMutation, RejectFabricSampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectFabricSampleMutation, RejectFabricSampleMutationVariables>(RejectFabricSampleDocument, options);
      }
export type RejectFabricSampleMutationHookResult = ReturnType<typeof useRejectFabricSampleMutation>;
export type RejectFabricSampleMutationResult = Apollo.MutationResult<RejectFabricSampleMutation>;
export type RejectFabricSampleMutationOptions = Apollo.BaseMutationOptions<RejectFabricSampleMutation, RejectFabricSampleMutationVariables>;
export const MarkFabricSampleAsDeliveredDocument = gql`
    mutation MarkFabricSampleAsDelivered($data: UniqueSampleInput!) {
  markFabricSampleAsDelivered(data: $data) {
    id
    sku
  }
}
    `;
export type MarkFabricSampleAsDeliveredMutationFn = Apollo.MutationFunction<MarkFabricSampleAsDeliveredMutation, MarkFabricSampleAsDeliveredMutationVariables>;

/**
 * __useMarkFabricSampleAsDeliveredMutation__
 *
 * To run a mutation, you first call `useMarkFabricSampleAsDeliveredMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkFabricSampleAsDeliveredMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markFabricSampleAsDeliveredMutation, { data, loading, error }] = useMarkFabricSampleAsDeliveredMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMarkFabricSampleAsDeliveredMutation(baseOptions?: Apollo.MutationHookOptions<MarkFabricSampleAsDeliveredMutation, MarkFabricSampleAsDeliveredMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkFabricSampleAsDeliveredMutation, MarkFabricSampleAsDeliveredMutationVariables>(MarkFabricSampleAsDeliveredDocument, options);
      }
export type MarkFabricSampleAsDeliveredMutationHookResult = ReturnType<typeof useMarkFabricSampleAsDeliveredMutation>;
export type MarkFabricSampleAsDeliveredMutationResult = Apollo.MutationResult<MarkFabricSampleAsDeliveredMutation>;
export type MarkFabricSampleAsDeliveredMutationOptions = Apollo.BaseMutationOptions<MarkFabricSampleAsDeliveredMutation, MarkFabricSampleAsDeliveredMutationVariables>;
export const CreateNoteDocument = gql`
    mutation CreateNote($data: CreateNoteInput!) {
  createNote(data: $data) {
    parentId
  }
}
    `;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, options);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const ImageLinkDocument = gql`
    query ImageLink($fileName: String!) {
  imageLink(fileName: $fileName)
}
    `;

/**
 * __useImageLinkQuery__
 *
 * To run a query within a React component, call `useImageLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageLinkQuery({
 *   variables: {
 *      fileName: // value for 'fileName'
 *   },
 * });
 */
export function useImageLinkQuery(baseOptions: Apollo.QueryHookOptions<ImageLinkQuery, ImageLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageLinkQuery, ImageLinkQueryVariables>(ImageLinkDocument, options);
      }
export function useImageLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageLinkQuery, ImageLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageLinkQuery, ImageLinkQueryVariables>(ImageLinkDocument, options);
        }
export type ImageLinkQueryHookResult = ReturnType<typeof useImageLinkQuery>;
export type ImageLinkLazyQueryHookResult = ReturnType<typeof useImageLinkLazyQuery>;
export type ImageLinkQueryResult = Apollo.QueryResult<ImageLinkQuery, ImageLinkQueryVariables>;
export const StyleDocument = gql`
    query Style($code: String!) {
  style(code: $code) {
    ...styleFields
  }
}
    ${StyleFieldsFragmentDoc}`;

/**
 * __useStyleQuery__
 *
 * To run a query within a React component, call `useStyleQuery` and pass it any options that fit your needs.
 * When your component renders, `useStyleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStyleQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useStyleQuery(baseOptions: Apollo.QueryHookOptions<StyleQuery, StyleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StyleQuery, StyleQueryVariables>(StyleDocument, options);
      }
export function useStyleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StyleQuery, StyleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StyleQuery, StyleQueryVariables>(StyleDocument, options);
        }
export type StyleQueryHookResult = ReturnType<typeof useStyleQuery>;
export type StyleLazyQueryHookResult = ReturnType<typeof useStyleLazyQuery>;
export type StyleQueryResult = Apollo.QueryResult<StyleQuery, StyleQueryVariables>;
export const StylesDocument = gql`
    query Styles {
  styles {
    ...styleFields
  }
}
    ${StyleFieldsFragmentDoc}`;

/**
 * __useStylesQuery__
 *
 * To run a query within a React component, call `useStylesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStylesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStylesQuery({
 *   variables: {
 *   },
 * });
 */
export function useStylesQuery(baseOptions?: Apollo.QueryHookOptions<StylesQuery, StylesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StylesQuery, StylesQueryVariables>(StylesDocument, options);
      }
export function useStylesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StylesQuery, StylesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StylesQuery, StylesQueryVariables>(StylesDocument, options);
        }
export type StylesQueryHookResult = ReturnType<typeof useStylesQuery>;
export type StylesLazyQueryHookResult = ReturnType<typeof useStylesLazyQuery>;
export type StylesQueryResult = Apollo.QueryResult<StylesQuery, StylesQueryVariables>;
export const CreateStyleDocument = gql`
    mutation CreateStyle($data: CreateStyleInput!) {
  createStyle(data: $data) {
    code
    name
  }
}
    `;
export type CreateStyleMutationFn = Apollo.MutationFunction<CreateStyleMutation, CreateStyleMutationVariables>;

/**
 * __useCreateStyleMutation__
 *
 * To run a mutation, you first call `useCreateStyleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStyleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStyleMutation, { data, loading, error }] = useCreateStyleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateStyleMutation(baseOptions?: Apollo.MutationHookOptions<CreateStyleMutation, CreateStyleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStyleMutation, CreateStyleMutationVariables>(CreateStyleDocument, options);
      }
export type CreateStyleMutationHookResult = ReturnType<typeof useCreateStyleMutation>;
export type CreateStyleMutationResult = Apollo.MutationResult<CreateStyleMutation>;
export type CreateStyleMutationOptions = Apollo.BaseMutationOptions<CreateStyleMutation, CreateStyleMutationVariables>;
export const UploadTechPackDocument = gql`
    mutation UploadTechPack($data: UploadTechPackInput!) {
  uploadTechPack(data: $data) {
    code
  }
}
    `;
export type UploadTechPackMutationFn = Apollo.MutationFunction<UploadTechPackMutation, UploadTechPackMutationVariables>;

/**
 * __useUploadTechPackMutation__
 *
 * To run a mutation, you first call `useUploadTechPackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadTechPackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadTechPackMutation, { data, loading, error }] = useUploadTechPackMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUploadTechPackMutation(baseOptions?: Apollo.MutationHookOptions<UploadTechPackMutation, UploadTechPackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadTechPackMutation, UploadTechPackMutationVariables>(UploadTechPackDocument, options);
      }
export type UploadTechPackMutationHookResult = ReturnType<typeof useUploadTechPackMutation>;
export type UploadTechPackMutationResult = Apollo.MutationResult<UploadTechPackMutation>;
export type UploadTechPackMutationOptions = Apollo.BaseMutationOptions<UploadTechPackMutation, UploadTechPackMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...UserListFields
  }
}
    ${UserListFieldsFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    email
    role
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;