'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { generateClient } from 'aws-amplify/data';
import React, { useEffect, useState } from 'react';
import { type Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

const Contacts = () => {
	const [contacts, setContacts] = useState<Schema['Contacts'][]>();
	const [selectedContacts, setSelectedContacts] = useState<Schema['Contacts'][]>();

	async function listContacts() {
		const { data } = await client.models.Contacts.list();
		setContacts(data);
	}

	useEffect(() => {
		listContacts();
	},[]);

	const startToolbarTemplate = () => {
		return (
			<React.Fragment>
				<div className="my-2">
					<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" />
					<Button label="Delete" icon="pi pi-trash" severity="danger" disabled={!selectedContacts || !selectedContacts.length} />
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

	const actionBodyTemplate = () => {
		return (
			<>
				<Button icon="pi pi-pencil" rounded severity="success" className="mr-2" />
				<Button icon="pi pi-trash" severity="warning" rounded />
			</>
		);
	};

	return (
		<div className="grid crud-demo">
			<div className="col-12">
				<div className="card">
					<Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate} />
					<DataTable value={contacts} dataKey="id" header="Contact Details">
						<Column selectionMode="multiple" headerStyle={{ width: '4rem' }} />
						<Column sortable field="name" header="Name" />
						<Column sortable field="ssn" header="SSN" />
						<Column sortable field="phone" header="Phone" />
						<Column sortable field="email" header="Email" />
						<Column sortable field="type" header="Type" />
						<Column sortable field="ein" header="EIN" />
						<Column sortable field="dba" header="DBA" />
						<Column sortable field="notes" header="Notes" />
						<Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} />
					</DataTable>
				</div>
			</div>
		</div>
	)
}

export default Contacts;
