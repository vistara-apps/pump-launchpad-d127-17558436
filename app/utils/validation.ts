// Form validation utilities

export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
};

// Project creation form validation
export function validateProjectForm(data: {
  projectName: string;
  tokenName: string;
  tokenSymbol: string;
  fundingGoal: number;
  startDate: string;
  endDate: string;
  tokenomicsDetails: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Project name validation
  if (!data.projectName.trim()) {
    errors.push({ field: 'projectName', message: 'Project name is required' });
  } else if (data.projectName.length < 3) {
    errors.push({ field: 'projectName', message: 'Project name must be at least 3 characters' });
  } else if (data.projectName.length > 50) {
    errors.push({ field: 'projectName', message: 'Project name must be less than 50 characters' });
  }

  // Token name validation
  if (!data.tokenName.trim()) {
    errors.push({ field: 'tokenName', message: 'Token name is required' });
  } else if (data.tokenName.length < 2) {
    errors.push({ field: 'tokenName', message: 'Token name must be at least 2 characters' });
  } else if (data.tokenName.length > 30) {
    errors.push({ field: 'tokenName', message: 'Token name must be less than 30 characters' });
  }

  // Token symbol validation
  if (!data.tokenSymbol.trim()) {
    errors.push({ field: 'tokenSymbol', message: 'Token symbol is required' });
  } else if (!/^[A-Z0-9]{2,10}$/.test(data.tokenSymbol)) {
    errors.push({ 
      field: 'tokenSymbol', 
      message: 'Token symbol must be 2-10 uppercase letters or numbers' 
    });
  }

  // Funding goal validation
  if (!data.fundingGoal || data.fundingGoal <= 0) {
    errors.push({ field: 'fundingGoal', message: 'Funding goal must be greater than 0' });
  } else if (data.fundingGoal > 1000000) {
    errors.push({ field: 'fundingGoal', message: 'Funding goal must be less than 1,000,000 SOL' });
  }

  // Date validation
  if (!data.startDate) {
    errors.push({ field: 'startDate', message: 'Start date is required' });
  }
  
  if (!data.endDate) {
    errors.push({ field: 'endDate', message: 'End date is required' });
  }
  
  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const now = new Date();
    
    if (start < now) {
      errors.push({ field: 'startDate', message: 'Start date must be in the future' });
    }
    
    if (end <= start) {
      errors.push({ field: 'endDate', message: 'End date must be after start date' });
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Contribution form validation
export function validateContribution(
  amount: string, 
  currency: 'SOL' | 'USDC', 
  minContribution: number = 0.1,
  maxContribution: number = 1000
): ValidationResult {
  const errors: ValidationError[] = [];
  const numAmount = parseFloat(amount);

  if (!amount.trim()) {
    errors.push({ field: 'amount', message: `Please enter an amount in ${currency}` });
  } else if (isNaN(numAmount)) {
    errors.push({ field: 'amount', message: `Please enter a valid number` });
  } else if (numAmount < minContribution) {
    errors.push({ 
      field: 'amount', 
      message: `Minimum contribution is ${minContribution} ${currency}` 
    });
  } else if (numAmount > maxContribution) {
    errors.push({ 
      field: 'amount', 
      message: `Maximum contribution is ${maxContribution} ${currency}` 
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

