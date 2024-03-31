import { AuthGetCurrentUserServer } from '@/utils/amplify-utils';
// import { getCurrentUser } from 'aws-amplify/auth';

export const UserService = {
	async getUser() {
		return await AuthGetCurrentUserServer();
	}
}
