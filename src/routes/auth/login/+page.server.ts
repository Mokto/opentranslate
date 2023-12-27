import { auth } from '$lib/server/lucia';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email?.toString() || !password?.toString()) {
			return error(400, { message: 'Missing email or password' });
		}

		const key = await auth.useKey('email', email.toString(), password.toString());
		console.log(key, email, password);

		// locals.auth.setSession({})
		// TODO log the user in
	}
};
