import { auth } from '$lib/server/lucia';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async () => {
		await auth.createUser({
			key: {
				providerId: 'email',
				providerUserId: 'test@test.com',
				password: 'test'
			},
			attributes: {
				email: 'test@test.com'
			}
		});
	}
};
