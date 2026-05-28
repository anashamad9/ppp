# السكيلز: كيف بتعلّم الذكاء الاصطناعي يشتغل زي ما إنت بدك

في فكرة بسيطة بتغيّر طريقة شغلك مع الذكاء الاصطناعي بالكامل، اسمها **السكيلز (Skills)**.

المشكلة اللي بنعرفها كلنا إنه كل ما تفتح جلسة جديدة مع Claude أو Codex، بتبلش من الصفر. لازم تشرح من الأول شو بدك، وكيف بدك إياه، وشو القواعد اللي لازم يمشي عليها. وكل مرة بتعيد نفس الحكي. السكيلز بتحل هالقصة من جذورها.

السكيل ببساطة عبارة عن مجموعة تعليمات ومعرفة بتعبّيها مرة وحدة بـ Claude أو Codex. وبعدها المساعد الذكي بيصير "بيعرف" يعمل المهمة هاي لحاله، بدون ما تشرحله كل مرة من جديد. زي ما تكون علّمت موظف جديد كيف يشتغل، بس مرة وحدة وللأبد.

وهاد بالظبط المبدأ اللي اشتغلت عليه. بنيت كذا سكيل، كل واحد بيعلّم الـ AI يعمل إشي معيّن بطريقتي أنا. وهالمقال رح ياخدك بسكيل واحد منهم كمثال تطبيقي، عشان تشوف الفكرة على أرض الواقع، وبعدها تقدر تتخيل كيف نفس المبدأ بيشتغل على أي مهمة تانية إنت بتكررها.

---

## ليش السكيلز فكرة قوية؟

قبل ما نفوت بالمثال، خليني أوضح ليش هالطريقة مختلفة عن إنك بس تكتب prompt طويل كل مرة.

السكيل بيتميز بكم إشي:

- **بتكتبه مرة وحدة.** بعد ما تثبته، بيشتغل بكل جلساتك بدون ما تعيد الشرح
- **بيمشي على قواعدك إنت.** إنت اللي بتحدد كيف يفكر المساعد وشو الحدود اللي ما بيتعداها
- **قابل للمشاركة.** تقدر تعطيه لأي حدا بفريقك ويصير عنده نفس القدرة بثانية
- **بيتطوّر.** كل ما تكتشف طريقة أحسن، بتعدّل السكيل ويستفيد منه الكل

الفكرة إنك مش بس بتطلب من الـ AI يساعدك بمهمة، إنت عم تبني له خبرة بتضل معه. وهيك بدل ما تكون إنت اللي بتشتغل، بيصير عندك مساعد فاهم شغلك زيك بالظبط.

---

## مثال تطبيقي: سكيل الرد التلقائي على إنستغرام

عشان الكلام ما يضل نظري، خليني أوريك سكيل حقيقي بنيته على هالمبدأ، اسمه **Instagram AutoReply Skill**. وهو سكيل مجاني ومفتوح المصدر بيشتغل مع Claude و Codex.

القصة اللي بيحلها معروفة لأي حدا عنده حساب على إنستغرام. إذا عندك بزنس أو براند، أو إنت كريتور، أكيد عارف الوجع. كل يوم في عشرات الناس بيسألوا نفس الأسئلة. "قديش السعر؟" "وين الرابط؟" "كيف بقدر أطلب؟". ما بتقدر ترد على كل واحد بإيدك، وإذا تجاهلتهم بتخسر زباين كان ممكن تكسبهم.

السكيل هاد بيعلّم المساعد الذكي كيف يجهّزلك ردود تلقائية على الكومنتات، مربوطة بكلمات معينة، والردود بتطلع عشوائية ومتنوعة عشان ما تبيّن مكررة أو شغل بوت. وبدل ما تشرح كل هاد كل مرة، السكيل بيعرفه أصلاً.

شو بيتكفّل فيه السكيل:

