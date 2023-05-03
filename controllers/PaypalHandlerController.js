const paypal = require("paypal-rest-sdk");
import { baseUrl } from "../common/constants/config-constant";
import Music from "../models/music";
import commonService from "../utils/commonService";
const { default: axios } = require("axios");
const live_url = "api-m.paypal.com";
const sandbox_url = "api-m.sandbox.paypal.com";
const payapal_url = "api-m.sandbox.paypal.com";
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});
const getPayPalAccessToken = async () => {
  const client_id = process.env.PAYPAL_CLIENT_ID;
  const client_secret = process.env.PAYPAL_SECRET;
  const options = {
    url: `https://${payapal_url}/v1/oauth2/token`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en_US",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: client_id,
      password: client_secret,
    },
    params: {
      grant_type: "client_credentials",
    },
  };
  const { status, data } = await axios(options);
  return data.access_token;
};
class PaypalHandlerController {
  static async pay(req, res, next) {
    var muiscId = req.query.music_id;
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: baseUrl(`success`) + `?music_id=${muiscId}`,
        cancel_url: baseUrl(`cancel`) + `?music_id=${muiscId}`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Music Payment",
                sku: "001",
                price: "10.00",
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "10.00",
          },
          description: "Payment occuring for the music upload",
        },
      ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  }

  static async sucess(req, res, next) {
    const muiscId = req.query.music_id;
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const updatedMusic = await commonService.updateByPk(Music, muiscId, {
      is_paid: 1,
    });
    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "10.00",
          },
        },
      ],
    };

    await paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          // console.log(error.response);
        } else {
          // console.log(JSON.stringify(payment));
        }
      }
    );
    var music = await Music.findOne({
      where: {
        id: muiscId,
      },
    });
    return res.render("artist-company/music_payment", {
      music: music,
      success: "Music uploaded sucess",
    });
  }

  static async cancel(req, res, next) {
    const muiscId = req.query.music_id;
    var music = await Music.findOne({
      where: {
        id: muiscId,
      },
    });
    return res.render("artist-company/music_payment", {
      music: music,
      error: "Music upload failed",
    });
  }

  static async purchaseSubscription(req, res, next) {
    const token = await getPayPalAccessToken();
    let data = JSON.stringify({
      plan_id: "P-61U121691T7008527MQWWPQI",
      start_time: "2023-04-06T00:00:00Z",
      shipping_amount: {
        currency_code: "USD",
        value: "10.00",
      },
      subscriber: {
        name: {
          given_name: "FooBuyer",
          surname: "Jones",
        },
        email_address: "foobuyers2@example.com",
        shipping_address: {
          name: {
            full_name: "John Doe",
          },
          address: {
            address_line_1: "2211 N First Street",
            address_line_2: "Building 17",
            admin_area_2: "San Jose",
            admin_area_1: "CA",
            postal_code: "95131",
            country_code: "US",
          },
        },
      },
      application_context: {
        brand_name: "Example Inc",
        locale: "en-US",
        shipping_preference: "SET_PROVIDED_ADDRESS",
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
        },
        return_url: process.env.APP_ASSET_URL + "/paypal-success",
        cancel_url: process.env.APP_ASSET_URL + "/paypal-failed",
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
      headers: {
        "Content-Type": "application/json",
        "PayPal-Request-Id": "aedba7e4-d5f1-4ee0-bd5d-b405381a18d7",
        Prefer: "return=representation",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("api called");
        console.log(JSON.stringify(response.data));
        var subscriptioninfo = response.data;
        var approvalUrl = subscriptioninfo.links[0].href;
        console.log(approvalUrl);
        return res.redirect(approvalUrl);
      })
      .catch((error) => {
        console.log("api called with error");
        console.log(error);
      });

    //   var customer_info={
    //     'email':'salman.iroid@gmail.com',
    //     'description':"yeary subscription plan",
    //     'id':10,
    //   };

    //   var billingAgreementAttributes = {
    //     name: "salman.iroid@gmail.com",
    //     description: JSON.stringify(customer_info),
    //     start_date: "2023-04-06T00:00:00Z",
    //     plan: {
    //       id: "P-1VN53509JH894534XKC2GZQI",
    //     },
    //     payer: {
    //       payment_method: "paypal",
    //       custom: "123",
    //     },
    //     // custom: "Your custom value here",
    //     // metadata: {
    //     //   email: "salman.iroid@gmail.com",
    //     //   id: "10",
    //     // },
    //   };

    //  paypal.billingAgreement.create(
    //    billingAgreementAttributes,
    //    function (error, billingAgreement) {
    //      if (error) {
    //        console.log(error);
    //      } else {
    //        console.log(billingAgreement);
    //        var approvalUrl = billingAgreement.links.find(function (link) {
    //          return link.rel === "approval_url";
    //        }).href;
    //         return res.redirect(approvalUrl);
    //      }
    //    }
    //  );
  }

  static async subscribed(req, res, next) {
    console.log("paid");
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    
    return res.send("success");
  }

  static async failed(req, res, next) {
    console.log("failed");
    console.log(req.body);
    console.log(req.params);
    return res.send(true);
  }

  static async createPLan(req, res, next) {
    var MonthlyPlanAttributes = {
      name: "Monthly Subscription",
      description: "Monthly subscription plan for our service",
      type: "INFINITE",
      payment_definitions: [
        {
          name: "Monthly Payment",
          type: "REGULAR",
          frequency: "MONTH",
          frequency_interval: "1",
          amount: {
            value: "50",
            currency: "USD",
          },
          cycles: "0",
          charge_models: [
            // {
            //   type: "TAX",
            //   amount: {
            //     value: "0.50",
            //     currency: "USD",
            //   },
            // },
            // {
            //   type: "SHIPPING",
            //   amount: {
            //     value: "1.00",
            //     currency: "USD",
            //   },
            // },
          ],
        },
      ],
      merchant_preferences: {
        return_url: process.env.APP_ASSET_URL + "/paypal-success",
        cancel_url: process.env.APP_ASSET_URL + "/paypal-failed",
        auto_bill_amount: "YES",
        initial_fail_amount_action: "CONTINUE",
        max_fail_attempts: "1",
      },
    };

    var YearlyPlanAttributes = {
      name: "Yearly Subscription",
      description: "Yearly subscription plan for our service",
      type: "INFINITE",
      payment_definitions: [
        {
          name: "Yearly Payment",
          type: "REGULAR",
          frequency: "YEAR",
          frequency_interval: "1",
          amount: {
            value: "500",
            currency: "USD",
          },
          cycles: "0",
          charge_models: [
            // {
            //   type: "TAX",
            //   amount: {
            //     value: "0.50",
            //     currency: "USD",
            //   },
            // },
            // {
            //   type: "SHIPPING",
            //   amount: {
            //     value: "1.00",
            //     currency: "USD",
            //   },
            // },
          ],
        },
      ],
      merchant_preferences: {
        return_url: process.env.APP_ASSET_URL + "/paypal-success",
        cancel_url: process.env.APP_ASSET_URL + "/paypal-failed",
        auto_bill_amount: "YES",
        initial_fail_amount_action: "CONTINUE",
        max_fail_attempts: "1",
      },
    };

    paypal.billingPlan.create(
      YearlyPlanAttributes,
      function (error, billingPlan) {
        if (error) {
          console.log(error);
          throw error;
        } else {
          console.log("Billing plan created successfully");
          console.log(billingPlan);
        }
      }
    );
  }

  static async activatePLan(req, res, next) {
    paypal.billingPlan.update(
      // "P-26U53436KN8575002KAU2H5I",
      "P-1VN53509JH894534XKC2GZQI",
      [
        {
          op: "replace",
          path: "/",
          value: {
            state: "ACTIVE",
          },
        },
      ],
      function (error, response) {
        if (error) {
          console.log("rror occured");
          console.log(error);
          throw error;
        } else {
          console.log("Billing plan activated successfully");
          console.log(response);
        }
      }
    );
  }

  static async createProduct(req, res, next) {
    const axios = require("axios");
    let data = JSON.stringify({
      name: "T-Shirt",
      type: "PHYSICAL",
      id: "1680696644",
      description: "Cotton XL",
      category: "CLOTHING",
      image_url: "https://example.com/gallary/images/1680696644.jpg",
      home_url: "https://example.com/catalog/1680696644.jpg",
    });
    const token = await getPayPalAccessToken();
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-m.sandbox.paypal.com/v1/catalogs/products",
      headers: {
        "Content-Type": "application/json",
        "PayPal-Request-Id": "b44c8d8a-fd12-4c11-a84c-00c95ca6f761",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static async createProduct(req, res, next) {
    const axios = require("axios");
    let data = JSON.stringify({
      name: "T-Shirt",
      type: "PHYSICAL",
      id: "1680696644",
      description: "Cotton XL",
      category: "CLOTHING",
      image_url: "https://example.com/gallary/images/1680696644.jpg",
      home_url: "https://example.com/catalog/1680696644.jpg",
    });
    const token = await getPayPalAccessToken();
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-m.sandbox.paypal.com/v1/catalogs/products",
      headers: {
        "Content-Type": "application/json",
        "PayPal-Request-Id": "b44c8d8a-fd12-4c11-a84c-00c95ca6f761",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static async createProductPlan(req,res,next){
    const axios = require("axios");
    const token = await getPayPalAccessToken();
    let data = JSON.stringify({
      product_id: "1680696644",
      name: "Fresh Clean Tees Plan",
      description:
        "Each shirt they send out to subscribers is designed with lots of attention to detail",
      status: "ACTIVE",
      billing_cycles: [
        {
          frequency: {
            interval_unit: "MONTH",
            interval_count: 1,
          },
          tenure_type: "TRIAL",
          sequence: 1,
          total_cycles: 1,
          pricing_scheme: {
            fixed_price: {
              value: "1",
              currency_code: "USD",
            },
          },
        },
        {
          frequency: {
            interval_unit: "MONTH",
            interval_count: 1,
          },
          tenure_type: "REGULAR",
          sequence: 2,
          total_cycles: 12,
          pricing_scheme: {
            fixed_price: {
              value: "44",
              currency_code: "USD",
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: "10",
          currency_code: "USD",
        },
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
      },
      taxes: {
        percentage: "10",
        inclusive: false,
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-m.sandbox.paypal.com/v1/billing/plans",
      headers: {
        "Content-Type": "application/json",
        "PayPal-Request-Id": "2d8c8592-2aa4-4eab-ab67-8e8989d1ff78",
        Prefer: "return=representation",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }
}

export default PaypalHandlerController;
