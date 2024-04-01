import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
	Contacts: a
		.model({
			id: a.id(),
			name: a.string(),
			phone: a.string(),
			email: a.string(),
			type: a.string(),
			ssn: a.string(),
			ein: a.string(),
			dba: a.string(),
			notes: a.string(),
		})
		.authorization([a.allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});