- بيمسك الكلمات اللي إنت محددها بالكومنتات (زي: السعر، الرابط، معلومات، طلب)
- بيختار رد عشوائي من مجموعة ردود إنت بتحددها
- بيكتبلك الكود نفسه أو إعدادات الـ workflow اللي بتحتاجها
- بيمشّيك خطوة خطوة على إعداد Instagram Graph API، أو بيقترحلك أدوات بدون كود زي ManyChat أو Zapier أو n8n
- وبيخلي إعدادك دايماً ضمن حدود إنستغرام وشروط الخدمة، عشان ما تتعب حالك

لاحظ هون الفكرة الأهم: السكيل مش بس "كود جاهز". هو معرفة كاملة عن كيف تتعامل مع المهمة صح، مبنية جوا المساعد. وهاد نفس الشي اللي بتقدر تعمله لأي مهمة تانية إنت بتكررها.

---

## كيف بيشتغل؟

الفكرة بسيطة. إنت بتحدد قائمة من **الكلمات المشغّلة**، وبتحط لكل كلمة مجموعة ردود. لما حدا يكتب كلمة معينة بكومنت على منشورك، البوت بيختار رد عشوائي من المجموعة وبينشره لحاله.

مثلاً:

**الكلمة المشغّلة:** `price`

**مجموعة الردود:**
```
"Hey {username}! DM us for pricing details."
"Hi {username}! We have options for every budget — slide into our DMs."
"Thanks for asking, {username}! Drop us a DM and we'll send the full price list."
```

كل ما حدا يكتب كلمة السعر، بيوصله رد مختلف. وهيك قسم الكومنتات عمره ما بيبيّن منسوخ ملصوق.

ووراء الكواليس، الاختيار العشوائي مش أكتر من هالكود:

```python
import random

def select_reply(replies: list, username: str) -> str:
    reply = random.choice(replies)
    return reply.replace("{username}", f"@{username}")
```

بسيط، بس بيأدي الشغل تمام.

---

## يلا نبلش بسرعة

### الخطوة الأولى: ثبّت السكيل

افتح الـ terminal وشغّل:

```bash
npx instagram-autoreply-skill install
```

رح يسألك وين بدك تثبته:
- **Codex global** يعني بيشتغل على كل مشاريعك
- **Codex local** للريبو اللي إنت فيه بس
- **Claude global** بيشتغل بكل جلسات Claude على جهازك

### الخطوة الثانية: اسأل Claude أو Codex

بعد ما تثبته، افتح جلسة جديدة واسأل عادي زي ما بتحكي:

```
"جهّزلي ردود تلقائية على حسابي بإنستغرام لما حدا يكتب price أو info"
```

```
"ابنيلي بوت كومنتات لإنستغرام. لما الناس يكتبوا link ابعتلهم لينك البايو،
ولما يكتبوا order وجّههم عالخاص"
```

```
"اعملي reply config لحساب إنستغرام مع ردود عشوائية لكلمات: price و info و collab"
```

هون بتشوف قوة السكيل: ما لزمك تشرح ولا قاعدة، هو عارف شو يعمل لحاله وبيجهّزلك كل اللي بتحتاجه.

### الخطوة الثالثة: ظبّط الكلمات والردود

السكيل بيطلّعلك ملف `reply_config.json`. هيك بيكون شكل الإعداد الكامل:

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

### الخطوة الرابعة: منطق مطابقة الكلمات

السكيل بيستخدم مطابقة الكلمة الكاملة بشكل افتراضي، عشان كلمة "info" ما تشتغل لما حدا يكتب "information":

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

وقبل أي رد، بيتأكد من الكلمات السلبية:

```python
NEGATIVE_SIGNALS = ["scam", "fake", "fraud", "terrible", "worst"]

def is_negative(comment_text: str) -> bool:
    text = comment_text.lower()
    return any(word in text for word in NEGATIVE_SIGNALS)
```

إذا الكومنت طلع سلبي، بيتخطى الرد التلقائي وبيحفظه عندك عشان تراجعه بإيدك.

### الخطوة الخامسة: معالج الـ Webhook (Instagram Graph API)

هاد الكود الكامل لمعالج الـ webhook اللي بيكتبه السكيل باستخدام Flask:

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

# الخطوة 2: استقبال أحداث الكومنتات الجديدة
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
        return  # رد عليه من قبل

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

    # تأخير عشوائي عشان ما يبيّن بوت
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

