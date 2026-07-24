---
title: "How AI Actually Works"
seoTitle: "How AI Actually Works: Tokens, Context Windows, Hallucinations, Reasoning, and Multimodality"
kicker: "AI Field Note 01"
date: "2026-03-08"
updated: "2026-03-08"
excerpt: "A casual but accurate deep dive into tokens, context windows, hallucinations, reasoning models, multimodality, and what people are really bumping into when they use AI every day."
tags: ["AI", "LLMs", "Reasoning Models", "Multimodality"]
coverImage: "/blog/llm-context-cover.svg"
coverAlt: "Abstract editorial cover about how AI systems process context, tokens, and retrieved information"
featured: true
published: false
---

There is a weird thing that happens with AI conversations online.

People use the tools every day, but the explanation layer is either too vague or too academic. You usually get one of two versions:

- "AI is basically magic now"
- or a wall of jargon that makes normal people leave immediately

So this is the version in the middle.

Not dumbed down. Not overly formal. Just a practical look at what is actually happening when you use ChatGPT, Gemini, Claude, or any similar model.

## What people are actually running into

Even if someone has never said the words *token* or *context window*, they have probably already seen the effects.

For example:

- you paste a long email thread and the AI "forgets" something from the beginning,
- you upload a messy PDF and it confidently makes up a detail that is not there,
- you ask a follow-up question and it answers as if it never saw the earlier instruction,
- you use voice, image, and text together and it performs differently from text-only chat,
- you notice some models feel slower but often better at structured thinking.

Those are not random quirks. They usually connect back to how these systems process input.

---

## 1. AI does not read the way people read

When you look at a sentence, you see words and meaning.

A language model does not work like that.

It turns your input into **tokens**, then predicts what token should come next based on patterns it saw during training.

That is the first mental model shift:

> The model is not reading a sentence and "understanding it like a person." It is operating on token patterns and probabilities.

## 2. Tokens are the real unit of input

A token is not exactly a word. It is a chunk of text.

Sometimes a short word is one token. Sometimes a long word becomes multiple tokens. Punctuation, JSON formatting, code syntax, and whitespace all affect token count.

### Everyday example

A normal person might paste this into an AI assistant:

```text
Please rewrite this message to sound more professional but still warm.
```

Then they paste a 20-message email thread under it.

What they think they sent:

```text
One simple request + some background
```

What the model sees:

```text
A large sequence of tokens containing instructions, signatures, timestamps, names, quoted replies, and formatting noise
```

That matters because **cost, speed, and memory limits are all token-based**.

## 3. Context windows are really just memory budgets for one request

When people hear "128k context window," they often imagine a giant, intelligent working memory.

What it really means is:

```text
The model can process up to this many tokens for the current interaction.
```

That budget includes:

- system instructions,
- your message,
- earlier chat history,
- tool definitions,
- retrieved documents,
- examples,
- and the output the model is about to generate.

### Simple example

If a model supports a 128k context window and you allow up to 4k output tokens, then the rough input budget becomes:

```text
128k total - 4k reserved for output = 124k for input
```

So the context window is not a flex badge. It is a budget.

## 4. Why people think the AI "forgot"

This is one of the most common user complaints.

Someone says:

```text
I already told it that I wanted the answer in Spanish.
```

Usually one of three things happened:

1. that earlier instruction fell outside the current usable context,
2. too much new information diluted the earlier instruction,
3. the prompt structure made the newer message more influential.

In other words, the model did not wake up and decide to ignore you. It is working inside a limited token budget and trying to predict the next best response from what is currently most available and most salient.

## 5. AI predicts, it does not actually know things the way people think

This part is important.

An LLM does **not** have a private little mind where it truly understands facts the way a person does. It predicts likely next tokens based on patterns.

That is why it can sound deeply informed while still being wrong.

### A relatable example

Someone asks:

```text
Can you summarize the cancellation policy from this document?
```

If the document is noisy, incomplete, or poorly extracted, the model may produce an answer that *sounds exactly like a cancellation policy* even when the source does not fully support it.

That is not because it is evil or lazy. It is because its job is to continue the pattern with the most plausible-looking answer.

This is where hallucinations come from.

## 6. Hallucinations are often polished guesses

People sometimes imagine hallucination as a rare glitch.

It is actually a very normal failure mode for systems built to predict plausible text.

Hallucinations often happen when:

- the source material is weak,
- the question implies an answer should exist,
- the prompt rewards completion more than accuracy,
- the model has partial signal but not enough grounding.

### Everyday example

A student uploads class notes and asks:

```text
What were the professor's three main criticisms of the article?
```

If the notes only mention one criticism clearly and vaguely hint at two others, the model may still give a clean three-part answer because that shape feels statistically natural.

It would often rather complete the pattern than say:

```text
I only have evidence for one.
```

That is why grounded prompts matter.

