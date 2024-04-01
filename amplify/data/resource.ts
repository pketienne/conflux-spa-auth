import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
	Contacts: a
		.model({
			id: a.id(),
			name: a.string(),
			phone: a.phone(),
			email: a.email(),
			type: a.enum(['person', 'company']),
			ssn: a.integer(),
			ein: a.integer(),
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
