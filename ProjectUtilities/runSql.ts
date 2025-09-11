import { Connection } from 'tedious';
import { DBConfig } from '../secrets.json';

async function runSql(sql: string) {
  const results: any[] = []; 
  
  const connectionConfig = {
    server: DBConfig.server,
    authentication: {
      type: "default" as "default",
      options: {
        userName: DBConfig.username,
        password: DBConfig.password
      }
    },
    options: {
      database: DBConfig.database,
      encrypt: true,
      connectTimeout: 60000,
      requestTimeout: 240000
    }
  };

  const connection = new Connection(connectionConfig);

  try {
    await new Promise<void>((resolve, reject) => {
      
      connection.on('connect', async (err: any) => {
        if (err) {
          console.error("Error connecting to Azure SQL Database:", err);
          reject(err);
        } else {
          const Request = require('tedious').Request;

            const request = new Request(sql, (err: any, rowCount: number) => {
            if (err) {
              console.error("Error executing SQL query:", err);
              reject(err);
            } else {+
              console.log("connectionConfig" + connectionConfig )
              console.log(`Query executed successfully. Affected rows: ${rowCount}`);
              resolve();
            }
            connection.close();
          });

          // Handle query result rows
          request.on('row', (columns: any[]) => {
            const row: any = {};
            columns.forEach((column) => {
              row[column.metadata.colName] = column.value;
            });
            results.push(row); // Collect each row
          });

          // Execute the SQL query
          connection.execSql(request);
        }
      });

      connection.connect();

      connection.on('end', () => {
        // Print the collected query results
        // results.forEach((row) => {
        //   //console.log(row);
        // });
        //console.log("result",results)
      });
    });

    return results;
  } catch (error) {
    // Handle any errors here
    console.error("Error in runSql:", error);
    throw error;
  }
}


export { runSql };
