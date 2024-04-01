'use client';

import React, { useEffect, useRef, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Demo } from '@/types';
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const Crud = () => {
	const [contacts, setContacts] = useState<Demo.Contact[]>([]);

	const addContact = async () => {
		const { errors, data: newContact } = await client.models.Contacts.create({
			name: 'Patrick K. Etienne',
			ssn: 123121234,
			phone: '8129550419',
			email: 'patrick@mcgrawdesignbuild.com',
			type: 'person',
			ein: null,
			dba: null,
			notes: 'This guy is crazy and works too damn much.',
		});
		console.log(errors, newContact);
	}

	async function getContacts() {
		const { data } = await client.models.Contacts.list();
		setContacts(data);
	}

	return (
		<div className="grid crud-demo">
			<div className="col-12">
				<div className="card">
					<h1>Hello, Amplify 👋</h1>
					<br />
					<br />
					<form action={addContact}>
						<input type="text" placeholder="name" name="contact_name" />
						<br />
						<input type="text" placeholder="phone" name="contact_phone" />
						<br />
						<input type="text" placeholder="email" name="contact_email" />
						<br />
						<input type="text" placeholder="type" name="contact_type" />
						<br />
						<input type="text" placeholder="ssn" name="contact_ssn" />
						<br />
						<input type="text" placeholder="ein" name="contact_ein" />
						<br />
						<input type="text" placeholder="dba" name="contact_dba" />
						<br />
						<input type="text" placeholder="notes" name="contact_notes" />
						<br />
						<button type="submit">Add Contact</button>
					</form>
					<ul>{contacts && contacts.map((contact) => <li key={contact.id}>{contact.name}</li>)}</ul>
				</div>
			</div>
			<div>
				<h1>Contacts</h1>
				<button onClick={addContact}>Create </button>
				<ul>
					{contacts.map((contact) => (
						<li key={contact.id}>{contact.id}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Crud;
