// Fix all product images in seedData.js - CJS version for reliability
const fs = require('fs');
const path = require('path');

const imagesByCategory = {
  earbuds: [
    "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1631867675167-90a456a90863?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1606220588913-b3afc6b96f08?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop",
  ],
  headphones: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcf?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1577174881658-0f30157f72c4?w=400&h=400&fit=crop",
  ],
  laptops: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
  ],
  phones: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1592286927505-c80d3a0815f7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop",
  ],
  smartwatches: [
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=400&h=400&fit=crop",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1618935270308-dc1ed05c5e0c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400&h=400&fit=crop",
  ],
};

const filePath = path.join(__dirname, 'seedData.js');
const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

// Two-pass: first pass collects product blocks (image line + category line)
// Each product has image on one line, category a couple lines later
const products = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].match(/^\s*image:\s*"/)) {
    // Look ahead for category
    for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
      const catMatch = lines[j].match(/category:\s*"(\w+)"/);
      if (catMatch) {
        products.push({ imageLine: i, category: catMatch[1] });
        break;
      }
    }
  }
}

// Second pass: replace image URLs
const counters = {};
let replaced = 0;
for (const prod of products) {
  const cat = prod.category;
  if (!imagesByCategory[cat]) continue;
  if (!counters[cat]) counters[cat] = 0;
  
  const imgs = imagesByCategory[cat];
  const newUrl = imgs[counters[cat] % imgs.length];
  counters[cat]++;
  
  // Replace the image line
  lines[prod.imageLine] = lines[prod.imageLine].replace(/"https?:\/\/[^"]+"/g, `"${newUrl}"`);
  replaced++;
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
fs.writeFileSync(path.join(__dirname, 'debug-out.txt'), `Replaced: ${replaced}\nCounters: ${JSON.stringify(counters)}\n`);
