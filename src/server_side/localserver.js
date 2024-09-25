import { createServer } from 'http';
import { join } from 'path';
import path from 'path';

const port = 4;
const userProvidedPath = 'src/components/header';

const server = createServer((req, res) => {
  const filePath = join(__dirname, userProvidedPath);
  res.sendFile(filePath);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});