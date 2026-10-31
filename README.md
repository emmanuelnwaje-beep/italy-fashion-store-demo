# ATELIER N°7 — Luxury Fashion Store Demo

A responsive, front-end e-commerce demonstration built for a fashion retailer based in Italy. It includes a curated catalogue of shoes, clothing, watches and accessories, prices in euros, product filters, search, sorting, a shopping bag and a WhatsApp order-enquiry flow.

## Files
- `index.html` — storefront structure and content
- `styles.css` — responsive styling
- `script.js` — catalogue, filters, cart and order-enquiry interactions
- `config.js` — shop settings, including WhatsApp number

## Run locally
Open `index.html` in a browser. An internet connection is needed for Google Fonts and the Unsplash product/editorial photographs.

## Deploy to GitHub Pages
1. Create a new GitHub repository (for example `italy-fashion-store-demo`).
2. Upload **all four files** (`index.html`, `styles.css`, `script.js`, `config.js`) and this README.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish and open the URL it provides.

## Before showing the demo to the shop owner
1. Open `config.js`.
2. Replace `393XXXXXXXXX` with the owner's WhatsApp number in international format, digits only. For an Italian number, it normally begins with `39`.
3. Change the demo brand name `ATELIER N°7` to the real business name if one is chosen.
4. Replace the sample products, prices, descriptions and photos with the owner's actual inventory before using it as a live shop.

## Important demo limitations
- All product names, prices and stock are illustrative.
- Checkout is an **order enquiry via WhatsApp**, not a payment gateway.
- No real orders, customer accounts, inventory or customer details are stored on a server.
- The newsletter form is a visual demo and is not connected to an email service.
- This is a static GitHub Pages site. A production store will need a secure backend, order management, privacy/legal pages, delivery rules and a suitable payment provider.

## Photos
Photographs are embedded from Unsplash image URLs and load from Unsplash when the site is online. They are demonstration imagery, not photos of the retailer's actual stock. Check the current Unsplash licence and each photo's source page before commercial use. Browse more options at https://unsplash.com/s/photos/fashion-product
