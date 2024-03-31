'use client';

import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import Logout from '@/components/Logout';

const Test = () => {
	const [username, setUsername] = useState<string>();
	const [userId, setUserId] = useState<string>();
	const [authFlowType, setAuthFlowType] = useState<string>();
	const [loginId, setLoginId] = useState<string>();

	async function currentAuthenticatedUser() {
		 try {
			 const { username, userId, signInDetails } = await getCurrentUser();
			 setUsername(username);
			 setUserId(userId);
			 setAuthFlowType(signInDetails?.authFlowType);
			 setLoginId(signInDetails?.loginId);
		 } catch (err) {
			 console.log(err);
		 }
	}

	useEffect(() => {
		currentAuthenticatedUser();
	});

	return (
		<>
			<h1>Username: {username}</h1>
			<h1>User ID: {userId}</h1>
			<h1>Auth Flow Type: {authFlowType}</h1>
			<h1>Login Id: {loginId}</h1>

			{loginId && <Logout />}
		</>
	)
}

export default Test;
