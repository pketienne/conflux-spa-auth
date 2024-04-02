/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContacts = /* GraphQL */ `
	query GetContacts($id: ID!) {
		getContacts(id: $id) {
			createdAt
			dba
			ein
			email
			id
			name
			notes
			owner
			phone
			ssn
			type
			updatedAt
			__typename
		}
	}
`;
export const listContacts = /* GraphQL */ `
	query ListContacts($filter: ModelContactsFilterInput, $id: ID, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
		listContacts(filter: $filter, id: $id, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
			items {
				createdAt
				dba
				ein
				email
				id
				name
				notes
				owner
				phone
				ssn
				type
				updatedAt
				__typename
			}
			nextToken
			__typename
		}
	}
`;
