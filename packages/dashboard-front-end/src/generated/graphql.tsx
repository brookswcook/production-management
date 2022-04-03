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
};

export type CreateProductInput = {
  deliveryDate: Scalars['DateTime'];
  model: Scalars['String'];
  sku: Scalars['String'];
  style: Scalars['String'];
};

export type FabricProduction = {
  __typename?: 'FabricProduction';
  actualStartDate?: Maybe<Scalars['DateTime']>;
  lastStartDate: Scalars['DateTime'];
  onTime?: Maybe<Scalars['Boolean']>;
  started?: Maybe<Scalars['Boolean']>;
  sufficientFabric?: Maybe<Scalars['Boolean']>;
};

export type FitSample = {
  __typename?: 'FitSample';
  approved?: Maybe<Scalars['Boolean']>;
  delivered?: Maybe<Scalars['Boolean']>;
  sku: Scalars['String'];
  trackNumber: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveFabricSample: Product;
  createProduct: Product;
  login: Scalars['String'];
  markFabricSampleDelivered: Product;
  sendFabricSample: Product;
  sendFitSample: FitSample;
  startFabricProduction: Product;
  startProduction: Product;
  uploadTechPack: Product;
};


export type MutationApproveFabricSampleArgs = {
  data: UniqueSampleInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationMarkFabricSampleDeliveredArgs = {
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


export type MutationUploadTechPackArgs = {
  data: UploadTechPackInput;
};

export type Product = {
  __typename?: 'Product';
  deliveryDate: Scalars['DateTime'];
  dueIn: Scalars['Int'];
  fabricProduction?: Maybe<FabricProduction>;
  fabricSample?: Maybe<Sample>;
  fabricSampleDelivered: Scalars['Boolean'];
  fitSampleDelivered: Scalars['Boolean'];
  fitSamples: Array<FitSample>;
  model: Scalars['String'];
  name: Scalars['String'];
  onTime: Scalars['Boolean'];
  preProductionSample?: Maybe<FitSample>;
  production?: Maybe<ProductProduction>;
  qualityControl?: Maybe<ProductQualityControl>;
  shipping?: Maybe<ProductShipping>;
  sku: Scalars['String'];
  stage: Scalars['String'];
  style: Scalars['String'];
  techPack?: Maybe<TechPack>;
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
  product: Product;
  products: Array<Product>;
  users: Array<User>;
};


export type QueryProductArgs = {
  productName: Scalars['String'];
};

export type Sample = {
  __typename?: 'Sample';
  approved?: Maybe<Scalars['Boolean']>;
  delivered?: Maybe<Scalars['Boolean']>;
  sku: Scalars['String'];
  trackNumber: Scalars['String'];
};

export type SendSampleInput = {
  productName: Scalars['String'];
  sku: Scalars['String'];
  trackNumber: Scalars['String'];
};

export type StartFabricProductionInput = {
  productName: Scalars['String'];
};

export type StartProductionInput = {
  productName: Scalars['String'];
};

export type TechPack = {
  __typename?: 'TechPack';
  color?: Maybe<Scalars['String']>;
  fabricCode: Scalars['String'];
  pantone?: Maybe<Scalars['String']>;
  print?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UniqueSampleInput = {
  productName: Scalars['String'];
  sku: Scalars['String'];
};

export type UploadTechPackInput = {
  fabricCode: Scalars['String'];
  pantone?: InputMaybe<Scalars['String']>;
  print?: InputMaybe<Scalars['String']>;
  productName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  date: Scalars['DateTime'];
  email: Scalars['String'];
};

export type Workflow = {
  __typename?: 'Workflow';
  fabricProduction: WorkflowStage;
  production: WorkflowStage;
  qualityControl: WorkflowStage;
  shipping: WorkflowStage;
};

export type WorkflowStage = {
  __typename?: 'WorkflowStage';
  duration: Scalars['Float'];
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', email: string, date: string }> };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', name: string, model: string, style: string, sku: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, techPack?: { __typename?: 'TechPack', fabricCode: string, type?: string | null, print?: string | null, pantone?: string | null, color?: string | null } | null, fabricSample?: { __typename?: 'Sample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null } | null, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null } | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: string | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate?: string | null, onTime?: boolean | null, started?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate?: string | null, visited: boolean, passed?: boolean | null, notes?: Array<string> | null } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate?: string | null, shipped: boolean, trackNumber?: string | null, delivered?: boolean | null } | null } };

export type SampleFieldsFragment = { __typename?: 'Sample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null };

export type FitSampleFieldsFragment = { __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null };

export type ProductFieldsFragment = { __typename?: 'Product', name: string, model: string, style: string, sku: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, techPack?: { __typename?: 'TechPack', fabricCode: string, type?: string | null, print?: string | null, pantone?: string | null, color?: string | null } | null, fabricSample?: { __typename?: 'Sample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null } | null, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null } | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: string | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate?: string | null, onTime?: boolean | null, started?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate?: string | null, visited: boolean, passed?: boolean | null, notes?: Array<string> | null } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate?: string | null, shipped: boolean, trackNumber?: string | null, delivered?: boolean | null } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', name: string, model: string, style: string, sku: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, techPack?: { __typename?: 'TechPack', fabricCode: string, type?: string | null, print?: string | null, pantone?: string | null, color?: string | null } | null, fabricSample?: { __typename?: 'Sample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null } | null, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null } | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: string | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate?: string | null, onTime?: boolean | null, started?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate?: string | null, visited: boolean, passed?: boolean | null, notes?: Array<string> | null } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate?: string | null, shipped: boolean, trackNumber?: string | null, delivered?: boolean | null } | null }> };

export type ProductQueryVariables = Exact<{
  productName: Scalars['String'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', name: string, model: string, style: string, sku: string, deliveryDate: string, dueIn: number, onTime: boolean, stage: string, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, techPack?: { __typename?: 'TechPack', fabricCode: string, type?: string | null, print?: string | null, pantone?: string | null, color?: string | null } | null, fabricSample?: { __typename?: 'Sample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null } | null, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string, approved?: boolean | null, trackNumber: string, delivered?: boolean | null } | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: string, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: string | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: string, actualStartDate?: string | null, onTime?: boolean | null, started?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: string, scheduledVisitDate?: string | null, visited: boolean, passed?: boolean | null, notes?: Array<string> | null } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: string, actualShippingDate?: string | null, shipped: boolean, trackNumber?: string | null, delivered?: boolean | null } | null } };

export type SendFabricSampleMutationVariables = Exact<{
  data: SendSampleInput;
}>;


export type SendFabricSampleMutation = { __typename?: 'Mutation', sendFabricSample: { __typename?: 'Product', name: string } };

export type UploadTechPackMutationVariables = Exact<{
  data: UploadTechPackInput;
}>;


export type UploadTechPackMutation = { __typename?: 'Mutation', uploadTechPack: { __typename?: 'Product', name: string, deliveryDate: string, techPack?: { __typename?: 'TechPack', fabricCode: string, type?: string | null, print?: string | null, pantone?: string | null, color?: string | null } | null } };

export const SampleFieldsFragmentDoc = gql`
    fragment sampleFields on Sample {
  sku
  approved
  trackNumber
  delivered
}
    `;
export const FitSampleFieldsFragmentDoc = gql`
    fragment fitSampleFields on FitSample {
  sku
  approved
  trackNumber
  delivered
}
    `;
export const ProductFieldsFragmentDoc = gql`
    fragment productFields on Product {
  name
  model
  style
  sku
  deliveryDate
  dueIn
  onTime
  stage
  techPackUploaded
  fabricSampleDelivered
  fitSampleDelivered
  techPack {
    fabricCode
    type
    print
    pantone
    color
  }
  fabricSample {
    ...sampleFields
  }
  fitSamples {
    ...fitSampleFields
  }
  preProductionSample {
    ...fitSampleFields
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
    ${SampleFieldsFragmentDoc}
${FitSampleFieldsFragmentDoc}`;
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
export const CreateProductDocument = gql`
    mutation CreateProduct($data: CreateProductInput!) {
  createProduct(data: $data) {
    ...productFields
  }
}
    ${ProductFieldsFragmentDoc}`;
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
    query Product($productName: String!) {
  product(productName: $productName) {
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
 *      productName: // value for 'productName'
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
export const SendFabricSampleDocument = gql`
    mutation SendFabricSample($data: SendSampleInput!) {
  sendFabricSample(data: $data) {
    name
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
export const UploadTechPackDocument = gql`
    mutation UploadTechPack($data: UploadTechPackInput!) {
  uploadTechPack(data: $data) {
    name
    deliveryDate
    techPack {
      fabricCode
      type
      print
      pantone
      color
    }
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