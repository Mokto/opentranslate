import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log(`Start seeding ...`);
const password = await Bun.password.hash('password');
await prisma.user.create({
	data: {
		name: 'John Doe',
		email: 'john@test.com',
		password: password,
		organization: {
			create: {
				name: 'Open Translate'
			}
		}
	}
});
console.log(`Seeding finished.`);
