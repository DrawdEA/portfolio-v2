---
title: "Crystal"
date: "2026-04-09"
description: "An AI-powered institutional memory platform. Currently in development, building toward a startup."
image: "/projects/crystal.png"
tags: ["ai", "llm", "neo4j", "pgvector", "nextjs", "typescript"]
---

## What it is

Crystal is an institutional memory platform. It ingests communications from Slack and Google Drive, extracts decisions and entities via LLM, and makes that knowledge queryable through a natural language interface and an interactive knowledge graph.

The core problem it solves: organizations lose institutional knowledge constantly. Decisions get made in Slack threads, context lives in old Drive docs, and when people leave or teams scale, that knowledge disappears. Crystal makes it persistent and searchable.

## Stack

Dual-database architecture: Neo4j for the knowledge graph (relationships between people, decisions, entities) and pgvector for semantic search. Async ingestion pipeline, real-time Slack bot integration, Next.js frontend.

## Status

Currently in active development with my co-founder Alexi. More details coming soon.
