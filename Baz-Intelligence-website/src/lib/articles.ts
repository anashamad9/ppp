import articleOneArabic from '@/content/article-1.ar.json'
import articleOneEnglish from '@/content/article-1.en.json'

export type ArticleSection = {
  heading: string
  paragraphs: string[]
  imageSrc?: string
  imageAlt?: string
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  imageSrc: string
  sections: ArticleSection[]
}

const deletedArticleSlugs = new Set([
  'finance-team-copying-numbers',
  'online-store-customer-support',
  'law-firm-knowledge-folders',
  'marketing-team-brand-consistency',
  'logistics-team-manual-shipments',
])

const allArticles: Article[] = [
  {
    slug: 'article-1',
    ...articleOneEnglish,
    imageSrc: '/articles/atmet-brain-cover.png',
  },
  {
    slug: 'finance-team-copying-numbers',
    title: 'The Finance Team That Spent Its Mornings Copying Numbers',
    excerpt:
      'How a finance operations agent turned purchase-order data entry into a controlled workflow with exceptions, approvals, and ERP preparation.',
    category: 'Finance Operations',
    readTime: '5 min read',
    imageSrc: '/Atmet%20Technologies.heic',
    sections: [
      {
        heading: 'The Finance Team That Spent Its Mornings Copying Numbers',
        paragraphs: [
          'Every morning, before the distribution company’s finance team could start any meaningful work, they had to clear the same pile of tasks.',
          'Purchase orders arrived by email from different suppliers. Some came as clean PDFs. Others came as scanned documents, Excel files, or even images taken from a phone. One employee downloaded each file, another checked the supplier details, and someone else compared the prices against an internal spreadsheet.',
          'Once everything looked correct, the order had to be entered into the ERP system and sent for approval.',
          'It was not difficult work, but it was constant. By the middle of the day, the team had already spent hours copying numbers, checking product codes, and searching old emails for missing information.',
          'The finance manager knew the process was inefficient, but replacing the ERP system was not an option. What they needed was not another new system. They needed something that could work with what they already had.',
        ],
      },
      {
        heading: 'Understanding the Real Problem',
        paragraphs: [
          'When we first met the team, we did not begin by talking about AI. We asked them to show us exactly what happened when a new purchase order arrived.',
          'One employee opened her inbox and walked us through the process. She downloaded the attachment, searched for the supplier in the ERP, checked prices in a spreadsheet, reviewed the tax value, and copied everything into a new order.',
          'Then she showed us what happened when something was wrong. Sometimes the supplier used an old product code. Sometimes the tax was missing. Sometimes the price was slightly different from the approved price.',
          'The process was not just data entry. It was a mix of document reading, business rules, and judgement. That was the part we needed to understand before building anything.',
        ],
      },
      {
        heading: 'Building the System Around Their Workflow',
        paragraphs: [
          'We created a finance operations agent that monitored the company’s purchasing inbox.',
          'Whenever a new order arrived, the system downloaded the attachment and extracted the supplier name, item codes, quantities, prices, tax, and payment terms.',
          'It then checked that information against the company’s supplier records and approved pricing data. When everything matched, the system prepared the order inside the ERP.',
          'When something was missing or unusual, it created an exception and sent it to the responsible employee for review. The employee could see the original document, the extracted information, and the reason the order had been flagged.',
        ],
      },
      {
        heading: 'Keeping Financial Decisions Human',
        paragraphs: [
          'The company was comfortable automating repetitive work, but not financial approval. So we designed the system around that boundary.',
          'The agent could read, validate, and prepare the transaction. It could not approve high-value orders or release payments.',
          'Every important action was logged, and every extracted value could be traced back to the original document.',
        ],
      },
      {
        heading: 'What Changed',
        paragraphs: [
          'The team no longer started the day by opening dozens of attachments and copying information line by line.',
          'Most routine orders were processed automatically. Employees reviewed exceptions, handled supplier issues, and focused on higher-value financial work.',
          'The biggest improvement was not only speed. The company gained better visibility into the entire process. A repetitive administrative process became a controlled digital workflow.',
        ],
      },
    ],
  },
  {
    slug: 'online-store-customer-support',
    title: 'The Online Store That Could Not Keep Up With Its Customers',
    excerpt:
      'How a customer operations agent investigated orders, shipping status, policies, and returns before preparing controlled responses.',
    category: 'Customer Operations',
    readTime: '5 min read',
    imageSrc: '/Baz%20Intelligence%20Prev%20Eng.png',
    sections: [
      {
        heading: 'The Online Store That Could Not Keep Up With Its Customers',
        paragraphs: [
          'The e-commerce company had grown quickly. That was good news for sales, but it created a serious problem for the customer-support team.',
          'Every day, customers sent messages asking the same questions: Where is my order? Can I return this item? Why has my refund not arrived? Can I change the delivery address?',
          'The team answered through email, live chat, social media, and messaging applications. To respond properly, employees had to move between the support platform, order-management system, shipping provider, and company policies.',
          'The company had already tried a basic chatbot, but customers quickly learned that it was not very helpful. It repeated standard answers and often directed people back to the support team.',
        ],
      },
      {
        heading: 'Watching How the Team Actually Worked',
        paragraphs: [
          'We spent time with the support employees and reviewed real conversations.',
          'One employee showed us how she handled a delayed order. First, she searched for the customer. Then she opened the order, copied the tracking number, checked the shipping provider, looked at the delivery status, and returned to the support platform to write a response.',
          'For a return request, the process took even longer. She had to check the purchase date, product category, delivery date, return policy, and customer history before deciding what to do.',
          'The team was not only answering questions. They were investigating cases. That meant the solution had to do more than generate text.',
        ],
      },
      {
        heading: 'Creating an Agent That Could Investigate',
        paragraphs: [
          'We built a customer operations agent connected to the company’s order system, shipping providers, product catalogue, support platform, and internal policies.',
          'When a customer asked about a delayed delivery, the system identified the order, checked the latest shipping status, reviewed the expected delivery date, and compared the situation with the company’s service rules.',
          'If the delay was minor, the response could be sent automatically. If the order had been delayed beyond the allowed period, the system created an escalation and sent the case to a human employee.',
          'For return requests, the agent checked whether the item was eligible, whether the return period had passed, and whether the product category had special conditions.',
        ],
      },
      {
        heading: 'Giving the Agent Company Knowledge',
        paragraphs: [
          'The company’s policies were stored across documents, old emails, and internal notes. We organised them into a private knowledge base.',
          'The agent could now retrieve the correct return policy, warranty rule, delivery condition, or promotion term before answering the customer.',
          'This made the replies more consistent. Customers no longer received different answers depending on which employee handled the conversation.',
        ],
      },
      {
        heading: 'What Changed',
        paragraphs: [
          'Routine questions were handled quickly, while employees spent their time on complaints, sensitive cases, and customers who genuinely needed help.',
          'The backlog became smaller, response times improved, and managers gained a clearer view of what customers were asking about.',
          'The support system stopped being only a place where messages were answered. It became a source of operational intelligence.',
        ],
      },
    ],
  },
  {
    slug: 'law-firm-knowledge-folders',
    title: 'The Law Firm With Years of Knowledge Hidden in Folders',
    excerpt:
      'How a private legal knowledge system helped lawyers search previous work safely by meaning, source, relationship, and permission.',
    category: 'Knowledge Systems',
    readTime: '6 min read',
    imageSrc: '/AI%20Labs%20%2B%20second.png',
    sections: [
      {
        heading: 'The Law Firm With Years of Knowledge Hidden in Folders',
        paragraphs: [
          'The legal firm had spent years building valuable knowledge: contracts, legal opinions, case summaries, research notes, and internal guidance covering a wide range of situations.',
          'The problem was that nobody could easily find it. Some documents were stored in shared folders, others were attached to old emails, and older files existed only as scanned documents.',
          'Senior lawyers often knew that the firm had handled a similar case before, but finding the relevant material could take hours. Junior lawyers spent much of their time searching, opening files, and comparing documents manually.',
        ],
      },
      {
        heading: 'Why a General AI Tool Was Not Enough',
        paragraphs: [
          'The partners were interested in AI, but they were also cautious. Their documents contained sensitive client information. Access had to be limited by case, client, and employee role.',
          'They did not want confidential information copied into a public chatbot, and they did not want an AI system producing legal conclusions without a lawyer’s review.',
          'The goal was not to automate legal judgement. The goal was to make the firm’s own knowledge easier to access.',
        ],
      },
      {
        heading: 'Building a Private Legal Knowledge System',
        paragraphs: [
          'We created a private platform that organised the firm’s documents and made them searchable by meaning, not only by file name.',
          'A lawyer could ask whether the firm had used a similar termination clause before. The system searched approved documents, retrieved the relevant clauses, and displayed the original sources.',
          'For case preparation, the system could read a collection of documents and identify dates, people, organisations, obligations, and events. It could then build an initial case timeline and highlight information that appeared inconsistent or incomplete.',
        ],
      },
      {
        heading: 'Connecting the Relationships',
        paragraphs: [
          'Legal work often depends on relationships. A client may be connected to several companies, contracts, obligations, and disputes.',
          'To support this, we built a knowledge graph that connected cases, parties, contracts, dates, clauses, and documents.',
          'This allowed lawyers to ask more complex questions, such as which active contracts for a client contain renewal obligations and expire this year.',
        ],
      },
      {
        heading: 'Keeping Lawyers Responsible',
        paragraphs: [
          'The platform was designed as a research and preparation tool. It could summarise, compare, and organise information, but it could not issue final legal advice.',
          'Every result included sources, and access depended on the employee’s permissions. A lawyer assigned to one client could not accidentally search another client’s files.',
          'The firm became better at preserving its own experience. Years of legal work became part of a living internal system that the entire firm could use safely.',
        ],
      },
    ],
  },
  {
    slug: 'marketing-team-brand-consistency',
    title: 'The Marketing Team Producing More Content but Losing Its Brand',
    excerpt:
      'How specialised marketing agents organised briefs, brand knowledge, approvals, publishing, and reporting without replacing creative direction.',
    category: 'Marketing Operations',
    readTime: '5 min read',
    imageSrc: '/art%20eng.png',
    sections: [
      {
        heading: 'The Marketing Team Producing More Content but Losing Its Brand',
        paragraphs: [
          'The retail group managed several brands across different countries. Each brand had its own personality: premium and minimal, young and energetic, or heavily focused on promotions and price.',
          'The marketing team was producing content every day, but as the number of campaigns increased, maintaining consistency became difficult.',
          'Designers were overwhelmed. Copywriters were rewriting the same ideas for different platforms. Managers spent hours reviewing captions, banners, and promotional messages.',
          'The team tried using general AI tools, but the results often sounded generic. The content was faster, but it was not better.',
        ],
      },
      {
        heading: 'Studying the Brands Before Automating',
        paragraphs: [
          'We began by collecting the material that already defined each brand: guidelines, previous campaigns, approved designs, tone examples, product information, audience profiles, prohibited phrases, and market-specific rules.',
          'We also followed the campaign process from beginning to end: brief, copywriting, design, approval, scheduling, and reporting.',
          'The biggest delays happened between those stages. Feedback was scattered, files were shared in different versions, and publishing sometimes happened late because nobody knew whether final approval had been given.',
        ],
      },
      {
        heading: 'Building a Marketing Operations System',
        paragraphs: [
          'We built a system with several specialised agents.',
          'The planning agent turned a marketing objective into a structured campaign plan. The copywriting agent created content using the correct tone for each brand and platform.',
          'The creative agent prepared design directions and visual variations using approved templates and brand assets. The approval agent sent each item to the correct manager and tracked feedback.',
          'Each brand had its own private knowledge space, so the system could not mix the language, visuals, or examples of one brand with another.',
        ],
      },
      {
        heading: 'Keeping Creativity Human',
        paragraphs: [
          'We did not design the system to replace the creative team. Designers still controlled visual quality. Marketers still decided the campaign direction. Managers still approved important public content.',
          'The system handled the repetitive parts around the creative process: organising briefs, preparing first drafts, tracking feedback, and moving approved work between tools.',
        ],
      },
      {
        heading: 'What Changed',
        paragraphs: [
          'The team began producing content faster, but more importantly, the work became more organised.',
          'Designers received clearer briefs. Copywriters spent less time rewriting the same message. Managers could see exactly what was waiting for approval.',
          'The AI did not become the creative director. It became the operational layer that allowed the creative team to do its best work without getting lost in repetitive coordination.',
        ],
      },
    ],
  },
  {
    slug: 'logistics-team-manual-shipments',
    title: 'The Logistics Team That Watched Every Shipment Manually',
    excerpt:
      'How an operations control agent surfaced shipment exceptions, connected logistics relationships, and helped teams solve problems earlier.',
    category: 'Logistics Operations',
    readTime: '5 min read',
    imageSrc: '/intelligence%201.png',
    sections: [
      {
        heading: 'The Logistics Team That Watched Every Shipment Manually',
        paragraphs: [
          'The logistics company managed hundreds of shipments moving through warehouses, carriers, drivers, and customer locations.',
          'Most shipments arrived without a problem. But the operations team still had to monitor all of them.',
          'Employees spent their day checking carrier websites, opening spreadsheets, reading emails, and updating customers. They were not looking for normal shipments. They were looking for the few shipments that had gone wrong.',
          'A delayed delivery, missing document, customs issue, incorrect address, or damaged package could quickly become a serious customer problem.',
        ],
      },
      {
        heading: 'Finding the Real Job',
        paragraphs: [
          'During discovery, we asked the operations team to explain what they did every morning.',
          'They opened the transport-management system, checked the carrier platforms, reviewed warehouse updates, and compared delivery times.',
          'One manager said something that defined the project: “I do not need to see every shipment. I need to know which shipment needs me.”',
          'The system did not need to replace the logistics platform. It needed to watch the operation and surface the exceptions.',
        ],
      },
      {
        heading: 'Building an Operations Control Agent',
        paragraphs: [
          'We connected the agent to the company’s shipment system, warehouses, carrier APIs, document storage, and customer communication channels.',
          'The system monitored shipment events continuously. When everything followed the expected path, nothing happened.',
          'When a shipment stopped moving, missed a deadline, or lacked a required document, the system created an exception.',
          'It gathered the available information, classified the issue, checked the operating procedure, assigned the case to the correct team, and prepared a customer update.',
        ],
      },
      {
        heading: 'Connecting the Operation',
        paragraphs: [
          'We also built a knowledge graph connecting shipments, customers, warehouses, carriers, routes, incidents, and service agreements.',
          'This allowed managers to understand patterns that were difficult to see before, such as which carrier creates the most delays on priority customer routes or which warehouse is responsible for the highest number of missing documents.',
        ],
      },
      {
        heading: 'What Changed',
        paragraphs: [
          'The operations team stopped checking every shipment manually. Their dashboard showed only the cases that required attention.',
          'Employees could see what had happened, which systems had been checked, who was responsible, and what action was recommended.',
          'Customers received updates earlier, and managers had better visibility into recurring problems. Instead of spending the day searching for problems, the team could spend its time solving them.',
        ],
      },
    ],
  },
  {
    slug: 'social-media-agent-that-learned-the-client',
    title: 'Atmet: AI Agent for Graphic Design',
    excerpt:
      'A story about a design agent that stopped producing generic visuals and started generating social media post designs in the client’s own visual language.',
    category: 'Design Agents',
    readTime: '4 min read',
    imageSrc: '/articles/atmet-ai-agent-for-graphic-design.png',
    sections: [
      {
        heading: 'Atmet: AI Agent for Graphic Design',
        paragraphs: [
          'The client did not come to us because they needed more content ideas.',
          'They had ideas. They had offers, product photos, campaign themes, and a calendar full of things to publish. The problem started after the idea was approved, when someone had to turn it into an actual post design.',
          'Some designs came from templates. Some came from freelancers. Some were generated with AI image tools. And many of them came back with the same comment from the client: “It is close, but it is not us.”',
          'The layout was clean. The colors were acceptable. The image looked polished. But the post still felt wrong. The product was too small. The background was too loud. The typography did not carry the brand. The spacing felt like a stock template wearing the company’s logo.',
        ],
      },
      {
        heading: 'The Problem Was Visual Taste, Not Image Quality',
        paragraphs: [
          'At first, everyone tried to solve it with better prompts.',
          'They described the brand colors, uploaded references, asked for “premium but friendly,” “modern but not cold,” and “bold but not messy.” The AI could generate beautiful images, but beauty was not the problem.',
          'The client had a very specific visual instinct. Certain shadows felt cheap. Certain product angles felt weak. Some posts needed a lot of negative space, while others needed dense offer treatment. A background that worked for one campaign looked completely wrong for another.',
          'So instead of building a generic image generator, we built a social media design agent around the client’s real visual memory.',
        ],
      },
      {
        heading: 'Teaching the Agent What “On Brand” Looked Like',
        paragraphs: [
          'We collected approved posts, rejected designs, product photos, campaign boards, logo usage rules, font choices, color treatments, and old comments from the client.',
          'The rejected work mattered as much as the approved work. It showed what the client meant when they said “too busy,” “too generic,” “not enough product focus,” or “this looks like every other brand.”',
          'The agent learned how the brand uses space, when the product should dominate the frame, which compositions feel premium, where text should sit, how much contrast is allowed, and what kind of generated background supports the message instead of stealing attention.',
          'It also learned the practical details designers care about: platform dimensions, safe areas, Arabic and English text placement, campaign variants, export sizes, and what needs human approval before publishing.',
        ],
      },
      {
        heading: 'From Prompt to Approval-Ready Artwork',
        paragraphs: [
          'The agent did not start from a blank canvas. It started by reading the campaign request and deciding what kind of visual post was needed.',
          'For a product launch, it could create several image directions: a clean product-first post, a lifestyle-style generated scene, a comparison layout, or a story sequence. For an offer, it could prepare a stronger promotional layout with controlled hierarchy and clear pricing space.',
          'It generated the image direction, arranged the post design, placed the product and text areas, adapted the same idea for feed and story sizes, and prepared variations for review.',
          'The client could respond naturally: “make it quieter,” “more product focus,” “use the Eid campaign style,” “less template-like,” or “make this feel like the premium line.” The agent understood those notes because they were connected to real visual examples, not abstract adjectives.',
        ],
      },
      {
        heading: 'What Changed',
        paragraphs: [
          'The design team did not stop designing. They stopped spending so much time fighting the first draft.',
          'Instead of generating random AI images and trying to force them into a branded post, they worked with an agent that understood the client’s layouts, product treatment, visual boundaries, and approval habits.',
          'First versions became closer to what the client wanted. Designers reviewed stronger directions, managers saw clearer options, and the client spent less time explaining the same visual preferences again and again.',
          'The agent did not replace design taste. It carried the client’s visual taste into the workflow, so every new post started from a place that already looked familiar.',
        ],
      },
    ],
  },
]

