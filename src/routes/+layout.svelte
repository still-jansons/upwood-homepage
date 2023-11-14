<script>
	import '../app.pcss';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from "$lib/components/Footer.svelte";
    import Analytics from "$lib/components/Analytics.svelte";

    export let data;
</script>

<Analytics />
<Navbar />
<slot />
<Footer config={data.footerConfig} />
