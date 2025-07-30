import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import { Search, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type Transfer = {
  id: string;
  reference: string;
  recipientFullName: string;
  amount: string;
  date: string;
  status: string;
};

const getStatusBadgeClasses = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
    case 'in_transit':
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const TransferHistoryPage = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const pageSize = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      // Transform transactions to match Transfer type
      const transformedTransfers: Transfer[] = transactions.map(transaction => ({
        id: transaction.id.toString(),
        reference: transaction.transaction_id,
        recipientFullName: transaction.item_name?.replace('Transfer to ', '') || 'Unknown Recipient',
        amount: `$${transaction.paid_amount}`,
        date: new Date(transaction.created).toISOString().split('T')[0],
        status: transaction.payment_status?.toLowerCase() === 'completed' ? 'completed' : 
               transaction.payment_status?.toLowerCase() === 'pending' ? 'pending' : 'failed'
      }));

      setTransfers(transformedTransfers);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtered and searched transfers
  const filteredTransfers = useMemo(() => {
    if (!search.trim()) return transfers;
    const lower = search.trim().toLowerCase();
    return transfers.filter(t =>
      t.reference.toLowerCase().includes(lower) ||
      t.recipientFullName.toLowerCase().includes(lower) ||
      t.amount.toLowerCase().includes(lower) ||
      t.date.toLowerCase().includes(lower) ||
      t.status.toLowerCase().includes(lower)
    );
  }, [transfers, search]);

  const totalPages = Math.max(1, Math.ceil(filteredTransfers.length / pageSize));
  const paginatedTransfers = useMemo(
    () =>
      filteredTransfers.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredTransfers, currentPage, pageSize]
  );

  function handleCardClick(id: string) {
    console.log('Card clicked:', id);
    navigate(`/transfer-history/${id}`);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  const goToPreviousPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10">
        <PageHeader
          title="Transfer History"
          subtitle="A clean overview of your past money transfers. Click on a card to see more details."
        />
      </div>
      <main className="max-w-2xl mx-auto px-2 py-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search by name, code, amount, date, or status…"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Transfer Cards */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500 py-12">
              Loading transfer history...
            </div>
          ) : paginatedTransfers.length > 0 ? (
            paginatedTransfers.map((transfer) => (
              <div
                key={transfer.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                tabIndex={0}
                aria-label={`Open details for transfer to ${transfer.recipientFullName}`}
                onClick={() => handleCardClick(transfer.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(transfer.id);
                  }
                }}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 truncate pr-2">
                      {transfer.recipientFullName}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadgeClasses(transfer.status)}`}>
                      {transfer.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>
                      Code: <span className="font-mono text-gray-700">{transfer.reference}</span>
                    </span>
                    <span>{transfer.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{transfer.amount}</span>
                    <span className="flex items-center text-blue-600 text-xs">
                      <ChevronRight className="w-4 h-4 mr-1" /> View details
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-12">
              {search ? 'No transfers found matching your search.' : 'No transfers found.'}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center sticky bottom-0 bg-gray-50 py-4">
            <nav className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
};

export default TransferHistoryPage;