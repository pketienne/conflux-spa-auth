'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

const Test = () => {
	const [blah, setBlah] = useState();

	async function currentAuthenticatedUser() {
		 try {
			 const { username, userId, signInDetails } = await getCurrentUser();
			 console.log(`The username: ${username}`);
			 console.log(`The userId: ${userId}`);
			 console.log(`The signInDetails: ${signInDetails}`);
		 } catch (err) {
			 console.log(err);
		 }
	}

	useEffect(() => {
		setBlah(currentAuthenticatedUser());
	}, [])

	return (
		<h1>User: {blah}</h1>
	)
}

export default Test;
