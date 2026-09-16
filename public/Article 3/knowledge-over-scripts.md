---
coverImage: /Article%203/article%204.png
ogImage: /Article%203/article%204.png
coverAlt: Transforming raw data into structured, reusable knowledge
---

# I No Longer Use What I Built a Year Ago. I Replaced It with Knowledge Bases

## When AI Became Part of My Working Environment

Recently, I have come to rely heavily on AI models that run locally on my computer. At first, the reason was obvious: they gave me more freedom to work with data, easier access to files, and greater control over permissions and restrictions. Instead of uploading a file to ChatGPT, explaining what it contains, uploading a second file it needs, and specifying where I want the result, I can give a model access to a particular folder on my computer. It can read the files inside it, run Python, create new files, and even interact with external applications that I authorize.

Over time, however, I realized that privacy was not the most important part for me. What mattered more was that AI now existed inside the same environment where I worked. It could see the files I was using, access my tools, and run code directly on my computer. **That is fundamentally different from having a chatbot to which you upload a file and ask a question.**

One problem remained: every time you want to complete a real task, you have to explain it from the beginning. Whether you use ChatGPT, Claude, or something else, there is always a limit to what the model knows about you and your way of working. It does not know why you use a particular template, why one client is handled differently, why a certain number must be modified before use, or why you sometimes take a value directly from a file and at other times join it with another dataset to create a mapping. You can put all of that into a prompt, of course, but what happens when the task involves dozens or hundreds of rules? What if those rules keep changing?

## The System I Built in 2025

One of the tasks I perform almost every day at work is processing a huge volume of data from more than 70 different sources. Every source delivers its data differently. One may send an Excel file with a particular set of column names, while another uses completely different names for the same information. One source uses Saudi riyals, another uses Jordanian dinars. Some sources require mappings to other datasets, while others contain numbers whose structure must be changed before they can be used.

The system I built to handle all of this can be summarized as a dedicated Python script for almost every source. Each script takes the data in its original form and transforms it into a standard template that can be used later. Inside those scripts, however, are many conditions: if the value has this format, do one thing; if the currency is different, apply a particular conversion; if an ID is missing, look for it in another dataset; if a number follows a particular structure, rebuild it; and if a certain case is present, apply an additional rule before exporting the file.

I built this project in the middle of 2025, and at the time the solution made perfect sense. Instead of repeating the same processing manually every day, I wrote the rules once in Python and turned a time-consuming process into an almost automatic one. When a new source was added, I built a new script. When a rule changed, I edited the script. When a new exception appeared, I added another condition.

The project saved me an enormous amount of time, but eventually a second problem appeared. The number of sources kept growing, and the rules themselves changed from time to time. The knowledge of how to process the data therefore lived inside the code. To understand why a certain value was being handled in a particular way, I might have to open a script and search through a collection of conditions until I found the reason. If a rule shared by twenty sources changed, I had to make sure the update reached every correct location.

**The problem was no longer executing the rules. It was that the business knowledge itself had become buried inside the code.**

## Why the Solution Changed

About a year ago, I did not consider this a serious problem because the alternative was worse. Using ChatGPT to process this data was not an option because of its sensitivity. The models available at the time also were not capable enough for me to feel comfortable replacing a complete system I had written myself. Today, in the second half of 2026, the situation is very different. Open-source models that can run locally have become far stronger, hardware can run better models, and, most importantly for me, the way we use LLMs has changed.

I no longer have to use a model only as a conversation. I can give it tools and allow it to read files, run Python, create a temporary script, test the result, read an error when one occurs, modify the code, and run it again. That led me to ask: **if AI can write the Python I need each time, why am I still manually maintaining dozens of scripts?**

Of course, the problem is not that simple. I can give the model a file and say, “Convert this into the template I use.” But how will the model know the rules? How will it know that this source needs to be mapped to another file? How will it know that this group of sources uses the same calculation for a particular value, or that a rule changed last week?

I could write one enormous prompt containing all that information, but then I would not have solved the problem. **I would only have replaced a huge Python script with a huge prompt.**

## Knowledge as a Tree

I began to look at the problem from a different angle. It is true that I have more than 70 data sources, but that does not mean I have 70 completely different ways of processing data. Some things are common to every source. Other things are shared by a large group. Some rules apply to only five or six sources, and, at the end, there are small exceptions specific to a single source.

For example, every source must end in the same template. General validation rules apply to all of them, as do standard methods for logging errors and handling missing data. A group of sources may use the same currency. Another group may require the same kind of mapping. A third group may come from the same type of system and therefore have a similar structure. The farther down we go, the more specialized the rules become, until we reach one source with an exception of its own.

I started to see that I did not need 70 separate minds. **I needed one mind that knew what they shared, with smaller minds beneath it that knew the differences.**

At the same time, I was developing a private AI interface that I use on my computer. Inside it, I can run local models or use models such as ChatGPT and Claude when data sensitivity is not a concern. I can move between them depending on the task. The model itself is not the project. It is just one interchangeable component. Around it are tools that can access files, execute code, read selected folders, and connect to external applications according to the permissions I grant.

The project also contains what I call knowledge bases: information the model can consult when it needs it, instead of placing everything in the prompt or relying on conversational memory. If I change the model, I do not lose the knowledge. If I begin a new conversation, I do not need to explain the system from the start. **The knowledge has become part of the system itself, not part of the model's memory.**

Knowledge bases have many possible uses, particularly for companies and large teams, and I will discuss them separately in another article. For my data-processing problem, though, the idea began to take a slightly different shape.

