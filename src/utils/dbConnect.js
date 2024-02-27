import sql from 'mssql'
import dotenv from 'dotenv'
import logger from './logger.js'

dotenv.config();
const { SQL_USER,SQL_PASSWORD,SQL_SERVER,SQL_DB,
    SQL_SERVER_PORT,SQL_ENCRYPT,SQL_TRUST_SERVER_CERTIFICATE } = process.env

const sqlConfig = {
    user: SQL_USER|| "sa",
    password:SQL_PASSWORD|| "Gatuma21simon" ,
    server: SQL_SERVER|| "localhost",
    database:SQL_DB|| "HiphoicDB",
    port: SQL_SERVER_PORT || 1433,    
    options: {
        encrypt:SQL_ENCRYPT|| false , // true for azure & false for local dev,
        trustServerCertificate:SQL_TRUST_SERVER_CERTIFICATE || true, // true for local dev & false for azure

    }
}

let appPool;
let poolRequest;

try {
    appPool = await sql.connect(sqlConfig);
    poolRequest = () => appPool.request();
    if (appPool) {
        console.log('Connected to SQL Server');
        logger.info("Connected to SQL Server");
    }
} catch (error) {
    console.log('Error creating connection pool', error);
    logger.error("Error creating connection pool", error);
  }

export { poolRequest, sql };