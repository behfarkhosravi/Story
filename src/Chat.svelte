<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { supabase } from './supabaseClient.js';

  export let prompt;
  export let apiKey;
  export let characterName;

  const dispatch = createEventDispatcher();

  let messages = [];
  let userInput = '';
  let loading = false;
  let error = null;

  const MAX_MESSAGES = 10;

  onMount(() => {
    // Extract the starting conversation from the prompt
    const startingConversationMatch = prompt.match(/Starting Conversation:(.*)/s);
    if (startingConversationMatch && startingConversationMatch[1]) {
      const startingLine = startingConversationMatch[1].trim();
      messages = [{ role: 'assistant', content: startingLine }];
    }
  });

  async function sendMessage() {
    if (!userInput.trim() || messages.length >= MAX_MESSAGES * 2) return;

    const userMessage = { role: 'user', content: userInput };
    messages = [...messages, userMessage];
    const conversationHistory = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
    }));

    userInput = '';
    loading = true;
    error = null;

    try {
      const { data, error: funcError } = await supabase.functions.invoke('chat', {
        body: {
          prompt,
          apiKey,
          conversationHistory,
        },
      });

      if (funcError) {
        throw new Error(funcError.message || 'An unknown error occurred.');
      }

      const { assistantResponse } = data;
      messages = [...messages, { role: 'assistant', content: assistantResponse }];

    } catch (e) {
      error = e.message;
      messages = [...messages, { role: 'assistant', content: `خطا: ${e.message}` }];
    } finally {
      loading = false;
    }
  }

  function clearChat() {
    messages = [];
    const startingConversationMatch = prompt.match(/Starting Conversation:(.*)/s);
    if (startingConversationMatch && startingConversationMatch[1]) {
      const startingLine = startingConversationMatch[1].trim();
      messages = [{ role: 'assistant', content: startingLine }];
    }
  }
</script>

<div class="chat-container">
  <div class="chat-header">
    <h3>گفتگو با {characterName}</h3>
    <div>
        <button on:click={clearChat}>پاک کردن گفتگو</button>
        <button on:click={() => dispatch('endChat')}>بستن</button>
    </div>
  </div>
  <div class="chat-messages">
    {#each messages as message (message)}
      <div class="message {message.role}" class:pulse={message.role === 'assistant' && messages[messages.length - 1] === message}>
        <p>{message.content}</p>
      </div>
    {/each}
    {#if loading}
      <div class="message assistant">
        <p>در حال نوشتن...</p>
      </div>
    {/if}
    {#if error}
        <div class="message error">
            <p>{error}</p>
        </div>
    {/if}
  </div>
  <div class="chat-input">
    <input
      type="text"
      bind:value={userInput}
      placeholder="پیام خود را بنویسید..."
      on:keydown={(e) => e.key === 'Enter' && sendMessage()}
      disabled={messages.length >= MAX_MESSAGES * 2 || loading}
    />
    <button on:click={sendMessage} disabled={messages.length >= MAX_MESSAGES * 2 || loading} aria-label="Send">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    </button>
  </div>
</div>

<style>
  .chat-container {
    direction: rtl;
    font-family: var(--font-body);
    background: var(--book-bg);
    padding: 1rem;
    border-radius: 10px;
    box-shadow: var(--book-shadow);
    height: 80vh;
    width: 80vw;
    max-width: 600px;
    display: flex;
    flex-direction: column;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--book-border);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  .chat-header div {
    display: flex;
    gap: 0.5rem;
  }

  .chat-header button {
    background: var(--bg-color);
    border: 1px solid var(--book-border);
    color: var(--font-color);
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .chat-header button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .chat-header button:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    background-color: #e0e0e0;
  }

  .dark .chat-header button {
    background-color: #333;
  }

  .dark .chat-header button:active {
    background-color: #444;
  }

  .chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .message {
    padding: 0.75rem 1rem;
    border-radius: 20px;
    max-width: 80%;
    word-wrap: break-word;
  }

  .message.user {
    background-color: #007aff;
    color: white;
    align-self: flex-start;
  }

  .message.assistant {
    background-color: #e5e5ea;
    color: black;
    align-self: flex-end;
  }


  @keyframes pulse-shadow {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 107, 1, 0.7);
    }
    70% {
      box-shadow: 0 0 10px 10px rgba(255, 107, 1, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 107, 1, 0);
    }
  }

  .message.pulse {
    animation: pulse-shadow 1.5s 3;
  }

  .chat-input {
    display: flex;
    margin-top: 1rem;
    gap: 0.5rem;
    align-items: center;
  }


  .chat-input input {
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 0.75rem 1rem;
    background: none;
    color: var(--font-color);
  }

  .chat-input input:focus {
    outline: none;
  }

  .dark .chat-input input {
    border-color: #444;
  }

  .chat-input button {
    border: none;
    background-color: #007aff;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .chat-input button svg {
    width: 20px;
    height: 20px;
    margin-left: -2px; /* Optical alignment */
  }

  .chat-input button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .chat-input button:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }

  .chat-input button:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
</style>
