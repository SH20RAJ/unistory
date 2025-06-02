import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Gift, AlertCircle, Loader2 } from 'lucide-react';

// Mock valid referral codes for testing
const MOCK_VALID_CODES = ['SHARE2024', 'FRIEND123', 'WELCOME50', 'CAMPUS2024', 'STUDENT21'];

export function ReferralCodeInput({ 
  value, 
  onChange, 
  onValidate,
  validationState = null, // null, 'valid', 'invalid', 'loading'
  error = null,
  showReward = false 
}) {
  const [isValidating, setIsValidating] = React.useState(false);
  const [localValidationState, setLocalValidationState] = React.useState(null);
  const [localError, setLocalError] = React.useState(null);

  const handleValidation = async (code) => {
    if (!code || code.length < 6) {
      setLocalValidationState(null);
      setLocalError(null);
      return;
    }
    
    setIsValidating(true);
    setLocalValidationState('loading');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (MOCK_VALID_CODES.includes(code.toUpperCase())) {
      setLocalValidationState('valid');
      setLocalError(null);
      if (onValidate) {
        onValidate(code, 'valid');
      }
    } else {
      setLocalValidationState('invalid');
      setLocalError('Invalid referral code. Please check and try again.');
      if (onValidate) {
        onValidate(code, 'invalid', 'Invalid referral code. Please check and try again.');
      }
    }
    
    setIsValidating(false);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (value && value.length >= 6) {
        handleValidation(value);
      } else {
        setLocalValidationState(null);
        setLocalError(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  // Use props validation state if provided, otherwise use local state
  const currentValidationState = validationState !== null ? validationState : localValidationState;
  const currentError = error !== null ? error : localError;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Input
          placeholder="Enter referral code (optional)"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className={`pr-10 ${
            currentValidationState === 'valid' 
              ? 'border-green-500' 
              : currentValidationState === 'invalid' 
              ? 'border-red-500' 
              : ''
          }`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isValidating || currentValidationState === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : currentValidationState === 'valid' ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : currentValidationState === 'invalid' ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : null}
        </div>
      </div>

      {currentValidationState === 'valid' && showReward && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <Gift className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700 dark:text-green-400">
            Great! You'll receive 50 bonus points when you complete signup.
          </AlertDescription>
        </Alert>
      )}

      {currentValidationState === 'invalid' && currentError && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700 dark:text-red-400">
            {currentError}
          </AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400">
        Have a friend on Unistory? Use their referral code to get bonus points!
      </div>
    </div>
  );
}

export default ReferralCodeInput;
