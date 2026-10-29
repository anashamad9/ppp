# Why I Built Atmet Brain, and How Its Core Learns from Company Work

How can company files, team corrections, and task outcomes become a reference that helps with the next task?

What bothers me about using AI for work is the effort that can disappear between tasks. I explain how to prepare an offer, correct a product detail, and clarify why the price needs approval before it goes out. Then I start a new task, or switch tools, and have to make sure those details reach it again.

I built Atmet Brain because I want that effort to remain useful. I want the next task to find the company’s current information, the methods the team has approved, and the corrections worth reusing. I also want to know where each came from and be able to change it as the company changes.

The core manages that reference: what enters it, what is extracted, what is approved, and what reaches each task. The connected tool uses the model and performs the work. Separating the two lets me develop the company reference and use it across tools, rather than tie it to one conversation.

## What do I put in the core?

I start with a knowledge base: the company sources, information, and instructions that AI refers to while working. These are different kinds of records. A price list is a source, a delivery period is information extracted from a source, and requiring approval before sending an offer is an operating instruction. I need to preserve their relationships while keeping those differences clear.

There are also methods worth reusing. How should supplier offers be compared? What checks come before delivering a report? I call a saved method for a task a skill: instructions, steps, and checks that can guide similar work after review and approval.

Suppose the task is preparing a customer offer. It needs the current price, the offer terms, a preparation method, and the restrictions that apply to the person making the request. Bringing those pieces together is the core’s job. I want the model to start with information suited to the work in front of it, rather than depend on what I remember to send each time.

[chart:brain-01-core-reference]

## How does it learn from company files?

The process starts with a source I add, or one received through a connection configured to deliver updates. The core retains its identity and revision, then applies classification and access checks. A document that needs authorization stays restricted until its use is permitted. Uploading a file does not make it available to everyone.

Processing then extracts specific statements and links them to supporting text. In the current local extractor, explicit facts from an authoritative source can become active through a defined format. The following is a fictional example, not an actual statement about Atmet:

```text:source_fact.txt
Fact[support.hours]: Support is available from 09:00 to 17:00.
```

The format gives the information a stable key, such as support hours, while preserving its source. Ordinary text can produce observations, and an optional model adapter can suggest broader candidates. Even with a model involved, the core checks its evidence. Model confidence does not establish company approval.

The outcome depends on the type of information extracted. A fact that satisfies the source rules can become usable. An inference or proposed change to operating instructions needs review. If permitted sources contain conflicting values for the same fact key, the conflict is recorded for resolution rather than hidden behind a confident answer.

This is what I mean by learning here: adding evidence-linked information and determining its state. “We may extend support hours” remains a proposal, while approved support hours serve a different purpose. This process does not require retraining the model’s weights.

[chart:brain-02-source-memory]

## What happens when information changes?

Continuing the example, the company changes its support hours and the source update reaches the core. It saves a new revision and invalidates extracted information from the earlier revision until it is processed again. After processing and any required review, a new task can use the current information.

Getting an answer right once does not make it right forever. I need a lasting link between information and its source. If the team needs to explain a reply sent before the change, it can inspect retained revisions under the relevant access and retention rules.

Internally, each extraction job is tied to the source revision it started with. The core checks that revision and access again before saving results, so a late extraction cannot reintroduce information from a document that changed while it was being processed.

The update still has to arrive. If a connection syncs periodically, the core cannot know about the change before a successful sync. A stored observation about a payment or stock level also cannot replace an authorized live read from the relevant system when the task needs current state.

## How does it learn from completed work?

Documents describe part of a company. Another part appears during tasks: a step the model missed, a check an employee added, or a method that proved more suitable for the situation. I wanted that to be useful too, with a clear account of what was done.

The core therefore supports task reports. Once reporting is connected to the tool or host runtime, it can receive a bounded report containing the result, steps, corrections, checks, and original sources used. Reports are operational history, private by default, with their own access requirements. They do not automatically enter ordinary company-document search.

Suppose a tool compares two suppliers and an employee corrects the comparison to include maintenance costs alongside the purchase price. The report can record the steps performed and the correction. If it meets the requirements, the core attempts to prepare a skill draft from those details.

The current implementation compiles reported steps, corrections, and checks in a defined way, without calling a model to invent a new method. The quality and evidence of the report therefore matter. A reported successful outcome is still the tool’s account; it does not independently prove that the comparison is correct.

The draft waits for someone with publication authority to inspect it. Is maintenance cost relevant to this type of comparison? Has the method missed an important condition? Which information may its future users access? Approval applies to the specific revision reviewed, and does not automatically extend to later edits.

A useful correction can then reach other tasks, after deciding what is worth repeating. Shortening a report because one meeting is brief differs from correcting a calculation that belongs in every report of that type.

[chart:brain-03-task-learning]

## Where does this help with the next task?

It helps when a tool requests context for new work. The core gathers applicable approved instructions and relevant workflows or skills, then retrieves evidence the requester may use. Instructions return separately from reference material, with the necessary warnings.

For a supplier comparison, that context can include the approved skill requiring maintenance costs, alongside the current supplier offers. The tool starts from a method the team has reviewed and applies it to the new task’s data. Any situation-specific adjustment still needs to be made and reviewed.

What I want is for a lesson from previous work to reach the next task that needs it. An agreed term, a reviewed checklist, or the reason for choosing a method can be retained in the appropriate reference and retrieved within the task’s permissions. Its arrival should not depend on the memory of whoever writes the request.

A skill still needs valid supporting information. If a source it depends on changes or is no longer permitted, the core rechecks that relationship. An approved method does not retain permanent access to everything available on the day it was approved.

## Why keep the core separate from the chat tool?

What a company learns about its work should remain usable when its tools change. The core is written in Python, stores its records in SQLite, and can be reached from the terminal, a Python program, REST, or MCP. These are entry points to the same core rather than separate copies of company memory.

I can configure one tool for writing and another for different tasks, connecting each to what it is allowed to use. An article-writing tool does not need payroll records. Summaries and extracted information remain constrained by access to their supporting sources too.

Execution boundaries stay clear. The core prepares context and manages references and updates. The connected tool uses its model and tools to perform the task. Receiving customer information does not authorize sending that customer an email, just as proposing a skill does not authorize publishing it.

That separation gives me a place to inspect what AI uses about the company, rather than spread instructions and information across conversations whose current authority is hard to establish.

## What do I want to improve through use?

I want the company reference to become more accurate and easier to use as useful sources and corrections arrive. It can begin with one document and the instructions for one task, then grow with the information and methods the team reviews. Relevance to the work and the ability to update it matter more to me than storage volume.

The core is still alpha. Learning depends on supported sources and connections that have actually been configured. It does not watch every conversation or infer every company process on its own. Search is currently lexical, and can need improvement when the question and source use different wording. Those are the boundaries I work from as I develop what comes next.

I built Atmet Brain so that explanation and correction can have a lasting effect. Support hours change, and the work can refer to the new hours. A comparison method is reviewed and becomes available to those who need it. An employee’s permissions change, and the information they receive changes too.

When I request the next task, I can then focus on what is different about it. I want the connected tool to find what the company has already learned and reviewed where the work needs it, while keeping the result in front of me to review.

Code and documentation: [GitHub](https://github.com/Atmet-AI/Atmet-brain) · [Memory and learning](https://github.com/Atmet-AI/Atmet-brain/blob/main/docs/memory-and-learning.md)
