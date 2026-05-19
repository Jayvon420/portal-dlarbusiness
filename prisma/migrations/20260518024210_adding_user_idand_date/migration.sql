-- DropIndex
DROP INDEX "Expense_userId_idx";

-- DropIndex
DROP INDEX "Payroll_userId_idx";

-- DropIndex
DROP INDEX "Purchase_userId_idx";

-- DropIndex
DROP INDEX "Sale_userId_idx";

-- CreateIndex
CREATE INDEX "Expense_userId_date_idx" ON "Expense"("userId", "date");

-- CreateIndex
CREATE INDEX "Payroll_userId_date_idx" ON "Payroll"("userId", "date");

-- CreateIndex
CREATE INDEX "Purchase_userId_date_idx" ON "Purchase"("userId", "date");

-- CreateIndex
CREATE INDEX "Sale_userId_date_idx" ON "Sale"("userId", "date");