export const articles: Article[] = allArticles.filter((article) => !deletedArticleSlugs.has(article.slug))

type LocalizedArticleContent = Omit<Article, 'slug' | 'imageSrc'>

const arabicArticlesBySlug: Record<string, LocalizedArticleContent> = {
  'article-1': articleOneArabic,
  'finance-team-copying-numbers': {
    title: 'فريق مالي يبدأ صباحه بنقل الأرقام يدويًا',
    excerpt:
      'كيف حوّل وكيل عمليات مالية إدخال أوامر الشراء من عمل يدوي متكرر إلى سير عمل منظم، مع استثناءات واضحة وموافقات بشرية.',
    category: 'العمليات المالية',
    readTime: '٥ دقائق قراءة',
    sections: [
      {
        heading: 'فريق مالي يبدأ صباحه بنقل الأرقام يدويًا',
        paragraphs: [
          'في إحدى شركات التوزيع، كان صباح فريق المالية يبدأ بالطريقة نفسها تقريبًا كل يوم: فتح البريد، تنزيل المرفقات، قراءة أوامر الشراء، ومطابقة الأرقام قبل أن يبدأ أي عمل مالي حقيقي.',
          'بعض الأوامر كانت تصل كملفات PDF واضحة، وبعضها كصور ممسوحة أو ملفات Excel أو صور ملتقطة بالجوال. موظف ينزل الملف، وآخر يتأكد من بيانات المورد، وثالث يراجع السعر مع ملف داخلي.',
          'بعد ذلك تُدخل البيانات في نظام ERP وترسل للموافقة. العمل لم يكن معقدًا، لكنه كان مستمرًا ويأخذ ساعات من بداية اليوم.',
          'المشكلة لم تكن في نظام الـERP نفسه. الشركة اعتمدت عليه لسنوات، وكل الأقسام مرتبطة به. ما احتاجه الفريق لم يكن نظامًا جديدًا، بل طبقة ذكية تعمل مع النظام الموجود.',
        ],
      },
      {
        heading: 'فهم المشكلة قبل بناء الحل',
        paragraphs: [
          'لم نبدأ الحديث عن الذكاء الاصطناعي. طلبنا من الفريق أن يرينا ماذا يحدث بالضبط عندما يصل أمر شراء جديد.',
          'فتحت إحدى الموظفات بريدها وشرحت الخطوات: تنزيل المرفق، البحث عن المورد، مراجعة الأسعار، التأكد من الضريبة، ثم نسخ البيانات إلى طلب جديد داخل النظام.',
          'ثم شرحت الحالات غير الطبيعية: كود منتج قديم، ضريبة ناقصة، أو سعر مختلف قليلًا عن السعر المعتمد. هنا لا يعود العمل مجرد نسخ بيانات، بل يصبح قراءة مستندات وتطبيق قواعد واتخاذ قرار.',
        ],
      },
      {
        heading: 'وكيل مالي يعمل حول سير العمل الحالي',
        paragraphs: [
          'بنينا وكيل عمليات مالية يراقب بريد المشتريات. عند وصول أمر جديد، يحمّل المرفق ويستخرج اسم المورد، الأكواد، الكميات، الأسعار، الضريبة، وشروط الدفع.',
          'بعد ذلك يطابق البيانات مع سجلات الموردين والأسعار المعتمدة. إذا كان كل شيء صحيحًا، يجهز الطلب داخل نظام ERP.',
          'أما إذا ظهرت معلومة ناقصة أو غير معتادة، فلا يخمّن. ينشئ حالة استثناء ويرسلها للموظف المسؤول مع المستند الأصلي، والبيانات المستخرجة، وسبب التوقف.',
        ],
      },
      {
        heading: 'الموافقة المالية بقيت بيد الإنسان',
        paragraphs: [
          'الشركة كانت مرتاحة لأتمتة العمل المتكرر، لكنها لم تكن تريد أتمتة الموافقات المالية الحساسة.',
          'لذلك صممنا الوكيل ليقرأ ويتحقق ويجهز المعاملة، لكنه لا يوافق على الطلبات الكبيرة ولا يطلق المدفوعات.',
          'كل إجراء مهم كان مسجلًا، وكل رقم مستخرج يمكن الرجوع إلى مصدره في المستند الأصلي.',
        ],
      },
      {
        heading: 'ما الذي تغيّر؟',
        paragraphs: [
          'لم يعد الفريق يبدأ يومه بفتح عشرات المرفقات ونسخ الأرقام يدويًا.',
          'أوامر الشراء العادية أصبحت تمر تلقائيًا، والموظفون يراجعون فقط الحالات التي تحتاج انتباهًا فعليًا.',
          'التحسن لم يكن في السرعة فقط. الإدارة أصبحت ترى أين تتعطل الطلبات، ولماذا، ومن يحتاج إلى التدخل. تحوّل عمل إداري متكرر إلى سير عمل رقمي واضح وقابل للتحكم.',
        ],
      },
    ],
  },
  'online-store-customer-support': {
    title: 'متجر إلكتروني لم يعد قادراً على ملاحقة رسائل العملاء',
    excerpt:
      'كيف ساعد وكيل خدمة العملاء على فحص الطلبات والشحن والسياسات قبل تجهيز ردود دقيقة أو تصعيد الحالات الحساسة.',
    category: 'خدمة العملاء',
    readTime: '٥ دقائق قراءة',
    sections: [
      {
        heading: 'متجر إلكتروني لم يعد قادراً على ملاحقة رسائل العملاء',
        paragraphs: [
          'نما المتجر الإلكتروني بسرعة، وهذا كان خبرًا ممتازًا للمبيعات، لكنه ضغط بقوة على فريق خدمة العملاء.',
          'الأسئلة اليومية كانت تتكرر: أين طلبي؟ هل يمكنني إرجاع المنتج؟ لماذا لم يصل المبلغ المسترد؟ هل أستطيع تغيير عنوان التوصيل؟',
          'للإجابة بشكل صحيح، كان الموظف ينتقل بين منصة الدعم، ونظام الطلبات، وشركة الشحن، وسياسات الشركة. سؤال بسيط قد يحتاج فحص ثلاثة أو أربعة أنظمة.',
          'جرّبت الشركة روبوت محادثة بسيطًا، لكن العملاء اكتشفوا سريعًا أنه لا يساعد كثيرًا. كان يكرر إجابات عامة ثم يعيدهم إلى الفريق.',
        ],
      },
      {
        heading: 'ما الذي يفعله الفريق فعليًا؟',
        paragraphs: [
          'راجعنا محادثات حقيقية وجلسنا مع موظفي الدعم أثناء العمل.',
          'في حالة تأخر طلب، كان الموظف يبحث عن العميل، يفتح الطلب، ينسخ رقم التتبع، يفحص موقع شركة الشحن، ثم يعود لصياغة الرد.',
          'طلبات الإرجاع كانت أطول: تاريخ الشراء، نوع المنتج، تاريخ التسليم، سياسة الإرجاع، وسجل العميل. الفريق لم يكن يجيب فقط، بل كان يحقق في كل حالة.',
        ],
      },
      {
        heading: 'وكيل يستطيع التحقيق قبل الرد',
        paragraphs: [
          'بنينا وكيل عمليات عملاء متصلًا بنظام الطلبات، وشركات الشحن، وكتالوج المنتجات، ومنصة الدعم، وسياسات الشركة الداخلية.',
          'عندما يسأل العميل عن طلب متأخر، يحدد الوكيل الطلب، يفحص آخر حالة شحن، يراجع تاريخ التسليم المتوقع، ويقارن الوضع بقواعد الخدمة.',
          'إذا كان التأخير بسيطًا، يجهز ردًا مناسبًا بنبرة الشركة. وإذا تجاوز التأخير الحد المسموح، ينشئ تصعيدًا ويرسله لموظف بشري.',
          'وفي طلبات الإرجاع، يتحقق من أهلية المنتج وفترة الإرجاع وأي شروط خاصة قبل تجهيز الخطوة التالية.',
        ],
      },
      {
        heading: 'معرفة الشركة أصبحت جزءًا من الرد',
        paragraphs: [
          'كانت السياسات موزعة بين مستندات قديمة ورسائل بريد وملاحظات داخلية. نظمناها في قاعدة معرفة خاصة.',
          'أصبح الوكيل يسترجع سياسة الإرجاع أو شرط الضمان أو قاعدة التوصيل الصحيحة قبل الرد.',
          'هذا جعل الإجابات أكثر اتساقًا. لم يعد العميل يحصل على إجابة مختلفة حسب الموظف الذي استلم المحادثة.',
        ],
      },
      {
        heading: 'ما الذي تغيّر؟',
        paragraphs: [
          'لم يختف فريق الدعم، لكن عمله أصبح أكثر تركيزًا.',
          'الأسئلة الروتينية أصبحت تُعالج أسرع، بينما يقضي الموظفون وقتهم مع الشكاوى والحالات الحساسة والعملاء الذين يحتاجون مساعدة حقيقية.',
          'انخفض التراكم، وتحسنت سرعة الرد، وبدأت الإدارة ترى أنماطًا لم تكن واضحة من قبل: المنتجات الأكثر تسببًا في الإرجاع، شركات الشحن الأكثر شكاوى، ونقاط الالتباس عند العملاء.',
        ],
      },
    ],
  },
  'law-firm-knowledge-folders': {
    title: 'مكتب محاماة يملك سنوات من المعرفة المخفية داخل الملفات',
    excerpt:
      'كيف جعل نظام معرفة قانوني خاص البحث في الأعمال السابقة أكثر أمانًا ودقة، مع مصادر واضحة وصلاحيات حسب العميل والقضية.',
    category: 'أنظمة المعرفة',
    readTime: '٦ دقائق قراءة',
    sections: [
      {
        heading: 'مكتب محاماة يملك سنوات من المعرفة المخفية داخل الملفات',
        paragraphs: [
          'على مدار سنوات، بنى مكتب المحاماة معرفة ضخمة: عقود، آراء قانونية، ملخصات قضايا، ملاحظات بحث، وإرشادات داخلية.',
          'لكن الوصول إلى هذه المعرفة كان صعبًا. بعض الملفات في مجلدات مشتركة، وبعضها في رسائل قديمة، وبعض الوثائق موجودة فقط كنسخ ممسوحة.',
          'كان المحامون الكبار يتذكرون أن المكتب تعامل مع حالة مشابهة من قبل، لكن العثور على المادة المناسبة قد يستغرق ساعات. أما المحامون الأصغر سنًا، فكان جزء كبير من يومهم يضيع في البحث والمقارنة اليدوية.',
        ],
      },
      {
        heading: 'لماذا لم تكفِ أداة ذكاء اصطناعي عامة؟',
        paragraphs: [
          'كان الشركاء مهتمين بالذكاء الاصطناعي، لكن بحذر. الوثائق تحتوي معلومات حساسة، والوصول يجب أن يتبع العميل والقضية ودور الموظف.',
          'لم يكن مقبولًا نسخ مواد سرية في روبوت عام، ولم يكن الهدف أن يصدر النظام رأيًا قانونيًا نهائيًا.',
          'الهدف كان أبسط وأهم: جعل معرفة المكتب نفسه أسهل في الوصول والاستخدام، مع بقاء القرار القانوني عند المحامي.',
        ],
      },
      {
        heading: 'منصة معرفة قانونية خاصة',
        paragraphs: [
          'بنينا منصة خاصة تنظم مستندات المكتب وتجعلها قابلة للبحث بالمعنى، لا باسم الملف فقط.',
          'يمكن للمحامي أن يسأل عن بند مشابه استخدم سابقًا، فيبحث النظام داخل الوثائق المصرح بها ويعرض المقاطع المناسبة مع مصادرها الأصلية.',
          'وفي تحضير القضايا، يستطيع النظام قراءة مجموعة مستندات واستخراج التواريخ والأطراف والالتزامات والأحداث، ثم إعداد خط زمني أولي وإبراز المعلومات الناقصة أو المتعارضة.',
        ],
      },
      {
        heading: 'ربط العلاقات بين القضايا والوثائق',
        paragraphs: [
          'العمل القانوني يعتمد كثيرًا على العلاقات: عميل مرتبط بشركات، وعقود، والتزامات، ونزاعات.',
          'لذلك بنينا رسمًا معرفيًا يربط القضايا، والأطراف، والعقود، والتواريخ، والبنود، والمستندات.',
          'بهذا أصبح بالإمكان طرح أسئلة مركبة، مثل معرفة العقود النشطة لعميل معيّن التي تحتوي التزامات تجديد وتنتهي هذا العام.',
        ],
      },
      {
        heading: 'المسؤولية بقيت عند المحامي',
        paragraphs: [
          'صُممت المنصة كأداة بحث وتحضير، لا كمحامٍ بديل. يمكنها التلخيص والمقارنة والتنظيم، لكنها لا تصدر نصيحة قانونية نهائية.',
          'كل نتيجة تظهر معها المصادر، والوصول للمعلومات يعتمد على صلاحيات الموظف. محامٍ يعمل على عميل معيّن لا يستطيع بالخطأ البحث في ملفات عميل آخر.',
          'النتيجة أن خبرة المكتب لم تعد مدفونة داخل المجلدات. أصبحت معرفة حية يمكن إعادة استخدامها بأمان، حتى عندما يغادر موظف أو ينتقل فريق.',
        ],
      },
    ],
  },
  'marketing-team-brand-consistency': {
    title: 'فريق تسويق ينتج أكثر لكنه يفقد نبرة العلامة',
    excerpt:
      'كيف ساعدت وكلاء تسويق متخصصة على تنظيم الأفكار والمحتوى والموافقات والنشر دون أن تستبدل القرار الإبداعي.',
    category: 'عمليات التسويق',
    readTime: '٥ دقائق قراءة',
    sections: [
      {
        heading: 'فريق تسويق ينتج أكثر لكنه يفقد نبرة العلامة',
        paragraphs: [
          'كانت مجموعة تجزئة تدير عدة علامات في أكثر من بلد. لكل علامة شخصيتها: واحدة فاخرة وهادئة، وأخرى شابة وسريعة، وثالثة تعتمد كثيرًا على العروض والسعر.',
          'مع زيادة الحملات، أصبح الحفاظ على الاتساق أصعب. المصممون مضغوطون، والكتّاب يعيدون صياغة الفكرة نفسها لمنصات مختلفة، والمديرون يقضون ساعات في مراجعة النصوص والبنرات والرسائل الترويجية.',
          'استخدم الفريق أدوات ذكاء اصطناعي عامة، لكنها كانت تنتج نصوصًا سريعة لا تشبه العلامات. المحتوى صار أسرع، لكنه لم يصبح أفضل.',
        ],
      },
      {
        heading: 'دراسة العلامات قبل الأتمتة',
        paragraphs: [
          'بدأنا بجمع المواد التي تعرّف كل علامة: الإرشادات، الحملات السابقة، التصاميم المعتمدة، أمثلة النبرة، معلومات المنتجات، شرائح الجمهور، العبارات الممنوعة، وقواعد كل سوق.',
          'ثم تابعنا مسار الحملة من البداية للنهاية: brief، كتابة، تصميم، موافقة، جدولة، ثم تقرير.',
          'التأخير الأكبر لم يكن في كتابة النص نفسه، بل بين المراحل: ملاحظات موزعة، نسخ ملفات متعددة، وموافقات غير واضحة.',
        ],
      },
      {
        heading: 'نظام عمليات تسويق متعدد الوكلاء',
        paragraphs: [
          'بنينا نظامًا يحتوي عدة وكلاء متخصصين.',
          'وكيل التخطيط يحول الهدف التسويقي إلى خطة حملة منظمة. وكيل الكتابة ينتج نصوصًا بنبرة كل علامة ولكل منصة. ووكيل الإبداع يجهز اتجاهات بصرية اعتمادًا على القوالب والأصول المعتمدة.',
          'وكيل الموافقات يرسل كل عنصر للمدير المناسب ويتابع الملاحظات، وبعد الموافقة يتولى وكيل النشر الجدولة وجمع بيانات الأداء.',
          'كل علامة كان لها مساحة معرفة خاصة، حتى لا تختلط نبرة أو أمثلة أو قواعد علامة بأخرى.',
        ],
      },
      {
        heading: 'الإبداع بقي بشريًا',
        paragraphs: [
          'لم يكن الهدف استبدال الفريق الإبداعي. المصممون ما زالوا يضبطون الجودة البصرية، والمسوقون يقررون اتجاه الحملة، والمديرون يوافقون على المحتوى المهم.',
          'النظام أخذ الجزء المتكرر حول العملية: تنظيم brief، إعداد المسودات الأولى، متابعة الملاحظات، ونقل العمل المعتمد بين الأدوات.',
        ],
      },
      {
        heading: 'ما الذي تغيّر؟',
        paragraphs: [
          'أصبح الفريق ينتج أسرع، لكن الأهم أن العمل أصبح أكثر تنظيمًا.',
          'المصممون يستلمون brief أوضح، والكتّاب يقضون وقتًا أقل في تكرار الرسائل، والمديرون يرون ما ينتظر الموافقة بالضبط.',
          'لم يصبح الذكاء الاصطناعي مديرًا إبداعيًا. أصبح طبقة تشغيل تساعد الفريق الإبداعي على العمل دون أن يضيع في التنسيق المتكرر.',
        ],
      },
    ],
  },
  'logistics-team-manual-shipments': {
    title: 'فريق لوجستي يراقب كل شحنة يدويًا',
    excerpt:
      'كيف ساعد وكيل مراقبة العمليات على إظهار الشحنات التي تحتاج تدخلًا فقط، وربط المشكلات المتكررة برؤية تشغيلية أوضح.',
    category: 'العمليات اللوجستية',
    readTime: '٥ دقائق قراءة',
    sections: [
      {
        heading: 'فريق لوجستي يراقب كل شحنة يدويًا',
        paragraphs: [
          'كانت شركة لوجستية تدير مئات الشحنات بين مستودعات، وناقلين، وسائقين، ومواقع عملاء.',
          'معظم الشحنات تصل دون مشكلة، لكن فريق العمليات كان يراقبها كلها. فتح مواقع الناقلين، مراجعة الجداول، قراءة البريد، وتحديث العملاء.',
          'هم لم يكونوا يبحثون عن الشحنات الطبيعية، بل عن القليل الذي خرج عن المسار: تأخير، مستند ناقص، مشكلة جمركية، عنوان خاطئ، أو شحنة متضررة.',
          'المشكلة أن المعلومات موزعة على أكثر من نظام. وبحلول الوقت الذي يفهم فيه الموظف ما حدث، يكون العميل غالبًا قد بدأ يسأل عن التحديث.',
        ],
      },
      {
        heading: 'ما الوظيفة الحقيقية للفريق؟',
        paragraphs: [
          'في مرحلة الاكتشاف، طلبنا من فريق العمليات شرح ما يفعلونه كل صباح.',
          'يفتحون نظام النقل، ويفحصون منصات الناقلين، ويراجعون تحديثات المستودعات، ويقارنون أوقات التسليم.',
          'قال أحد المديرين جملة اختصرت المشروع كله: لا أحتاج أن أرى كل شحنة، أحتاج أن أعرف أي شحنة تحتاجني.',
          'لم يكن النظام المطلوب بديلًا لمنصة اللوجستيات، بل طبقة تراقب العملية وتظهر الاستثناءات.',
        ],
      },
      {
        heading: 'وكيل مراقبة للعمليات',
        paragraphs: [
          'ربطنا الوكيل بنظام الشحنات، والمستودعات، وواجهات شركات النقل، ومخزن المستندات، وقنوات التواصل مع العملاء.',
          'يراقب النظام أحداث الشحن باستمرار. عندما يسير كل شيء كما هو متوقع، لا يزعج الفريق.',
          'وعندما تتوقف شحنة، أو تتجاوز موعدًا، أو ينقصها مستند، ينشئ حالة استثناء. يجمع المعلومات المتاحة، يصنف المشكلة، يراجع الإجراء المعتمد، يعيّنها للفريق المناسب، ويجهز تحديثًا للعميل.',
        ],
      },
      {
        heading: 'تحويل الأحداث إلى رؤية تشغيلية',
        paragraphs: [
          'بنينا أيضًا رسمًا معرفيًا يربط الشحنات، والعملاء، والمستودعات، والناقلين، والمسارات، والحوادث، واتفاقيات الخدمة.',
          'هذا ساعد الإدارة على رؤية أنماط لم تكن واضحة: أي ناقل يتسبب بأكبر عدد من التأخيرات على مسارات العملاء المهمين؟ وأي مستودع لديه أكبر عدد من المستندات الناقصة؟',
        ],
      },
      {
        heading: 'ما الذي تغيّر؟',
        paragraphs: [
          'توقف الفريق عن فحص كل شحنة يدويًا. أصبحت اللوحة تعرض الحالات التي تحتاج تدخلًا فقط.',
          'يرى الموظف ماذا حدث، وما الأنظمة التي فُحصت، ومن المسؤول، وما الإجراء المقترح.',
          'وصلت التحديثات للعملاء أبكر، وحصل المديرون على رؤية أوضح للمشكلات المتكررة. لم تجعل الأتمتة اللوجستيات بسيطة، لكنها جعلت التعقيد مرئيًا وقابلًا للإدارة.',
        ],
      },
    ],
  },
  'social-media-agent-that-learned-the-client': {
    title: 'أتمت: ذكاء إصطناعي للجرافيك ديزاين',
    excerpt:
      'قصة وكيل تصميم لم يعد ينتج صورًا عامة، بل صار يصنع تصاميم منشورات تشبه اللغة البصرية للعميل وطريقة موافقاته.',
    category: 'وكلاء التصميم',
    readTime: '٤ دقائق قراءة',
    sections: [
      {
        heading: 'أتمت: ذكاء إصطناعي للجرافيك ديزاين',
        paragraphs: [
          'لم يأتِ العميل إلينا لأنه يريد أفكار محتوى أكثر.',
          'كانت الأفكار موجودة: عروض، صور منتجات، حملات موسمية، وجدول نشر ممتلئ. المشكلة كانت تبدأ بعد الموافقة على الفكرة، عندما يجب تحويلها إلى تصميم منشور فعلي.',
          'بعض التصاميم كانت تخرج من قوالب جاهزة، وبعضها من مستقلين، وبعضها من أدوات توليد صور بالذكاء الاصطناعي. ومع ذلك كان التعليق نفسه يعود كثيرًا: “قريب، لكن ليس نحن”.',
          'التصميم مرتب، والألوان مقبولة، والصورة تبدو نظيفة. لكنه لا يشبه العلامة. المنتج صغير أكثر من اللازم، الخلفية صاخبة، الخط لا يحمل شخصية الشركة، والمسافات تجعل المنشور يبدو كقالب عام وُضع عليه الشعار في النهاية.',
        ],
      },
      {
        heading: 'المشكلة لم تكن في جودة الصورة، بل في الذوق البصري',
        paragraphs: [
          'في البداية حاول الفريق حل الموضوع ببرومبت أفضل.',
          'كتبوا الألوان، ورفعوا مراجع، وطلبوا تصميمًا “فاخرًا لكن قريبًا”، “حديثًا لكن غير بارد”، “جريئًا لكن غير مزدحم”. كانت الأدوات تنتج صورًا جميلة، لكن الجمال لم يكن المشكلة.',
          'للعميل حس بصري محدد جدًا. ظل معين يبدو رخيصًا. زاوية منتج معينة تضعف العرض. بعض المنشورات تحتاج مساحة بيضاء كثيرة، وبعض العروض تحتاج معالجة أكثر كثافة. خلفية تصلح لحملة قد تفشل تمامًا مع حملة أخرى.',
          'لذلك لم نبنِ مولّد صور عشوائيًا. بنينا وكيل تصميم سوشال ميديا حول الذاكرة البصرية الحقيقية للعميل.',
        ],
      },
      {
        heading: 'تعليم الوكيل معنى “على هوية العلامة”',
        paragraphs: [
          'جمعنا المنشورات المعتمدة، والتصاميم المرفوضة، وصور المنتجات، ولوحات الحملات، وقواعد استخدام الشعار، والخطوط، والألوان، وحتى تعليقات العميل القديمة.',
          'التصاميم المرفوضة كانت مهمة بقدر التصاميم المعتمدة. لأنها تكشف ماذا يقصد العميل عندما يقول: “مزدحم”، “عام”، “المنتج غير واضح”، أو “يشبه أي علامة أخرى”.',
          'تعلّم الوكيل كيف تستخدم العلامة المساحة، متى يجب أن يكون المنتج بطل الصورة، أي تركيب يبدو أرقى، أين يوضع النص، كم تباينًا نسمح به، وأي خلفية مولدة تخدم الرسالة بدل أن تخطف الانتباه.',
          'وتعلّم أيضًا التفاصيل العملية التي تهم المصممين: مقاسات المنصات، مناطق الأمان، توزيع النص العربي والإنجليزي، نسخ الحملة، مقاسات التصدير، وما الذي يحتاج موافقة قبل النشر.',
        ],
      },
      {
        heading: 'من طلب بسيط إلى تصميم جاهز للمراجعة',
        paragraphs: [
          'الوكيل لم يبدأ من لوحة فارغة. كان يبدأ من طلب الحملة ويفهم أي نوع من التصميم مطلوب.',
          'في إطلاق منتج، يمكنه تجهيز أكثر من اتجاه بصري: تصميم يركز على المنتج، مشهد مولّد بأسلوب حياتي، مقارنة قبل وبعد، أو سلسلة ستوري. وفي العروض، يجهز معالجة ترويجية أقوى بهرمية واضحة ومساحة مناسبة للسعر.',
          'كان يولد اتجاه الصورة، يرتب التصميم، يضع المنتج ومناطق النص، يكيّف الفكرة للمقاس المربع والستوري، ويجهز نسخًا مختلفة للمراجعة.',
          'والعميل يستطيع التعليق ببساطة: “اهدأ”، “خلّي المنتج أوضح”، “استخدم روح حملة العيد”، “أقل قالبية”، أو “هذا للخط الفاخر”. يفهم الوكيل هذه الملاحظات لأنها مرتبطة بأمثلة بصرية حقيقية، لا بكلمات عامة.',
        ],
      },
      {
        heading: 'ما الذي تغيّر؟',
        paragraphs: [
          'فريق التصميم لم يتوقف عن التصميم. لكنه توقف عن مصارعة المسودة الأولى في كل مرة.',
          'بدل توليد صور عشوائية ومحاولة إجبارها على هوية العلامة، أصبح الفريق يعمل مع وكيل يعرف تخطيطات العميل، وطريقة عرض المنتج، وحدود الهوية، وطريقة الموافقات.',
          'النسخ الأولى أصبحت أقرب لما يريده العميل. المصممون يراجعون اتجاهات أقوى، والمديرون يرون خيارات أوضح، والعميل لا يضطر لشرح الملاحظات البصرية نفسها في كل حملة.',
          'الوكيل لم يستبدل الذوق التصميمي. حمل ذوق العميل البصري داخل سير العمل، حتى يبدأ كل منشور جديد من مكان يشبه العلامة من البداية.',
        ],
      },
    ],
  },
}

export function getLocalizedArticle(article: Article, language: 'en' | 'ar') {
  if (language === 'en') {
    return article
  }

  const arabicArticle = arabicArticlesBySlug[article.slug]

  if (!arabicArticle) {
    return article
  }

  return {
    ...article,
    ...arabicArticle,
  }
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}
