# Skills: How to Teach AI to Work the Way You Want

There's a simple idea that completely changes how you work with AI. It's called **Skills**.

Here's the problem we all know too well. Every time you open a fresh session with Claude or Codex, you start from zero. You have to explain what you want, how you want it, and the rules it should follow, all over again. Same explanation, every single time. Skills fix that at the root.

A skill is basically a bundle of instructions and knowledge that you load into Claude or Codex once. From that point on, your AI assistant just "knows" how to do that task by itself, without you re-explaining anything. Think of it like training a new hire how to work, except you only do it once, and it sticks forever.

That's exactly the principle I've been building on. I've made several skills, and each one teaches the AI to do a specific thing my way. This article walks you through one of them as a hands-on example so you can see the idea in action. After that, you'll be able to picture how the same principle works for any task you keep repeating.

---

## Why Skills Are Such a Powerful Idea

Before we jump into the example, let me explain why this is different from just writing a long prompt every time.

A skill has a few things going for it:

- **You write it once.** After you install it, it works across all your sessions with no re-explaining
- **It follows your rules.** You decide how the assistant thinks and what limits it never crosses
- **It's shareable.** Hand it to anyone on your team and they instantly get the same capability
- **It evolves.** Every time you find a better way, you update the skill and everyone benefits

The point is that you're not just asking the AI for help with a task. You're building it a piece of expertise that stays with it. So instead of you doing the work, you end up with an assistant that understands your work exactly like you do.

---

## A Hands-On Example: The Instagram AutoReply Skill

So the idea doesn't stay theoretical, let me show you a real skill I built on this principle, called the **Instagram AutoReply Skill**. It's free, open source, and works with both Claude and Codex.

The problem it solves is painfully familiar to anyone with an Instagram account. If you run a business or a brand, or you're a creator, you know the headache. Every day, dozens of people comment the same questions. "What's the price?" "Where's the link?" "How do I order?" You can't reply to every single one by hand, and ignoring them means losing customers you could've won.

This skill teaches the assistant how to set up automatic replies to comments, tied to specific keywords, with randomized responses so they never look copy-pasted or bot-like. And instead of explaining all that every time, the skill already knows it.

Here's what the skill takes care of:

- Catching the keywords you defined in the comments (like PRICE, LINK, INFO, ORDER)
- Picking a random reply from a pool you set up
- Writing the actual code or the workflow config you need
- Walking you through the Instagram Graph API setup, or suggesting no code tools like ManyChat, Zapier, or n8n
- Keeping your setup within Instagram's limits and terms of service, so you don't get yourself in trouble

Notice the key idea here. The skill isn't just "ready made code." It's full knowledge about how to handle the task properly, baked into the assistant. And that's the exact same thing you can do for any other task you keep repeating.

---

## How It Works

The idea is simple. You define a list of **trigger keywords**, and for each one you set up a pool of replies. When someone comments a keyword on your post, the bot picks a random reply from the pool and posts it by itself.

For example:

**Trigger keyword:** `price`

**Reply pool:**
```
"Hey {username}! DM us for pricing details."
"Hi {username}! We have options for every budget — slide into our DMs."
"Thanks for asking, {username}! Drop us a DM and we'll send the full price list."
```

Every time someone comments the price keyword, they get a different reply. That way your comment section never looks copy-pasted.

Behind the scenes, the random pick is nothing more than this:

```python
import random

def select_reply(replies: list, username: str) -> str:
    reply = random.choice(replies)
    return reply.replace("{username}", f"@{username}")
```

Simple, but it gets the job done.

---

## Let's Get Started Fast

### Step 1: Install the Skill

Open your terminal and run:

```bash
npx instagram-autoreply-skill install
```

It'll ask where you want to install it:
- **Codex global** works across all your projects
- **Codex local** for the current repo only
- **Claude global** works in all your Claude sessions on your machine

### Step 2: Ask Claude or Codex

Once it's installed, open a fresh session and just ask the way you'd normally talk:

```
"Set up auto replies on my Instagram when someone comments price or info"
```

```
"Build a comment bot for Instagram. When people comment link send them the bio link,
and when they comment order point them to DMs"
```

```
"Make me a reply config for an Instagram account with randomized replies for
price, info, and collab"
```

This is where you see the power of the skill: you don't have to explain a single rule. It already knows what to do and generates everything you need.

### Step 3: Configure Your Keywords and Replies

The skill generates a `reply_config.json` file. Here's what the full config looks like:

