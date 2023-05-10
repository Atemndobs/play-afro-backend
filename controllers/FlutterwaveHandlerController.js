import Subscription from "../models/subscription";
import FlutterWaveService, {FlutterEvenStatus, FlutterWaveEvent} from "../services/flutterWave.service";
class FlutterwaveHandlerController {

    /**
     * ## REQUESTING MOBILE MONEY PAYMENTS
     * When the user wants to issue a payment,
     * The Frontend app will request this route.
     * This route will:
     * 1. Validate the `req.body` to make sure the payload sent was valid
     * 2. FlutterWave SDk will send the payment request to the corresponding network operator.
     *  2.1 This request can fail at this stage maybe because the user has insufficient funds or the account is blocked
     *  2.2 If the request succeeds,this doesn't mean the payment has been processed.
     *      this means the network operator handle the payment and transfer funds to our account and when
     *      that is done the network will send a reply back to our server indicating weather the payment
     *      was completed or not accordingly. So we use the webhook to listen to these events.
     * 3. Save the payment data in the database
     * 4. Send a success or error response back to the user
     *
     */
    static async chargeCreate(req, res, next) {
        try {
            /**
             * Get the data from the front end:
             * userId: The userId of the user's issuing the payment, Note you can extend the Payment to take the celebrity's number.
             * email: email of the user issuing the payment
             * phoneNumber: the phone number of the user issuing the payment
             * amount: the amount of the transaction
             * COUNTRY: ISO2 (OR ALPHA-2) code of the country
             * !!IMPORTANT: COUNTRY MUST BE ISO2 (OR ALPHA-2) CODE
             * @see {https://www.iban.com/country-codes}
             */
            const { userId, email, phoneNumber, amount, country } = req.body;
            // Construct object to send to FlutterWave
            const payload = {
                // The phone number
                phone_number: FlutterWaveService.formatPhoneNumber(phoneNumber),
                // The amount
                amount,
                // Currency: If the country is cameroon set it to XAF else set it to XOF
                currency: FlutterWaveService.getCurrencyFromCountryCode(country),
                //Country: possible 'CM' (Cameroon), 'SN' (Senegal), 'BF' (Burkina Faso) and 'CI' (Côte d'Ivoire).
                country: country,
                // The customer's email
                email,
                // The transaction reference, this is a unique id generated for each transaction
                // You can replace this with a transaction id generated by your system
                tx_ref: FlutterWaveService.generateTransactionReference(),
            };
            /**
             * Call FlutterWave SDK to request payment from user
             */
            const payData = await FlutterWaveService.requestFrancoMobileMoneyPayment(payload);
            /**
             * Save the payment into the database,
             * specify the user_id (id from your db) of the user issuing the payment
             * Again, you can extend this payment model and add the id of the celebrity
             */


            res.status(200).json({
                data: payData, // sending the payment data to front-end application
                message:
                    "Payment has been initiated, Please dial the code to complete payment",
            });
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).json({
                    message: error.message,
                    errorText: error.toString(),
                });
            }
            // log.error(err);
            res.status(500).json({
                message: "There was an error completing the payment",
                errorText: err.toString(),
            });
        }
    }

    static async transfer(req, res, next) {
        try {
            const { userId, phoneNumber, amount, country } = req.body;
            // Construct object to send to FlutterWave
            const payload = {
                account_bank: "FMM",
                account_number: FlutterWaveService.formatPhoneNumber(phoneNumber),
                amount: amount,
                narration: "New franco transfer",
                currency: "XAF",
                reference: "new-franco-momo-test-transfer",
                beneficiary_name: "Flutterwave Developers",
            };
            /**
             * Call FlutterWave SDK to request payment from user
             */
            const payData = await FlutterWaveService.requestFrancoMobileMoneyTransfer(payload);
            /**
             * Save the payment into the database,
             * specify the user_id (id from your db) of the user issuing the payment
             * Again, you can extend this payment model and add the id of the celebrity
             */
            // const payment = new Payment({ ...payData.data, user_id: userId });

            // await payment.save();
            console.log(payData);

            res.status(200).json({
                data: payData, // sending the payment data to front-end application
                message:
                    "Payment has been initiated, Please dial the code to complete payment",
            });
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).json({
                    message: error.message,
                    errorText: error.toString(),
                });
            }
            // log.error(err);
            res.status(500).json({
                message: "There was an error completing the payment",
                errorText: err.toString(),
            });
        }
    }

    static async refund(req, res, next) {
        try {
            const { transactionId, amount, comments } = req.body;
            // Construct object to send to FlutterWave
            const payload = {
                id: transactionId,
                amount,
                comments,
            };

            const payData = await FlutterWaveService.requestMobileMoneyRefund(payload);

            res.status(200).json({ data: payData });
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).json({
                    message: error.message,
                    errorText: error.toString(),
                });
            }
            // log.error(err);
            res.status(500).json({
                message: "There was an error completing the payment",
                errorText: err.toString(),
            });
        }
    }

    /**
     * PAYMENT WEBHOOK RESPONSE
     * FlutterWave will send a response to this payment hook, make sure to add this user to the flutter dashboard
     * for example if the live server url is https://api.wishme.com, on the Flutter dashboard add this:
     *  https://api.wishme.com/payment/webhook
     *  For more documentation
     *  @see {https://developer.flutterwave.com/docs/integration-guides/webhooks/}
     */
    static async webhook(req, res, next) {
        try {
            const {event, data} = req.body;
            /**
             * If payment was successful
             */
            if (
                event === FlutterWaveEvent.CHARGE_COMPLETED &&
                data.status.toLowerCase() === FlutterEvenStatus.SUCCESSFUL
            ) {
                // TODO: NOTIFY USERS PAYMENT WAS SUCCESSFUL
                await Subscription.update(
                    {
                        status: "ACTIVE",
                        expiry_date: exp_date * 1000,
                    },
                    { where: { subscription_id: data.object.subscription } }
                );
            }
            /**
             * If payment failed
             */
            if (
                event === FlutterWaveEvent.CHARGE_COMPLETED &&
                data.status.toLowerCase() === FlutterEvenStatus.FAILED
            ) {
                // TODO: NOTIFY USERS PAYMENT WAS NOT SUCCESSFUL
                await Subscription.update(
                    {
                        status: "FAILED",
                        expiry_date: exp_date * 1000,
                    },
                    { where: { subscription_id: data.object.subscription } }
                );
            }

            Object.assign(payment, data);

            await payment.save();

            res.status(200).json({message: "Webhook was completed successfully"});
        } catch (e) {
            res.status(500).json({
                errorText: e.toString(),
                message: "Unable to update payment on server",
            });
        }
    }
}


export default FlutterwaveHandlerController;