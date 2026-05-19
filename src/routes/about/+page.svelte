<script lang="ts">
  import Navigation from "$lib/components/Navigation.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
  <title>About | Nisha Najihah</title>
</svelte:head>

<div class="page-wrapper">
  <Navigation variant="inner" />
  
  <section class="section is-medium about-section">
    <div class="container has-text-centered">
      <h1 class="title is-1 has-text-primary">About</h1>
      <p class="subtitle has-text-white-ter">
        Exploring the intersection of Sound and Code.
      </p>
      <div class="content has-text-grey-light">
        <p>
          Nisha Najihah is a modern music producer and software developer focused
          on immersive digital experiences.
        </p>
      </div>
      <a href="/" class="button is-primary is-outlined is-rounded">Return Home</a>
    </div>
  </section>

  <Footer variant="home" />
</div>

<style lang="scss">
  .page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    background: #000;
  }
  
  .about-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
