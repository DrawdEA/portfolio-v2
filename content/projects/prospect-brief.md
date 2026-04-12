---
title: "Prospect Brief"
date: "2026-04-02"
description: "An AI sales research agent that takes a company name and outputs a structured brief on their AI readiness, pain points, scores, and talking points, generated via agentic web search."
image: "/projects/prospect.png"
tags: ["ai", "claude", "nextjs", "typescript", "agentic"]
live: "https://prospect-brief.edwarddiesta.com"
---

## What it does

You type in a company name. It runs agentic web search via Claude, figures out where the company stands on AI adoption, and outputs a structured brief you can walk into a sales call with.

The output has eight sections: a blunt one-sentence verdict, four scored dimensions (AI Maturity, Automation Level, Tech Stack Modernity, AI Urgency, each 1-10 with evidence), a list of AI readiness signals tagged as ahead/on-track/behind/nonexistent, pain points with estimated dollar and time impact, recommended services with directional ROI, ordered action items with timelines, and consultative talking points referencing the actual findings.

## The agentic search loop

The interesting part is how the search works. It's not a fixed set of queries. Claude decides what to search, how many times, and when it has enough context. The implementation passes a `web_search` tool to Claude with a max of 5 uses per turn, then runs a continuation loop: if Claude hits the per-turn limit and returns `pause_turn`, the loop picks back up and lets it keep searching (up to 5 continuations total).

A single brief might involve Claude making 10-15 targeted searches, deciding mid-way to look up a specific job posting or tech blog that changes its assessment. You're not scripting any of it.

## Stack

Claude (agentic tool use + web search), Next.js, TypeScript

## Results

Tested on real companies. The briefs are specific enough to be useful, not generic AI commentary but actual signals pulled from job listings, blog posts, product pages, and press. The verdict section in particular cuts through noise fast.
