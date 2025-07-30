-- Update RLS policy to allow authenticated users to insert and view their own transactions
DROP POLICY IF EXISTS "Service role can manage transactions" ON transactions;

-- Allow authenticated users to insert transactions
CREATE POLICY "Users can insert transactions" 
ON transactions 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to view all transactions (for transfer history)
CREATE POLICY "Users can view transactions" 
ON transactions 
FOR SELECT 
USING (true);