const { BlobServiceClient } = require("@azure/storage-blob");

// set 2 environment varialbes:  connection-string and container-name
bsClient = BlobServiceClient.fromConnectionString(process.env.CONN_STR)
cClient = bsClient.getContainerClient(process.env.CONTAINER_NAME)

opts = {
  "prefix":"xx",
  "includeVersions":true,
  "includeSnapshots":true
}


async function deleteAll() {
  try {
    for await (const blob of cClient.listBlobsFlat(opts)) {
      cClient.deleteBlob(blob.name)
        .then(() => console.log(`==delete==: ${blob.name}`))
        .catch((ex) => {
          console.log(`==Failed==: ${blob.name}`);
        });
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

deleteAll();




// scripts
// export ADAL_PYTHON_SSL_NO_VERIFY=1
// export AZURE_CLI_DISABLE_CONNECTION_VERIFICATION=1

// az storage blob delete-batch \
// --source <container-name> \
// --connection-string "" \
// --pattern 2022*