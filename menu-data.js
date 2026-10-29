/**
 * Aashirwad - Home Delivery Menu Data
 * All dish images are located in assets/veg/<dishname>/dish.png and assets/nonveg/<dishname>/dish.png
 * Phone / SMS / WhatsApp: +91 7004230188
 */

const MENU_CATEGORIES = [
  { id: 'all', name: 'All Dishes', icon: '🍽️' },
  { id: 'breads', name: 'Roti & Naan', icon: '🫓' },
  { id: 'main-veg', name: 'Veg Main Course', icon: '🥘' },
  { id: 'main-nonveg', name: 'Non-Veg Main Course', icon: '🍗' },
  { id: 'momos', name: 'Momos', icon: '🥟' },
  { id: 'biryani-rice', name: 'Biryani & Rice', icon: '🍚' },
  { id: 'noodles', name: 'Chowmein & Fast Food', icon: '🍜' },
  { id: 'starters', name: 'Starters & Chilli', icon: '🥢' },
  { id: 'drinks-desserts', name: 'Drinks & Desserts', icon: '🍨' }
];

const MENU_ITEMS = [
  // --- Roti & Naan ---
  {
    id: 'b1',
    name: 'Makhan Roti',
    category: 'breads',
    price: 20,
    isVeg: true,
    bestseller: true,
    description: 'Hot tandoori wheat roti brushed with fresh butter.',
    image: 'assets/veg/makhan-roti/dish.png'
  },
  {
    id: 'b2',
    name: 'Plain Naan',
    category: 'breads',
    price: 35,
    isVeg: true,
    bestseller: false,
    description: 'Clay-tandoor baked soft refined flour naan.',
    image: 'assets/veg/plain-naan/dish.png'
  },
  {
    id: 'b3',
    name: 'Butter Naan',
    category: 'breads',
    price: 45,
    isVeg: true,
    bestseller: true,
    description: 'Soft tandoori naan coated with melting butter.',
    image: 'assets/veg/butter-naan/dish.png'
  },
  {
    id: 'b4',
    name: 'Garlic Naan',
    category: 'breads',
    price: 65,
    isVeg: true,
    bestseller: true,
    description: 'Naan topped with chopped garlic and coriander.',
    image: 'assets/veg/garlic-naan/dish.png'
  },
  {
    id: 'b5',
    name: 'Stuffed Kulcha',
    category: 'breads',
    price: 55,
    isVeg: true,
    bestseller: true,
    description: 'Tandoori kulcha stuffed with spiced potato & veg filling.',
    image: 'assets/veg/stuffed-kulcha/dish.png'
  },
  {
    id: 'b6',
    name: 'Masala Kulcha',
    category: 'breads',
    price: 50,
    isVeg: true,
    bestseller: false,
    description: 'Mildly spiced, crisp tandoori kulcha.',
    image: 'assets/veg/masala-kulcha/dish.png'
  },

  // --- Veg Main Course ---
  {
    id: 'mv1',
    name: 'Paneer Butter Masala',
    category: 'main-veg',
    price: 210,
    isVeg: true,
    bestseller: true,
    description: 'Fresh paneer cubes in velvety tomato and cashew gravy.',
    image: 'assets/veg/paneer-butter-masala/dish.png'
  },
  {
    id: 'mv2',
    name: 'Paneer Shahi Korma',
    category: 'main-veg',
    price: 230,
    isVeg: true,
    bestseller: true,
    description: 'Cottage cheese in rich creamy almond Mughlai gravy.',
    image: 'assets/veg/paneer-shahi-korma/dish.png'
  },
  {
    id: 'mv3',
    name: 'Kadai Paneer',
    category: 'main-veg',
    price: 220,
    isVeg: true,
    bestseller: false,
    description: 'Paneer tossed with capsicum and freshly pounded kadai spices.',
    image: 'assets/veg/kadai-paneer/dish.png'
  },
  {
    id: 'mv4',
    name: 'Veg Handi',
    category: 'main-veg',
    price: 240,
    isVeg: true,
    bestseller: true,
    description: 'Assorted garden vegetables slow-cooked in handi spices.',
    image: 'assets/veg/veg-handi/dish.png'
  },
  {
    id: 'mv5',
    name: 'Dal Makhani',
    category: 'main-veg',
    price: 170,
    isVeg: true,
    bestseller: true,
    description: 'Slow-simmered black lentils with butter and cream.',
    image: 'assets/veg/dal-makhani/dish.png'
  },
  {
    id: 'mv6',
    name: 'Dal Tadka (Desi Ghee)',
    category: 'main-veg',
    price: 130,
    isVeg: true,
    bestseller: false,
    description: 'Yellow lentils tempered with cumin, garlic and desi ghee.',
    image: 'assets/veg/dal-tadka/dish.png'
  },
  {
    id: 'mv7',
    name: 'Mushroom Masala',
    category: 'main-veg',
    price: 210,
    isVeg: true,
    bestseller: false,
    description: 'Fresh button mushrooms simmered in thick spiced onion-tomato gravy.',
    image: 'assets/veg/mushroom-masala/dish.png'
  },

  // --- Non-Veg Main Course ---
  {
    id: 'mn1',
    name: 'Chicken Murgh Masala',
    category: 'main-nonveg',
    price: 410,
    isVeg: false,
    bestseller: true,
    description: 'Royal chicken specialty cooked in minced chicken and egg gravy.',
    image: 'assets/nonveg/chicken-murgh-masala/dish.png'
  },
  {
    id: 'mn2',
    name: 'Butter Chicken',
    category: 'main-nonveg',
    price: 340,
    isVeg: false,
    bestseller: true,
    description: 'Roasted chicken cooked in rich buttery makhani gravy.',
    image: 'assets/nonveg/butter-chicken/dish.png'
  },
  {
    id: 'mn3',
    name: 'Chicken Shahi Korma',
    category: 'main-nonveg',
    price: 360,
    isVeg: false,
    bestseller: true,
    description: 'Tender chicken pieces simmered in silky cashew and saffron cream.',
    image: 'assets/nonveg/chicken-shahi-korma/dish.png'
  },
  {
    id: 'mn4',
    name: 'Kadai Chicken',
    category: 'main-nonveg',
    price: 320,
    isVeg: false,
    bestseller: false,
    description: 'Spiced chicken tossed with capsicum and freshly crushed whole spices.',
    image: 'assets/nonveg/kadai-chicken/dish.png'
  },
  {
    id: 'mn5',
    name: 'Chicken Handi',
    category: 'main-nonveg',
    price: 330,
    isVeg: false,
    bestseller: false,
    description: 'Slow-simmered countryside chicken cooked in clay pot gravy.',
    image: 'assets/nonveg/chicken-handi/dish.png'
  },
  {
    id: 'mn6',
    name: 'Homestyle Chicken Curry',
    category: 'main-nonveg',
    price: 260,
    isVeg: false,
    bestseller: false,
    description: 'Desi style flavorful chicken curry prepared with aromatic spices.',
    image: 'assets/nonveg/chicken-curry/dish.png'
  },

  // --- Momos ---
  {
    id: 'mo1',
    name: 'Steamed Veg Momos (6 pcs)',
    category: 'momos',
    price: 80,
    isVeg: true,
    bestseller: true,
    description: 'Fresh steamed dumplings packed with finely minced crunchy vegetables. Served with spicy momo dip.',
    image: 'assets/veg/steamed-veg-momos/dish.png'
  },
  {
    id: 'mo2',
    name: 'Fried Veg Momos (6 pcs)',
    category: 'momos',
    price: 90,
    isVeg: true,
    bestseller: false,
    description: 'Golden fried crispy momos served with fiery momo chutney.',
    image: 'assets/veg/fried-veg-momos/dish.png'
  },
  {
    id: 'mo3',
    name: 'Paneer Momos (6 pcs)',
    category: 'momos',
    price: 100,
    isVeg: true,
    bestseller: true,
    description: 'Steamed dumplings filled with seasoned fresh cottage cheese.',
    image: 'assets/veg/paneer-momos/dish.png'
  },
  {
    id: 'mo4',
    name: 'Steamed Chicken Momos (6 pcs)',
    category: 'momos',
    price: 110,
    isVeg: false,
    bestseller: true,
    description: 'Juicy steamed dumplings loaded with seasoned minced chicken.',
    image: 'assets/nonveg/steamed-chicken-momos/dish.png'
  },
  {
    id: 'mo5',
    name: 'Fried Chicken Momos (6 pcs)',
    category: 'momos',
    price: 120,
    isVeg: false,
    bestseller: false,
    description: 'Crisp deep-fried chicken dumplings with hot dipping sauce.',
    image: 'assets/nonveg/fried-chicken-momos/dish.png'
  },

  // --- Biryani & Rice ---
  {
    id: 'r1',
    name: 'Aashirwad Special Veg Biryani',
    category: 'biryani-rice',
    price: 280,
    isVeg: true,
    bestseller: true,
    description: 'Basmati rice dum-cooked with vegetables, paneer, brown onions & saffron. Served with raita.',
    image: 'assets/veg/veg-biryani/dish.png'
  },
  {
    id: 'r2',
    name: 'Chicken Dum Biryani',
    category: 'biryani-rice',
    price: 260,
    isVeg: false,
    bestseller: true,
    description: 'Fragrant chicken dum biryani served with gravy and cooling raita.',
    image: 'assets/nonveg/chicken-dum-biryani/dish.png'
  },
  {
    id: 'r3',
    name: 'Veg Fried Rice',
    category: 'biryani-rice',
    price: 155,
    isVeg: true,
    bestseller: true,
    description: 'Wok-tossed basmati rice with beans, carrots and spring onions.',
    image: 'assets/veg/veg-fried-rice/dish.png'
  },
  {
    id: 'r4',
    name: 'Chicken Fried Rice',
    category: 'biryani-rice',
    price: 185,
    isVeg: false,
    bestseller: false,
    description: 'Chinese style fried rice tossed with chicken shreds and egg.',
    image: 'assets/nonveg/chicken-fried-rice/dish.png'
  },
  {
    id: 'r5',
    name: 'Jeera Rice',
    category: 'biryani-rice',
    price: 120,
    isVeg: true,
    bestseller: false,
    description: 'Fluffy steamed basmati rice tempered with roasted cumin.',
    image: 'assets/veg/jeera-rice/dish.png'
  },
  {
    id: 'r6',
    name: 'Veg Pulao',
    category: 'biryani-rice',
    price: 155,
    isVeg: true,
    bestseller: false,
    description: 'Basmati rice cooked with sweet green peas and whole spices.',
    image: 'assets/veg/veg-pulao/dish.png'
  },

  // --- Chowmein & Fast Food ---
  {
    id: 'n1',
    name: 'Veg Chowmein',
    category: 'noodles',
    price: 95,
    isVeg: true,
    bestseller: true,
    description: 'Street style wok-tossed noodles with shredded crunchy vegetables.',
    image: 'assets/veg/veg-chowmein/dish.png'
  },
  {
    id: 'n2',
    name: 'Chicken Chowmein',
    category: 'noodles',
    price: 120,
    isVeg: false,
    bestseller: true,
    description: 'Stir-fried noodles loaded with shredded spiced chicken and veggies.',
    image: 'assets/nonveg/chicken-chowmein/dish.png'
  },
  {
    id: 'n3',
    name: 'Veg Hong Kong Chowmein',
    category: 'noodles',
    price: 200,
    isVeg: true,
    bestseller: false,
    description: 'Hong Kong style crispy and saucy noodles with exotic veggies.',
    image: 'assets/veg/veg-hong-kong-chowmein/dish.png'
  },
  {
    id: 'n4',
    name: 'Veg Spring Roll',
    category: 'noodles',
    price: 210,
    isVeg: true,
    bestseller: true,
    description: 'Crispy rolls filled with sautéed Asian vegetables.',
    image: 'assets/veg/veg-spring-roll/dish.png'
  },
  {
    id: 'n5',
    name: 'Chicken Spring Roll',
    category: 'noodles',
    price: 245,
    isVeg: false,
    bestseller: false,
    description: 'Crispy golden rolls stuffed with seasoned minced chicken.',
    image: 'assets/nonveg/chicken-spring-roll/dish.png'
  },
  {
    id: 'n6',
    name: 'Paneer Kathi Roll',
    category: 'noodles',
    price: 90,
    isVeg: true,
    bestseller: false,
    description: 'Paratha rolled with seasoned paneer, mint chutney & onions.',
    image: 'assets/veg/paneer-roll/dish.png'
  },
  {
    id: 'n7',
    name: 'Chicken Egg Roll',
    category: 'noodles',
    price: 110,
    isVeg: false,
    bestseller: true,
    description: 'Egg paratha wrap loaded with spicy chicken chunks and chutney.',
    image: 'assets/nonveg/chicken-egg-roll/dish.png'
  },
  {
    id: 'n8',
    name: 'Onion Pizza',
    category: 'noodles',
    price: 180,
    isVeg: true,
    bestseller: false,
    description: 'Baked crust topped with sweet onions, herbs & 100% mozzarella.',
    image: 'assets/veg/onion-pizza/dish.png'
  },

  // --- Starters & Chilli ---
  {
    id: 's1',
    name: 'Mushroom Chilli',
    category: 'starters',
    price: 140,
    isVeg: true,
    bestseller: true,
    description: 'Button mushrooms tossed in fiery garlic, soy and capsicum.',
    image: 'assets/veg/mushroom-chilli/dish.png'
  },
  {
    id: 's2',
    name: 'Paneer Chilli',
    category: 'starters',
    price: 190,
    isVeg: true,
    bestseller: true,
    description: 'Crispy cottage cheese cubes tossed in spicy chilli sauce.',
    image: 'assets/veg/paneer-chilli/dish.png'
  },
  {
    id: 's3',
    name: 'Paneer Manchurian',
    category: 'starters',
    price: 190,
    isVeg: true,
    bestseller: false,
    description: 'Fried paneer tossed in tangy Manchurian sauce.',
    image: 'assets/veg/paneer-manchurian/dish.png'
  },
  {
    id: 's4',
    name: 'Chicken Garlic',
    category: 'starters',
    price: 230,
    isVeg: false,
    bestseller: true,
    description: 'Chicken tossed with roasted garlic, green chillies and scallions.',
    image: 'assets/nonveg/chicken-garlic/dish.png'
  },
  {
    id: 's5',
    name: 'Chicken Finger',
    category: 'starters',
    price: 240,
    isVeg: false,
    bestseller: false,
    description: 'Crispy crumb-fried chicken strips with dip.',
    image: 'assets/nonveg/chicken-finger/dish.png'
  },
  {
    id: 's6',
    name: 'Chicken Lollipop (6 pcs)',
    category: 'starters',
    price: 250,
    isVeg: false,
    bestseller: true,
    description: 'Crispy fried chicken lollipops served with hot garlic sauce.',
    image: 'assets/nonveg/chicken-lollipop/dish.png'
  },
  {
    id: 's7',
    name: 'Tandoori Roast Chicken',
    category: 'starters',
    price: 270,
    isVeg: false,
    bestseller: true,
    description: 'Charcoal roasted chicken marinated in yogurt and tandoori spices.',
    image: 'assets/nonveg/tandoori-chicken/dish.png'
  },

  // --- Drinks & Desserts ---
  {
    id: 'd1',
    name: 'Special Sweet Lassi',
    category: 'drinks-desserts',
    price: 60,
    isVeg: true,
    bestseller: true,
    description: 'Thick creamy churned yogurt lassi with cardamom.',
    image: 'assets/veg/sweet-lassi/dish.png'
  },
  {
    id: 'd2',
    name: 'Hot Gulab Jamun (2 pcs)',
    category: 'drinks-desserts',
    price: 50,
    isVeg: true,
    bestseller: true,
    description: 'Soft khoya dumplings in warm saffron sugar syrup.',
    image: 'assets/veg/gulab-jamun/dish.png'
  },
  {
    id: 'd3',
    name: 'Fresh Green Salad',
    category: 'drinks-desserts',
    price: 60,
    isVeg: true,
    bestseller: false,
    description: 'Sliced cucumbers, tomatoes, carrots, onion and green chillies.',
    image: 'assets/veg/green-salad/dish.png'
  },
  {
    id: 'd4',
    name: 'Veg Sweet Corn Soup',
    category: 'drinks-desserts',
    price: 90,
    isVeg: true,
    bestseller: false,
    description: 'Warm comforting soup with sweet corn kernels.',
    image: 'assets/veg/sweet-corn-soup/dish.png'
  },
  {
    id: 'd5',
    name: 'Chicken Manchow Soup',
    category: 'drinks-desserts',
    price: 120,
    isVeg: false,
    bestseller: false,
    description: 'Spicy chicken soup served with crunchy fried noodles.',
    image: 'assets/nonveg/chicken-manchow-soup/dish.png'
  }
];

// Restaurant Contact Information
const RESTAURANT_INFO = {
  name: "aashirwad",
  displayName: "Aashirwad",
  phone: "7004230188",
  whatsappNumber: "917004230188",
  city: "Hazaribagh",
  deliveryNote: "Free Home Delivery in Hazaribagh"
};
