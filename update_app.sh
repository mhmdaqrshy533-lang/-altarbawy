sed -i "s/import VisionCanvas from '.\/pages\/VisionCanvas';/import MistarEduOS from '.\/pages\/MistarEduOS';/g" src/App.tsx
sed -i "s/return <VisionCanvas onBack={() => setActivePage('dashboard')} \/>;/return <MistarEduOS onBack={() => setActivePage('dashboard')} \/>;/g" src/App.tsx
