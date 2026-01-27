import mongoose from 'mongoose';
import Coffee from './models/Coffee.js';
import dotenv from 'dotenv';
dotenv.config();

const products = [
    {
        name: 'Espresso Classic',
        description: 'Rich, intense, and perfectly extracted. A true classic with notes of dark chocolate and roasted nuts.',
        price: 199,
        image: '/assets/products/espresso.png',
        category: 'Coffee',
        stock: 50
    },
    {
        name: 'Cappuccino Supreme',
        description: 'Silky smooth steamed milk poured over a double shot of our signature espresso. Topped with fine cocoa.',
        price: 249,
        image: '/assets/products/cappuccino.png',
        category: 'Coffee',
        stock: 30
    },
    {
        name: 'Mocha Delight',
        description: 'A luxurious blend of rich chocolate and espresso, finished with a velvet-soft whipped cream topping.',
        price: 299,
        image: '/assets/products/mocha.png',
        category: 'Coffee',
        stock: 25
    }
];

const seedDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/caffixa';
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB for seeding...');

        await Coffee.deleteMany();
        await Coffee.insertMany(products);

        console.log('Database Seeded!');
        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
