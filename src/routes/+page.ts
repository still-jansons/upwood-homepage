// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({ parent }) {
    const { storyblokApi } = await parent();

    const dataStory = await storyblokApi.getStory("home", {
        version: "draft"
    });

    return {
        story: dataStory.data.story
    }
}
