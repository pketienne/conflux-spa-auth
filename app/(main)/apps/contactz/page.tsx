'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ContactService } from '@/demo/service/ContactService';
import { DataTable } from 'primereact/datatable';
import { FileUpload } from 'primereact/fileupload';
import { generateClient } from "aws-amplify/data";
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import type { Demo } from '@/types';
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

function App() {
	const toast = useRef<Toast | null>(null);
  const [contacts, setContacts] = useState<Demo.Contact[]>([]);

	const startToolbarTemplate = () => {
		return (
			<React.Fragment>
				<div className="my-2">
					<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" />
					<Button label="Delete" icon="pi pi-trash" severity="danger" />
				</div>
			</React.Fragment>
		);
	};

	const endToolbarTemplate = () => {
		return (
			<React.Fragment>
				<FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
				<Button label="Export" icon="pi pi-upload" severity="help" />
			</React.Fragment>
		);
	};

	useEffect(() => {
		ContactService.getContacts().then((data) => setContacts(data));
	}, []);

	return (
		<div className="grid crud-demo">
			<div className="col-12">
				<div className="card">
					<Toast ref={toast} />
					<Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate}></Toolbar>
					<DataTable
						value={contacts}
						dataKey="id"
					>
						<Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
						<Column field="id" header="ID" sortable headerStyle={{ minWidth: '5rem' }}></Column>
						<Column field="name" header="Name" sortable headerStyle={{ minWidth: '15rem' }}></Column>
						<Column field="phone" header="Phone" sortable headerStyle={{ minWidth: '8rem' }}></Column>
						<Column field="email" header="Email" sortable headerStyle={{ minWidth: '10rem' }}></Column>
						<Column field="type" header="Type" sortable headerStyle={{ minWidth: '5rem' }}></Column>
						<Column field="ssn" header="SSN" sortable headerStyle={{ minWidth: '8rem' }}></Column>
						<Column field="ein" header="EIN" sortable headerStyle={{ minWidth: '10rem' }}></Column>
						<Column field="dba" header="DBA" sortable headerStyle={{ minWidth: '10rem' }}></Column>
						<Column headerStyle={{ minWidth: '10rem' }}></Column>
					</DataTable>
				</div>
			</div>
		</div>
	);
}

export default App;


/*
			<h1>Hello, Amplify 👋</h1>
			<br />
			<br />
			<form action={addTodo}>
				<input type="text" name="title" />
				<button type="submit">Add Todo</button>
			</form>
			<ul>{todos && todos.map((todo) => <li key={todo.id}>{todo.content}</li>)}</ul>
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
*/