```json
{
  "account": "your_instagram_username",
  "dry_run": true,
  "limits": {
    "max_replies_per_day": 150,
    "max_replies_per_post": 30,
    "max_replies_per_user_per_day": 2,
    "min_delay_seconds": 2,
    "max_delay_seconds": 8
  },
  "negative_signals": ["scam", "fake", "fraud", "terrible", "worst"],
  "keywords": [
    {
      "trigger": "price",
      "match_mode": "whole_word",
      "replies": [
        "Hey {username}! DM us for pricing details.",
        "Hi {username}! Shoot us a DM — we have plans for every budget.",
        "Thanks for asking, {username}! DM us for the full price list."
      ]
    },
    {
      "trigger": "link",
      "match_mode": "whole_word",
      "replies": [
        "The link is in our bio, {username}!",
        "Check the bio link, {username} — it's all there.",
        "Tap the link in our bio, {username}!"
      ]
    },
    {
      "trigger": "order",
      "match_mode": "whole_word",
      "replies": [
        "Awesome, {username}! DM us to place your order.",
        "Ready to help, {username}! Send us a DM to get started.",
        "Let's make it happen, {username}! DM us and we'll guide you through."
      ]
    }
  ]
}
```

### Step 4: The Keyword Matching Logic

The skill uses whole word matching by default, so the word "info" doesn't fire when someone writes "information":

```python
import re

def matches_keyword(comment_text: str, keyword: str) -> bool:
    pattern = r'\b' + re.escape(keyword) + r'\b'
    return bool(re.search(pattern, comment_text, re.IGNORECASE))

def find_first_match(comment_text: str, keywords: list) -> dict | None:
    for kw in keywords:
        if matches_keyword(comment_text, kw["trigger"]):
            return kw
    return None
```

And before any reply goes out, it checks for negative words:

```python
NEGATIVE_SIGNALS = ["scam", "fake", "fraud", "terrible", "worst"]

def is_negative(comment_text: str) -> bool:
    text = comment_text.lower()
    return any(word in text for word in NEGATIVE_SIGNALS)
```

If a comment turns out negative, it skips the auto reply and saves it for you to review by hand.

### Step 5: The Webhook Handler (Instagram Graph API)

Here's the complete Flask webhook handler the skill writes for you:

```python
from flask import Flask, request, jsonify
import json, random, re, time, os

app = Flask(__name__)

ACCESS_TOKEN = os.environ["INSTAGRAM_TOKEN"]
VERIFY_TOKEN = os.environ["WEBHOOK_VERIFY_TOKEN"]

with open("reply_config.json") as f:
    CONFIG = json.load(f)

replied_ids = set()

# Step 1: verify the webhook with Meta
@app.route("/webhook", methods=["GET"])
def verify():
    if request.args.get("hub.verify_token") == VERIFY_TOKEN:
        return request.args.get("hub.challenge")
    return "Forbidden", 403

# Step 2: receive new comment events
@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.json
    for entry in data.get("entry", []):
        for change in entry.get("changes", []):
            if change["field"] == "comments":
                handle_comment(change["value"])
    return "OK", 200

def handle_comment(comment_data: dict):
    comment_id = comment_data["id"]
    text       = comment_data.get("text", "")
    username   = comment_data.get("from", {}).get("username", "there")

    if comment_id in replied_ids:
        return  # already replied

    if is_negative(text):
        log(comment_id, username, text, keyword=None, reply=None, status="skipped_negative")
        return

    match = find_first_match(text, CONFIG["keywords"])
    if not match:
        return

    reply = select_reply(match["replies"], username)

    if not CONFIG.get("dry_run"):
        post_reply(comment_id, reply)
    else:
        print(f"[DRY RUN] Would reply to {username}: {reply}")

    replied_ids.add(comment_id)
    log(comment_id, username, text, match["trigger"], reply, "sent")

    # random delay so it doesn't look like a bot
    delay = random.uniform(
        CONFIG["limits"]["min_delay_seconds"],
        CONFIG["limits"]["max_delay_seconds"]
    )
    time.sleep(delay)

def post_reply(comment_id: str, reply_text: str):
    import requests
    url = f"https://graph.facebook.com/v19.0/{comment_id}/replies"
    requests.post(url, params={"message": reply_text, "access_token": ACCESS_TOKEN})

def log(comment_id, username, text, keyword, reply, status):
    print(json.dumps({
        "comment_id": comment_id,
        "username":   username,
        "text":       text,
        "keyword":    keyword,
        "reply":      reply,
        "status":     status
    }))

if __name__ == "__main__":
    app.run(port=5000)
```

