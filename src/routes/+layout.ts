import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";
import Page from "$lib/components/Page.svelte";
import HeroLanding from "$lib/components/HeroLanding.svelte";
import Button from "$lib/components/Button.svelte";
import Section from "$lib/components/Section.svelte";
import WaitlistForm from "$lib/components/WaitlistForm.svelte";
import FeatureGrid from "$lib/components/FeatureGrid.svelte";
import Feature from "$lib/components/Feature.svelte";
import Banner from "$lib/components/Banner.svelte";
import TextAndImage from "$lib/components/TextAndImage.svelte";
import ContactForm from "$lib/components/ContactForm.svelte";
import WhitepaperSection from "$lib/components/WhitepaperSection.svelte";
import LegalPage from "$lib/components/LegalPage.svelte";

export async function load() {
    storyblokInit({
        accessToken: "7avRWbv02IlSMEBxIksN4Qtt",
        use: [apiPlugin],
        apiOptions: {
            https: true,
        },
        components: {
            'page'              : Page,
            'whitepaper-section': WhitepaperSection,
            'hero-landing'      : HeroLanding,
            'button'            : Button,
            'section'           : Section,
            'waitlist-form'     : WaitlistForm,
            'feature-grid'      : FeatureGrid,
            'feature'           : Feature,
            'banner'            : Banner,
            'text-and-image'    : TextAndImage,
            'contact-form'      : ContactForm,
            'legal-page'        : LegalPage,
        }
    });

    const storyblokApi = await useStoryblokApi();
    const footerConfig = await storyblokApi.get('cdn/stories/global/footer', {
        version      : 'draft',
        resolve_links: 'url'
    });


    return {
        storyblokApi: storyblokApi,
        footerConfig: footerConfig.data.story.content
    };
}
