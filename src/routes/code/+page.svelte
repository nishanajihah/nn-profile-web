<script lang="ts">
  import { onMount } from "svelte";
  import {
    animateCodePageEntrance,
    filterProjects,
  } from "$lib/logic/code-page-interaction";
  import type { GithubLoadResult } from "$lib/types/github-data-structures";

  // Svelte 5 syntax for data from load function
  let { data } = $props<{ data: GithubLoadResult }>();

  // Reactive derived values
  let searchTerm = $state("");
  let filteredRepos = $derived(filterProjects(data.repos, searchTerm));

  onMount(() => {
    animateCodePageEntrance();
  });
</script>

<section class="code-hero has-text-centered">
  <div class="container">
    <h1 class="title is-1 code-title">Projects & Code</h1>
    <p class="subtitle is-4 has-text-grey-light code-subtitle">
      Technical explorations and open-source contributions.
    </p>

    <!-- GitHub Stats -->
    {#if data.user && data.contributions}
      <div class="columns is-centered mt-6">
        <div class="column is-2">
          <div class="stat-box">
            <p class="heading has-text-grey">Repositories</p>
            <p class="title has-text-white">{data.user.public_repos}</p>
          </div>
        </div>
        <div class="column is-2">
          <div class="stat-box">
            <p class="heading has-text-grey">Followers</p>
            <p class="title has-text-white">{data.user.followers}</p>
          </div>
        </div>
        <div class="column is-2">
          <div class="stat-box">
            <p class="heading has-text-grey">Recent Events</p>
            <p class="title has-text-white">
              {data.contributions.recentEvents}
            </p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<section class="section">
  <div class="container">
    <!-- Search Bar -->
    <div class="field mb-6">
      <div class="control has-icons-left">
        <input
          class="input is-large is-rounded is-dark"
          type="text"
          placeholder="Search projects..."
          bind:value={searchTerm}
        />
        <span class="icon is-left">🔍</span>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="columns is-multiline">
      {#each filteredRepos as repo (repo.id)}
        <div class="column is-4">
          <div class="card project-card">
            <div class="card-content">
              <div
                class="is-flex is-justify-content-between is-align-items-start mb-3"
              >
                <p class="title is-5 has-text-primary mb-0">{repo.name}</p>
                <div class="tags">
                  <span class="tag is-dark">⭐ {repo.stars}</span>
                </div>
              </div>

              <p class="content is-small has-text-grey-lighter mb-5">
                {repo.description || "No description provided."}
              </p>

              <div
                class="is-flex is-justify-content-between is-align-items-center mt-auto"
              >
                <span class="is-size-7 has-text-grey">
                  {#if repo.language}
                    <span
                      class="language-dot"
                      style="background-color: #ffde21;"
                    ></span>
                    {repo.language}
                  {:else}
                    Unknown
                  {/if}
                </span>
                <a
                  href={repo.url}
                  target="_blank"
                  class="button is-small is-primary is-outlined"
                >
                  Source ➜
                </a>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredRepos.length === 0}
      <div class="has-text-centered py-6">
        <p class="is-size-4 has-text-grey">
          No projects found matching "{searchTerm}"
        </p>
      </div>
    {/if}
  </div>
</section>

<div class="has-text-centered py-6">
  <a href="/" class="button is-ghost has-text-grey">← Back to Home</a>
</div>

<style lang="scss">
  @use "$lib/styles/code-page-design.scss";
</style>
