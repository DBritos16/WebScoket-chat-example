import { connect } from 'mongoose';


export const connectDB = async () => {
    
    try {
        await connect(process.env.MONGODB_URI);

        console.log('BD connected');
    } catch (error) {
        console.log(`Error al conectar a la BD: ${error}`)
    }
}