sed -i "s/import MistarEduOS from '.\/pages\/MistarEduOS';/import MistarEduOS from '.\/pages\/MistarEduOS';\nimport NotificationCenter from '.\/components\/NotificationCenter';\nimport { useOS } from '.\/context\/OSContext';/g" src/App.tsx

# Find where we declare activePage and replace it with context state
sed -i "s/const \[activePage, setActivePage\] = useState<string>('dashboard');/const { activeApplet, launchApplet } = useOS();\n  const activePage = activeApplet || 'dashboard';\n  const setActivePage = launchApplet;/g" src/App.tsx

# Add NotificationCenter at the end
sed -i "s/<\/AnimatePresence>/<\/AnimatePresence>\n      <NotificationCenter \/>/g" src/App.tsx
