import Flutterwave from "flutterwave-node-v3";
import {
  generateTransactionReference,
  getCurrencyFromCountryCode,
} from "./payment";
/**
 * Initialize the FlutterWave SDK,
 * NB: The PUBLIC_TEST_KEY and SECRET_TEST_KEY should be gotten the FlutterWave dashboard
 */
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_TEST_KEY,
  process.env.FLW_SECRET_TEST_KEY
);

class FlutterWaveService {
    static requestFrancoMobileMoneyPayment(payload) {
        return flw.MobileMoney.franco_phone(payload);
    }
      
    static requestFrancoMobileMoneyTransfer(payload) {
        return flw.Transfer.initiate(payload);
    }
      
    static requestMobileMoneyRefund(payload) {
        return flw.Transaction.refund(payload);
    }
}

export const FlutterEvenStatus = {
    PENDING: 'pending',
    SUCCESSFUL: 'successful',
    FAILED: 'failed'
}

export const FlutterWaveEvent = {
    CHARGE_COMPLETED: 'charge.completed',
    TRANSFER_COMPLETED: 'transfer.completed',
    SUBSCRIPTION_CANCELLED: 'subscription.cancelled'
}

export default FlutterWaveService;