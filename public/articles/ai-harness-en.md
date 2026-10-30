# You Don’t Need More Tools. You Need an AI Harness.

How does a model become part of work that can be executed, checked, and resumed? An explanation of AI harness architecture, its limits, and how to test its value.

Imagine a task that repeats every week: read data from two sources, normalize the fields, check for errors, and prepare a result the team can rely on. A capable model can write a script for it. Given suitable tools, it may also be able to run that script. But what happens next week when a field changes, access is revoked, or a calculation rule turns out to be incomplete?

A model call alone does not solve that problem. The system needs to know what changed, which instructions remain approved, where work stopped, and how to establish that the result is correct. A human correction should reach the next task without turning every passing comment into a permanent rule.

That is why the idea of an AI harness deserves attention. In this article, it means the operating environment around the model: software that prepares context, controls tool use, preserves task state, and checks results. It organizes work around AI and can be implemented within an existing system or a separate application.

The title points to a recurring need, not a claim that every team needs new infrastructure. Tools and business systems remain necessary. The more useful question is whether work needs another tool to execute one more step, or a way to organize what happens between steps and what survives them.

## What does an AI harness add to the model?

A language model works with the information and instructions in its current context. That alone does not tell it the state of company systems, the user's permissions, or what happened in an earlier run. The application has to supply those inputs, execute tool calls, and handle the results.

A harness organizes those responsibilities into a clear process. It retains the task's goal and state, selects relevant context, exposes permitted tools, applies stopping and review conditions, and saves what is needed to resume. The model proposes and analyzes; surrounding software carries out execution.

Six parts offer a useful way to describe the architecture: model, context, tools, persistent task state, permissions, and checks. This is a practical division of responsibilities, not a standard every product must follow. It helps locate the cause when work succeeds or fails.

An Anthropic engineering experiment on long-running work illustrates the continuity problem. Successive sessions needed progress records and artifacts they could continue from; conversation compaction alone was insufficient. That is evidence from a particular experiment, not proof that one harness fits every business. [Source: Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents).

[chart:harness-harness-boundary]

## Tools, workflows, and harnesses have different responsibilities

A tool performs a specific action: reading a file, querying a database, or running a check. It might be a short Python function. A workflow connects steps in a defined order with conditions, such as fetching data, checking it, and producing a report.

A harness manages what the model needs during that work. What information can it see? How does it choose the next step? When may it invoke a tool? How does it resume after an interruption? A harness can combine fixed workflow stages with model decisions where interpretation or investigation is needed.