## 7. Better prompts are usually about constraints, not cleverness

People love prompt tricks, but the most useful improvement is often just adding better constraints.

Instead of this:

```text
Summarize this document.
```

Do this:

```text
Summarize this document in 5 bullets. If a claim is uncertain, say so explicitly.
Only use information that appears in the text provided.
```

That does not make the model perfect, but it reduces the space where plausible nonsense can show up.

## 8. AI usually does not learn from your conversation

Another very common misunderstanding: people think the model is learning them in real time.

Normally, it is not.

During a chat session, the model is not retraining itself on your messages. It is just using the current context.

If it seems to "remember" you, that usually comes from the product layer:

- saved chat history,
- profile memory,
- retrieval from prior conversations,
- app logic that reinserts useful details.

### Everyday example

If you tell an assistant:

```text
I run a bakery and prefer concise answers.
```

It can reuse that later **only if the app stores and re-supplies it**.

That is product memory, not on-the-fly learning.

## 9. Reasoning models are still predicting, just with a different style of work

Reasoning models can feel different because they often perform better on multi-step tasks, structured logic, math, or harder planning problems.

But they are not magical creatures outside the LLM universe.

They are still prediction systems.

The difference is usually in how they were trained, tuned, or prompted to handle stepwise problem-solving.

### Easy way to think about it

- a regular chat model often aims for fast, fluent completion,
- a reasoning-oriented model is often better at slowing down, decomposing, and staying structured.

### Everyday example

If you ask:

```text
Should I buy or lease a car if I drive 12,000 miles a year and plan to keep it for 6 years?
```

A normal model might give a smooth, generic answer quickly.

A stronger reasoning model is more likely to break it into:

- yearly cost assumptions,
- maintenance horizon,
- ownership timeline,
- resale tradeoff,
- uncertainty in the estimate.

It still predicts text. It just does a better job producing text that follows a reasoning structure.

## 10. Multimodality just means the model can work across more than text

When people hear *multimodal*, the word sounds more intimidating than it needs to.

It usually just means the system can take in or generate more than one type of information, such as:

- text,
- images,
- audio,
- video,
- documents.

### Everyday examples

- You upload a screenshot of a spreadsheet and ask what stands out.
- You take a photo of a broken appliance and ask what part you are looking at.
- You record a voice note and ask the model to turn it into a professional email.
- You upload a menu photo and ask for a translated summary.

That is multimodality in practice.

The important thing is that multimodal does not automatically mean flawless. A model can still misread charts, miss text in an image, or overconfidently infer something not visible.

## 11. Retrieval is often the difference between a toy and a real product

If a model needs external information, one of the best approaches is not to paste everything into the prompt.

It is to retrieve only the most relevant pieces.

That is the basic idea behind retrieval-augmented generation.

### Everyday example

Imagine a customer support chatbot for an internet provider.

Bad version:

- it gets a giant dump of all help docs.

Better version:

- it searches the docs,
- selects the most relevant chunks,
- passes those chunks into the prompt,
- answers using only that evidence.

The better version is usually faster, cheaper, and less likely to hallucinate.

## 12. Tool use is not the same as autonomous action

If a model says it wants to call a tool, that usually means it is proposing a structured action.

It is not the same as actually doing the thing.

### Example

```json
{
  "tool": "checkWeather",
  "arguments": {
    "city": "Cartagena"
  }
}
```

That is more like:

```text
"I think the next useful step is to ask the weather service for this information."
```

Your application still decides whether to run it.

That distinction matters for:

- security,
- permissions,
- billing,
- logging,
- side effects.

## 13. Why AI sometimes feels smart and dumb in the same minute

This confuses people all the time.

A model can:

- rewrite your email beautifully,
- summarize a 15-page doc,
- explain a code bug,

and then immediately:

- invent a citation,
- miss a number in a table,
- answer a different question than the one you asked.

That is because these systems are not built on one single ability called "intelligence." They are bundles of strengths and weaknesses that show up differently depending on task structure, context quality, and grounding.

## 14. A useful everyday mental model

Here is the simplest useful model I know:

> AI chat systems are pattern-predicting machines operating inside a limited context budget, often wrapped in product features that make them feel more consistent than they really are.

That sounds less exciting than "digital brain," but it is much closer to how the tools behave.

## 15. What normal users should take from all this

You do not need to become an ML engineer to use AI well.

But a few habits help a lot:

- give it cleaner input,
- break big tasks into smaller ones,
- ask it to say when something is uncertain,
- do not treat confidence as proof,
- use retrieval or source material when accuracy matters,
- remember that long chats are still operating inside limits.

## Final thought

The most useful shift is this:

Stop thinking of AI as a thing that *knows*.

Start thinking of it as a system that **predicts**, under constraints, using patterns, context, and whatever evidence you give it.

Once you see it that way, a lot of the weird behavior stops feeling mysterious.
