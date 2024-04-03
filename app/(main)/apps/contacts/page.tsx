'use client';

// import React, { useEffect, useState } from 'react';
// import { Button } from 'primereact/button';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import { FileUpload } from 'primereact/fileupload';
// import { FilterMatchMode, FilterService } from 'primereact/api';
// import { InputText } from 'primereact/inputtext';
// import { Toolbar } from 'primereact/toolbar';
// import { generateClient } from 'aws-amplify/data';
// import { type Schema } from '@/amplify/data/resource';

// const client = generateClient<Schema>();

// const Contacts = () => {
// 	const [contacts, setContacts] = useState<Schema['Contacts'][]>();
// 	const [selectedContacts, setSelectedContacts] = useState<Schema['Contacts'][]>();
// 	const [filters, setFilters] = useState({
// 		// global: { value: null, matchMode: FilterMatchMode.CONTAINS },
// 		name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
// 		// 'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
// 		// representative: { value: null, matchMode: FilterMatchMode.IN },
// 		// For using custom filters, you must set FilterMatchMode.CUSTOM to matchMode.
// 		// activity: { value: null, matchMode: FilterMatchMode.CUSTOM },
// 		// status: { value: null, matchMode: FilterMatchMode.EQUALS },
// 		// verified: { value: null, matchMode: FilterMatchMode.EQUALS }
// 	});

// 	async function listContacts() {
// 		const { data } = await client.models.Contacts.list();
// 		setContacts(data);
// 	}

// 	useEffect(() => {
// 		listContacts();
// 	},[]);

// 	const startToolbarTemplate = () => {
// 		return (
// 			<React.Fragment>
// 				<div className="my-2">
// 					<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" />
// 					<Button label="Delete" icon="pi pi-trash" severity="danger" disabled={!selectedContacts || !selectedContacts.length} />
// 				</div>
// 			</React.Fragment>
// 		);
// 	};

// 	const endToolbarTemplate = () => {
// 		return (
// 			<React.Fragment>
// 				<FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
// 				<Button label="Export" icon="pi pi-upload" severity="help" />
// 			</React.Fragment>
// 		);
// 	};

// 	const header = (
// 		<div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
// 			<h5 className="m-0">Manage Products</h5>
// 			<span className="block mt-2 md:mt-0 p-input-icon-left">
// 				<i className="pi pi-search" />
// 				<InputText type="search" placeholder="Search..." />
// 			</span>
// 		</div>
// 	);

// 	const actionBodyTemplate = () => {
// 		return (
// 			<>
// 				<Button icon="pi pi-pencil" rounded severity="success" className="mr-2" />
// 				<Button icon="pi pi-trash" severity="warning" rounded />
// 			</>
// 		);
// 	};

// 	return (
// 		<div className="grid crud-demo">
// 			<div className="col-12">
// 				<div className="card">
// 					<Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate} />
// 					<DataTable
// 						dataKey="id"
// 						filters={filters}
// 						filterDisplay="row"
// 						header={header}
// 						multiSortMeta={[{field: 'name', order: 1}]} 
// 						removableSort
// 						sortMode="multiple"
// 						value={contacts}
// 						>
// 						<Column selectionMode="multiple" headerStyle={{ width: '1rem' }} />
// 						<Column sortable filter headerStyle={{ width: '11rem' }} field="name"		header="Name"		filterPlaceholder="name" filterField="name" />
// 						<Column sortable filter headerStyle={{ width:  '1rem' }} field="ssn"		header="SSN"		filterPlaceholder="ssn" />
// 						<Column sortable filter headerStyle={{ width:  '9rem' }} field="phone"	header="Phone"	filterPlaceholder="phone" />
// 						<Column sortable filter headerStyle={{ width:  '1rem' }} field="email"	header="Email"	filterPlaceholder="email" />
// 						<Column sortable filter headerStyle={{ width:  '1rem' }} field="type"		header="Type"		filterPlaceholder="type" />
// 						<Column sortable filter headerStyle={{ width:  '8rem' }} field="ein"		header="EIN"		filterPlaceholder="ein" />
// 						<Column sortable filter headerStyle={{ width:  '8rem' }} field="dba"		header="DBA"		filterPlaceholder="dba" />
// 						<Column sortable filter headerStyle={{ width:  '1rem' }} field="notes"	header="Notes"	filterPlaceholder="notes" />
// 						<Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} />
// 					</DataTable>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default Contacts;

import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export default function BasicFilterDemo() {
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const [loading, setLoading] = useState(true);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [contacts, setContacts] = useState<Schema['Contacts'][]>();

	async function listContacts() {
		const { data } = await client.models.Contacts.list();
		console.log(data);
		setContacts(data);
	}

	useEffect(() => {
		listContacts();
		setLoading(false);
	},[]);

	const onGlobalFilterChange = (e: any) => {
		const value = e.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const renderHeader = () => {
		return (
			<div className="flex justify-content-end">
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
				</span>
			</div>
		);
	};

	const header = renderHeader();

	return (
		<div className="card">
			<DataTable value={contacts} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
					globalFilterFields={['name', 'country.name', 'representative.name', 'status']} header={header} emptyMessage="No customers found.">
				<Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
			</DataTable>
		</div>
	);
}
