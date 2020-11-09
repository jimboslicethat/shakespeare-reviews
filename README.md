# Shakespeare Reviews

## Getting Started 🚀
1. Create a `.env.local` in the root directory for storing config variables. In this case add environment variables for:
    * `SHAKESPEARE_API_URL` = The API url for the shakespeare API.
    * `AUTH_TOKEN` = The auth token for accessing the shakespeare API _(can be copied from example file)_
    * `BASE_URL` = http://localhost:3000 _(can be copied from example file)_
    * Refer to the `.env.local.example` for a more concrete example.
2. Install depencencies by running `yarn`.
3. Start the development server by running:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
5. If you make changes to any of the web pages, the browser should hot-reload as you edit the file.

## Testing 🧪
The Cypress E2E/Integration test suite may be run one of two ways.
1. In a chromium instance by running `yarn cypress:open`.
1. In a headless browser in the CLI by running `yarn cypress:run`.
1. You may find test suite files located in `cypress/integration`.

### Additional Info
This project was bootstrapped using [Next.js](https://nextjs.org/docs).
