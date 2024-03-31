// app/page.tsx

import { revalidatePath } from 'next/cache';

import { AuthGetCurrentUserServer, cookiesClient } from '@/utils/amplify-utils';

async function App() {
	const user = await AuthGetCurrentUserServer();
	const { data: todos } = await cookiesClient.models.Todo.list();
	const { data: contacts } = await cookiesClient.models.Contacts.list();

	async function addTodo(data: FormData) {
		'use server';
		const title = data.get('title') as string;
		await cookiesClient.models.Todo.create({
			content: title,
			done: false,
			priority: 'medium'
		});
		revalidatePath('/');
	}

	async function addContact(data: FormData) {
		'use server';
		const title = data.get('title') as string;
		await cookiesClient.models.Contacts.create({
			name: title,
			phone: '8129550419',
			email: 'blah@foo.ext',
			type: 'person',
			ssn: 123121234,
			ein: null,
			dba: '',
			notes: "It's'a'me, patricko!"
		});
	}

	return (
		<>
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
		</>
	);
}

export default App;
