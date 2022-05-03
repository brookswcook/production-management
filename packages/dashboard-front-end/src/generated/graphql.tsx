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

export type CreateFabricInput = {
  code: Scalars['String'];
  colorCode?: InputMaybe<Scalars['String']>;
  colorName: Scalars['String'];
  print?: InputMaybe<FileUploadInput>;
  type?: InputMaybe<Scalars['String']>;
};

export type CreateNoteInput = {
  images?: InputMaybe<Array<FileUploadInput>>;
  parentId: Scalars['String'];
  text: Scalars['String'];
  type: Scalars['String'];
};

export type CreateProductInput = {
  deliveryDate: Scalars['DateTime'];
  fabricCode: Scalars['String'];
  factoryName: Scalars['String'];
  styleCode: Scalars['String'];
};

export type CreateStyleInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  techPack?: InputMaybe<FileUploadInput>;
};

export type Fabric = {
  __typename?: 'Fabric';
  code: Scalars['String'];
  colorCode?: Maybe<Scalars['String']>;
  colorName: Scalars['String'];
  colorType?: Maybe<Scalars['String']>;
  printFileName?: Maybe<Scalars['String']>;
  samples: Array<FabricSample>;
  type?: Maybe<Scalars['String']>;
};

export type FabricProduction = {
  __typename?: 'FabricProduction';
  actualStartDate?: Maybe<Scalars['DateTime']>;
  lastStartDate: Scalars['DateTime'];
  onTime?: Maybe<Scalars['Boolean']>;
  started?: Maybe<Scalars['Boolean']>;
  sufficientFabric?: Maybe<Scalars['Boolean']>;
};

export type FabricSample = {
  __typename?: 'FabricSample';
  approved?: Maybe<Scalars['Boolean']>;
  delivered?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  note?: Maybe<Note>;
  parentCode: Scalars['String'];
  sku: Scalars['String'];
  trackNumber: Scalars['String'];
};

export type FileUploadInput = {
  file: Scalars['Upload'];
  fileSize: Scalars['Float'];
};

export type FitSample = {
  __typename?: 'FitSample';
  approved?: Maybe<Scalars['Boolean']>;
  delivered?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  note?: Maybe<Note>;
  parentCode: Scalars['String'];
  sku: Scalars['String'];
  trackNumber: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveFabricSample: FabricSample;
  approveFitSample: FitSample;
  createFabric: Fabric;
  createNote: Note;
  createProduct: Product;
  createStyle: Style;
  login: Scalars['String'];
  rejectFabricSample: FabricSample;
  rejectFitSample: FitSample;
  sendFabricSample: FabricSample;
  sendFitSample: FitSample;
  startFabricProduction: Product;
  startProduction: Product;
  uploadPrint: Fabric;
  uploadTechPack: Style;
};


export type MutationApproveFabricSampleArgs = {
  data: UniqueSampleInput;
};


export type MutationApproveFitSampleArgs = {
  data: UniqueSampleInput;
};


export type MutationCreateFabricArgs = {
  data: CreateFabricInput;
};


