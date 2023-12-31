/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tfragment FieldError on FieldError {\n\t\tfield\n\t\tmessage\n\t}\n": types.FieldErrorFragmentDoc,
    "\n\tfragment UserInfo on User {\n\t\tid\n\t\tusername\n\t\temail\n\t}\n": types.UserInfoFragmentDoc,
    "\n\tfragment UserMutationResponse on UserMutationResponse {\n\t\tcode\n\t\tsuccess\n\t\tmessage\n\t\tuser {\n\t\t\t...UserInfo\n\t\t}\n\t\terrors {\n\t\t\t...FieldError\n\t\t}\n\t}\n": types.UserMutationResponseFragmentDoc,
    "\n\tmutation Login($loginInput: LoginInput!) {\n\t\tlogin(loginInput: $loginInput) {\n\t\t\t...UserMutationResponse\n\t\t}\n\t}\n": types.LoginDocument,
    "\n\tmutation Logout {\n\t\tlogout\n\t}\n": types.LogoutDocument,
    "\n\tmutation Register($registerInput: RegisterInput!) {\n\t\tregister(registerInput: $registerInput) {\n\t\t\t...UserMutationResponse\n\t\t}\n\t}\n": types.RegisterDocument,
    "\n\tquery Me {\n\t\tme {\n\t\t\t...UserInfo\n\t\t}\n\t}\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment FieldError on FieldError {\n\t\tfield\n\t\tmessage\n\t}\n"): (typeof documents)["\n\tfragment FieldError on FieldError {\n\t\tfield\n\t\tmessage\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment UserInfo on User {\n\t\tid\n\t\tusername\n\t\temail\n\t}\n"): (typeof documents)["\n\tfragment UserInfo on User {\n\t\tid\n\t\tusername\n\t\temail\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment UserMutationResponse on UserMutationResponse {\n\t\tcode\n\t\tsuccess\n\t\tmessage\n\t\tuser {\n\t\t\t...UserInfo\n\t\t}\n\t\terrors {\n\t\t\t...FieldError\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment UserMutationResponse on UserMutationResponse {\n\t\tcode\n\t\tsuccess\n\t\tmessage\n\t\tuser {\n\t\t\t...UserInfo\n\t\t}\n\t\terrors {\n\t\t\t...FieldError\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation Login($loginInput: LoginInput!) {\n\t\tlogin(loginInput: $loginInput) {\n\t\t\t...UserMutationResponse\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Login($loginInput: LoginInput!) {\n\t\tlogin(loginInput: $loginInput) {\n\t\t\t...UserMutationResponse\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation Logout {\n\t\tlogout\n\t}\n"): (typeof documents)["\n\tmutation Logout {\n\t\tlogout\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation Register($registerInput: RegisterInput!) {\n\t\tregister(registerInput: $registerInput) {\n\t\t\t...UserMutationResponse\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Register($registerInput: RegisterInput!) {\n\t\tregister(registerInput: $registerInput) {\n\t\t\t...UserMutationResponse\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Me {\n\t\tme {\n\t\t\t...UserInfo\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Me {\n\t\tme {\n\t\t\t...UserInfo\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;