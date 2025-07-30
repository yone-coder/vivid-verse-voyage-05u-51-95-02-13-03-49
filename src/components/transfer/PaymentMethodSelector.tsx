import React, { useEffect } from 'react';
import { TransferData } from '@/pages/MobileMultiStepTransferSheetPage';
import MonCashPaymentInfo from './MonCashPaymentInfo';
import PayPalCheckout from './PayPalCheckout';

interface PaymentMethodSelectorProps {
  transferData: TransferData;
  onPaymentSubmit: () => void;
  isPaymentLoading: boolean;
  isPaymentFormValid: boolean;
  setIsPaymentFormValid?: (isValid: boolean) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  transferData,
  onPaymentSubmit,
  isPaymentLoading,
  isPaymentFormValid,
  setIsPaymentFormValid
}) => {
  const receiverAmount = transferData.amount ? (parseFloat(transferData.amount) * 127.5).toFixed(2) : '0.00';
  const receiverName = `${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName}`;

  // Listen for form validation changes
  useEffect(() => {
    const handleFormValidation = (event: any) => {
      // Handle validation if needed
    };

    const handleEmailCapture = (event: any) => {
      // Handle email capture if needed
    };

    // Don't handle payment success/error here - let the main page handle it
    // The main page already has proper event listeners for these events

    window.addEventListener('paymentFormValidation', handleFormValidation);
    window.addEventListener('emailCaptured', handleEmailCapture);

    return () => {
      window.removeEventListener('paymentFormValidation', handleFormValidation);
      window.removeEventListener('emailCaptured', handleEmailCapture);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Always preload PayPal for international transfers to avoid loading delays */}
      {transferData.transferType === 'international' && (
       <div className="space-y-6 "> {/* Reduces left/right padding by 16px */}
  <PayPalCheckout
    transferAmount={transferData.amount}
    onFormValidation={(isValid) => {
      setIsPaymentFormValid?.(isValid);
      // Dispatch form validation event
      const validationEvent = new CustomEvent('paymentFormValidation', {
        detail: { isValid }
      });
      window.dispatchEvent(validationEvent);
    }}
    onEmailCapture={(email) => {
      // Handle email capture
    }}
    onPaymentSuccess={(orderDetails) => {
      // Payment success is handled by the main page
    }}
    onPaymentError={(message) => {
      // Payment error is handled by the main page
    }}
  />
</div>
      )}

      {/* MonCash payment for national transfers */}
      {transferData.transferType === 'national' && (
        <MonCashPaymentInfo
          receiverAmount={receiverAmount}
          receiverName={receiverName}
        />
      )}
    </div>
  );
};

export default PaymentMethodSelector;
