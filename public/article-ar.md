# أتمتة الردود على تعليقات إنستغرام بالذكاء الاصطناعي — دليل شامل

إذا كنت تدير حساباً تجارياً أو حساب براند أو حساب كريتور على إنستغرام، فأنت تعرف المشكلة جيداً: مئات الأشخاص يكتبون نفس الأسئلة يومياً. "كم السعر؟" "وين الرابط؟" "كيف أطلب؟" لا يمكنك الرد على كل واحد يدوياً، وتجاهلهم يعني خسارة عملاء محتملين.

لهذا السبب بالضبط بنيت **Instagram AutoReply Skill** — سكيل مجاني ومفتوح المصدر للذكاء الاصطناعي يعمل مع Claude و Codex، يتيح لك إعداد ردود تلقائية على تعليقات إنستغرام مرتبطة بكلمات مفتاحية، مع ردود عشوائية متنوعة حتى لا تبدو آلية أو مكررة.

---

## ما هو هذا السكيل؟

Instagram AutoReply Skill هو سكيل للـ AI agents — مجموعة من التعليمات والمعرفة تُثبّتها في Claude أو Codex مرة واحدة، وبعدها في أي وقت تطلب من مساعدك الذكي إعداد ردود تلقائية على إنستغرام، يعرف مباشرة كيف يتعامل مع الموضوع.

يتولى السكيل كل شيء:

- اكتشاف كلمات مفتاحية محددة في التعليقات (مثل: السعر، الرابط، معلومات، طلب)
- اختيار رد عشوائي من مجموعة ردود تحددها أنت
- توليد الكود الفعلي أو إعدادات الـ workflow اللي تحتاجها
- إرشادك خطوة بخطوة لإعداد Instagram Graph API أو اقتراح أدوات no-code مثل ManyChat أو Zapier أو n8n
- ضمان بقاء إعدادك ضمن حدود استخدام إنستغرام وشروط الخدمة

---

## كيف يعمل؟

الفكرة بسيطة. تحدد قائمة من **الكلمات المشغِّلة** ومجموعة ردود لكل كلمة. عندما يعلق أحدهم بكلمة معينة على منشورك، يختار البوت رداً عشوائياً من المجموعة وينشره تلقائياً.

مثال:

**الكلمة المشغِّلة:** `price`

**مجموعة الردود:**
```
"Hey {username}! DM us for pricing details."
"Hi {username}! We have options for every budget — slide into our DMs."
"Thanks for asking, {username}! Drop us a DM and we'll send the full price list."
```

في كل مرة يعلق أحدهم بكلمة السعر، يُرسَل رد مختلف — لذا لا يبدو قسم التعليقات مكرراً أو آلياً.

وراء الكواليس، الاختيار العشوائي هو مجرد هذا الكود:

```python
import random

def select_reply(replies: list, username: str) -> str:
    reply = random.choice(replies)
    return reply.replace("{username}", f"@{username}")
```

بسيط، لكنه فعّال.

---

## البداية السريعة

### الخطوة الأولى — تثبيت السكيل

افتح الـ terminal وشغّل:

```bash
npx instagram-autoreply-skill install
```

سيُسألك أين تريد التثبيت:
- **Codex global** — يعمل على جميع مشاريعك
- **Codex local** — للريبو الحالي فقط
- **Claude global** — يعمل في جميع جلسات Claude على جهازك

### الخطوة الثانية — اسأل Claude أو Codex

بعد التثبيت، افتح جلسة جديدة واسأل بشكل طبيعي:

```
"جهّز ردود تلقائية على حسابي في إنستغرام لما حد يكتب price أو info"
```

```
"ابني بوت تعليقات لإنستغرام — لما الناس يكتبوا link ابعت لهم بايو لينك،
ولما يكتبوا order وجّههم على الخاص"
```

```
"اعمل لي reply config لحساب إنستغرام مع ردود عشوائية لكلمات: price, info, collab"
```

السكيل يُفعَّل تلقائياً ويولّد كل شيء تحتاجه.

### الخطوة الثالثة — إعداد الكلمات المفتاحية والردود

السكيل يولّد ملف `reply_config.json`. هكذا يبدو الإعداد الكامل:

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

### الخطوة الرابعة — منطق مطابقة الكلمات المفتاحية

السكيل يستخدم whole-word matching بشكل افتراضي حتى لا تُفعَّل كلمة "info" عند كتابة "information":

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

وقبل أي رد، يتحقق من الكلمات السلبية:

```python
NEGATIVE_SIGNALS = ["scam", "fake", "fraud", "terrible", "worst"]

def is_negative(comment_text: str) -> bool:
    text = comment_text.lower()
    return any(word in text for word in NEGATIVE_SIGNALS)
```

