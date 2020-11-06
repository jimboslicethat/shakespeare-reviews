# Shakespeare Reviews

## Getting Started 🚀
1. Create a `.env.local` in the root directory for storing config variables. In this case add environment variables for:
    * `SHAKESPEARE_API_URL` which should be the API url for the coding challenge sent over in the email.
    * `AUTH_TOKEN`. Please refer to, or feel free to copy `.env.local.example`.
2. Install depencencies with `yarn`.
3. Start the development server by running:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
5. If you make changes to any of the web pages, the browser should hot-reload as you edit the file.

## Testing 🧪
The Cypress E2E/Integration test suite may be run two ways.
1. In a chromium instance by running `yarn cypress:open`.
2. In a headless browser in the CLI by running `yarn cypress:run`.

## Additional Info
This project was bootstrapped using Next.js. To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
