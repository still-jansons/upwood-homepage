export const prerender = true;
import type { PageLoad } from './$types';

export const load: PageLoad = async({ parent }) => {
    const { storyblokApi } = await parent();

    const dataStory = await storyblokApi.getStory("contacts", {
        version: "draft"
    });

    return {
        story: dataStory.data.story
    }
}
