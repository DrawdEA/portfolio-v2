---
title: "Portfolio Website"
date: "2024-12-15"
description: "My glorified brag sheet. This is where I showcase my projects, thoughts, and personality."
image: "/projects/portfolio.png"
tags: ["nextjs", "typescript", "tailwindcss", "react"]
github: "https://github.com/yourusername/portfolio-v2"
live: "https://edwarddiesta.com"
---

## Overview

This portfolio website serves as a comprehensive showcase of my skills, projects, and professional journey. It features a beautiful bento grid layout, interactive components, and seamless user experience.

## The Bento Grid Obsession

I've always been fascinated by the bento grid layout. There's something satisfying about those modular cards, each serving a different purpose but working together as a cohesive whole. 

I thought: what if each card wasn't just a static showcase, but a living piece of information? A card that shows what I'm listening to right now. A card that displays my latest run. A card that updates with my GitHub activity.

The bento grid became the perfect metaphor for how I think about my work—diverse interests, different projects, but all part of the same story.

## The Project Showcase Dilemma

After showing a prototype to some people I know, most of their feedback were like,

"The Projects Section is too low."

or

"I think you need to put the About Me Bento Section a bit lower."

Which gave me the dilemma of which one to put first.

On one hand, I really liked the personality that the about me page gave, but I also needed a way to showcase my projects since that's quite probably the most important part of a portfolio website.

Thus, I settled for the middle ground: Creating a big featured project bento box on the About Me page.

In this way, people can still see the website's personality through my bento boxes while still seeing my most relevant projects.

## Making It Personal

The Spotify integration was the first "aha" moment. I spend a lot of time coding with music in the background, and I thought: why not share that?

Then came Strava. I'm a runner, and I realized that showing my latest activities wasn't just about fitness—it was about showing that I have interests outside of code.

The GitHub stats card felt like a natural addition. It's the most "portfolio-y" of the bunch, but even here I wanted it to feel dynamic. Not just a static list of repos, but something that updates and shows real activity.

## The Reaction Counter

This one came from a late-night thought: what if visitors could leave their mark? Not just view and leave, but actually interact? 

The reaction counter with emoji particles was born from that idea. 

It's silly, maybe, but it's also fun. And fun matters. If someone visits my portfolio and smiles at the random react counter, that's a win in my book.

Perhaps I'll also implement a comment section system for my blogs and projects in the future.

## Technical Decisions

I went with Next.js 16 because it's what I already know. 

TypeScript was non-negotiable—I've made enough runtime errors to know better. 

Tailwind CSS because I wanted to move fast without getting bogged down in custom CSS files.

Magic UI was a game-changer. I didn't want to build every component from scratch, but I also didn't want to be locked into a design system. 

It filled in the gaps for those special effects that would take forever to build myself.

## The Markdown Approach

I knew I wanted to write blog posts and project descriptions, but I didn't want to deal with a CMS. Markdown felt right—simple, version-controlled, easy to write. 

I built a parser that handles frontmatter and converts everything to React components. 

Now, I can just write a `.md` file and it appears on the site. Perfect.

## Intentional Simplicity

Most people probably wouldn't go through the entirety of my website, so I made sure to put everything on the home page.

The hero page is a very simple one. After all, it only consists of what I am, and what I do.

After that, the About Me page showcases everything they may want to know about me. Everything. All at once. So that they don't miss anything.

## The Philosophy

At the end of the day, this portfolio is an experiment. It's me trying to answer the questions: what is the best way to get the attention of employers? Future partners? and which components and elements should I prioritize to best showcase my work and convince them about my skills?

I think I'm a little step closer to answering that. Honestly? That's what makes it worth building. Not because it's perfect (it's not), but because it's honest. It's me, in code form.

