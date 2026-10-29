# aashirwad - Home Delivery Ordering System

Fast, direct home delivery ordering web application for **aashirwad** in Hazaribagh, Jharkhand.

🌐 **Live Website (GitHub Pages):** [https://abhi266raj.github.io/aashirwad/](https://abhi266raj.github.io/aashirwad/)  
📞 **Order & SMS Hotline:** `+91 7004230188` (`7004230188`)  
📍 **Location:** Bansilal Chowk, Hazaribagh, Jharkhand  
🚀 **Delivery:** Free Home Delivery in Hazaribagh  

---

## ⚡ Direct Delivery-First Features

1. **Immediate Order Flow:**
   - No unnecessary banners, titles, or marketing fluff.
   - Directly opens with the **Home Delivery Address Prompt** and **Live Searchable Menu**.
2. **Instant Search & Category Filters:**
   - Real-time instant search bar for any dish name.
   - Dietary filters (Pure Veg / Non-Veg) and quick category navigation tabs.
3. **Structured Local Assets:**
   - All dish images match the dish name.
   - Every dish image is located at `assets/veg/<dishname>/dish.png` (and `assets/nonveg/<dishname>/dish.png`), named exactly `dish.png`.
4. **Automatic Price Totaling & Expected Price Dispatch:**
   - Selecting any dish adds it to the order with live expected price calculation.
   - Generates and dispatches a complete formatted SMS to `7004230188` (or WhatsApp) containing:
     - Customer Delivery Address
     - Customer Name & Phone
     - Selected dishes with quantities and unit prices
     - **TOTAL EXPECTED PRICE**

---

## 🚀 How to Host on GitHub Pages

1. **Push this Git repository to your GitHub account:**
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. **Activate GitHub Pages:**
   - Navigate to your repository on GitHub.
   - Click **Settings** > **Pages**.
   - Under **Build and deployment**:
     - Source: **Deploy from a branch**
     - Branch: **`main`** / Folder: **`/ (root)`**
   - Click **Save**.
3. Your website will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 💻 Local Preview

Run locally with Python:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000` in any browser.
