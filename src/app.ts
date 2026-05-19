import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import controlRoutes from './routes/control.routes';
import dataRoutes from './routes/data.routes';
import berkasRoutes from './routes/berkas.routes';
import { errorHandler } from './middlewares/error.middleware';
import './config/firebase'; // Memastikan Firebase memuat saat inisialisasi

const app: Application = express();

app.use(cors());
app.use(express.json());

// Pemetaan Rute API
app.use('/api/auth', authRoutes);
app.use('/api/control', controlRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/berkas', berkasRoutes);

// Jalur dasar untuk verifikasi up-time server
app.get('/', (req, res) => {
  res.status(200).json({ status: "Server RayanXWeb Parental Aktif", timestamp: new Date() });
});

app.use(errorHandler);

export default app;
