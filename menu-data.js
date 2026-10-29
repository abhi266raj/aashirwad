/**
 * Ashirwad Restaurant - Verified Menu Data
 * Location: Bansilal Chowk, Hazaribagh, Jharkhand
 * Phone / SMS / WhatsApp: +91 7004230188
 */

const MENU_CATEGORIES = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'breads', name: 'Tandoor & Breads', icon: '🫓' },
  { id: 'starters', name: 'Starters & Chinese', icon: '🥢' },
  { id: 'main-veg', name: 'Main Course (Veg)', icon: '🥘' },
  { id: 'main-nonveg', name: 'Main Course (Non-Veg)', icon: '🍗' },
  { id: 'biryani-rice', name: 'Biryani & Rice', icon: '🍚' },
  { id: 'noodles', name: 'Noodles & Chowmein', icon: '🍜' },
  { id: 'pizzas-rolls', name: 'Pizzas & Rolls', icon: '🍕' },
  { id: 'soups-beverages', name: 'Soups, Salads & Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍨' }
];

const MENU_ITEMS = [
  // --- Tandoor & Breads ---
  {
    id: 'b1',
    name: 'Makhan Roti',
    category: 'breads',
    price: 20,
    isVeg: true,
    bestseller: true,
    description: 'Hot tandoori wheat roti generously brushed with pure fresh butter.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b2',
    name: 'Plain Naan',
    category: 'breads',
    price: 35,
    isVeg: true,
    bestseller: false,
    description: 'Traditional refined flour flatbread baked fresh in clay tandoor oven.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b3',
    name: 'Butter Naan',
    category: 'breads',
    price: 45,
    isVeg: true,
    bestseller: true,
    description: 'Fluffy clay-oven baked naan coated with melting amul butter.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b4',
    name: 'Garlic Butter Naan',
    category: 'breads',
    price: 65,
    isVeg: true,
    bestseller: true,
    description: 'Aromatic tandoori naan infused with minced roasted garlic & coriander.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b5',
    name: 'Plain Kulcha',
    category: 'breads',
    price: 40,
    isVeg: true,
    bestseller: false,
    description: 'Soft and mildly leavened North Indian flatbread with sesame seeds.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b6',
    name: 'Masala Kulcha',
    category: 'breads',
    price: 50,
    isVeg: true,
    bestseller: false,
    description: 'Tandoori kulcha stuffed with tangy spiced potato and herbs.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b7',
    name: 'Stuffed Kulcha',
    category: 'breads',
    price: 55,
    isVeg: true,
    bestseller: true,
    description: 'Signature mixed vegetable and spices stuffed kulcha cooked crisp.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b8',
    name: 'Paneer Kulcha',
    category: 'breads',
    price: 70,
    isVeg: true,
    bestseller: false,
    description: 'Fluffy kulcha filled with seasoned cottage cheese crumble.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b9',
    name: 'Lachha Paratha',
    category: 'breads',
    price: 40,
    isVeg: true,
    bestseller: false,
    description: 'Multi-layered crispy, flaky whole wheat paratha straight from tandoor.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
  },

  // --- Starters & Chinese ---
  {
    id: 's1',
    name: 'Mushroom Chilli',
    category: 'starters',
    price: 140,
    isVeg: true,
    bestseller: true,
    description: 'Button mushrooms tossed in fiery garlic, soya sauce, capsicum and spring onions.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's2',
    name: 'Paneer Manchurian',
    category: 'starters',
    price: 190,
    isVeg: true,
    bestseller: true,
    description: 'Crispy fried cottage cheese cubes tossed in spicy tangy Manchurian sauce.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's3',
    name: 'Paneer Chilli',
    category: 'starters',
    price: 190,
    isVeg: true,
    bestseller: true,
    description: 'Classic Indo-Chinese appetizer with fresh paneer cubes and crunchy bell peppers.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's4',
    name: 'Paneer Garlic',
    category: 'starters',
    price: 200,
    isVeg: true,
    bestseller: false,
    description: 'Golden paneer tossed with aromatic crushed garlic and oriental spices.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's5',
    name: 'Paneer Finger',
    category: 'starters',
    price: 210,
    isVeg: true,
    bestseller: false,
    description: 'Crisp crumbed paneer batons served with house special spicy dip.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's6',
    name: 'Veg Schezwan Manchurian',
    category: 'starters',
    price: 210,
    isVeg: true,
    bestseller: false,
    description: 'Minced vegetable balls simmered in punchy Sichuan pepper & chilli glaze.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's7',
    name: 'Chicken Garlic',
    category: 'starters',
    price: 230,
    isVeg: false,
    bestseller: true,
    description: 'Succulent chicken tenders tossed with roasted garlic, green chillies & scallions.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's8',
    name: 'Chicken Finger',
    category: 'starters',
    price: 240,
    isVeg: false,
    bestseller: false,
    description: 'Golden crumb-fried chicken strips marinated in secret spices.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's9',
    name: 'Boneless Lemon Chicken Chilli',
    category: 'starters',
    price: 240,
    isVeg: false,
    bestseller: true,
    description: 'Tender boneless chicken glazed in a zesty lemon-chilli sauce.',
    image: 'https://images.unsplash.com/photo-1527477378372-132d7211bf7b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's10',
    name: 'Chicken Lollipop (6 pcs)',
    category: 'starters',
    price: 250,
    isVeg: false,
    bestseller: true,
    description: 'Indo-Chinese favorite chicken wings shaped like lollipops, crisp fried with hot garlic sauce.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80'
  },

  // --- Main Course (Veg) ---
  {
    id: 'mv1',
    name: 'Paneer Butter Masala',
    category: 'main-veg',
    price: 210,
    isVeg: true,
    bestseller: true,
    description: 'Fresh cottage cheese cubes cooked in rich, velvety tomato and cashew nut gravy.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mv2',
    name: 'Paneer Shahi Korma',
    category: 'main-veg',
    price: 230,
    isVeg: true,
    bestseller: true,
    description: 'Royal Mughlai style paneer cooked in a mildly sweet, aromatic almond cream gravy.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mv3',
    name: 'Veg Handi',
    category: 'main-veg',
    price: 240,
    isVeg: true,
    bestseller: true,
    description: 'Assorted seasonal garden vegetables slow cooked in traditional earthen handi style spices.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mv4',
    name: 'Kadai Paneer',
    category: 'main-veg',
    price: 220,
    isVeg: true,
    bestseller: false,
    description: 'Paneer cubes and crunchy bell peppers braised in freshly pounded kadai spices.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mv5',
    name: 'Dal Makhani',
    category: 'main-veg',
    price: 170,
    isVeg: true,
    bestseller: true,
    description: 'Black lentils slow cooked overnight on charcoal tandoor with cream and butter.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mv6',
    name: 'Dal Tadka (Desi Ghee)',
    category: 'main-veg',
    price: 130,
    isVeg: true,
    bestseller: false,
    description: 'Yellow arhar dal tempered with cumin, garlic, red chillies and fragrant desi ghee.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mv7',
    name: 'Malai Kofta',
    category: 'main-veg',
    price: 220,
    isVeg: true,
    bestseller: false,
    description: 'Melt-in-mouth cottage cheese and potato dumplings in luscious golden creamy gravy.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mv8',
    name: 'Mushroom Masala',
    category: 'main-veg',
    price: 210,
    isVeg: true,
    bestseller: false,
    description: 'Tender button mushrooms cooked in thick onion-tomato gravy with garam masala.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
  },

  // --- Main Course (Non-Veg) ---
  {
    id: 'mn1',
    name: 'Chicken Murgh Masala',
    category: 'main-nonveg',
    price: 410,
    isVeg: false,
    bestseller: true,
    description: 'Ashirwad signature royal chicken delicacy cooked in rich minced chicken and egg gravy.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mn2',
    name: 'Chicken Shahi Korma',
    category: 'main-nonveg',
    price: 360,
    isVeg: false,
    bestseller: true,
    description: 'Tender chicken pieces simmered in silky cashew nut, yogurt and saffron gravy.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mn3',
    name: 'Butter Chicken (Murgh Makhani)',
    category: 'main-nonveg',
    price: 340,
    isVeg: false,
    bestseller: true,
    description: 'Roasted tandoori chicken cooked in mildly spiced creamy tomato & makhani butter sauce.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mn4',
    name: 'Kadai Chicken',
    category: 'main-nonveg',
    price: 320,
    isVeg: false,
    bestseller: false,
    description: 'Spiced chicken cooked with crunchy bell peppers and fresh whole spices in cast iron wok.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mn5',
    name: 'Chicken Handi',
    category: 'main-nonveg',
    price: 330,
    isVeg: false,
    bestseller: false,
    description: 'Rustic countryside style chicken slow-simmered in clay pot with caramelized onions.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mn6',
    name: 'Chicken Curry (Homestyle)',
    category: 'main-nonveg',
    price: 260,
    isVeg: false,
    bestseller: false,
    description: 'Desi style flavorful chicken curry prepared with traditional spices.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80'
  },

  // --- Biryani & Rice ---
  {
    id: 'r1',
    name: 'Ashirwad Special Veg Biryani',
    category: 'biryani-rice',
    price: 280,
    isVeg: true,
    bestseller: true,
    description: 'Dum-cooked long grain Basmati rice layered with fresh veggies, paneer, fried onions & saffron. Served with raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r2',
    name: 'Chicken Dum Biryani',
    category: 'biryani-rice',
    price: 260,
    isVeg: false,
    bestseller: true,
    description: 'Classic aromatic Hyderabadi style chicken dum biryani served with spicy gravy and cooling raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r3',
    name: 'Shahi Pulao',
    category: 'biryani-rice',
    price: 190,
    isVeg: true,
    bestseller: false,
    description: 'Fragrant basmati rice tossed with roasted cashews, raisins, fruits and paneer.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r4',
    name: 'Green Peas Pulao',
    category: 'biryani-rice',
    price: 155,
    isVeg: true,
    bestseller: false,
    description: 'Basmati rice tempered with sweet green peas, whole cumin and ghee.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r5',
    name: 'Veg Fried Rice',
    category: 'biryani-rice',
    price: 155,
    isVeg: true,
    bestseller: true,
    description: 'Wok-tossed basmati rice with finely chopped carrots, beans, baby corn & spring onion.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'r6',
    name: 'Jeera Rice',
    category: 'biryani-rice',
    price: 120,
    isVeg: true,
    bestseller: false,
    description: 'Fluffy steamed basmati rice tempered with golden roasted cumin seeds.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80'
  },

  // --- Noodles & Chowmein ---
  {
    id: 'n1',
    name: 'Veg Chowmein',
    category: 'noodles',
    price: 95,
    isVeg: true,
    bestseller: true,
    description: 'Street-style wok-tossed noodles with crunchy shredded vegetables and oriental spices.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'n2',
    name: 'Chicken Chowmein',
    category: 'noodles',
    price: 120,
    isVeg: false,
    bestseller: true,
    description: 'Stir-fried noodles loaded with spiced chicken shreds, garlic and fresh crunchy greens.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'n3',
    name: 'Paneer Chowmein',
    category: 'noodles',
    price: 120,
    isVeg: true,
    bestseller: false,
    description: 'Desi wok chowmein tossed with fried cottage cheese strips and soy seasonings.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'n4',
    name: 'Veg Hong Kong Chowmein',
    category: 'noodles',
    price: 200,
    isVeg: true,
    bestseller: true,
    description: 'Premium Hong Kong style crispy & saucy noodles with exotic vegetables and mushrooms.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80'
  },

  // --- Pizzas & Rolls ---
  {
    id: 'p1',
    name: 'Veg Spring Roll',
    category: 'pizzas-rolls',
    price: 210,
    isVeg: true,
    bestseller: true,
    description: 'Golden crispy pastry rolls stuffed with sautéed Asian vegetables. Served with hot dip.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    name: 'Chicken Spring Roll',
    category: 'pizzas-rolls',
    price: 245,
    isVeg: false,
    bestseller: true,
    description: 'Crisp hand-rolled wraps packed with spiced chicken and crunchy veggies.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3',
    name: 'Onion Pizza',
    category: 'pizzas-rolls',
    price: 180,
    isVeg: true,
    bestseller: false,
    description: 'Baked thin crust topped with sweet red onions, pizza herbs & 100% mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p4',
    name: 'Capsicum & Corn Pizza',
    category: 'pizzas-rolls',
    price: 200,
    isVeg: true,
    bestseller: false,
    description: 'Crispy crust loaded with golden sweet corn kernels, diced capsicum and melted cheese.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p5',
    name: 'Non-Veg Mixed Pizza',
    category: 'pizzas-rolls',
    price: 220,
    isVeg: false,
    bestseller: true,
    description: 'Chef special pizza overloaded with spiced chicken chunks, onion, capsicum & mozzarella.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p6',
    name: 'Paneer Kathi Roll',
    category: 'pizzas-rolls',
    price: 90,
    isVeg: true,
    bestseller: false,
    description: 'Crispy flaky paratha rolled with tawa paneer, tangy mint chutney and sliced onions.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p7',
    name: 'Chicken Egg Roll',
    category: 'pizzas-rolls',
    price: 110,
    isVeg: false,
    bestseller: true,
    description: 'Kolkatta style egg paratha wrap loaded with spicy roasted chicken chunks and sauces.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
  },

  // --- Soups, Salads & Drinks ---
  {
    id: 'sb1',
    name: 'Veg Sweet Corn Soup',
    category: 'soups-beverages',
    price: 90,
    isVeg: true,
    bestseller: false,
    description: 'Comforting warm soup loaded with crushed sweet American corn & fine vegetables.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sb2',
    name: 'Chicken Manchow Soup',
    category: 'soups-beverages',
    price: 120,
    isVeg: false,
    bestseller: true,
    description: 'Spicy dark chicken broth with garlic, ginger, coriander and crispy fried noodles on top.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sb3',
    name: 'Fresh Green Salad',
    category: 'soups-beverages',
    price: 60,
    isVeg: true,
    bestseller: false,
    description: 'Freshly sliced cucumbers, tomatoes, onions, carrots and green chillies with lemon.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sb4',
    name: 'Special Sweet Lassi',
    category: 'soups-beverages',
    price: 60,
    isVeg: true,
    bestseller: true,
    description: 'Thick churned creamy yogurt lassi garnished with malai and cardamom powder.',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80'
  },

  // --- Desserts ---
  {
    id: 'd1',
    name: 'Hot Gulab Jamun (2 pcs)',
    category: 'desserts',
    price: 50,
    isVeg: true,
    bestseller: true,
    description: 'Soft melt-in-the-mouth khoya balls soaked in warm saffron-cardamom sugar syrup.',
    image: 'https://images.unsplash.com/photo-1667290074218-c21d84877714?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'd2',
    name: 'Fruit Salad with Ice Cream',
    category: 'desserts',
    price: 140,
    isVeg: true,
    bestseller: false,
    description: 'Fresh seasonal mixed fruits bowl served with a scoop of creamy vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'
  }
];

// Restaurant Contact & Metadata
const RESTAURANT_INFO = {
  name: "Ashirwad Restaurant",
  hindiName: "आशीर्वाद रेस्टोरेंट",
  tagline: "Authentic Multi-Cuisine Dining & Family Restaurant",
  phone: "7004230188",
  phoneDisplay: "+91 70042 30188",
  whatsappNumber: "917004230188",
  address: "Near Bansilal Chowk / Kani Bazar Chowk, Munka Bagicha, Hazaribagh, Jharkhand - 825301",
  coordinates: {
    lat: 23.9928812,
    lng: 85.3616478
  },
  googleMapsUrl: "https://www.google.co.in/maps/place/Ashirwad+Restaurant/@23.9928861,85.3590729,17z/data=!3m1!4b1!4m6!3m5!1s0x39f49c1b13d3edcf:0xce0a5655f48c7786!8m2!3d23.9928812!4d85.3616478!16s%2Fg%2F11cs5jppyh",
  timings: "10:30 AM – 10:30 PM (All 7 Days)",
  services: ["Dine-In", "Takeaway", "Home Delivery", "Party & Bulk Orders"]
};
