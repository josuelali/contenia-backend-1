import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import http from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;

  const originalJson = res.json.bind(res);

  res.json = (body?: any): Response => {
    const duration = Date.now() - start;

    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;

      if (body !== undefined) {
        logLine += ` :: ${JSON.stringify(body)}`;
      }

      if (logLine.length > 120) {
        logLine = logLine.slice(0, 119) + "…";
      }

      log(logLine);
    }

    return originalJson(body);
  };

  next();
});

(async () => {
  try {
    await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err?.status || err?.statusCode || 500;
      const message = err?.message || "Internal Server Error";
      res.status(status).json({ message });
    });

    const server = http.createServer(app);

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
      log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Fatal startup error:", error);
    process.exit(1);
  }
})();
