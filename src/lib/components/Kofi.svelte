<script lang="ts">
  // Ko-fi button component
  export let username = 'nishanajihah';
  export let color = '#1E88E5'; // Default Ko-fi blue
  // Using 'export const' instead of 'export let' for unused prop
  export const title = 'Support Me on Ko-fi';
  export let text = 'Support Me';
  export let wide = false;
  export let showCoffeeIcon = true;
  
  // Generate Ko-fi button link
  let kofiUrl = `https://ko-fi.com/${username}`;
  
  // Function to show a thank you message after donation (can be enhanced)
  function onKofiDonation() {
    // Could be expanded to show a thank you modal or trigger animations
    console.log('Ko-fi donation completed');
  }
</script>

<div class="ko-fi-container">
  <a 
    href={kofiUrl} 
    target="_blank" 
    rel="noopener noreferrer"
    class="ko-fi-button {wide ? 'ko-fi-wide' : ''}"
    style="--kofi-color: {color};"
    on:click={onKofiDonation}
  >
    {#if showCoffeeIcon}
      <span class="ko-fi-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.22 4C6.94649 4 6.67292 4.05736 6.41526 4.16868C6.1576 4.28 5.92228 4.44325 5.72387 4.64943C5.52547 4.85562 5.37138 5.09979 5.27088 5.36706C5.17037 5.63433 5.12501 5.91797 5.12501 6.20168C5.12501 6.48538 5.17037 6.76903 5.27088 7.0363C5.37138 7.30357 5.52547 7.54773 5.72387 7.75392C5.92228 7.9601 6.1576 8.12336 6.41526 8.23468C6.67292 8.346 6.94649 8.40336 7.22 8.40336H17.1C17.3735 8.40336 17.6471 8.346 17.9047 8.23468C18.1624 8.12336 18.3977 7.9601 18.5961 7.75392C18.7945 7.54773 18.9486 7.30357 19.0491 7.0363C19.1496 6.76903 19.195 6.48538 19.195 6.20168C19.195 5.91797 19.1496 5.63433 19.0491 5.36706C18.9486 5.09979 18.7945 4.85562 18.5961 4.64943C18.3977 4.44325 18.1624 4.28 17.9047 4.16868C17.6471 4.05736 17.3735 4 17.1 4H7.22Z" fill="currentColor"/>
          <path d="M20.1666 9.75H5.16663C4.70641 9.75 4.33329 10.1231 4.33329 10.5833V11.4167C4.33329 11.8769 4.70641 12.25 5.16663 12.25H5.58246L6.79579 18.7917C6.91888 19.4488 7.50663 19.9167 8.17579 19.9167H17.1583C17.8275 19.9167 18.4152 19.4488 18.5383 18.7917L19.7516 12.25H20.1666C20.6269 12.25 21 11.8769 21 11.4167V10.5833C21 10.1231 20.6269 9.75 20.1666 9.75Z" fill="currentColor"/>
        </svg>
      </span>
    {/if}
    <span class="ko-fi-text">{text}</span>
  </a>
</div>

<style>
  .ko-fi-container {
    display: inline-block;
  }
  
  .ko-fi-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--kofi-color);
    color: white;
    border-radius: 4px;
    padding: 8px 14px;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.2s ease;
    gap: 8px;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .ko-fi-wide {
    width: 100%;
    padding: 10px 20px;
    font-size: 16px;
  }
  
  .ko-fi-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }
  
  .ko-fi-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .ko-fi-text {
    white-space: nowrap;
  }
</style>
