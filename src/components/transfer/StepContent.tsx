
import React, { useEffect } from 'react';
import { TransferData } from '@/pages/MobileMultiStepTransferSheetPage';
import StepOneTransfer from './StepOneTransfer';
import StepOneLocalTransfer from './StepOneLocalTransfer';
import StepOnePointFiveTransfer from './StepOnePointFiveTransfer';
import StepTwoTransfer from './StepTwoTransfer';
import StepTwoPointFiveTransfer from './StepTwoPointFiveTransfer';
import TransferSummary from './TransferSummary';
import PaymentMethodSelection from './PaymentMethodSelection';
import PaymentMethodSelector from './PaymentMethodSelector';
import TransferReceipt from './TransferReceipt';
import NativeButton from './NativeButton';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImpactStyle } from '@capacitor/haptics';

interface StepContentProps {
  currentStep: number;
  transferData: TransferData;
  updateTransferData: (data: Partial<TransferData>) => void;
  onPaymentSubmit: () => void;
  isPaymentLoading: boolean;
  isPaymentFormValid: boolean;
  transactionId: string;
  userEmail: string;
  receiptRef: React.RefObject<HTMLDivElement>;
  generateReceiptImage: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  canProceed: boolean;
  paymentError?: string | null;
  onClearError?: () => void;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  transferData,
  updateTransferData,
  onPaymentSubmit,
  isPaymentLoading,
  isPaymentFormValid,
  transactionId,
  userEmail,
  receiptRef,
  generateReceiptImage,
  onNextStep,
  onPreviousStep,
  canProceed,
  paymentError,
  onClearError
}) => {
  const navigate = useNavigate();

  // Debug logging for step 4
  useEffect(() => {
    if (currentStep === 4) {
      console.log('Step 4 - Transfer Summary rendering');
      console.log('Transfer data for summary:', transferData);
    }
  }, [currentStep, transferData]);

  // Helper function to get button text based on step
  const getButtonText = () => {
    if (currentStep === 7) {
      if (isPaymentLoading) {
        return transferData.transferType === 'national' ? 'Processing MonCash Payment...' : 'Processing...';
      }
      return transferData.transferType === 'national' 
        ? `Pay HTG ${(parseFloat(transferData.amount) * 127.5).toFixed(2)} with MonCash`
        : `Pay $${(parseFloat(transferData.amount) + Math.ceil(parseFloat(transferData.amount) / 100) * 15).toFixed(2)}`;
    }
    if (currentStep === 1) return 'Continue';
    if (currentStep === 8) return 'Done';
    return 'Next';
  };

  // Helper function to get button color based on step
  const getButtonColor = () => {
    return 'bg-slate-500 hover:bg-slate-600';
  };

  // Helper function to render sticky continue buttons for steps 1-7
  // Helper function to render sticky continue buttons for steps 1-7
const renderContinueButtons = () => {
  if (currentStep >= 8) return null; // No buttons for success step and receipt step

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white px-4 py-3">
      <div className="space-y-3 max-w-md mx-auto">
        {/* Continue/Pay Button - without animation */}
        <NativeButton 
          onClick={currentStep === 7 ? onPaymentSubmit : onNextStep}
          disabled={
            !canProceed || 
            isPaymentLoading || 
            (currentStep === 7 && transferData.transferType === 'international' && !isPaymentFormValid)
          }
          className={`h-14 rounded-2xl font-semibold text-white transition-all duration-300 ${getButtonColor()}`}
          hapticStyle={currentStep === 7 ? ImpactStyle.Heavy : ImpactStyle.Medium}
        >
          {getButtonText()}
        </NativeButton>

        {/* Notice for international and national transfers */}
        {currentStep === 1 && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <svg 
              className="w-4 h-4 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {transferData.transferType === 'international' 
                ? 'Send money internationally to Haiti from anywhere'
                : 'Send money locally within Haiti'
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

  return (
    <motion.div 
      className="px-4 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-medium text-foreground mb-1">
                How much are you sending?
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the amount you want to send
              </p>
            </div>

            {transferData.transferType === 'national' ? (
              <StepOneLocalTransfer
                amount={transferData.amount}
                onAmountChange={(amount) => updateTransferData({ amount })}
              />
            ) : (
              <StepOneTransfer
                amount={transferData.amount}
                onAmountChange={(amount) => updateTransferData({ amount })}
              />
            )}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-foreground mb-1">
              How should they receive it?
            </h1>
            <p className="text-sm text-muted-foreground">
              Choose your preferred delivery method
            </p>
          </div>
          
          <StepOnePointFiveTransfer
            transferDetails={transferData.transferDetails}
            onTransferDetailsChange={(transferDetails) => updateTransferData({ transferDetails })}
          />
        </div>
      )}

      {currentStep === 3 && (
        <StepTwoTransfer
          receiverDetails={transferData.receiverDetails}
          onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
          transferDetails={transferData.transferDetails}
        />
      )}

      {currentStep === 4 && (
        <StepTwoPointFiveTransfer
          receiverDetails={transferData.receiverDetails}
          onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
        />
      )}

      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-medium text-gray-900 mb-1">
              Does everything look right?
            </h1>
            <p className="text-sm text-gray-600">Review your transfer details before proceeding</p>
          </div>

          <TransferSummary
            transferData={{
              ...transferData,
              transferType: transferData.transferType || 'international'
            }}
          />
        </div>
      )}

      {currentStep === 6 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-1">
              How would you like to pay?
            </h1>
            <p className="text-sm text-gray-600">
              Choose your preferred payment method
            </p>
          </div>
          
          <PaymentMethodSelection
            selectedMethod={transferData.selectedPaymentMethod || 'credit-card'}
            onMethodSelect={(method) => updateTransferData({ selectedPaymentMethod: method })}
            transferType={transferData.transferType}
          />
        </div>
      )}

      {currentStep === 7 && (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-foreground mb-1">
              Complete your payment
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your payment details to complete the transfer
            </p>
          </div>

          {/* Payment Error Display */}
          {paymentError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Payment Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{paymentError}</p>
                    </div>
                  </div>
                </div>
                {onClearError && (
                  <button
                    onClick={onClearError}
                    className="ml-3 text-red-400 hover:text-red-600"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          
          <PaymentMethodSelector
            transferData={transferData}
            onPaymentSubmit={onPaymentSubmit}
            isPaymentLoading={isPaymentLoading}
            isPaymentFormValid={isPaymentFormValid}
          />
        </div>
      )}

      {currentStep === 8 && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Success Message */}
          <div className="text-center space-y-4">
            <motion.div 
              className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <motion.svg 
                className="w-10 h-10 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </motion.svg>
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-2xl font-semibold text-green-600">Payment Successful!</h1>
              <p className="text-sm text-muted-foreground">
                Your transfer has been processed successfully
              </p>
              {transactionId && (
                <p className="text-xs text-muted-foreground">
                  Transaction ID: {transactionId}
                </p>
              )}
            </motion.div>
          </div>

        </motion.div>
      )}

      {currentStep === 9 && (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <TransferReceipt
            ref={receiptRef}
            transferData={transferData}
            transactionId={transactionId}
            userEmail={userEmail}
          />

          <div className="flex gap-3">
            <NativeButton
              variant="outline"
              onClick={generateReceiptImage}
              className="flex-1 h-12 rounded-xl"
              hapticStyle={ImpactStyle.Light}
            >
              Share Receipt
            </NativeButton>
            <NativeButton
              onClick={() => {
                // Reset transfer state and navigate to for-you page
                const resetEvent = new CustomEvent('resetTransferState');
                window.dispatchEvent(resetEvent);
                navigate('/for-you');
              }}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover"
              hapticStyle={ImpactStyle.Medium}
            >
              Done
            </NativeButton>
          </div>
        </motion.div>
      )}

      {/* Continue Buttons for all steps except final receipt step */}
      {renderContinueButtons()}
    </motion.div>
  );
};

export default StepContent;
