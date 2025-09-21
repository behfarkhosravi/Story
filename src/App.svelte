<script>
  import { story } from './story.js';
  import { theme } from './stores.js';
  import Header from './Header.svelte';
  import Chat from './Chat.svelte';
  import { prompts } from './prompts.js';
  import { onMount } from 'svelte';
  import { autoAnimate } from '@formkit/auto-animate';
  import ApiKeyPrompt from './ApiKeyPrompt.svelte';
  import { characterName } from './config.js';

  let apiKey = '';
  let isApiKeyConfirmed = false;
  let currentPage = 0;
  let showChat = false;
  let currentPrompt = {};

  function handleApiKeySubmitted(event) {
    apiKey = event.detail;
    isApiKeyConfirmed = true;
  }

  function handleResetApiKey() {
    apiKey = '';
    isApiKeyConfirmed = false;
    localStorage.removeItem('gemini-api-key');
  }

  function checkChat() {
    const pageNumber = currentPage + 1;
    if (pageNumber % 5 === 0 && pageNumber <= 50) {
      const step = pageNumber / 5;
      const promptData = prompts.find(p => p.step === step);
      if (promptData) {
        currentPrompt = promptData.prompt;
        showChat = true;
      }
    } else {
      showChat = false;
    }
  }

  function nextPage() {
    if (currentPage < story.length - 1) {
      currentPage++;
      checkChat();
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      checkChat();
    }
  }

  function handleEndChat() {
    showChat = false;
  }

  onMount(() => {
    const savedKey = localStorage.getItem('gemini-api-key');
    if (savedKey) {
      apiKey = savedKey;
    }
    checkChat();
  });
</script>

<main class="dark">
  <Header />
  <div class="content-wrapper">
    {#if !isApiKeyConfirmed}
      <ApiKeyPrompt
        storedApiKey={apiKey}
        on:apiKeySubmitted={handleApiKeySubmitted}
        on:resetApiKey={handleResetApiKey}
      />
    {:else}
      <div class="book" class:chat-active={showChat} use:autoAnimate>
        <div class="page-content">
          <p>{story[currentPage].content}</p>
        </div>

        <div class="navigation">
          <button on:click={prevPage} disabled={currentPage === 0}>
            قبلی
          </button>
          <span>صفحه {currentPage + 1} از {story.length}</span>
          <button on:click={nextPage} disabled={currentPage === story.length - 1}>
            بعدی
          </button>
        </div>
      </div>
    {/if}
  </div>

  {#if showChat}
    <div class="chat-overlay" on:click|self={handleEndChat}>
      <Chat {apiKey} {characterName} bind:prompt={currentPrompt} on:endChat={handleEndChat} />
    </div>
  {/if}
</main>

<style>
  main {
    height: 100vh;
    background-color: var(--bg-color);
    transition: background-color 0.3s;
    position: relative;
    overflow: hidden; /* To hide the flying pages */
  }

  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }


  .book {
    width: clamp(300px, 90vw, 1200px);
    height: clamp(500px, 90vh, 800px);
    background: var(--book-bg);
    border-radius: 20px;
    box-shadow: var(--book-shadow), var(--page-glow);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid var(--book-border);
    padding: clamp(1rem, 2vw, 2rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: background 0.3s, box-shadow 0.3s, border 0.3s, filter 0.3s;
    position: relative;
  }

  .book.chat-active {
      filter: blur(4px);
      pointer-events: none;
  }

  .page-content {
    flex-grow: 1;
    overflow-y: auto;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.7;
    color: var(--font-color);
    transition: color 0.3s;
    direction: rtl;
    padding-right: 1rem; /* for scrollbar */
  }

  .chat-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid var(--book-border);
    transition: border-top 0.3s;
    flex-shrink: 0;
  }

  .navigation button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: var(--button-bg);
    color: var(--button-text);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .navigation button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>
