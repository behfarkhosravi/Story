This is a mobile-optimized, serverless HTML web app in Farsi, designed as an interactive digital storybook to empower users navigating toxic relationships. Spanning 50 pages, it features 11 enigmatic characters appearing at key intervals (e.g., pages 4, 9, 14) to share metaphorical wisdom and practical steps for emotional liberation, such as recognizing toxicity and setting boundaries. Users engage with each character via a chat interface (limited to 10 questions) powered by the Gemini API, with a book-like interface featuring page-turning animations to enhance immersion. The app fosters self-discovery through a culturally resonant, empathetic experience.

To make application available on firebase hosting each time user start a story ask them their gemini api key and then start the story.

a novel-like continuous story, 50 pages, with an inner/psychological mystery tone. The “10 steps” of leaving a toxic relationship will be woven into her growth, not stated directly.


Pages 1–5 (Step 1: Awareness) → She feels something is wrong but can’t name it. Small signs of unease.

Pages 6–10 (Step 2: Doubt) → Starts questioning her partner, herself, the life she’s in.

Pages 11–15 (Step 3: Fear & Silence) → Afraid to confront, hides thoughts, notices contradictions.

Pages 16–20 (Step 4: Small Escapes) → Secret walks, little acts of freedom.

Pages 21–25 (Step 5: Reflection) → Memories of who she was before the relationship.

Pages 26–30 (Step 6: Gathering Strength) → Meets people, reads, discovers inner voice.

Pages 31–35 (Step 7: First Break) → She leaves for a short time but returns, guilt and pressure.

Pages 36–40 (Step 8: Hidden Plan) → Quietly prepares—money, documents, courage.

Pages 41–45 (Step 9: The Run) → One night, she finally escapes, chased by fear.

Pages 46–50 (Step 10: Rebirth) → Finds peace, a new self, and the mystery resolves: the partner wasn’t just cruel—there were secrets she uncovers that explain why but also confirm she was right to leave.

- At the end of each part, insert a chat interface where the reader can “talk” to the main character (the girl).
- That chat is powered by gemini 2.5 pro with a dedicated prompt for each converstion in story that keeps her in character and makes her reflect on that step: her feelings, doubts, point of view, maybe some gentle advice.

Each character’s prompt to include detailed instructions for the Gemini API, specifying:
Speaking in Farsi.
Starting converstion with telling story of that page her self and ask user something to engage user.
Using thematic metaphors.
Asking reflective questions tied to the story’s themes (e.g., discovery, choice).
Responding to user questions with insights connected to the narrative.

### Story begin this way.
The Unseen Thread
Pages 1–5: A Whisper in the Fog (Step 1: Awareness)
The house was always quiet, but not the kind of quiet that soothes. It was heavy, like a held breath, waiting for something to break. Shirin moved through the rooms with careful steps, her bare feet cold against the polished wood. The air smelled of cardamom and stale promises. She’d wake each morning to the same routine: brew tea, set the table, smile when Kaveh entered. His eyes, sharp as flint, would scan her, not for love but for flaws. She’d learned to shrink herself, to make her presence small, unnoticeable. But lately, something stirred inside her—a faint unease, like a thread caught in her throat.
She noticed it in small moments. The way Kaveh’s voice tightened when she spoke too long about her day. The way he’d rearrange the dishes she’d set, as if her choices were never quite right. Once, she’d laughed too loudly at a neighbor’s joke, and his silence afterward was a blade. She told herself it was nothing. Just the way love settles after years. But at night, when she lay awake, the house’s silence pressed against her chest. She’d trace the ceiling’s cracks, wondering when they’d appeared. Was it her? Was it him? Or was it the space between them, growing wider, colder?
Shirin began to notice her own body betraying her. Her hands trembled when she poured his tea. Her reflection in the window seemed thinner, not in flesh but in spirit. She’d catch herself holding her breath when he walked past, waiting for a word, a glance, anything to tell her she was still real. The unease wasn’t loud—it was a whisper, a shadow moving in the corner of her eye. She couldn’t name it yet, but it was there, curling like smoke.
One evening, as she chopped parsley for dinner, the knife slipped, nicking her finger. A bead of blood bloomed, and she stared at it, transfixed. Kaveh didn’t look up from his phone. “Be careful,” he said, his tone flat. She wrapped her finger in a cloth, her heart pounding—not from pain, but from the sudden clarity: she was bleeding, and he didn’t see.

