/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

/** A person whose nose to pick */
export type Person = {
  __typename?: 'Person';
  /** Person's ID */
  id: Scalars['ID']['output'];
  /** Person's name */
  name: Scalars['String']['output'];
};

/** Image */
export type PersonWithImage = {
  __typename?: 'PersonWithImage';
  /** Face Image URL */
  faceUrl: Scalars['String']['output'];
  /** Image ID */
  id: Scalars['ID']['output'];
  /** Name */
  name: Scalars['String']['output'];
  /** Nose Image URL */
  noseUrl: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Get all people */
  people: Array<Person>;
  /** Get today's person */
  todaysPerson: PersonWithImage;
};

export type GetPeopleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPeopleQuery = { __typename?: 'Query', people: Array<{ __typename?: 'Person', id: string, name: string }> };

export type GetTodaysPersonQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodaysPersonQuery = { __typename?: 'Query', todaysPerson: { __typename?: 'PersonWithImage', id: string, name: string, noseUrl: string, faceUrl: string } };


export const GetPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPeople"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetPeopleQuery, GetPeopleQueryVariables>;
export const GetTodaysPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTodaysPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"todaysPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"faceUrl"}}]}}]}}]} as unknown as DocumentNode<GetTodaysPersonQuery, GetTodaysPersonQueryVariables>;