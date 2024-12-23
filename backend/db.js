const mongoose = require('mongoose');

// Ensure the MONGO_URI is being properly loaded
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://antilogatharv:r28EYdv2qyXx8Dvr@cluster0.hzrrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1); // Exit process on failure
    }
};

// Export the connectDB function to be used in server.js
module.exports = connectDB;
