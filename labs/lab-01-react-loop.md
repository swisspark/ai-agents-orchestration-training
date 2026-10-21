# Lab 1: Building a Pure ReAct Loop in Go

## Objective
Implement a fundamental ReAct (Reasoning + Acting) decision loop in Go from scratch, without relying on high-level orchestration frameworks.

## Key Concepts
- **Thought-Action-Observation Loop**: How LLMs evaluate intermediate tool outputs.
- **Tool Schema Definition**: Structuring function metadata for model completion APIs.
- **Termination Conditions**: Preventing infinite execution cycles.

## Steps
1. Define the `Tool` interface and implement a mock HTTP fetcher tool.
2. Construct the main loop that parses LLM function calls.
3. Feed tool execution results back into the conversation context until a final answer is produced.

## Verification
Run `go run main.go` and verify that the execution trace outputs:
1. `[Thought]` Analyzing request...
2. `[Action]` Executing mock tool...
3. `[Observation]` Received tool payload...
4. `[Final Answer]` Complete output delivered.
