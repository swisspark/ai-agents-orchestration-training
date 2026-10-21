import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint to receive student prompts and stream agent reasoning from Go backend
app.post('/api/agent/stream', async (req: Request, res: Response) => {
  const { prompt } = req.body;

  // Set headers for Server-Sent Events (SSE)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Simulate streaming agent steps (In production, this proxies the Go orchestrator SSE stream)
    const steps = [
      "Analyzing prompt requirements...",
      "Evaluating tool schemas...",
      "Executing concurrent tool calls in Go backend...",
      "Synthesizing final observation...",
      "Task completed successfully."
    ];

    for (const step of steps) {
      res.write(`data: ${JSON.stringify({ status: "processing", message: step })}\n\n`);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    res.write(`data: ${JSON.stringify({ status: "done", output: "Agent execution complete for: " + prompt })}\n\n`);
    res.end();
  } catch (error) {
    res.write(`data: ${JSON.stringify({ status: "error", message: String(error) })}\n\n`);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`BFF Node.js server running on port ${PORT}`);
});
