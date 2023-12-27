import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	await prisma.project.delete({
		where: { id: +params.id }
	});
	return new Response(null, { status: 301, headers: { location: '/projects' } });
}
