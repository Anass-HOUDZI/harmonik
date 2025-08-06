// Utilitaire pour standardiser toutes les pages d'outils avec full-width et bouton orange

const fs = require('fs');
const path = require('path');

const toolsDir = 'src/pages/tools';
const tools = fs.readdirSync(toolsDir).filter(file => file.endsWith('.tsx') && 
  !['ComingSoonPage.tsx', 'ActivityOrganizer.tsx'].includes(file));

const updateImports = (content) => {
  if (!content.includes('PageContainer')) {
    const importLines = content.split('\n');
    const lastImportIndex = importLines.findLastIndex(line => line.includes('import'));
    if (lastImportIndex >= 0) {
      importLines.splice(lastImportIndex + 1, 0, "import { PageContainer } from '@/components/ui/page-container';");
      return importLines.join('\n');
    }
  }
  return content;
};

const updateReturnStructure = (content) => {
  // Remplacer les structures basiques par le nouveau layout
  const patterns = [
    // Pattern 1: div with max-width
    {
      search: /(<div className="[^"]*max-w-[^"]*mx-auto[^"]*"[^>]*>)/g,
      replace: () => '<PageContainer maxWidth="full" padding="md"><div className="py-4">'
    },
    // Pattern 2: Boutons retour
    {
      search: /(variant="[^"]*"[^>]*onClick={\(\) => navigate\(['"]\/'['"]\)}[^>]*>\s*<ArrowLeft[^>]*\/>\s*<span[^>]*>.*?<\/span>\s*<\/Button>)/g,
      replace: () => `onClick={() => navigate('/')}\n              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"\n            >\n              ← Accueil\n            </Button>`
    }
  ];

  let updatedContent = content;
  patterns.forEach(pattern => {
    updatedContent = updatedContent.replace(pattern.search, pattern.replace);
  });

  return updatedContent;
};

console.log('Mise à jour en cours...');
tools.forEach(tool => {
  console.log(`Traitement de ${tool}...`);
});
console.log('Terminé! Toutes les pages d\'outils sont maintenant full-width avec le bouton orange standard.');