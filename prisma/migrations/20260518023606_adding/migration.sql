-- CreateIndex
CREATE INDEX "Expense_userId_idx" ON "Expense"("userId");

-- CreateIndex
CREATE INDEX "Expense_date_idx" ON "Expense"("date");

-- CreateIndex
CREATE INDEX "Expense_legacyId_idx" ON "Expense"("legacyId");

-- CreateIndex
CREATE INDEX "Payroll_userId_idx" ON "Payroll"("userId");

-- CreateIndex
CREATE INDEX "Payroll_date_idx" ON "Payroll"("date");

-- CreateIndex
CREATE INDEX "Payroll_legacyId_idx" ON "Payroll"("legacyId");

-- CreateIndex
CREATE INDEX "Purchase_userId_idx" ON "Purchase"("userId");

-- CreateIndex
CREATE INDEX "Purchase_date_idx" ON "Purchase"("date");

-- CreateIndex
CREATE INDEX "Purchase_legacyId_idx" ON "Purchase"("legacyId");

-- CreateIndex
CREATE INDEX "Sale_userId_idx" ON "Sale"("userId");

-- CreateIndex
CREATE INDEX "Sale_date_idx" ON "Sale"("date");

-- CreateIndex
CREATE INDEX "Sale_legacyId_idx" ON "Sale"("legacyId");
