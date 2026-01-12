import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function seedAdmin() {
    console.log('--- Admin User Seeding Tool ---');

    const email = await question('Enter Admin Email: ');
    const password = await question('Enter Admin Password: ');
    const name = await question('Enter Admin Name: ');

    if (!email || !password || !name) {
        console.error('All fields are required!');
        process.exit(1);
    }

    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'MDU_ITM_LEARN'
        });
        console.log('Connected successfully.');

        // Check if admin already exists
        const existingAdmin = await mongoose.connection.db.collection('admins').findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
            console.error('Admin with this email already exists!');
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await mongoose.connection.db.collection('admins').insertOne({
            email: email.toLowerCase(),
            password: hashedPassword,
            name: name,
            role: 'superadmin',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('\x1b[32m%s\x1b[0m', 'Admin user created successfully! 🎉');
        console.log('You can now login at /admin/login');

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
        rl.close();
    }
}

seedAdmin();