export type MutationCreateNoteArgs = {
  data: CreateNoteInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreateStyleArgs = {
  data: CreateStyleInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
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


export type MutationUploadPrintArgs = {
  data: UploadPrintInput;
};


export type MutationUploadTechPackArgs = {
  data: UploadTechPackInput;
};

export type Note = {
  __typename?: 'Note';
  createdAt?: Maybe<Scalars['DateTime']>;
  imageFileNames: Array<Scalars['String']>;
  parentId: Scalars['String'];
  text: Scalars['String'];
  type: Scalars['String'];
  user?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  code: Scalars['String'];
  deliveryDate: Scalars['DateTime'];
  dueIn: Scalars['Int'];
  fabric: Fabric;
  fabricCode: Scalars['String'];
  fabricProduction?: Maybe<FabricProduction>;
  fabricSampleDelivered: Scalars['Boolean'];
  factoryName: Scalars['String'];
  fitSampleDelivered: Scalars['Boolean'];
  fitSamples: Array<FitSample>;
  name: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  onTime: Scalars['Boolean'];
  preProductionSample?: Maybe<FitSample>;
  production?: Maybe<ProductProduction>;
  qualityControl?: Maybe<ProductQualityControl>;
  shipping?: Maybe<ProductShipping>;
  stage: Scalars['String'];
  style: Style;
  styleCode: Scalars['String'];
  techPackUploaded: Scalars['Boolean'];
};

export type ProductProduction = {
  __typename?: 'ProductProduction';
  actualStartDate?: Maybe<Scalars['DateTime']>;
  lastStartDate: Scalars['DateTime'];
  onTime?: Maybe<Scalars['Boolean']>;
  started?: Maybe<Scalars['Boolean']>;
};

export type ProductQualityControl = {
  __typename?: 'ProductQualityControl';
  lastVisitDate: Scalars['DateTime'];
  notes?: Maybe<Array<Scalars['String']>>;
  passed?: Maybe<Scalars['Boolean']>;
  scheduledVisitDate?: Maybe<Scalars['DateTime']>;
  visited: Scalars['Boolean'];
};

export type ProductShipping = {
  __typename?: 'ProductShipping';
  actualShippingDate?: Maybe<Scalars['DateTime']>;
  delivered?: Maybe<Scalars['Boolean']>;
  lastShippingDate: Scalars['DateTime'];
  shipped: Scalars['Boolean'];
  trackNumber?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  fabric?: Maybe<Fabric>;
  fabrics: Array<Fabric>;
  imageLink: Scalars['String'];
  printLink: Scalars['String'];
  product: Product;
  products: Array<Product>;
  style?: Maybe<Style>;
  styles: Array<Style>;
  techPackLink: Scalars['String'];
  users: Array<User>;
};


export type QueryFabricArgs = {
  code: Scalars['String'];
};


export type QueryImageLinkArgs = {
  fileName: Scalars['String'];
};


export type QueryPrintLinkArgs = {
  fileName: Scalars['String'];
};


export type QueryProductArgs = {
  code: Scalars['String'];
};


export type QueryStyleArgs = {
  code: Scalars['String'];
};


export type QueryTechPackLinkArgs = {
  fileName: Scalars['String'];
};

export type Sample = {
  __typename?: 'Sample';
  approved?: Maybe<Scalars['Boolean']>;
  delivered?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  note?: Maybe<Note>;
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
  name: Scalars['String'];
  techPackFileName?: Maybe<Scalars['String']>;
  techPackUploaded?: Maybe<Scalars['Boolean']>;
};

export type UniqueSampleInput = {
  parentCode: Scalars['String'];
  sku: Scalars['String'];
};

export type UploadPrintInput = {
  code: Scalars['String'];
  print: FileUploadInput;
};

export type UploadTechPackInput = {
  code: Scalars['String'];
  techPack: FileUploadInput;
};

export type User = {
  __typename?: 'User';
  date: Scalars['DateTime'];
  email: Scalars['String'];
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', email: string, date: string }> };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type PrintLinkQueryVariables = Exact<{
  fileName: Scalars['String'];
}>;


export type PrintLinkQuery = { __typename?: 'Query', printLink: string };

export type NoteFieldsFragment = { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null };

export type SampleFieldsFragment = { __typename?: 'Sample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null };

export type FitSampleFieldsFragment = { __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null };

export type FabricSampleFieldsFragment = { __typename?: 'FabricSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null };

export type ProductFieldsFragment = { __typename?: 'Product', code: string, name: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, factoryName: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, style: { __typename?: 'Style', code: string, name: string, techPackFileName?: string | null, techPackUploaded?: boolean | null }, fabric: { __typename?: 'Fabric', code: string, colorName: string, type?: string | null, colorType?: string | null, colorCode?: string | null, printFileName?: string | null, samples: Array<{ __typename?: 'FabricSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null }> }, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null } | null, notes?: Array<{ __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null }> | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: string | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate?: string | null, onTime?: boolean | null, started?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate?: string | null, visited: boolean, passed?: boolean | null, notes?: Array<string> | null } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate?: string | null, shipped: boolean, trackNumber?: string | null, delivered?: boolean | null } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', code: string, name: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, factoryName: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, style: { __typename?: 'Style', code: string, name: string, techPackFileName?: string | null, techPackUploaded?: boolean | null }, fabric: { __typename?: 'Fabric', code: string, colorName: string, type?: string | null, colorType?: string | null, colorCode?: string | null, printFileName?: string | null, samples: Array<{ __typename?: 'FabricSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null }> }, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null } | null, notes?: Array<{ __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null }> | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: string | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate?: string | null, onTime?: boolean | null, started?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate?: string | null, visited: boolean, passed?: boolean | null, notes?: Array<string> | null } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate?: string | null, shipped: boolean, trackNumber?: string | null, delivered?: boolean | null } | null }> };

export type ProductQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', code: string, name: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, factoryName: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, style: { __typename?: 'Style', code: string, name: string, techPackFileName?: string | null, techPackUploaded?: boolean | null }, fabric: { __typename?: 'Fabric', code: string, colorName: string, type?: string | null, colorType?: string | null, colorCode?: string | null, printFileName?: string | null, samples: Array<{ __typename?: 'FabricSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null }> }, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null, note?: { __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null } | null } | null, notes?: Array<{ __typename?: 'Note', type: string, text: string, imageFileNames: Array<string>, user?: string | null }> | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: string | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate?: string | null, onTime?: boolean | null, started?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate?: string | null, visited: boolean, passed?: boolean | null, notes?: Array<string> | null } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate?: string | null, shipped: boolean, trackNumber?: string | null, delivered?: boolean | null } | null } };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', code: string } };

export type StyleQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type StyleQuery = { __typename?: 'Query', style?: { __typename?: 'Style', code: string, name: string } | null };

export type CreateStyleMutationVariables = Exact<{
  data: CreateStyleInput;
}>;


export type CreateStyleMutation = { __typename?: 'Mutation', createStyle: { __typename?: 'Style', code: string, name: string } };

export type FabricQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type FabricQuery = { __typename?: 'Query', fabric?: { __typename?: 'Fabric', code: string, colorName: string } | null };

export type CreateFabricMutationVariables = Exact<{
  data: CreateFabricInput;
}>;


export type CreateFabricMutation = { __typename?: 'Mutation', createFabric: { __typename?: 'Fabric', code: string, colorName: string } };

export type ApproveFitSampleMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type ApproveFitSampleMutation = { __typename?: 'Mutation', approveFitSample: { __typename?: 'FitSample', id: string, sku: string } };

export type RejectFitSampleMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type RejectFitSampleMutation = { __typename?: 'Mutation', rejectFitSample: { __typename?: 'FitSample', id: string, sku: string } };

export type ApproveFabricSampleMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type ApproveFabricSampleMutation = { __typename?: 'Mutation', approveFabricSample: { __typename?: 'FabricSample', id: string, sku: string } };

export type RejectFabricSampleMutationVariables = Exact<{
  data: UniqueSampleInput;
}>;


export type RejectFabricSampleMutation = { __typename?: 'Mutation', rejectFabricSample: { __typename?: 'FabricSample', id: string, sku: string } };

export type CreateNoteMutationVariables = Exact<{
  data: CreateNoteInput;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'Note', parentId: string } };

export type ImageLinkQueryVariables = Exact<{
  fileName: Scalars['String'];
}>;


export type ImageLinkQuery = { __typename?: 'Query', imageLink: string };

export type SendFabricSampleMutationVariables = Exact<{
  data: SendSampleInput;
}>;


export type SendFabricSampleMutation = { __typename?: 'Mutation', sendFabricSample: { __typename?: 'FabricSample', sku: string } };

export type SendFitSampleMutationVariables = Exact<{
  data: SendSampleInput;
}>;


export type SendFitSampleMutation = { __typename?: 'Mutation', sendFitSample: { __typename?: 'FitSample', sku: string } };

export type UploadTechPackMutationVariables = Exact<{
  data: UploadTechPackInput;
}>;


export type UploadTechPackMutation = { __typename?: 'Mutation', uploadTechPack: { __typename?: 'Style', code: string } };

export type TechPackLinkQueryVariables = Exact<{
  fileName: Scalars['String'];
}>;


export type TechPackLinkQuery = { __typename?: 'Query', techPackLink: string };

export const NoteFieldsFragmentDoc = gql`
    fragment noteFields on Note {
  type
  text
  imageFileNames
  user
}
    `;
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
  code
  name
  deliveryDate
  dueIn
  onTime
  stage
  factoryName
  techPackUploaded
  fabricSampleDelivered
  fitSampleDelivered
  style {
    code
    name
    techPackFileName
    techPackUploaded
  }
  fabric {
    code
    colorName
    type
    colorType
    colorCode
    printFileName
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
export const UsersDocument = gql`
    query Users {
  users {
    email
    date
  }
}
    `;

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
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data)
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
export const StyleDocument = gql`
    query Style($code: String!) {
  style(code: $code) {
    code
    name
  }
}
    `;

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
export const FabricDocument = gql`
    query Fabric($code: String!) {
  fabric(code: $code) {
    code
    colorName
  }
}
    `;

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
export const TechPackLinkDocument = gql`
    query TechPackLink($fileName: String!) {
  techPackLink(fileName: $fileName)
}
    `;

/**
 * __useTechPackLinkQuery__
 *
 * To run a query within a React component, call `useTechPackLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useTechPackLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTechPackLinkQuery({
 *   variables: {
 *      fileName: // value for 'fileName'
 *   },
 * });
 */
export function useTechPackLinkQuery(baseOptions: Apollo.QueryHookOptions<TechPackLinkQuery, TechPackLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TechPackLinkQuery, TechPackLinkQueryVariables>(TechPackLinkDocument, options);
      }
export function useTechPackLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TechPackLinkQuery, TechPackLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TechPackLinkQuery, TechPackLinkQueryVariables>(TechPackLinkDocument, options);
        }
export type TechPackLinkQueryHookResult = ReturnType<typeof useTechPackLinkQuery>;
export type TechPackLinkLazyQueryHookResult = ReturnType<typeof useTechPackLinkLazyQuery>;
export type TechPackLinkQueryResult = Apollo.QueryResult<TechPackLinkQuery, TechPackLinkQueryVariables>;