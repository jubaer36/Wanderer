import React, { useState } from 'react';
import { CreditCard, Plus, Edit3, Trash2, Check, X, DollarSign, Clock, MapPin, Calendar, Download, Receipt, Filter, Search } from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'methods' | 'history' | 'invoices'>('methods');
  const [showAddCard, setShowAddCard] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'refunded'>('all');

  const paymentMethods = [
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true,
      name: 'John Doe'
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiry: '08/25',
      isDefault: false,
      name: 'John Doe'
    },
    {
      id: 3,
      type: 'paypal',
      email: 'john.doe@email.com',
      isDefault: false,
      name: 'John Doe'
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'booking',
      description: 'Cox\'s Bazar Beach Holiday Tour',
      amount: 15000.00,
      currency: 'BDT',
      status: 'completed',
      date: '2024-03-15',
      paymentMethod: 'Visa ****4242',
      bookingId: 'WL-2024-001',
      category: 'tour',
      location: 'Cox\'s Bazar, Bangladesh',
      refundable: true
    },
    {
      id: 2,
      type: 'booking',
      description: 'Sylhet Tea Resort - 3 nights',
      amount: 8500.00,
      currency: 'BDT',
      status: 'completed',
      date: '2024-05-20',
      paymentMethod: 'Mastercard ****8888',
      bookingId: 'WL-2024-002',
      category: 'accommodation',
      location: 'Sylhet, Bangladesh',
      refundable: true
    },
    {
      id: 3,
      type: 'booking',
      description: 'Chittagong Hill Tracts Adventure - 4 days',
      amount: 12000.00,
      currency: 'BDT',
      status: 'pending',
      date: '2024-12-10',
      paymentMethod: 'Visa ****4242',
      bookingId: 'WL-2024-003',
      category: 'tour',
      location: 'Bandarban, Bangladesh',
      refundable: true
    },
    {
      id: 4,
      type: 'refund',
      description: 'Cancelled: Rangamati Lake Cruise',
      amount: -6000.00,
      currency: 'BDT',
      status: 'refunded',
      date: '2024-02-28',
      paymentMethod: 'Visa ****4242',
      bookingId: 'WL-2024-004',
      category: 'tour',
      location: 'Rangamati, Bangladesh',
      refundable: false
    },
    {
      id: 5,
      type: 'fee',
      description: 'Travel Insurance Premium',
      amount: 2500.00,
      currency: 'BDT',
      status: 'completed',
      date: '2024-03-10',
      paymentMethod: 'PayPal',
      bookingId: 'WL-INS-001',
      category: 'insurance',
      location: 'Global Coverage',
      refundable: false
    }
  ];

  const invoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      description: 'Cox\'s Bazar Beach Holiday Tour',
      amount: 15000.00,
      currency: 'BDT',
      issueDate: '2024-03-15',
      dueDate: '2024-03-25',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      description: 'Sylhet Tea Resort - 3 nights',
      amount: 8500.00,
      currency: 'BDT',
      issueDate: '2024-05-20',
      dueDate: '2024-05-30',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      description: 'Chittagong Hill Tracts Adventure - 4 days',
      amount: 12000.00,
      currency: 'BDT',
      issueDate: '2024-12-10',
      dueDate: '2024-12-20',
      status: 'pending',
      downloadUrl: '#'
    }
  ];

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'paypal':
        return '💰';
      default:
        return '💳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tour':
        return '🎯';
      case 'accommodation':
        return '🏨';
      case 'transportation':
        return '✈️';
      case 'insurance':
        return '🛡️';
      default:
        return '📄';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchQuery === '' ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || transaction.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const totalSpent = transactions
    .filter(t => t.type === 'booking' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payments & Billing</h1>
        <p className="text-gray-600">Manage your payment methods, view transaction history, and download invoices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">৳{totalSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">৳{pendingAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{paymentMethods.length}</p>
              <p className="text-sm text-gray-600">Payment Methods</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Receipt size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
              <p className="text-sm text-gray-600">Invoices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {[
            { key: 'methods', label: 'Payment Methods' },
            { key: 'history', label: 'Transaction History' },
            { key: 'invoices', label: 'Invoices & Receipts' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Methods Tab */}
      {activeTab === 'methods' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Saved Payment Methods</h2>
            <button 
              onClick={() => setShowAddCard(true)}
              className="btn btn-primary"
            >
              <Plus size={18} className="mr-2" />
              Add Payment Method
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCardIcon(method.type)}</span>
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">{method.type}</p>
                      <p className="text-sm text-gray-600">
                        {method.type === 'paypal' ? method.email : `****${method.last4}`}
                      </p>
                    </div>
                  </div>
                  
                  {method.isDefault && (
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                      Default
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    {method.type !== 'paypal' && `Expires ${method.expiry}`}
                  </p>
                  <p className="text-sm font-medium text-gray-900">{method.name}</p>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 btn btn-outline btn-sm">
                    <Edit3 size={14} className="mr-1" />
                    Edit
                  </button>
                  <button className="flex-1 btn btn-outline btn-sm text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Payment Method Modal */}
          {showAddCard && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg max-w-md w-full m-4 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Add Payment Method</h3>
                  <button 
                    onClick={() => setShowAddCard(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="setDefault"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="setDefault" className="ml-2 block text-sm text-gray-900">
                      Set as default payment method
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowAddCard(false)}
                      className="flex-1 btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 btn btn-primary">
                      Add Card
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Transaction History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Transactions' },
                  { key: 'completed', label: 'Completed' },
                  { key: 'pending', label: 'Pending' },
                  { key: 'refunded', label: 'Refunded' }
                ].map((filterOption) => (
                  <button
                    key={filterOption.key}
                    onClick={() => setFilter(filterOption.key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === filterOption.key
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                />
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {getCategoryIcon(transaction.category)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{transaction.description}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin size={14} />
                              <span>{transaction.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CreditCard size={14} />
                              <span>{transaction.paymentMethod}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className={`text-lg font-bold ${transaction.amount < 0 ? 'text-green-600' : 'text-gray-900'}`}>
                            {transaction.amount < 0 ? '+' : ''}৳{Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Booking ID: {transaction.bookingId}
                        </div>

                        <div className="flex space-x-2">
                          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            View Details
                          </button>
                          {transaction.refundable && transaction.status === 'completed' && (
                            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                              Request Refund
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <DollarSign size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search terms' : 'Your transaction history will appear here'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Invoices & Receipts</h2>
            <button className="btn btn-outline">
              <Download size={18} className="mr-2" />
              Download All
            </button>
          </div>

          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Receipt size={20} className="text-blue-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{invoice.description}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Invoice #{invoice.invoiceNumber}</span>
                        <span>Issued: {new Date(invoice.issueDate).toLocaleDateString()}</span>
                        <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ৳{invoice.amount.toLocaleString()}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </div>

                    <button className="btn btn-outline btn-sm">
                      <Download size={16} className="mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
