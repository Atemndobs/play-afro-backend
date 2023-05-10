const Flutterwave = require('flutterwave-node-v3');
const shortId = require('short-uuid');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

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
class FlutterWaveService {
    static async requestFrancoMobileMoneyPayment(payload) {
        return flw.MobileMoney.franco_phone(payload);
    }

    static async requestFrancoMobileMoneyTransfer(payload) {
        return flw.Transfer.initiate(payload);
    }

    static async requestMobileMoneyRefund(payload) {
        return flw.Transaction.refund(payload);
    }
    static async generateTransactionReference() {
        const d = new Date();
        return `txn_${d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear().toString().slice(-2)}_${shortId.generate()}`
    }

    static async formatPhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.replace(/\D/g, '');
        if (!phoneNumber.startsWith('237')) return phoneNumber;
        return `237${phoneNumber}`
    }

    static async getCurrencyFromCountryCode(iso) {
        switch (iso.toUpperCase()){
            case 'RW':
                return 'RWF' // Rwanda (RWF)
            case 'TZ':
                return 'TZS' // Tanzania (TZS)
            case 'UG':
                return 'UGX'; // Uganda (UGX)
            case 'ZM':
                return 'ZMW';  //  Zambia (ZMW)
            case 'CM':  // 'CM' (Cameroon)
                return 'XAF';
            case 'SN':  // 'SN' (Senegal).
            case 'BF':  // 'BF' (Burkina Faso).
            case 'CI': // 'CI' (Côte d'Ivoire)
                return 'XOF';
            default:
                return '';
        }
    }
}

export default FlutterWaveService;
