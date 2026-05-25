# Automate Your Instagram Comment Replies with AI — A Complete Guide

If you run a business, a brand, or a creator account on Instagram, you already know the problem: hundreds of people comment the same questions every day. "What's the price?" "Where's the link?" "How do I order?" You can't reply to all of them manually — and ignoring them means losing potential customers.

That's exactly why I built the **Instagram AutoReply Skill** — a free, open-source AI skill for Claude and Codex that sets up keyword-triggered auto-replies on your Instagram account, with randomized responses so it never feels robotic.

---

## What Is It?

The Instagram AutoReply Skill is an agent skill — a set of instructions and knowledge that you install into Claude or Codex once, and from that point forward, whenever you ask your AI assistant to set up Instagram auto-replies, it knows exactly what to do.

It handles everything:

- Detecting specific keywords in Instagram comments (like PRICE, LINK, INFO, ORDER)
- Selecting a random reply from a pool of responses you define
- Generating the actual code or workflow config you need
- Walking you through Instagram Graph API setup, or recommending no-code tools like ManyChat, Zapier, or n8n
- Making sure your setup stays within Instagram's rate limits and terms of service

---

## How It Works

The idea is simple. You define a list of **trigger keywords** and a **reply pool** for each one. When someone comments a keyword on your post, the bot picks one reply at random and posts it automatically.

For example:

**Keyword:** `price`

**Reply pool:**
```
"Hey {username}! DM us for pricing details."
"Hi {username}! We have options for every budget — slide into our DMs."
"Thanks for asking, {username}! Drop us a DM and we'll send the full price list."
```

Every time someone comments "price", a different reply is sent — so your comment section never looks copy-pasted.

Under the hood, the random selection is just this:

```python
import random

def select_reply(replies: list, username: str) -> str:
    reply = random.choice(replies)
    return reply.replace("{username}", f"@{username}")
```

Simple, but effective.

---

## Quick Start

### Step 1 — Install the Skill

Open your terminal and run:

```bash
npx instagram-autoreply-skill install
```

You'll be asked where to install it:
- **Codex global** (works across all your projects)
- **Codex local** (current repo only)
- **Claude global** (works in all Claude sessions on your machine)

### Step 2 — Ask Claude or Codex

Once installed, start a new session and just ask naturally:

```
"Set up auto replies on my Instagram when someone comments PRICE or INFO"
```

```
"Build a keyword-triggered comment bot — when people comment LINK reply with
the bio link, when they comment ORDER send them to DMs"
```

```
"Generate a reply config for my Instagram with randomized responses for
PRICE, INFO, and COLLAB"
```

The skill activates automatically. It asks you a few questions, then generates everything you need.

### Step 3 — Configure Your Keywords and Replies

The skill generates a `reply_config.json` file. Here's what a full config looks like:

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

### Step 4 — The Keyword Matching Logic

The skill uses whole-word matching by default so "info" doesn't fire on "information":

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

And before any reply is sent, it checks for negative signals:

```python
NEGATIVE_SIGNALS = ["scam", "fake", "fraud", "terrible", "worst"]

def is_negative(comment_text: str) -> bool:
    text = comment_text.lower()
    return any(word in text for word in NEGATIVE_SIGNALS)
```

If a comment is flagged as negative, it skips auto-reply and logs it for manual review.

### Step 5 — The Webhook Handler (Instagram Graph API)

For the API approach, here's the complete Flask webhook handler the skill generates:

```python
from flask import Flask, request, jsonify
import json, random, re, time, os

app = Flask(__name__)

ACCESS_TOKEN = os.environ["INSTAGRAM_TOKEN"]
VERIFY_TOKEN = os.environ["WEBHOOK_VERIFY_TOKEN"]

with open("reply_config.json") as f:
    CONFIG = json.load(f)

replied_ids = set()

# Step 1: verify webhook with Meta
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

### Step 6 — No Server? Use the Polling Script

If you can't host a webhook, the skill also generates a polling script that checks for new comments every 60 seconds:

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

### Step 7 — Test Before Going Live

Run the built-in test script to simulate comments and verify everything works:

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

### Step 8 — Go Live

When you're happy with the test results:

```json
{
  "dry_run": false
}
```

Change `dry_run` to `false` and deploy. That's it.

---

## Platform Options

You don't have to write code. The skill supports multiple platforms and recommends the right one based on your situation:

| Your situation | Recommended platform |
|---|---|
| Developer, want full control | Instagram Graph API + Python/Node |
| No-code, easy setup | ManyChat |
| Self-hosted visual flows | n8n |
| Already using Zapier | Zapier |
| Quick prototype, no server | Python polling script |

---

## Built-In Safety Controls

Every piece of code the skill generates includes these safety controls:

```python
# Daily cap — stops after 150 replies
if replies_today >= CONFIG["limits"]["max_replies_per_day"]:
    return

# Per-post cap — max 30 per post
if post_reply_count >= CONFIG["limits"]["max_replies_per_post"]:
    return

# Per-user cap — max 2 replies per user per day
if user_reply_count >= CONFIG["limits"]["max_replies_per_user_per_day"]:
    return

# Deduplication — never reply to the same comment twice
if comment_id in replied_ids:
    return

# Negative filter — flag complaints for manual review
if is_negative(comment_text):
    flag_for_review(comment_id)
    return

# Random delay — avoid deterministic timing patterns
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

## Who Is This For?

- **Business owners** who get the same product questions on every post
- **Creators** who want to engage followers without being glued to their phone
- **Agencies** managing multiple Instagram accounts
- **Developers** who want a ready-made starting point for Instagram automation
- **Anyone** tired of typing "check the link in bio" fifty times a day

---

If you have questions or want to contribute, open an issue on GitHub. The skill is MIT licensed — free to use, modify, and share.
