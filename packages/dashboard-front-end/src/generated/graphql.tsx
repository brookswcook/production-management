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
  DateTime: any;
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
  passed: Scalars['Boolean'];
  scheduledVisitDate: Scalars['DateTime'];
  visited: Scalars['Boolean'];
};

export type ProductShipping = {
  __typename?: 'ProductShipping';
  actualShippingDate: Scalars['DateTime'];
  delivered: Scalars['Boolean'];
  lastShippingDate: Scalars['DateTime'];
  trackNumber: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
  users: Array<User>;
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


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', email: string, date: any }> };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', name: string, model: string, style: string, sku: string, deliveryDate: any, dueIn: number, onTime: boolean, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, techPack?: { __typename?: 'TechPack', fabricCode: string, type?: string | null, print?: string | null, pantone?: string | null, color?: string | null } | null, fabricSample?: { __typename?: 'Sample', sku: string } | null, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string } | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: any, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: any | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: any, onTime?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: any } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: any } | null } };

export type ProductFieldsFragment = { __typename?: 'Product', name: string, model: string, style: string, sku: string, deliveryDate: any, dueIn: number, onTime: boolean, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, techPack?: { __typename?: 'TechPack', fabricCode: string, type?: string | null, print?: string | null, pantone?: string | null, color?: string | null } | null, fabricSample?: { __typename?: 'Sample', sku: string } | null, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string } | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: any, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: any | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: any, onTime?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: any } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: any } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', name: string, model: string, style: string, sku: string, deliveryDate: any, dueIn: number, onTime: boolean, techPackUploaded: boolean, fabricSampleDelivered: boolean, fitSampleDelivered: boolean, techPack?: { __typename?: 'TechPack', fabricCode: string, type?: string | null, print?: string | null, pantone?: string | null, color?: string | null } | null, fabricSample?: { __typename?: 'Sample', sku: string } | null, fitSamples: Array<{ __typename?: 'FitSample', sku: string, approved?: boolean | null }>, preProductionSample?: { __typename?: 'FitSample', sku: string } | null, fabricProduction?: { __typename?: 'FabricProduction', lastStartDate: any, sufficientFabric?: boolean | null, started?: boolean | null, actualStartDate?: any | null, onTime?: boolean | null } | null, production?: { __typename?: 'ProductProduction', lastStartDate: any, onTime?: boolean | null } | null, qualityControl?: { __typename?: 'ProductQualityControl', lastVisitDate: any } | null, shipping?: { __typename?: 'ProductShipping', lastShippingDate: any } | null }> };

export const ProductFieldsFragmentDoc = gql`
    fragment productFields on Product {
  name
  model
  style
  sku
  deliveryDate
  dueIn
  onTime
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
    sku
  }
  fitSamples {
    sku
    approved
  }
  preProductionSample {
    sku
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
    onTime
  }
  qualityControl {
    lastVisitDate
  }
  shipping {
    lastShippingDate
  }
}
    `;
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