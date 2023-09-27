// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({ params, parent }) {
    const { storyblokApi } = await parent();
    const slug             = params.slug || 'home';

    const dataStory = await storyblokApi.getStory(slug, {
        version: "draft"
    });

    return {
        story: dataStory.data.story
    }
}
