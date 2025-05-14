import { cors } from "hono/cors";
import authIssuer from "~/auth/index";
const app = authIssuer;

app.use("*", cors())

app.get("/", (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>gurkz Passport</title>
      </head>
      <body style={{ backgroundColor: "black", color: "white", fontFamily: "Arial" }}>
        <h1>hello</h1>
        <p>if you don't know how or why you ended up here, go back to <a style={{ color: "lightblue" }} href="https://www.gurkz.me/">my main website</a></p>
      </body>
    </html>
  );
});

export default app;
