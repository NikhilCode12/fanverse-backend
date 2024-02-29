import express from "express";
import stripe from "stripe";
const router = express.Router();

// stripe configuration
const stripeInstance = stripe(
  "sk_test_51OpEm4SAFpF5AQ7zbe94y82cAwIWbXyq7DhiXFTib5de92dHgvPaYIuc4ZKpGiVijutJOPkCTe75TxSsDGtLBvfq00jtks9TrW"
);

// post payment intent to stripe
router.post("/intents", async (req, res) => {
  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
    });

    return res.json({
      paymentIntent: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
