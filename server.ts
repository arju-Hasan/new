import { createServer } from "http";
import { parse } from "url";
import next from "next";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js
const nextApp = next({
  dev,
  hostname,
  port,
});

const handle = nextApp.getRequestHandler();

// Import Express API Router
import apiRouter from "./express/routes/api";

nextApp.prepare().then(() => {
  const app = express();

  // ======================================
  // Middleware
  // ======================================

  app.use(compression());

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // ======================================
  // Request Logger
  // ======================================

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url.startsWith("/api/")) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }

    next();
  });

  // ======================================
  // API Routes
  // ======================================

  app.use("/api/v1", apiRouter);

  // ======================================
  // Health Check
  // ======================================

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "OK",
      server: "Express + Next.js",
      environment: process.env.NODE_ENV,
      timestamp: new Date(),
    });
  });

  // ======================================
  // Next.js Routes
  // ======================================

  app.all("*", (req: Request, res: Response) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  // ======================================
  // Start Server
  // ======================================
  createServer(app).listen(port, hostname, () => {
    console.log("\n======================================");
    console.log(`🛜 Server Running`);
    console.log(`🌐 URL        : http://${hostname}:${port}`);
    console.log(`🛠 Admin Panel : http://${hostname}:${port}/admin`);
    console.log(`📦 Environment : ${process.env.NODE_ENV}`);
    console.log("======================================\n");
  });
});

// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "0.0.0.0";
// const port = parseInt(process.env.PORT || "3000", 10);

// // Initialize Next.js app
// const nextApp = next({ dev, hostname, port });
// const handle = nextApp.getRequestHandler();

// // Import Express API router
// const apiRouter = require("./express/routes/api").default;

// nextApp.prepare().then(() => {
//   const app = express();

//   // ─── Middleware ───────────────────────────────────────────────
//   app.use(
//     cors({
//       origin: "*",
//       methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     }),
//   );
//   app.use(express.json({ limit: "10mb" }));
//   app.use(express.urlencoded({ limit: "10mb", extended: true }));

//   // ─── Request Logger ───────────────────────────────────────────
//   app.use((req, res, next) => {
//     if (req.url.startsWith("/api/")) {
//       console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     }
//     next();
//   });

//   // ─── Express API Routes (/api/v1) ────────────────────────────
//   app.use("/api/v1", apiRouter);

//   // ─── Health Check ─────────────────────────────────────────────
//   app.get("/health", (req, res) => {
//     res.json({
//       status: "OK",
//       timestamp: new Date(),
//       server: "Express + Next.js",
//     });
//   });

//   // ─── All other routes → Next.js ──────────────────────────────
//   app.all("*", (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   // ─── Start Server ─────────────────────────────────────────────
//   createServer(app).listen(port, hostname, () => {
//     console.log(`Server running on http://${hostname}:${port}`);
//   });
//   // createServer(app).listen(port, () => {
//   //   console.log("\n=============================================");
//   //   console.log(` App is running on : http://${hostname}:${port}`);
//   //   console.log(` App Admin Panel   : http://${hostname}:${port}/admin`);
//   //   console.log("=============================================\n");
//   // });
// });