A simple workflow may be the better choice for a stable, well-defined process. Context, state, and decision management become more important when work involves unexpected cases, different sources, or multiple sessions. More autonomy can also increase cost and latency. Anthropic discusses those tradeoffs in its guidance on building agentic systems. [Source: Building effective agents](https://www.anthropic.com/research/building-effective-agents).

## How does a task move through a harness?

Start with a goal that can be checked. "Analyze the data" leaves completion open to interpretation. "Check this file against the specified data contract, report violations with record numbers, and do not modify the source" defines inputs, output, and boundaries. A data contract describes the agreed structure, meaning, and conditions of the data.

Next, establish the user and workspace, then prepare context from permitted sources and their current revisions. Approved instructions must remain separate from material used as evidence. A command in an imported file does not gain authority to override instructions or expand permissions.

The model proposes a step, and the application checks whether it may execute. If authorized, the application calls the tool, saves its result, and returns the relevant information to the model. The cycle continues until the completion condition is met, review is needed, or a time or cost limit is reached. A persuasive final answer is not enough to establish completion.

Save state at explicit points: what was read, what changed, which check passed, and what awaits a decision. If a connection drops after a change request, recovery needs to determine whether the change occurred. Where the external system supports them, idempotency keys help avoid repeating the same effect when a request is retried.

[chart:harness-context-path]

## A testable example: a data quality layer

Suppose a team combines operational data from an API and a periodic file. Field names differ, records may be duplicated, and values may be missing. The goal is data suitable for a particular analysis, plus a report of what could not be accepted.

Divide the work among a rule reference, code that checks it, and a model that explains the findings. A data contract defines fields and constraints. Mapping normalizes names and values under known rules. Python runs numerical and logical checks, while the model explains violations or suggests questions for investigation.

The example below checks only two fields. It verifies that a record has an identifier, that the identifier is not duplicated, and that the amount is numeric. It is not enough to approve real data, but it shows the difference between an executable rule and a verbal opinion about file quality.

```python:quality_checks.py
def check_rows(rows):
    issues, seen = [], set()
    for index, row in enumerate(rows):
        record_id = row.get("id")
        if record_id is None:
            issues.append((index, "missing_id"))
        elif record_id in seen:
            issues.append((index, "duplicate_id"))
        else:
            seen.add(record_id)
        if type(row.get("amount")) not in (int, float):
            issues.append((index, "invalid_amount"))
    return issues
```

The code assumes identifiers can be added to a set. It does not check currencies, value ranges, non-finite numbers, or relationships between records. Those conditions must be specified for the task and implemented as explicit checks. That is more precise than asking the model to "make sure everything is correct."

If a value is missing, the harness records the violation, its source, and what was done about it. The model may suggest an explanation or correction, but applying that correction requires the appropriate rules and permissions. Writing a data contract does not automatically implement or test its checks.

## Memory: what should be stored, and in what capacity?

Saving an entire conversation does not establish what work can rely on. A transcript may contain a guess, an old fact, an approved instruction, and a failed experiment. Retrieving all of them with the same authority can make the system repeat an error more confidently.

It helps to separate four kinds of record. A source is the original document or content. Extracted information has evidence and a revision. An approved method sets out steps and conditions that can be reused. Execution history describes what happened in a particular task, including failures and corrections.

Memory becomes useful when it can answer practical questions: where did this information come from? When was its source updated? Who may read it? Is it a source-backed fact or an inference? Has it expired? Choosing a database or search method does not replace these relationships.

When the original changes, its relationship to derived material needs to remain visible. An old result should not remain usable merely because it resembles the user's question. Good retrieval combines relevance with valid evidence and access authorization.

## Continuous learning has two paths. Neither requires retraining.

The first path updates what the system knows about work. A source revision arrives, is stored, and is linked to processing work. Information dependent on the earlier revision is reconsidered, and suitable information is extracted from the new one. Revision and permission checks are also needed before saving a result, because both can change during processing.

The second path improves the method. The system performs a task and records steps, checks, and corrections. If the report reveals a useful method, it can produce a skill: reusable instructions with defined conditions. The draft is reviewed and approved by an authorized publisher before becoming a reference for later tasks.

A mapping correction can then reach future tasks, while an exception for a single file remains attached to that file. Repetition alone should not create a rule. A repeated problem may come from the same defective source or a temporary workaround.

This is learning in the system's state, references, and methods. It does not necessarily require fine-tuning model weights. Its success depends on arriving updates, evidence quality, review, and testing the new method's effect. More stored records do not by themselves demonstrate improved performance.

[chart:harness-learning-loop]

## A shared core with different permissions for each user

An entire team can use the same core without everyone seeing the same data. The system identifies the requester, department or workspace, and role, then authorizes the relevant resources and operations. Engineering might be allowed to read a service runbook while other files remain restricted to another department.

Checking access only when the original document is opened is insufficient. Restrictions must also apply to search results, summaries, derived memory, reports, and content sent to the model. Rephrasing restricted information does not make it public.

Reading, execution, and publishing are separate authorities. A user can contribute an observation without approving it as a rule. A tool can read a system without being allowed to update it. Actions with consequences need authorization enforced in software. A "do not" instruction in a prompt is no substitute.

Those boundaries apply to the whole connection. If an application has a separate, broadly privileged path to files or services, the core's restrictions do not protect that path. Tool and external-system permissions need to be controlled too.

## Direct integration: API, MCP, and Python

Connecting a harness to business systems does not necessarily require an intermediary automation platform. If a system offers a suitable API, a Python adapter can read permitted data and convert it into a clear format. MCP can provide a common interface for tools and resources to applications that support it.

A common interface does not create an integration by itself. The connection still needs authentication, permissions, rate limits, error handling, and a way to follow updates and deletions. It must also distinguish ingesting sources into memory from executing actions in the external system. Each has its own conditions.

Tool design affects model behavior. Clear names, defined inputs, and concise useful results help the model select a call and understand its outcome. Anthropic's tool-design guidance emphasizes testing tools on real tasks and improving their responses to reduce unhelpful context. [Source: Writing effective tools for agents](https://www.anthropic.com/research/writing-tools-for-agents).

## Local or cloud? Separate memory storage from processing.

A harness can be designed to connect to a local or cloud model while retaining working rules and memory in an independent component. But swapping a model is not just changing a name if its capabilities, tool-call behavior, or context limits differ. Required functions must be tested with each model.

Local operation alone does not prove that data stays on the device. A tool might contact an external service, part of the context might be sent to a cloud model, or content extraction might use external processing. Trace the actual data path: where it is stored, where it is processed, what is sent, and to whom.

This separation supports policies for particular sources or tasks. Restricted material can remain within a specified environment, while other processing may use an external service where policy permits. Interfaces must reflect and enforce that policy. A "local" option on a screen is not evidence that the whole path is local.

## Atmet Brain illustrates one part of the architecture

Atmet Brain provides a concrete example of this separation. Its Python core uses SQLite to manage sources, memory, working methods, revisions, and access permissions. CLI, Python, REST, and MCP interfaces reach the same core logic. The connected application remains responsible for using the model and executing tools.

In the following interface, the application requests context for a specific task under an identity and workspace. The call exists in the core. The variables represent objects the application has already initialized. This is a request for context, not a command to run a check or modify an external system.

```python:request_context.py
context = brain.get_context(
    actor=actor,
    space_id=workspace_id,
    query="Prepare data quality checks for this source",
    task_path="engineering/data_pipeline",
    max_chars=12000,
)
```

The result separates approved instructions from reference evidence and identifies the resources used. Here, max_chars measures characters, not the provider's token count. If required instructions cannot be supplied within the constraints, the core returns incomplete_context instead of silently dropping them.

The core also links source updates to processing and provides a task-report path that may produce a skill draft from explicit steps under its eligibility rules. Review and publication remain separate. This implements the memory and reference part of a harness. A complete harness also needs controlled execution, actual integrations, and result checks. [Code and documentation: Atmet Brain](https://github.com/Atmet-AI/Atmet-brain).

## Where might time and token savings come from?

Savings may come from sending what a task needs instead of repeating long files, reusing a checked method, and leaving stable calculations in code. Persistent state and references can also reduce the work of collecting information again.

Memory, retrieval, and checks have costs of their own. Reviewing a new method may take longer than writing a one-off script. A single request's token count or a successful demonstration cannot establish overall savings.

A more useful measure is cost per accepted result: model usage, tool runtime, setup and review effort, failed attempts, and rework. Tokens can fall while this cost rises. More calls can also be justified if completion improves enough. The decision needs measurements on the tasks the system will actually handle.

## Test the idea instead of stopping at the diagram

Choose tasks representing ordinary work and difficult cases. Keep some cases out of instruction tuning, and define acceptable results in advance: violations to detect, values to produce, and actions that must not occur. Data tasks can be compared with reference outputs and independent checks.

Compare the current method with a harness-based method on the same inputs. Record the model, version, settings, and available tools. Isolate or reset memory according to the experimental design. Repeat runs when outcomes vary, and track quality, time, cost, and human intervention.

Test continuity too. Stop work after a known step and resume. Update a source during processing. Revoke a user's access. Resend a request that already executed. These cases reveal whether the system preserves useful state or starts guessing, repeats effects, or relies on an invalid reference.

To evaluate learning, introduce a correction after the first round, review it through the specified path, then test new tasks to which it applies. Handling of the intended case should improve without generalizing an exception to unrelated cases. This is a proposed evaluation protocol, not measured results for Atmet or any other product.

[chart:harness-evaluation-plan]

## When is a script enough, and when is a harness useful?

If inputs are stable, steps are known, and results can be checked directly, a good script with scheduling and error logs may be enough. A one-off question about a document might need only bounded retrieval and a single model call. Language-model decisions and permanent memory do not automatically improve a process.

A harness becomes more relevant when work repeats across sessions, sources change, tools have different permissions, and decisions must be traceable and resumable. Start with one task: a clear reference, a few tools, persistent state, independent checks, and a boundary for human review.

The development question then becomes specific: does the next task start with valid information and traceable steps, and reach an acceptable result with less effort? Demonstrating that would establish a useful capability. Without it, adding more tools and memory will not supply the missing evidence.
