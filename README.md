# [Spoonacular App](https://spoonacular-app.vercel.app/) 🥄

This is a [Next.js](https://nextjs.org/) project made as an interview assignment for Junior Frontend Developer position at **AirHelp**.

User can search food ingredients by even partial query and look up recipes for the chosen ingredient.
Spoonacular API has a limit of 150 requests a day, so searched ingredients are **cached**. Last ten requests are also stored in the local storage and shown as links in a separate panel.

## Stack and tools

- **[Next.js](https://nextjs.org/)** with **TypeScript** integration: web framework
- **[Chakra UI](https://chakra-ui.com/)**: UI component library
- **[spoonacular API](https://spoonacular.com/food-api)**: REST API for food ingredients and recipes search
- **[lru-cache](https://www.npmjs.com/package/lru-cache)**: cache object for API requests optimization.
- **[Cypress](https://www.cypress.io/)**: end-to-end and unit testing.

## Deploy link

🔗 **[Spoonacular App](https://spoonacular-app.vercel.app/)** on Vercel

## Run locally

1. Clone this repo

2. Install all dependencies:

```
$ npm install
# or
$ yarn
```

3. Create `.env` file and add your Spoonacular API key:

```
echo 'SPOONACULAR_KEY=<your key>' >> .env
```

4. Run the deployment server

```
$ npm run dev
# or
$ yarn dev
```

5. Your app is served at http://localhost:3000/
