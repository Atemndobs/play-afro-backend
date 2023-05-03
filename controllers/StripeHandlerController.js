const Stripe_Key = process.env.STRIPE_PUBLISHABLE_KEY;
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import Music from "../models/music";
import Card from "../models/card";
import commonService from "../utils/commonService";
import User from "../models/users";
import Plan from "../models/plans";
import Subscription from "../models/subscription";

class StripeHandlerController {
  /**
   * register
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async createNewCustomer(req, res, next) {
    try {
      const userInfo = await commonService.findOne(
        User,
        { id: req.session.userid },
        { raw: false, plain: true }
      );
      const customer = await stripe.customers.create({
        email: userInfo.email,
        name: userInfo.fullname,
      });
      const token = await stripe.tokens.create({
        card: {
          number: data.card_number,
          exp_month: data.expiry_date.split("/")[0],
          exp_year: data.expiry_date.split("/")[1],
          cvc: data.cvv,
        },
      });
      res.status(200).send(customer);
    } catch (error) {
      res.status(422).send(error);
    }
  }

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

  static async chargeCreate(req, res, next) {
    console.log("charge called");
    try {
      const response = await stripe.charges.create({
        amount: 8000,
        currency: "inr",
        customer: "cus_NLjlvvEZBJtqsE", // obtained with Stripe.js
        metadata: { order_id: "6735" },
      });
      res.status(200).send(JSON.stringify(response));
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

  static async validateBank(req, res, next) {
    try {
      const token = await stripe.tokens.create({
        bank_account: {
          country: "US",
          currency: "usd",
          account_holder_name: "Salman Ansari",
          account_holder_type: "individual",
          routing_number: "110000000",
          account_number: "000123456789",
        },
      });
      res.status(200).send(JSON.stringify(token));
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

  static async musicPayment(req, res, next) {
    const data = req.body;
    var muiscId = data.muisc_id;
    // return false;
    var cardInformation = await commonService.findOne(
      Card,
      { userId: req.session.userid },
      { raw: false, plain: true }
    );
    if (cardInformation) {
      // if (data.type == 1) {
      // var result = this.addCard(req.session.userid, data);
      // if (result == false) {
      //   return false;
      // }
      // try {
      //   const cardInfo = await commonService.findOne(
      //     Card,
      //     { userId: req.session.userid },
      //     { raw: false, plain: true }
      //   );
      //   const token = await stripe.tokens.create({
      //     card: {
      //       number: data.card_number,
      //       exp_month: data.expiry_date.split('/')[0],
      //       exp_year: data.expiry_date.split('/')[1],
      //       cvc: data.cvv,
      //     },
      //   });
      //   const card = await stripe.customers.createSource(cardInfo.customer_id, {
      //     source: token.id,
      //   });
      //   const CardUpdate = {
      //     userId: req.session.userid,
      //     customer_id: customer.id,
      //     card_id: token.id,
      //     expiry_month: token.card.exp_month,
      //     expiry_year: token.card.exp_year,
      //     last4: token.card.last4,
      //     card_type: token.card.brand,
      //   };
      //   const updatedCard = await commonService.updateByPk(
      //     Card,
      //     cardInfo.id,
      //     CardUpdate
      //   );
      //   return true;
      // } catch (err) {
      //   switch (err.type) {
      //     case "StripeCardError":
      //       // A declined card error
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       err.message; // => e.g. "Your card's expiration year is invalid."
      //       break;
      //     case "StripeRateLimitError":
      //       // Too many requests made to the API too quickly
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       break;
      //     case "StripeInvalidRequestError":
      //       // Invalid parameters were supplied to Stripe's API
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       break;
      //     case "StripeAPIError":
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       // An error occurred internally with Stripe's API
      //       break;
      //     case "StripeConnectionError":
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       // Some kind of error occurred during the HTTPS communication
      //       break;
      //     case "StripeAuthenticationError":
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       // You probably used an incorrect API key
      //       break;
      //     default:
      //       // Handle any other types of unexpected errors
      //       break;
      //   }
      //   res.status(422).send(JSON.stringify(err));
      // }
      // } else {
      // }
    } else {
      // var result = this.addCustomer(req.session.userid, data);
      try {
        const userInfo = await commonService.findOne(
          User,
          { id: req.session.userid },
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
        const customerUpdate = await stripe.customers.createSource(
          customer.id,
          {
            source: token.id,
          }
        );
        const CardInfo = {
          userId: req.session.userid,
          customer_id: customer.id,
          card_id: token.id,
          expiry_month: token.card.exp_month,
          expiry_year: token.card.exp_year,
          last4: token.card.last4,
          card_type: token.card.brand,
        };
        const cardData = await commonService.createOne(Card, CardInfo);
      } catch (err) {
        await Music.destroy({
          where: {
            id: muiscId,
          },
        });
        return res.send({ message: err.message, status: false });
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
      }
      // if (result == false) {
      //   return false;
      // }
    }
    try {
      const cardInfo = await commonService.findOne(
        Card,
        { userId: req.session.userid },
        { raw: false, plain: true }
      );
      const response = await stripe.charges.create({
        amount: 1000,
        currency: "inr",
        customer: cardInfo.customer_id, // obtained with Stripe.js
        metadata: { music_id: muiscId },
      });
      const updatedMusic = await commonService.updateByPk(Music, muiscId, {
        is_paid: 1,
      });
      console.log(response);
      return res.send({ message: "done", status: true });
      return true;
    } catch (err) {
      await Music.destroy({
        where: {
          id: muiscId,
        },
      });
      console.log(err);
      return res.send({ message: err.message, status: false });
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
    // var result = this.payPerSong(req.session.userid,req.musicId, 10);
    // return result;
  }

  static async payPerSong(userId, muiscId, amount) {
    try {
      const cardInfo = await commonService.findOne(
        Card,
        { userId: req.session.userid },
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

  static async subscription(req, res, next) {
    const data = req.body;
    var plan = await Plan.findOne({
      where: {
        id: data.plan_id,
      },
    });
    if (!plan) {
      return res.send({ message: "No such plan", status: false });
    }
    var cardInformation = await commonService.findOne(
      Card,
      { userId: req.session.userid },
      { raw: false, plain: true }
    );
    if (cardInformation) {
      // if (data.type == 1) {
      // var result = this.addCard(req.session.userid, data);
      // if (result == false) {
      //   return false;
      // }
      // try {
      //   const cardInfo = await commonService.findOne(
      //     Card,
      //     { userId: req.session.userid },
      //     { raw: false, plain: true }
      //   );
      //   const token = await stripe.tokens.create({
      //     card: {
      //       number: data.card_number,
      //       exp_month: data.expiry_date.split('/')[0],
      //       exp_year: data.expiry_date.split('/')[1],
      //       cvc: data.cvv,
      //     },
      //   });
      //   const card = await stripe.customers.createSource(cardInfo.customer_id, {
      //     source: token.id,
      //   });
      //   const CardUpdate = {
      //     userId: req.session.userid,
      //     customer_id: customer.id,
      //     card_id: token.id,
      //     expiry_month: token.card.exp_month,
      //     expiry_year: token.card.exp_year,
      //     last4: token.card.last4,
      //     card_type: token.card.brand,
      //   };
      //   const updatedCard = await commonService.updateByPk(
      //     Card,
      //     cardInfo.id,
      //     CardUpdate
      //   );
      //   return true;
      // } catch (err) {
      //   switch (err.type) {
      //     case "StripeCardError":
      //       // A declined card error
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       err.message; // => e.g. "Your card's expiration year is invalid."
      //       break;
      //     case "StripeRateLimitError":
      //       // Too many requests made to the API too quickly
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       break;
      //     case "StripeInvalidRequestError":
      //       // Invalid parameters were supplied to Stripe's API
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       break;
      //     case "StripeAPIError":
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       // An error occurred internally with Stripe's API
      //       break;
      //     case "StripeConnectionError":
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       // Some kind of error occurred during the HTTPS communication
      //       break;
      //     case "StripeAuthenticationError":
      //       res.status(err.statusCode).send(JSON.stringify(err.message));
      //       // You probably used an incorrect API key
      //       break;
      //     default:
      //       // Handle any other types of unexpected errors
      //       break;
      //   }
      //   res.status(422).send(JSON.stringify(err));
      // }
      // } else {
      // }
    } else {
      try {
        const userInfo = await commonService.findOne(
          User,
          { id: req.session.userid },
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
        const customerUpdate = await stripe.customers.createSource(
          customer.id,
          {
            source: token.id,
          }
        );
        const CardInfo = {
          userId: req.session.userid,
          customer_id: customer.id,
          card_id: token.id,
          expiry_month: token.card.exp_month,
          expiry_year: token.card.exp_year,
          last4: token.card.last4,
          card_type: token.card.brand,
        };
        const cardData = await commonService.createOne(Card, CardInfo);
      } catch (err) {
        return res.send({ message: err.message, status: false });
      }
    }
    try {
      const cardInfo = await commonService.findOne(
        Card,
        { userId: req.session.userid },
        { raw: false, plain: true }
      );
      var response = await stripe.subscriptions.create({
        customer: cardInfo.customer_id,
        items: [
          {
            plan: plan.price_id,
          },
        ],
      });
      const SubscriptionInfo = {
        userId: req.session.userid,
        plan_id: plan.id,
        subscription_id: response.id,
        start_date: response.current_period_start * 1000,
        expiry_date: response.current_period_end * 1000,
        method: 1,
      };
      await Subscription.destroy({
        where: {
          userId: req.session.userid,
        },
      });
      const subscriptionData = await commonService.createOne(
        Subscription,
        SubscriptionInfo
      );
      return res.send({ message: "done", status: true });
    } catch (err) {
      console.log(err);
      return res.send({ message: err.message, status: false });
    }
  }

  static async webhook(req, res, next) {
    var eventdata=req.body;
    var object = eventdata.data.object;
    var length=object.lines.data.length;
    length=length==1?0:length-1;
    var exp_date = object.lines.data[length].period.end;
    switch (eventdata.type) {
      case "invoice.payment_succeeded":
        await Subscription.update(
          {
            status: "ACTIVE",
            expiry_date: exp_date * 1000,
          },
          { where: { subscription_id: eventdata.data.object.subscription } }
        );
        break;
      case "invoice.payment_failed":
        await Subscription.update(
          {
            status: "FAILED",
            expiry_date: exp_date * 1000,
          },
          { where: { subscription_id: eventdata.data.object.subscription } }
        );
        break;
      case "customer.subscription.deleted":
        await Subscription.update(
          {
            status: "CANCELLED",
            expiry_date: exp_date * 1000,
          },
          { where: { subscription_id: eventdata.data.object.subscription } }
        );
        break;
      case "invoice.voided":
        await Subscription.update(
          {
            status: "VOIDED",
            expiry_date: exp_date * 1000,
          },
          { where: { subscription_id: eventdata.data.object.subscription } }
        );
        break;
      default:
        break;
    }
    return res.send({ data: true });
  }
}
export default StripeHandlerController;