### Step 6: No Server? Use the Polling Script

If you can't host a webhook, the skill also writes you a polling script that checks for new comments every 60 seconds:

```python
import requests, time, json, random, os

TOKEN    = os.environ["INSTAGRAM_TOKEN"]
MEDIA_ID = "YOUR_POST_ID"

with open("reply_config.json") as f:
    CONFIG = json.load(f)

seen_ids = set()

def fetch_comments(media_id: str) -> list:
    url = f"https://graph.facebook.com/v19.0/{media_id}/comments"
    res = requests.get(url, params={
        "fields": "id,text,username,timestamp",
        "access_token": TOKEN
    })
    return res.json().get("data", [])

def run():
    print("Polling for new comments...")
    while True:
        comments = fetch_comments(MEDIA_ID)
        for comment in comments:
            if comment["id"] in seen_ids:
                continue
            seen_ids.add(comment["id"])
            handle_comment(comment)
        time.sleep(60)

run()
```

### Step 7: Test Before You Go Live

Run the ready made test script to simulate comments and make sure everything's running fine:

```bash
python3 skills/Instagram-AutoReply-Skill/scripts/test_keyword_matcher.py \
  --config reply_config.json
```

Example output:

```
Running 8 test comment(s)...

  [PASS] Test 1: "what's the price?"
         -> Keyword: 'price' | Reply: Hey @testuser1! DM us for pricing details.

  [PASS] Test 2: "PRICE"
         -> Keyword: 'price' | Reply: Thanks for asking, @testuser2! DM us for the full price list.

  [PASS] Test 3: "This looks like a scam!"
         -> Flagged as negative comment (skipped)

  [PASS] Test 4: "Great post! Love it"
         -> No keyword matched (no reply sent)

Results: 8 passed, 0 failed out of 8 tests.
```

### Step 8: Take It Live

Once you're happy with the test results:

```json
{
  "dry_run": false
}
```

Change `dry_run` to `false` and deploy. Done.

---

## Platform Options

You don't have to write a single line of code. The skill supports a few platforms and suggests the best one for your situation.

If you're a developer and you want full control, go with the Instagram Graph API plus Python or Node. If you want something no code and quick to set up, ManyChat works great for you. If you like visual flows and want to host them yourself, n8n is a nice option. If you're already using Zapier, just keep going with it. And if all you want is a quick prototype with no server, the Python polling script gets you there.

---

## Built In Safety Controls

One of the best things about skills is that they carry the important rules inside them, so none of them get forgotten. Every piece of code this skill writes comes loaded with these controls by itself:

```python
# Daily cap, stops after 150 replies
if replies_today >= CONFIG["limits"]["max_replies_per_day"]:
    return

# Per-post cap, max 30 per post
if post_reply_count >= CONFIG["limits"]["max_replies_per_post"]:
    return

# Per-user cap, max 2 replies per user per day
if user_reply_count >= CONFIG["limits"]["max_replies_per_user_per_day"]:
    return

# Deduplication, never reply to the same comment twice
if comment_id in replied_ids:
    return

# Negative filter, flag complaints for manual review
if is_negative(comment_text):
    flag_for_review(comment_id)
    return

# Random delay, avoid a fixed timing pattern
time.sleep(random.uniform(2.0, 8.0))
```

---

## Install It

```bash
# Via npm (recommended)
npx instagram-autoreply-skill install

# Via GitHub
npx github:anashamad9/Instagram-AutoReply-Skill- install
```

**GitHub:** [github.com/anashamad9/Instagram-AutoReply-Skill-](https://github.com/anashamad9/Instagram-AutoReply-Skill-)

**npm:** [npmjs.com/package/instagram-autoreply-skill](https://www.npmjs.com/package/instagram-autoreply-skill)

---

## The Takeaway: The Skill Is the Principle

The Instagram skill is just one example. The bigger idea is that you can build a skill for any task you keep repeating. Anything you find yourself explaining to the AI from scratch over and over, you can turn into a skill, and the assistant will just know it forever after.

Every skill you build is a piece of expertise that gets saved, shared, and improved. So instead of starting from zero every time, you end up with an assistant that understands your work exactly the way you want. That's the principle, and this skill is only the beginning.

If you have questions or want to contribute, open an issue on GitHub. The skill is MIT licensed, so it's free to use, modify, and share however you like.
