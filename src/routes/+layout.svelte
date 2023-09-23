<script>
	import '../app.pcss';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from "$lib/components/Footer.svelte";

    export let data;
</script>

<Navbar />
<slot />
<Footer config={data.footerConfig} />
