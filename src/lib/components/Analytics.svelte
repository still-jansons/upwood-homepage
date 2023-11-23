<script lang="ts">
    // import { page } from '$app/stores'
    //
    // $: {
    //     if (typeof gtag !== 'undefined') {
    //         gtag('config', 'GTM-MNX3ZLNL', {
    //             page_title: document.title,
    //             page_path: $page.url.pathname,
    //         })
    //     }
    // }
</script>

<svelte:head>
<!--    <script async src="https://www.googletagmanager.com/gtag/js?id=GTM-MNX3ZLNL"></script>-->
<!--    <script>-->
<!--        window.dataLayer = window.dataLayer || []-->

<!--        function gtag() {-->
<!--            dataLayer.push(arguments)-->
<!--        }-->

<!--        gtag('js', new Date())-->
<!--        gtag('config', 'GTM-MNX3ZLNL')-->
<!--    </script>-->
    <script>
        (
            function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer' ? '&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
            })
        (window,document,'script','dataLayer','GTM-MNX3ZLNL');
    </script>
</svelte:head>
