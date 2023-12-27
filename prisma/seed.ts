import { PrismaClient } from '@prisma/client';
import { auth } from '$lib/server/lucia';

const prisma = new PrismaClient();

console.log(`Start seeding ...`);
const organization = await prisma.organization.create({
	data: {
		name: 'Open Translate'
	}
});

console.log(organization.id);
await auth.createUser({
	key: {
		providerId: 'email',
		providerUserId: 'support@opentranslate.com',
		password: 'test'
	},
	attributes: {
		email: 'support@opentranslate.com',
		name: 'Test User',
		organizationId: organization.id
	}
});
// console.log(user.userId);
// await prisma.user.create({
// 	data: {
// 		name: 'John Doe',
// 		email: 'john@test.com',
// 		password: password,
// 		organization: {
// 			create: {
// 				name: 'Open Translate'
// 			}
// 		}
// 	}
// });
console.log(`Seeding finished.`);
