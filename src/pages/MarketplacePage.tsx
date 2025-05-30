import React, { useState } from 'react';
import { Search, Filter, Star, ShoppingBag, Tag } from 'lucide-react';
import { cn } from '../utils/cn';

export const MarketplacePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'gear', label: 'Travel Gear' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const products = [
    {
      id: 1,
      name: "Adventure Pro Backpack",
      image: "https://images.pexels.com/photos/2447042/pexels-photo-2447042.jpeg",
      category: "gear",
      price: 12999,
      rating: 4.8,
      reviews: 256,
      description: "Durable 40L backpack perfect for extended travel.",
      features: ["Water-resistant", "Laptop compartment", "Multiple pockets"]
    },
    {
      id: 2,
      name: "Travel Tech Organizer",
      image: "https://images.pexels.com/photos/1832959/pexels-photo-1832959.jpeg",
      category: "electronics",
      price: 3499,
      rating: 4.6,
      reviews: 189,
      description: "Keep your cables and gadgets organized while traveling.",
      features: ["Multiple compartments", "Water-resistant", "Compact design"]
    },
    {
      id: 3,
      name: "Ultralight Rain Jacket",
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
      category: "clothing",
      price: 8999,
      rating: 4.7,
      reviews: 342,
      description: "Packable waterproof jacket for unexpected weather.",
      features: ["Breathable", "Packable", "Waterproof"]
    },
    {
      id: 4,
      name: "Universal Travel Adapter",
      image: "https://images.pexels.com/photos/4219862/pexels-photo-4219862.jpeg",
      category: "electronics",
      price: 2499,
      rating: 4.9,
      reviews: 567,
      description: "All-in-one adapter for worldwide compatibility.",
      features: ["Universal compatibility", "USB ports", "Safety certified"]
    },
    {
      id: 5,
      name: "Anti-Theft Travel Wallet",
      image: "https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg",
      category: "accessories",
      price: 3999,
      rating: 4.7,
      reviews: 298,
      description: "RFID-blocking wallet with multiple compartments.",
      features: ["RFID protection", "Water-resistant", "Multiple card slots"]
    },
    {
      id: 6,
      name: "Compression Packing Cubes",
      image: "https://images.pexels.com/photos/5816934/pexels-photo-5816934.jpeg",
      category: "gear",
      price: 2999,
      rating: 4.8,
      reviews: 423,
      description: "Set of 3 compression cubes for organized packing.",
      features: ["Compression zipper", "Mesh panel", "Durable material"]
    }
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-primary-600 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-8">Travel Gear Marketplace</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for travel gear..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button className="btn btn-secondary">
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container-custom py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-full transition-colors',
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <div className="flex items-center">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 font-medium">{product.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center">
                      <Tag className="text-primary-600 mr-2" size={20} />
                      <span className="text-xl font-bold">৳{product.price.toLocaleString()}</span>
                    </div>
                    <button className="btn btn-primary btn-sm">
                      <ShoppingBag size={18} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};