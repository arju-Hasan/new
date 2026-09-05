<!-- "dev": "next dev",
"build": "next build && tsc -p tsconfig.server.json",
 "start": "NODE_ENV=production ts-node --project tsconfig.server.json server.ts",

"start": "node dist-server/server.js" -->



// "build": "next build && tsc -p tsconfig.server.json",
//     "start": "node dist-server/server.js"


  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only --ignore-watch .next --project tsconfig.server.json server.ts",
    "build": "next build",
    "start": "NODE_ENV=production ts-node --project tsconfig.server.json server.ts",
    "lint": "eslint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "ts-node prisma/seed.ts"
  },



last update
    <!-- "dev": "tsx watch server.ts",
    "build": "next build",
    "start": "NODE_ENV=production ts-node --project tsconfig.server.json server.ts",
    "lint": "eslint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "ts-node prisma/seed.ts" -->


<!-- login credentials -->
<!-- admin@ramadanmart.com
customer@gmail.com
password123 -->
