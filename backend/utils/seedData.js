import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const products = [
  {
    name: "AirPods Pro (2nd Gen)",
    description: "Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio",
    price: 24900,
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500",
    category: "earbuds",
    stock: 50,
    rating: 4.8,
    featured: true,
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation, exceptional sound quality, 30-hour battery",
    price: 29990,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
    category: "headphones",
    stock: 30,
    rating: 4.9,
    featured: true,
  },
  {
    name: "MacBook Air M2",
    description: "13-inch Liquid Retina display, Apple M2 chip, 8GB RAM, 256GB SSD",
    price: 119900,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    category: "laptops",
    stock: 15,
    rating: 4.7,
    featured: true,
  },
  {
    name: "iPhone 15 Pro",
    description: "6.1-inch Super Retina XDR display, A17 Pro chip, Pro camera system",
    price: 134900,
    image: "https://images.unsplash.com/photo-1592286927505-c80d3a0815f7?w=500",
    category: "phones",
    stock: 25,
    rating: 4.8,
    featured: true,
  },
  {
    name: "Apple Watch Series 9",
    description: "Always-On Retina display, Advanced health features, GPS + Cellular",
    price: 45900,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    category: "smartwatches",
    stock: 40,
    rating: 4.6,
    featured: true,
  },
  {
    name: "Samsung Galaxy Buds2 Pro",
    description: "Intelligent ANC, HD voice, Hi-Fi sound, IPX7 water resistant",
    price: 17900,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b7308d?w=500",
    category: "earbuds",
    stock: 60,
    rating: 4.5,
    featured: false,
  },
  {
    name: "Bose QuietComfort 45",
    description: "World-class noise cancellation, TriPort acoustic architecture",
    price: 32900,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
    category: "headphones",
    stock: 20,
    rating: 4.7,
    featured: false,
  },
  {
    name: "Dell XPS 15",
    description: "15.6-inch OLED display, Intel i7, 16GB RAM, 512GB SSD, NVIDIA RTX 3050",
    price: 159900,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500",
    category: "laptops",
    stock: 10,
    rating: 4.6,
    featured: false,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "6.8-inch Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP camera",
    price: 129999,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
    category: "phones",
    stock: 18,
    rating: 4.7,
    featured: false,
  },
  {
    name: "Garmin Fenix 7",
    description: "Advanced multisport GPS watch, solar charging, topographic maps",
    price: 79900,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
    category: "smartwatches",
    stock: 12,
    rating: 4.8,
    featured: false,
  },
  {
    name: "Nothing Ear (2)",
    description: "Active Noise Cancellation, transparent design, dual chamber design",
    price: 8999,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500",
    category: "earbuds",
    stock: 70,
    rating: 4.4,
    featured: false,
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    description: "14-inch FHD+, Intel i7, 16GB RAM, 512GB SSD, Business ultrabook",
    price: 139900,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    category: "laptops",
    stock: 8,
    rating: 4.5,
    featured: false,
  },
  {
    name: "OnePlus 12",
    description: "6.7-inch AMOLED 120Hz, Snapdragon 8 Gen 3, 50MP Hasselblad camera",
    price: 64999,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    category: "phones",
    stock: 22,
    rating: 4.6,
    featured: false,
  },
  {
    name: "Fitbit Sense 2",
    description: "Advanced health smartwatch, stress management, ECG, sleep tracking",
    price: 27900,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
    category: "smartwatches",
    stock: 35,
    rating: 4.3,
    featured: false,
  },
  {
    name: "USB-C Hub 7-in-1",
    description: "HDMI 4K, USB 3.0 ports, SD/TF card reader, 100W Power Delivery",
    price: 2499,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
    category: "accessories",
    stock: 100,
    rating: 4.2,
    featured: false,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    await Product.deleteMany();
    await User.deleteMany();
    
    await Product.insertMany(products);
    
    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@techstore.com',
      password: 'admin123',
      isAdmin: true,
    });
    
    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
