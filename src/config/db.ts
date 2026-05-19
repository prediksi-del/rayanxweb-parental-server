import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    const connStr = process.env.MONGODB_URI;
    if (!connStr) throw new Error("MONGODB_URI tidak ditemukan di .env");
    
    await mongoose.connect(connStr);
    console.log('MongoDB terhubung dengan sukses.');
  } catch (error) {
    console.error('Gagal koneksi ke MongoDB:', error);
    process.exit(1);
  }
};
