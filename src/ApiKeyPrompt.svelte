<script>
  import { createEventDispatcher } from 'svelte';
  export let storedApiKey = '';

  const dispatch = createEventDispatcher();
  let apiKeyInput = '';

  function submitKey() {
    if (apiKeyInput.trim()) {
      localStorage.setItem('gemini-api-key', apiKeyInput);
      dispatch('apiKeySubmitted', apiKeyInput);
    }
  }

  function continueWithKey() {
      dispatch('apiKeySubmitted', storedApiKey);
  }

  function reset() {
    dispatch('resetApiKey');
  }
</script>

{#if !storedApiKey}
  <div class="prompt-container">
    <h2>به داستان تعاملی «نخ نامرئی» خوش آمدید</h2>
    <p>برای شروع، لطفاً کلید Gemini API خود را وارد کنید. این کلید برای جان بخشیدن به شخصیت‌های داستان و گفتگو با آن‌ها ضروری است.</p>
    <div class="input-group">
      <input type="password" bind:value={apiKeyInput} placeholder="کلید API خود را اینجا وارد کنید" on:keydown={(e) => e.key === 'Enter' && submitKey()} />
      <button on:click={submitKey}>شروع داستان</button>
    </div>
    <p class="help-text">
      می‌توانید کلید API خود را از [Google AI Studio](https://aistudio.google.com/apikey) دریافت کنید.
    </p>
  </div>
{:else}
  <div class="prompt-container">
    <h2>به داستان خوش آمدید</h2>
    <p>کلید API شما ذخیره شده است.</p>
    <div class="button-group">
      <button on:click={continueWithKey}>ادامه داستان</button>
      <button on:click={reset} class="secondary">ریست کردن کلید</button>
    </div>
  </div>
{/if}

<style>
  .prompt-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    text-align: center;
    direction: rtl;
    color: var(--font-color);
    background: var(--book-bg);
    border-radius: 20px;
    box-shadow: var(--book-shadow);
    border: 1px solid var(--book-border);
    max-width: 90vw;
  }
  .input-group, .button-group {
    display: flex;
    margin: 1rem 0;
    gap: 0.5rem;
  }
  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    background-color: var(--button-bg);
    color: var(--button-text);
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s ease;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  button:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  button.secondary {
    background-color: transparent;
    color: var(--font-color);
    border: 1px solid var(--button-bg);
  }
  .help-text {
      font-size: 0.9rem;
      color: #666;
  }
</style>
