package agent

import (
	"context"
	"fmt"
	"golang.org/x/sync/errgroup"
)

type ToolCall struct {
	ID   string
	Name string
	Args map[string]interface{}
}

type ToolResult struct {
	CallID string
	Output string
}

type Tool interface {
	Execute(ctx context.Context, args map[string]interface{}) (string, error)
}

type Agent struct {
	tools map[string]Tool
}

func NewAgent(tools map[string]Tool) *Agent {
	return &Agent{tools: tools}
}

// ExecuteToolsConcurrently executes tool calls in parallel using Goroutines and Context cancellation
func (a *Agent) ExecuteToolsConcurrently(ctx context.Context, calls []ToolCall) ([]ToolResult, error) {
	g, ctx := errgroup.WithContext(ctx)
	results := make([]ToolResult, len(calls))

	for i, call := range calls {
		i, call := i, call
		g.Go(func() error {
			tool, exists := a.tools[call.Name]
			if !exists {
				return fmt.Errorf("tool %s not found", call.Name)
			}
			res, err := tool.Execute(ctx, call.Args)
			if err != nil {
				return fmt.Errorf("tool %s failed: %w", call.Name, err)
			}
			results[i] = ToolResult{CallID: call.ID, Output: res}
			return nil
		})
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}
	return results, nil
}
