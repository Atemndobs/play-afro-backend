const Stripe_Key = process.env.STRIPE_PUBLISHABLE_KEY;
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import Music from "../models/music";
import Card from "../models/card";
import commonService from "../utils/commonService";
import User from "../models/users";
class stripService {
  static async addCard(userId, data) {
    try {
      const cardInfo = await commonService.findOne(
        Card,
        { userId: userId },
        { raw: false, plain: true }
      );
      const token = await stripe.tokens.create({
        card: {
          number: data.card_number,
          exp_month: data.expiry_date.split("/")[0],
          exp_year: data.expiry_date.split("/")[1],
          cvc: data.cvv,
        },
      });
      const card = await stripe.customers.createSource(cardInfo.customer_id, {
        source: token.id,
      });
      const CardUpdate = {
        userId: userId,
        customer_id: customer.id,
        card_id: token.id,
        expiry_month: token.card.exp_month,
        expiry_year: token.card.exp_year,
        last4: token.card.last4,
        card_type: token.card.brand,
      };
      const updatedCard = await commonService.updateByPk(
        Card,
        cardInfo.id,
        CardUpdate
      );
      return true;
    } catch (err) {
      switch (err.type) {
        case "StripeCardError":
          // A declined card error
          res.status(err.statusCode).send(JSON.stringify(err.message));
          err.message; // => e.g. "Your card's expiration year is invalid."
          break;
        case "StripeRateLimitError":
          // Too many requests made to the API too quickly
          res.status(err.statusCode).send(JSON.stringify(err.message));
          break;
        case "StripeInvalidRequestError":
          // Invalid parameters were supplied to Stripe's API
          res.status(err.statusCode).send(JSON.stringify(err.message));
          break;
        case "StripeAPIError":
          res.status(err.statusCode).send(JSON.stringify(err.message));
          // An error occurred internally with Stripe's API
          break;
        case "StripeConnectionError":
          res.status(err.statusCode).send(JSON.stringify(err.message));
          // Some kind of error occurred during the HTTPS communication
          break;
        case "StripeAuthenticationError":
          res.status(err.statusCode).send(JSON.stringify(err.message));
          // You probably used an incorrect API key
          break;
        default:
          // Handle any other types of unexpected errors
          break;
      }
      res.status(422).send(JSON.stringify(err));
    }
  }

  static async addCustomer(userId, data) {
    try {
      const userInfo = await commonService.findOne(
        User,
        { id: userId },
        { raw: false, plain: true }
      );
      const token = await stripe.tokens.create({
        card: {
          number: data.card_number,
          exp_month: data.expiry_date.split("/")[0],
          exp_year: data.expiry_date.split("/")[1],
          cvc: data.cvv,
        },
      });
      const customer = await stripe.customers.create({
        email: userInfo.email,
        name: userInfo.fullname,
      });
      const customerUpdate = await stripe.customers.createSource(customer.id, {
        source: token.id,
      });
      const CardInfo = {
        userId: userId,
        customer_id: customer.id,
        card_id: token.id,
        expiry_month: token.card.exp_month,
        expiry_year: token.card.exp_year,
        last4: token.card.last4,
        card_type: token.card.brand,
      };
      const cardData = await commonService.createOne(Card, CardInfo);

      return true;
    } catch (err) {
      switch (err.type) {
        case "StripeCardError":
          // A declined card error
          return false;
          err.message; // => e.g. "Your card's expiration year is invalid."
          break;
        case "StripeRateLimitError":
          // Too many requests made to the API too quickly
          return false;
          break;
        case "StripeInvalidRequestError":
          // Invalid parameters were supplied to Stripe's API
          return false;
          break;
        case "StripeAPIError":
          return false;
          // An error occurred internally with Stripe's API
          break;
        case "StripeConnectionError":
          return false;
          // Some kind of error occurred during the HTTPS communication
          break;
        case "StripeAuthenticationError":
          return false;
          // You probably used an incorrect API key
          break;
        default:
          // Handle any other types of unexpected errors
          return false;
          break;
      }

      return false;
      res.status(422).send(JSON.stringify(err));
    }
  }
  static async payPerSong(userId,muiscId, amount) {
    try {
      const cardInfo = await commonService.findOne(
        Card,
        { userId: userId },
        { raw: false, plain: true }
      );
      const response = await stripe.charges.create({
        amount: 1000,
        currency: "inr",
        customer: cardInfo.customer_id, // obtained with Stripe.js
        metadata: { music_id: muiscId },
      });
      console.log(response);
      const updatedMusic = await commonService.updateByPk(Music, muiscId, {
        is_paid: 1,
      });
      return true;
    } catch (err) {
      switch (err.type) {
        case "StripeCardError":
          // A declined card error
          return false;
          err.message; // => e.g. "Your card's expiration year is invalid."
          break;
        case "StripeRateLimitError":
          // Too many requests made to the API too quickly
          return false;
          break;
        case "StripeInvalidRequestError":
          // Invalid parameters were supplied to Stripe's API
          return false;
          break;
        case "StripeAPIError":
          return false;
          // An error occurred internally with Stripe's API
          break;
        case "StripeConnectionError":
          return false;
          // Some kind of error occurred during the HTTPS communication
          break;
        case "StripeAuthenticationError":
          return false;
          // You probably used an incorrect API key
          break;
        default:
          // Handle any other types of unexpected errors
          return false;
          break;
      }
      return false;
    }
  }
}
