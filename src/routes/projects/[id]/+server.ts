import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	await prisma.project.delete({
		where: { id: +params.id }
		// include: { storyblokProject: true }
	});
	return new Response(null);
}
