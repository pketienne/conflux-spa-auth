import { cookiesClient } from '@/utils/amplify-utils';
import type { Demo } from '@/types';

export const ContactService = {
	async getItems() {
		// const { data: contacts } = await cookiesClient.models.Contacts.list();
		// const res = await cookiesClient.models.Contacts.list();
		// const res = await fetch('/demo/data/contacts.json', {
		// 	headers: { 'Cache-Control': 'no-cache' }
		// });
		// const d = await res.json();
		// return d.data as Demo.Contact[];
		return await cookiesClient.models.Contacts.list();
	},
};