Imagine a main conversation that knows the rules applying to every data source. It knows the final output format, the validation rules, where the files live, what to do when data is missing, and that raw data must never be modified directly.

Beneath this conversation are what I call sub-agents. To simplify the idea, you can think of them as smaller conversations. Each one knows an additional set of rules while also being able to read the rules above it. There could be a conversation for all sources that use Saudi riyals. Beneath it could be another conversation for a smaller group that requires a particular mapping. At the bottom could be a conversation for a single source containing only the details that distinguish it from the others.

You can picture this as a pyramid or a tree. General knowledge sits at the top, and the knowledge becomes more specialized as you move downward. **Most importantly, I do not need to repeat the same rule everywhere.**

If a rule applies to every source, I write it once at the top. If 18 sources handle currency in the same way, I put that rule at the level that groups them together. If only three of those sources need an additional mapping, I place it at the level shared by those three. If only one source has an exception in a particular column, I put that exception at the final level.

When a file reaches the agent for that source, the agent knows not only its own small exception, but also the mapping in the level above, the currency rules above that, and the general data-processing rules at the root of the tree.

**At that point, this became more than a way to organize conversations. The knowledge itself began to take the shape of the real problem.**

## Specialized Agents with Smaller Contexts

To me, a sub-agent is not a small chatbot talking to another chatbot. I see it as a highly specialized conversation with a specific context and role. Its value does not come from knowing everything. In fact, it comes from knowing only what it needs, together with the knowledge above it. This also solves another problem: context size. I do not have to give the model all the rules for all 70 sources every time I work on just one.

If I am working on source number 32, for example, the model needs the general rules, the rules for the group to which that source belongs, the more specialized rules below that, and finally the source-specific exceptions. The rules for every other source are irrelevant.

The part that made me appreciate this approach most, however, was how it handles change.

Suppose a group of sources uses Saudi riyals and shares a particular currency-conversion rule, and then that rule changes. In the old system, I might have to search for every script that performs the operation and make sure I update each one correctly. In the new system, I go to the conversation or knowledge base that groups those sources and change the rule once. Everything below it reads the new rule.

The same idea can be applied to a mapping, a validation rule, the construction of a particular number, the location of a reference dataset, or any other business logic shared by multiple sources.

There is also a primary conversation that can access all these conversations and understand their structure. Even the process of updating knowledge can therefore be performed from one place. If I tell it that a rule for a particular group has changed, it can reach the correct location and update it instead of making me visit every branch manually.

## Python Did Not Disappear. Its Role Changed

None of this means Python disappeared from the system. Quite the opposite: only its role changed.

In the system I built in 2025, the script was the system. The business rules and execution both lived inside it, so a change in the business usually required a change in the code. Now, I am trying to separate the rules and knowledge from the method of execution. The agent reads the rules, understands the shape of the data, and then writes the Python required for the task, runs it, and tests it.

If the resulting script is useful for reuse, it can be kept. If the rules change a week later, the agent can modify the script or rebuild it from the updated knowledge. **The code remains extremely important, but it is no longer the place where the business knowledge lives.**

This also does not mean I will give an LLM a file containing half a million rows, tell it to process them, and trust the result. In many cases, the model does not need to read the complete dataset at all. Its role is to understand the schema, inspect enough samples, determine which rules apply, and then write or choose a tool that processes the entire file deterministically.

It can then validate the result. Does the row count before and after processing make sense? Are all required columns present? Are there values that could not be mapped? Did duplicates appear? Did a total change unexpectedly? If one of these tests fails, the agent can return to the problem and identify the cause.

**I do not treat AI as a magic box that accepts a file and returns another one. I treat it as the manager of a processing workflow that uses Python and other tools to perform the actual work.**

## Knowledge, Model, and Execution

The biggest change for me was learning to separate three things I had previously mixed together: knowledge, the model, and execution. Knowledge explains what we know and how the work should be done. The model reads that knowledge and understands which parts it needs. The tools perform the real work.

This also means I am not tied to a particular model. I can use a local model today and a stronger one a month from now. I can use Claude for one task and a local model for another. The tools themselves may change completely, but the knowledge of how I work remains.

The strange thing is that the project I built in the middle of 2025 did not fail. It still works, and it saved me a huge amount of time. Yet less than a year and a half later, I no longer want to use it in the same way.

A year ago, I was trying to turn everything I knew about data processing into code. When a new rule appeared, I wrote it. When a source changed, I edited the script. When a new exception appeared, I added another condition. Today, I am trying to turn what I know into knowledge that AI can understand, and then let the implementation change with the task.

**I do not want to build a script for every problem if I can build a mind that knows why the data must be processed in a particular way, then give it the tools it needs to do the work.**

This may be the biggest change in how I have used AI over the past year. For a long time, I used AI to help me build systems: I asked it for a function, fixed an error with it, or had it write a script. But the real knowledge of how the work should be done still lived in my head or inside the code.

Now I am trying to make that knowledge part of the system itself.

One agent knows the big picture. Beneath it, other agents know increasingly specialized rules. The farther down we go, the more precise the knowledge becomes, until we reach an agent that knows the small details of one source without needing everything to be explained again.

You could say that I replaced dozens of scripts with a fleet of AI agents, but the idea is not really about the number of agents or the model that powers them. Models will change. Hardware will become more powerful. The way we run AI will change too.

**The part I actually want to preserve is the knowledge.**

A year ago, I was building the system that executed the rules. Today, I am trying to build the system that understands them. Execution comes afterward.
