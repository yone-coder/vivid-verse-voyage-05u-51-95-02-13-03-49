
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StepIndicator from '@/components/transfer/StepIndicator';
import DesktopStepContent from './DesktopStepContent';
import PaymentLoadingOverlay from '@/components/transfer/PaymentLoadingOverlay';
import { TransferData } from './DesktopMultiStepTransferPage';

interface DesktopTransferProcessProps {
  currentStep: number;
  transferData: TransferData;
  updateTransferData: (data: Partial<TransferData>) => void;
  onPaymentSubmit: () => void;
  isPaymentLoading: boolean;
  isPaymentFormValid: boolean;
  setIsPaymentFormValid: (isValid: boolean) => void;
  transactionId: string;
  userEmail: string;
  receiptRef: React.RefObject<HTMLDivElement>;
  generateReceiptImage: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  canProceed: boolean;
  setCurrentStep: (step: number) => void;
}

const DesktopTransferProcess: React.FC<DesktopTransferProcessProps> = ({
  currentStep,
  transferData,
  updateTransferData,
  onPaymentSubmit,
  isPaymentLoading,
  isPaymentFormValid,
  setIsPaymentFormValid,
  transactionId,
  userEmail,
  receiptRef,
  generateReceiptImage,
  handleNextStep,
  handlePreviousStep,
  canProceed,
  setCurrentStep
}) => {
  return (
    <>
      <div className="space-y-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Main Transfer Card */}
        <Card className="border border-border">
          <CardContent className="p-8">
            <DesktopStepContent
              currentStep={currentStep}
              transferData={transferData}
              updateTransferData={updateTransferData}
              onPaymentSubmit={onPaymentSubmit}
              isPaymentLoading={isPaymentLoading}
              isPaymentFormValid={isPaymentFormValid}
              setIsPaymentFormValid={setIsPaymentFormValid}
              transactionId={transactionId}
              userEmail={userEmail}
              receiptRef={receiptRef}
              generateReceiptImage={generateReceiptImage}
              setCurrentStep={setCurrentStep}
            />
          </CardContent>

          {/* Navigation Footer */}
          {currentStep < 8 && currentStep !== 7 && (
            <div className="border-t border-border bg-muted/30 px-8 py-6 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
                size="lg"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="text-sm text-muted-foreground font-medium">
                Step {currentStep} of 8
              </div>

              <Button
                variant="default"
                onClick={handleNextStep}
                disabled={!canProceed || isPaymentLoading}
                className="flex items-center gap-2"
                size="lg"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Payment Loading Overlay */}
      <PaymentLoadingOverlay isVisible={isPaymentLoading} />
    </>
  );
};

export default DesktopTransferProcess;