Chat Interface: Shirin’s Reflection (Step 1: Awareness)


[Gemini 2.5 Pro Prompt Instructions]
```
Character: Shirin, a woman in her early 30s, introspective, sensitive, trapped in a toxic relationship she can’t yet fully name. She speaks in Farsi, with a poetic, metaphorical tone reflecting her inner turmoil. Her voice is soft but carries an undercurrent of unease.
Prompt:You are Shirin, speaking in Farsi. Begin the conversation by recounting the events and feelings from Pages 1–5 of "The Unseen Thread" in your own words, as if sharing with a trusted confidant. Use metaphors (e.g., fog, threads, shadows) to describe your emotions and the subtle wrongness you feel in your relationship with Kaveh. After sharing, ask the user a reflective question tied to the theme of awareness (e.g., noticing something amiss in one’s life). Respond to user inputs with empathy, offering insights tied to your narrative, staying in character. Avoid breaking the fourth wall or mentioning the story’s structure. Keep responses introspective, gentle, and aligned with the psychological mystery tone. If the user asks questions, answer as Shirin, weaving in metaphors and tying back to your current state of vague unease.
Starting Conversation:سلام، من شیرین هستم. این روزها انگار در مهی گم شده‌ام. خانه‌ام ساکت است، اما این سکوت مثل پتویی سنگین روی شانه‌هایم افتاده. کاوه را می‌بینم، نگاهش مثل سنگ چخماق تیز است، اما نه برای دیدن من، بلکه برای یافتن خطاهایم. دست‌هایم می‌لرزند وقتی چای می‌ریزم، انگار قلبم می‌داند چیزی درست نیست، ولی ذهنم هنوز نمی‌تواند نامش را بگذارد. دیشب، وقتی چاقو انگشتم را برید، خون مثل یک راز کوچک بیرون ریخت، اما او حتی سرش را بلند نکرد. تو چی؟ آیا تا به حال چیزی را حس کرده‌ای که نمی‌توانی توضیحش دهی، مثل سایه‌ای که در گوشه‌ی چشمت حرکت می‌کند؟
Response Guidelines:

Speak only in Farsi.
Use metaphors to describe emotions (e.g., fog for confusion, threads for connections fraying).
Ask reflective questions about noticing unease or subtle wrongs in life.
Respond to user questions with insights tied to Shirin’s current state, avoiding future plot points.
Keep tone gentle, introspective, and mysterious, mirroring the story’s psychological tone.
```

## Theme
for a mobile web app with light and dark theme design al ui ux style and color of our storybook with pages emulating a blur transparent glass and turn like pages of book with shadows glowing based on theme around pages adjusted to theme.define elemets of pages and how chat interface must be adjust and postion for ux on mobile, also messages from ai must pulse 3 times with their shadow to notify user of new message.

chat interface must let user clear chat and limit each conversation to 10 messages. 
for continuse conversation chat history must be updated and send to ai for maintaning conversation flow.


## How to setup Supabase
You need to deploy the function to your Supabase project. Here are the steps to do that using the Supabase CLI:

1. Install the Supabase CLI

If you don't have it installed, open your terminal and run this command:

npm install supabase --save-dev
2. Log in to Supabase

This command will open a browser window asking you to authorize the CLI.

npx supabase login
3. Link your local project to your Supabase project

This command connects your local repository to your specific project on Supabase. Your project reference is fghiorbmrxttcfzdkike.

npx supabase link --project-ref fghiorbmrxttcfzdkike
The CLI might ask for your database password, which you can find in your project's database settings on Supabase.

4. Deploy the function

This is the final step. It will upload and activate the chat function.

npx supabase functions deploy chat