### الخطوة السادسة: ما عندك سيرفر؟ استخدم سكريبت الـ Polling

إذا ما قدرت تستضيف webhook، السكيل كمان بيطلّعلك سكريبت polling بيفحص الكومنتات الجديدة كل ٦٠ ثانية:

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

### الخطوة السابعة: جرّب قبل ما تطلق

شغّل سكريبت الاختبار الجاهز عشان تحاكي الكومنتات وتتأكد إن كل إشي ماشي تمام:

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

### الخطوة الثامنة: طلّقه على الواقع

لما تكون مبسوط من نتايج الاختبار:

```json
{
  "dry_run": false
}
```

غيّر `dry_run` لـ `false` وانشر. وخلصنا.

---

## خيارات المنصات

مش لازم تكتب ولا سطر كود. السكيل بيدعم كذا منصة وبيقترحلك الأنسب حسب وضعك:

إذا إنت مطور وبدك تحكم كامل، روح على Instagram Graph API مع Python أو Node. وإذا بدك إشي بدون كود وإعداد سريع، ManyChat بيظبط معك. أما إذا بتحب الـ flows البصرية وبدك تستضيفها عندك، فـ n8n خيار حلو. وإذا إنت أصلاً بتستخدم Zapier، كمّل عليه. وإذا كل اللي بدك إياه بروتوتايب سريع وما عندك سيرفر، سكريبت الـ polling بـ Python بيوصلك للهدف.

---

## ضوابط الأمان الجاهزة

من جمال السكيلز إنها بتحمل القواعد المهمة جواها، فما بتنسى ولا وحدة. كل كود بيكتبه هالسكيل بيجي معبّى بهالضوابط لحاله:

```python
# الحد اليومي، بيوقف بعد 150 رد
if replies_today >= CONFIG["limits"]["max_replies_per_day"]:
    return

# حد المنشور، أقصى 30 لكل منشور
if post_reply_count >= CONFIG["limits"]["max_replies_per_post"]:
    return

# حد المستخدم، أقصى ردين لكل مستخدم باليوم
if user_reply_count >= CONFIG["limits"]["max_replies_per_user_per_day"]:
    return

# منع التكرار، ما بيرد على نفس الكومنت مرتين
if comment_id in replied_ids:
    return

# فلتر سلبي، بيبعت الشكاوى للمراجعة اليدوية
if is_negative(comment_text):
    flag_for_review(comment_id)
    return

# تأخير عشوائي، عشان ما يكون في نمط ثابت
time.sleep(random.uniform(2.0, 8.0))
```

---

## كيف بتثبته

```bash
# عن طريق npm (الأفضل)
npx instagram-autoreply-skill install

# عن طريق GitHub
npx github:anashamad9/Instagram-AutoReply-Skill- install
```

**GitHub:** [github.com/anashamad9/Instagram-AutoReply-Skill-](https://github.com/anashamad9/Instagram-AutoReply-Skill-)

**npm:** [npmjs.com/package/instagram-autoreply-skill](https://www.npmjs.com/package/instagram-autoreply-skill)

---

## الزبدة: السكيل هو المبدأ

سكيل إنستغرام مجرد مثال واحد. بس الفكرة الأكبر إنك تقدر تبني سكيل لأي مهمة بتكررها. أي إشي بتلاقي حالك بتشرحه للـ AI كل مرة من جديد، بتقدر تحوّله لسكيل، وبعدها المساعد بيعرفه لحاله للأبد.

كل سكيل بتبنيه هو خبرة بتنحفظ وبتنشارك وبتتطوّر. وهيك بدل ما تشتغل إنت كل مرة من الصفر، بيصير عندك مساعد فاهم شغلك بالظبط زي ما إنت بدك. هاد هو المبدأ، وهالسكيل بس البداية.

إذا عندك أي سؤال أو بدك تساهم بالمشروع، افتح issue على GitHub. السكيل مرخّص بـ MIT، يعني مجاني تستخدمه وتعدّل عليه وتشاركه زي ما بدك.
