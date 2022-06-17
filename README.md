# Microdiagram

Welcome to the Microdiagram codebase, the platform that powers microdiagram.com.

Live website: [https://www.microdiagram.com/](https://www.microdiagram.com/)

This project is built on Node.js (Polka and Sapper with Typescript), but there is also a python version (Flask app), check it out: [diagrams-web](https://github.com/diagrams-web/diagrams-web)

## What is Microdiagram?

Microdiagram is open source software for building online diagram toolkit. Toolkit for prototyping cloud system architectures, microservices architectures crafted on AWS, Azure, GCP, AlibabaCloud and so on. This is built on the top of a python lib [Diagrams](https://github.com/mingrammer/diagrams) and fully compatible with it.

microdiagram.com is hosted by Microdiagram. It is a online toolkit for software developers who design architectures, from basic programming concept to cloud-based microservices architecture. The generated architecture images are free to download and use in any format.

You might found the website is quite simple, but more features are planned in the future. The initial idea of building this website was just helping people get started to use [Diagrams](https://github.com/mingrammer/diagrams) without setting up a local python environment.

## Getting started

### Running the project locally

Once you get the code, you can install dependencies and run the project in development mode with:

```bash
cd microdiagram
npm install # or yarn
npm run dev # or yarn dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

### Running in Heroku app
Running in Heroku is as easy as creating a new app and adding buildpacks.

3 buildpacks are needed, in this order:

1. https://github.com/weibeld/heroku-buildpack-graphviz*
2. heroku/python
3. heroku/nodejs

\* check heroku-buildpack-graphviz, it currently requires heroku-20 stack


## Structure

Read more about [Sapper](./SapperDoc.md).
