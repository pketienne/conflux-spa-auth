'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { generateClient } from "aws-amplify/data";
import type { Demo } from '@/types';
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const Crud = () => {
	const [contacts, setContacts] = useState<Demo.Contact[]>([]);

	// const addContact = async () => {
	// 	const { errors, data: newContact } = await client.models.Contacts.create({
	// 		name: 'Anthony D. Etienne',
	// 		ssn: 123121234,
	// 		phone: '(317) 882-1239',
	// 		email: 'tony.etienne@gmail.com',
	// 		type: 'person',
	// 		ein: null,
	// 		dba: null,
	// 		notes: "I don't understand how this guy can smell so bad.",
	// 	});
	// 	console.log(errors, newContact);
	// }

	async function addContact(data: FormData) {
		const name = data.get('name') as string;
	}	

	async function getContacts() {
		const { data } = await client.models.Contacts.list();
		setContacts(data);
	}

	useEffect(() => {
		getContacts();
	}, []);

	return (
		<div className="grid crud-demo">
			<div className="col-12">
				<div className="card">
					<DataTable value={contacts} dataKey="id" header="Contact Details">
						<Column sortable field="id"			header="ID" />
						<Column sortable field="name"		header="Name" />
						<Column sortable field="ssn"		header="SSN" />
						<Column sortable field="phone"	header="Phone" />
						<Column sortable field="email"	header="Email" />
						<Column sortable field="type"		header="Type" />
						<Column sortable field="ein"		header="EIN" />
						<Column sortable field="dba"		header="DBA" />
						<Column sortable field="notes"	header="Notes" />
					</DataTable>
					<br />
					<form action={addContact}>
						<input type="text" placeholder="name" name="name" />
						<br />
						<input type="text" placeholder="phone" name="phone" />
						<br />
						<input type="text" placeholder="email" name="email" />
						<br />
						<input type="text" placeholder="type" name="type" />
						<br />
						<input type="text" placeholder="ssn" name="ssn" />
						<br />
						<input type="text" placeholder="ein" name="ein" />
						<br />
						<input type="text" placeholder="dba" name="dba" />
						<br />
						<input type="text" placeholder="notes" name="notes" />
						<br />
						<button type="submit" value="submit">Add Contact</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Crud;
