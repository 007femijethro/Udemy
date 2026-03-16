<?php
http_response_code(410);
header('Content-Type: text/plain; charset=utf-8');
echo "This project has migrated to Next.js + TypeScript. Run: npm install && npm run dev\n";
