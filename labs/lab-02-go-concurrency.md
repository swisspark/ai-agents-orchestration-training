# Lab 2: Concurrent Tool Dispatching with Go

## Objective
Build a high-performance concurrent tool execution engine using Go's native `errgroup` and `context` packages.

## Key Concepts
- **Parallel Tool Execution**: Running non-dependent tool calls concurrently using Goroutines.
- **Context Deadlines**: Enforcing strict timeouts on individual tool executions.
- **Error Propagation**: Gracefully handling tool failures without crashing the agent pipeline.

## Exercise
Inspect `backend-go/agent/dispatcher.go` and write a test suite in `backend-go/agent/dispatcher_test.go` that simulates three tools executing concurrently with artificial delays.
