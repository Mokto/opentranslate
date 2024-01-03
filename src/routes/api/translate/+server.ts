import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
	const dataJson = await event.request.json();
	const projectId = dataJson.projectId;
	const text = dataJson.value;
	const languageCodes = dataJson.languageCodes;

	const project = await prisma.project.findFirst({
		where: { id: projectId },
		select: { openAIApiKey: true, description: true }
	});
	if (!project) {
		return new Response('No project found', { status: 400 });
	}
	const isJSON = `"${text}"` != JSON.stringify(text);

	// console.log(`"${text}"` == JSON.stringify(text), languageCodes, project?.openAIApiKey);
	// const prompt = `Translate the ${
	// 	isJSON ? 'JSON' : ''
	// } website from English to French. What you need to translate is surrounded by """. The text discusses ${
	// 	project.description
	// }. ${
	// 	isJSON
	// 		? 'Please make sure you return the whole json as an answer'
	// 		: "Please make sure you only return the text you're translating."
	// }. """${isJSON ? JSON.stringify(text) : text}"""`;
	// console.log(`"""${isJSON ? JSON.stringify(text) : text}"""`);
	const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${project.openAIApiKey}`
		},
		body: JSON.stringify({
			messages: [
				{
					role: 'system',
					content: `You're an assistant that translates ${
						isJSON ? 'JSON' : ''
					} websites from English to French. ${
						isJSON
							? 'Make sure you return the whole json as an answer.'
							: `Make sure you only return the text you're translating.`
					}. The text discusses ${project.description}.`
				},
				{
					role: 'system',
					content: `Use the following translation pairs: \nLookalike => similaire\nLookalike search => Recherche de similaires`
				},
				{ role: 'user', content: `${isJSON ? JSON.stringify(text) : text}` }
			].filter(Boolean),
			// model: 'gpt-4-1106-preview'
			model: 'gpt-4'
			// model: "gpt-3.5-turbo",
			// model: 'gpt-3.5-turbo-1106',
		})
	});
	if (!apiResponse.ok) {
		console.log(await apiResponse.text());
		throw new Error(`HTTP error! Status: ${apiResponse.status}`);
	}
	const data = await apiResponse.json();
	// console.log('coucou');
	// console.log(data.choices[0].message.content);
	// console.log(data.choices[0].message.content);
	const contentString = isJSON
		? JSON.stringify(JSON.parse(data.choices[0].message.content))
		: data.choices[0].message.content;
	console.log(contentString);

	return json({ contentString });
}
