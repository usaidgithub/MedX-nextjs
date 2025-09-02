import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Heart, Star } from 'lucide-react';

const MedicalStore = () => {
  const [currentPage, setCurrentPage] = useState('store'); // 'store' or 'cart'
  const [cart, setCart] = useState([]);

  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 25.99,
      originalPrice: 35.99,
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop",
      description: "Pain relief and fever reducer",
      inStock: true,
      rating: 4.5,
      manufacturer: "HealthCorp"
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      price: 45.50,
      originalPrice: 55.50,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop",
      description: "Antibiotic for bacterial infections",
      inStock: true,
      rating: 4.7,
      manufacturer: "MediPharm"
    },
    {
      id: 3,
      name: "Cetirizine 10mg",
      price: 18.75,
      originalPrice: 25.75,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop",
      description: "Allergy relief medication",
      inStock: true,
      rating: 4.3,
      manufacturer: "AllerFree"
    },
    {
      id: 4,
      name: "Omeprazole 20mg",
      price: 32.00,
      originalPrice: 42.00,
      image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop",
      description: "Acid reflux treatment",
      inStock: false,
      rating: 4.6,
      manufacturer: "GastroMed"
    },
    {
      id: 5,
      name: "Ibuprofen 400mg",
      price: 28.25,
      originalPrice: 35.25,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop",
      description: "Anti-inflammatory pain reliever",
      inStock: true,
      rating: 4.4,
      manufacturer: "PainAway"
    },
    {
      id: 6,
      name: "Metformin 500mg",
      price: 22.90,
      originalPrice: 30.90,
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&h=200&fit=crop",
      description: "Diabetes management",
      inStock: true,
      rating: 4.8,
      manufacturer: "DiabeCare"
    },
    {
      id: 7,
      name: "Aspirin 75mg",
      price: 15.60,
      originalPrice: 20.60,
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop",
      description: "Blood thinner and pain relief",
      inStock: true,
      rating: 4.2,
      manufacturer: "CardioHealth"
    },
    {
      id: 8,
      name: "Loratadine 10mg",
      price: 24.40,
      originalPrice: 32.40,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop",
      description: "Non-drowsy allergy relief",
      inStock: true,
      rating: 4.5,
      manufacturer: "ClearBreath"
    },
    {
      id: 9,
      name: "Simvastatin 20mg",
      price: 38.80,
      originalPrice: 48.80,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop",
      description: "Cholesterol management",
      inStock: true,
      rating: 4.6,
      manufacturer: "HeartCare"
    }
  ];

  const addToCart = (medicine) => {
    if (!medicine.inStock) return;
    
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === medicine.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const buyNow = (medicine) => {
    if (!medicine.inStock) return;
    alert(`Processing purchase for ${medicine.name} - $${medicine.price}`);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const StorePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MedStore</h1>
              <p className="text-sm text-gray-600">Your Health, Our Priority</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setCurrentPage('cart')}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50"
        style={{ boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)' }}
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce">
              {getTotalItems()}
            </span>
          )}
        </div>
      </button>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Medicines</h2>
          <p className="text-gray-600">Choose from our wide range of quality medicines</p>
          {getTotalItems() > 0 && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-blue-800 font-medium">
                  🛒 {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
                </p>
                <p className="text-blue-600 text-sm">Total: ${getTotalPrice()}</p>
              </div>
              <button 
                onClick={() => setCurrentPage('cart')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                View Cart
              </button>
            </div>
          )}
        </div>

        {/* Medicine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={medicine.image} 
                  alt={medicine.name}
                  className="w-full h-48 object-cover"
                />
                {!medicine.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 cursor-pointer hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{medicine.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
                  <p className="text-xs text-blue-600 font-medium">by {medicine.manufacturer}</p>
                </div>

                {renderStars(medicine.rating)}

                <div className="flex items-center justify-between mb-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">${medicine.price}</span>
                    <span className="text-sm text-gray-500 line-through">${medicine.originalPrice}</span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)}% OFF
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => buyNow(medicine)}
                    disabled={!medicine.inStock}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      medicine.inStock 
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={() => addToCart(medicine)}
                    disabled={!medicine.inStock}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      medicine.inStock 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  const CartPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('store')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors hover:bg-blue-50 px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Store</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-sm text-gray-600">{getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in cart</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some medicines to get started</p>
            <button 
              onClick={() => setCurrentPage('store')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart Items</h2>
              
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold text-gray-900">${item.price}</span>
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-white hover:bg-gray-200 p-2 rounded-full transition-colors shadow-sm"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium text-lg">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-white hover:bg-gray-200 p-2 rounded-full transition-colors shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 mb-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-medium">${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(parseFloat(getTotalPrice()) + parseFloat(getTotalPrice()) * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  alert(`Order placed successfully! Total: $${(parseFloat(getTotalPrice()) + parseFloat(getTotalPrice()) * 0.1).toFixed(2)}`);
                  setCart([]);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors shadow-lg mb-3"
              >
                Place Order
              </button>
              
              <button 
                onClick={() => setCurrentPage('store')}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );

  return currentPage === 'store' ? <StorePage /> : <CartPage />;
};

export default MedicalStore;