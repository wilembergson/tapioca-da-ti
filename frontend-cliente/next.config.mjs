/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            // Defina os cabeçalhos que você deseja permitir
            source: '/',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*', // Permitir solicitações de todas as origens
              },
              {
                key: 'Access-Control-Allow-Headers',
                value: 'Origin, X-Requested-With, Content-Type, Accept',
              },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET, POST, PUT, DELETE, OPTIONS',
              },
            ],
          },
        ];
      },
};

export default nextConfig;
