import path from "path";

const fs = require('fs');

// Function to list files in a folder within a container
async function createFolder({ newFolderPath }: { newFolderPath: string }): Promise<string[]> {

  // Check if the folder already exists
  if (!fs.existsSync(newFolderPath)) {
    fs.mkdirSync(newFolderPath, { recursive: true });
  }
  return [];
};

// function to move aspecific file present in one folder to another
async function moveFile({ sourcePath, destinationPath }: { sourcePath: string, destinationPath: string}): Promise<string[]> {
  fs.renameSync(sourcePath, destinationPath);
  return [];
}

// Function to list files in a folder within a container
async function deleteFile({ newFolderPath }: { newFolderPath: string }): Promise<string[]> {
  console.log('Deleting folder before:', newFolderPath);
  // Check if the folder already exists
  if (fs.existsSync(newFolderPath)) {
    console.log('Deleting folder after:', newFolderPath);
    fs.unlinkSync(newFolderPath, { recursive: true });
  }
  return [];
};


// function to check if a file exists
async function checkfilestatus({ filepath }:{ filepath: string}): Promise<boolean> {

  let resolvedpath = path.resolve(filepath);

  const exists = fs.existsSync(resolvedpath);
  // console.log(`Checking if file exists: ${resolvedpath} and the status is ${exists}`);
  return exists;
} 


// function to check if file exists or not and if not wait till timeout sent 
async function checkFileStatusWithTimeout({ filepath, timeout }: { filepath: string, timeout: number }) {
  const resolvedPath = path.resolve(filepath);
  const timeoutMs = timeout * 60 * 1000; 
  const startTime = new Date().getTime();

  while (true) {
      const exists = fs.existsSync(resolvedPath);
      if (exists) {
          return true;
      }
      const elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime > timeoutMs) {
          console.log("Timeout reached. File download not completed");
          return false;
      }
      await new Promise(resolve => setTimeout(resolve, 15000));
      console.log("waiting for file download to be completed")
  }
}

export { createFolder,moveFile,checkfilestatus,checkFileStatusWithTimeout };
export { deleteFile };