إذا كان التعليق سلبياً، يتجاوز الرد التلقائي ويحفظه للمراجعة اليدوية.

### الخطوة الخامسة — معالج الـ Webhook (Instagram Graph API)

هذا هو الكود الكامل لمعالج الـ webhook الذي يولّده السكيل باستخدام Flask:

```python
from flask import Flask, request, jsonify
import json, random, re, time, os

app = Flask(__name__)

ACCESS_TOKEN = os.environ["INSTAGRAM_TOKEN"]
VERIFY_TOKEN = os.environ["WEBHOOK_VERIFY_TOKEN"]

with open("reply_config.json") as f:
    CONFIG = json.load(f)

replied_ids = set()

# الخطوة 1: التحقق من الـ webhook مع Meta
@app.route("/webhook", methods=["GET"])
def verify():
    if request.args.get("hub.verify_token") == VERIFY_TOKEN:
        return request.args.get("hub.challenge")
    return "Forbidden", 403

# الخطوة 2: استقبال أحداث التعليقات الجديدة
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
        return  # تم الرد مسبقاً

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

    # تأخير عشوائي حتى لا يبدو كبوت
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

### الخطوة السادسة — بدون سيرفر؟ استخدم سكريبت الـ Polling

إذا لم تتمكن من استضافة webhook، السكيل يولّد أيضاً سكريبت polling يتحقق من التعليقات الجديدة كل 60 ثانية:

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

### الخطوة السابعة — اختبر قبل الإطلاق

شغّل سكريبت الاختبار المدمج لمحاكاة التعليقات والتحقق من أن كل شيء يعمل:

```bash
python3 skills/Instagram-AutoReply-Skill/scripts/test_keyword_matcher.py \
  --config reply_config.json
```

مثال على النتيجة:

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

### الخطوة الثامنة — الإطلاق الفعلي

لما تكون راضياً عن نتائج الاختبار:

```json
{
  "dry_run": false
}
```

غيّر `dry_run` إلى `false` وانشر. خلصت.

---

## خيارات المنصات

مش لازم تكتب كود. السكيل يدعم منصات متعددة ويوصي بالأنسب حسب وضعك:

| وضعك | المنصة الموصى بها |
|---|---|
| مطور وتريد تحكم كامل | Instagram Graph API + Python/Node |
| تريد no-code وإعداد سريع | ManyChat |
| تريد flows بصرية self-hosted | n8n |
| تستخدم Zapier أصلاً | Zapier |
| تريد بروتوتايب سريع | Python polling script |

---

## ضوابط الأمان المدمجة

كل كود يولّده السكيل يتضمن هذه الضوابط تلقائياً:

```python
# الحد اليومي — يوقف بعد 150 رد
if replies_today >= CONFIG["limits"]["max_replies_per_day"]:
    return

# حد المنشور — أقصى 30 لكل منشور
if post_reply_count >= CONFIG["limits"]["max_replies_per_post"]:
    return

# حد المستخدم — أقصى ردين لكل مستخدم يومياً
if user_reply_count >= CONFIG["limits"]["max_replies_per_user_per_day"]:
    return

# منع التكرار — لا رد على نفس التعليق مرتين
if comment_id in replied_ids:
    return

# فلتر سلبي — إرسال الشكاوى للمراجعة اليدوية
if is_negative(comment_text):
    flag_for_review(comment_id)
    return

# تأخير عشوائي — تجنب الأنماط الثابتة
time.sleep(random.uniform(2.0, 8.0))
```

---

## كيف تثبّته

```bash
# عبر npm (موصى به)
npx instagram-autoreply-skill install

# عبر GitHub
npx github:anashamad9/Instagram-AutoReply-Skill- install
```

**GitHub:** [github.com/anashamad9/Instagram-AutoReply-Skill-](https://github.com/anashamad9/Instagram-AutoReply-Skill-)

**npm:** [npmjs.com/package/instagram-autoreply-skill](https://www.npmjs.com/package/instagram-autoreply-skill)

---

## لمن هذا السكيل؟

- **أصحاب الأعمال** الذين يتلقون نفس أسئلة المنتجات على كل منشور
- **الكريتورز** الذين يريدون التفاعل مع المتابعين دون أن يكونوا مربوطين بهواتفهم
- **الوكالات** التي تدير حسابات إنستغرام متعددة
- **المطورين** الذين يريدون نقطة انطلاق جاهزة لأتمتة إنستغرام
- **أي شخص** متعب من كتابة "الرابط في البايو" خمسين مرة كل يوم

---

إذا عندك أسئلة أو تريد تساهم في المشروع، افتح issue على GitHub. السكيل مرخص بـ MIT — مجاني للاستخدام والتعديل والمشاركة.
