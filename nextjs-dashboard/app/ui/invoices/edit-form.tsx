'use client';

import { InvoiceForm, CustomerField } from '@/app/lib/definitions';
import { updateInvoice, State } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import Link from 'next/link';

const initialState: State = { message: null, errors: {} };

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(
    updateInvoiceWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer */}
        <div className="mb-4">
          <label htmlFor="customer">Customer</label>
          <select
            id="customer"
            name="customerId"
            defaultValue={invoice.customer_id}
            aria-describedby={state?.errors?.customerId ? 'customer-error' : undefined}
            className="block w-full rounded-md border px-2 py-2"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {state?.errors?.customerId && (
            <p id="customer-error" className="mt-2 text-sm text-red-600" aria-live="polite">
              {state.errors.customerId.join(', ')}
            </p>
          )}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            defaultValue={invoice.amount}
            aria-describedby={state?.errors?.amount ? 'amount-error' : undefined}
            className="block w-full rounded-md border px-2 py-2"
          />
          {state?.errors?.amount && (
            <p id="amount-error" className="mt-2 text-sm text-red-600" aria-live="polite">
              {state.errors.amount.join(', ')}
            </p>
          )}
        </div>

        {/* Status */}
        <fieldset>
          <legend>Status</legend>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="pending"
                defaultChecked={invoice.status === 'pending'}
              />
              Pending
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="status"
                value="paid"
                defaultChecked={invoice.status === 'paid'}
              />
              Paid
            </label>
          </div>
          {state?.errors?.status && (
            <p id="status-error" className="mt-2 text-sm text-red-600" aria-live="polite">
              {state.errors.status.join(', ')}
            </p>
          )}
        </fieldset>
      </div>

      {state?.message && (
        <p className="mt-4 text-sm text-red-600" aria-live="polite">{state.message}</p>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
        >
          Cancel
        </Link>
        <Button type="submit">Update Invoice</Button>
      </div>
    </form>
  );
}
