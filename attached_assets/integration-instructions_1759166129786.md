
# Blog Preview Card Integration Instructions

## For GitHub Pages Main Site (beaverlyai.com)

### Option 1: HTML Component (Recommended)
1. Copy the `blog-preview-card.html` file content
2. Extract just the CSS and HTML portions 
3. Add to your main site where you want the blog preview

### Option 2: JavaScript Component
1. Add the `blog-preview-card-component.js` to your main site
2. Include it in your HTML:
```html
<script src="path/to/blog-preview-card-component.js"></script>
```
3. Add a container div where you want the card:
```html
<div id="beaverly-blog-preview"></div>
```

### Option 3: Manual Integration
Add this HTML and CSS to your main site:

#### HTML:
```html
<a href="https://blog.beaverlyai.com" class="beaverly-blog-card" target="_blank" rel="noopener noreferrer">
    <div class="blog-card-header">
        <div class="blog-card-icon">B</div>
        <h3 class="blog-card-title">Beaverly Blog</h3>
    </div>
    
    <p class="blog-card-description">
        Insights into AI-powered wealth automation, personal wealth co-pilot, and the next generation of financial technology.
    </p>
    
    <div class="blog-card-meta">
        <div class="blog-card-stats">
            <span class="blog-card-stat">
                <span>📝</span>
                <span>Latest insights</span>
            </span>
            <span class="blog-card-stat">
                <span>🤖</span>
                <span>AI Trading</span>
            </span>
        </div>
        <span class="blog-card-cta">Read Articles</span>
    </div>
</a>
```

#### CSS:
Copy the CSS from `blog-preview-card-component.js` (everything within the `<style>` tags)

## Customization Options

### Theme
- Dark theme (default): Use existing styles
- Light theme: Change background colors and text colors in CSS

### Colors
- Primary accent: Currently `#00ff88` and `#00ccff` (gradient)
- Modify the gradient in `.blog-card-icon` and `.blog-card-cta`

### Content
- Update title, description, and stats as needed
- Change the icon from "B" to a custom logo/icon

## Integration Steps for Your GitHub Pages Site

1. **Locate your main site files** (likely in a `docs/` folder or root)
2. **Choose integration method** (Option 1, 2, or 3 above)
3. **Add the component** to your homepage or dedicated section
4. **Test the link** to ensure it properly redirects to `https://blog.beaverlyai.com`
5. **Style adjustments** if needed to match your main site design

## Notes
- The blog URL is hardcoded to your Vercel deployment
- The card is responsive and works on mobile devices
- Hover effects provide good user interaction feedback
- The design matches Beaverly's black/white minimalist aesthetic
