import { app } from './app';

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});