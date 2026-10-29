# Ashirwad Restaurant Website (Hazaribagh, Jharkhand)

Official responsive restaurant website and online ordering system for **Ashirwad Restaurant** (Bansilal Chowk, Hazaribagh, Jharkhand).

📍 **Google Maps Location:** [Ashirwad Restaurant on Google Maps](https://www.google.co.in/maps/place/Ashirwad+Restaurant/@23.9928861,85.3590729,17z/data=!3m1!4b1!4m6!3m5!1s0x39f49c1b13d3edcf:0xce0a5655f48c7786!8m2!3d23.9928812!4d85.3616478!16s%2Fg%2F11cs5jppyh)  
📞 **Order / SMS Hotline:** `+91 7004230188` (7004230188)  
📌 **Address:** Near Bansilal Chowk / Kani Bazar Chowk, Munka Bagicha, Hazaribagh, Jharkhand - 825301  
⏰ **Timings:** 10:30 AM – 10:30 PM (All 7 Days)

---

## 🌟 Key Features

1. **Complete Verified Menu:**
   - **Tandoor & Breads:** Makhan Roti (₹20), Butter Naan (₹45), Garlic Naan (₹65), Stuffed Kulcha (₹55), etc.
   - **Starters & Chinese:** Paneer Chilli (₹190), Mushroom Chilli (₹140), Chicken Garlic (₹230), Chicken Lollipop (₹250), etc.
   - **Main Course (Veg):** Paneer Butter Masala (₹210), Paneer Shahi Korma (₹230), Veg Handi (₹240), Dal Makhani (₹170), etc.
   - **Main Course (Non-Veg):** Chicken Murgh Masala (₹410), Chicken Shahi Korma (₹360), Butter Chicken (₹340), etc.
   - **Biryani & Rice:** Ashirwad Special Veg Biryani (₹280), Chicken Dum Biryani (₹260), Fried Rice, Pulao, etc.
   - **Noodles, Chowmein & Pizzas:** Veg Chowmein (₹95), Chicken Chowmein (₹120), Veg/Chicken Spring Rolls, Pizzas, Rolls, etc.
   - **Soups, Salads, Beverages & Desserts:** Sweet Lassi (₹60), Gulab Jamun (₹50), etc.

2. **Item Selection & Cart Management:**
   - One-click "Add to Order" with interactive quantity adjustments (`+` / `-`).
   - Live badge counter and real-time total calculation.
   - Floating cart drawer on mobile & desktop with `localStorage` persistence.

3. **Direct SMS & WhatsApp Ordering to 7004230188:**
   - **Send via SMS (`7004230188`):** Formats customer details (Dine-in table / Delivery address), itemized list with prices and total, and triggers the device's native SMS application.
   - **Send via WhatsApp (`+91 7004230188`):** Generates a pre-filled WhatsApp message.
   - **Copy Order Text:** Allows one-click clipboard copy as a fallback.
   - **Direct Call:** Instant dial button to `7004230188`.

4. **Live Search & Category Filtering:**
   - Instant search across dishes and ingredients.
   - Quick dietary filters: "All Items", "Pure Veg", "Non-Veg".
   - Category tabs for easy navigation.

5. **Integrated Location & Maps:**
   - Embedded Google Map with exact coordinates (`23.9928812, 85.3616478`).
   - Direct link to the verified Google Maps listing.

6. **Static & GitHub Pages Ready:**
   - Zero build tools or server dependencies required.
   - Includes `.nojekyll` for proper GitHub Pages static asset routing.

---

## 🚀 How to Host on GitHub Pages

1. **Create a new repository on GitHub** (e.g. `ashirwad-restaurant` or `<username>.github.io`).
2. **Push this Git folder to GitHub:**
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub (`Settings` -> `Pages`).
   - Under **Build and deployment**:
     - Source: **Deploy from a branch**
     - Branch: **`main`** / Folder: **`/ (root)`**
   - Click **Save**.
4. Your website will be live in ~1 minute at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 💻 Local Preview

To preview the website locally on your computer:
```bash
# Python 3
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.
