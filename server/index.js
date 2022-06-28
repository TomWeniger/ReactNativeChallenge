import express from "express";
import Stripe from "Stripe";
import { SECRET_KEY } from "@env";

const app = express();
const port = 3000;
const PUBLISHABLE_KEY =
  "pk_test_51LEFWUGWOcHMVxHQBf1uH53YVOTEkR0RWK2Ct9hitSmAgWQZrJC569xRZnlv5fYKMkRJZj0CWX11XIFbFy42zmJh003iruzMrY";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
