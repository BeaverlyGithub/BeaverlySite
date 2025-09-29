
// Beaverly Blog Preview Card Component
// Usage: Include this script and call createBlogPreviewCard() where you want the card

function createBlogPreviewCard(containerId, options = {}) {
    const defaultOptions = {
        title: "Beaverly Blog",
        description: "Insights into AI-powered wealth automation, personal wealth co-pilot, and the next generation of financial technology.",
        url: "https://blog.beaverlyai.com",
        theme: "dark" // or "light"
    };
    
    const config = { ...defaultOptions, ...options };
    
    const cardHTML = `
        <a href="${config.url}" class="beaverly-blog-card" target="_blank" rel="noopener noreferrer">
            <div class="blog-card-header">
                <div class="blog-card-icon">B</div>
                <h3 class="blog-card-title">${config.title}</h3>
            </div>
            
            <p class="blog-card-description">${config.description}</p>
            
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
    `;
    
    const cardCSS = `
        <style>
        .beaverly-blog-card {
            background: ${config.theme === 'dark' ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'};
            border: 1px solid ${config.theme === 'dark' ? '#333' : '#e1e5e9'};
            border-radius: 12px;
            padding: 2rem;
            max-width: 400px;
            color: ${config.theme === 'dark' ? '#ffffff' : '#2d3748'};
            text-decoration: none;
            display: block;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, ${config.theme === 'dark' ? '0.1' : '0.05'});
            position: relative;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .beaverly-blog-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, ${config.theme === 'dark' ? '0.2' : '0.1'});
            border-color: ${config.theme === 'dark' ? '#555' : '#cbd5e0'};
            text-decoration: none;
            color: ${config.theme === 'dark' ? '#ffffff' : '#2d3748'};
        }

        .beaverly-blog-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #00ff88, #00ccff);
        }

        .beaverly-blog-card .blog-card-header {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .beaverly-blog-card .blog-card-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #00ff88, #00ccff);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            font-weight: bold;
            color: #000;
            font-size: 1.2rem;
        }

        .beaverly-blog-card .blog-card-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
            color: ${config.theme === 'dark' ? '#ffffff' : '#2d3748'};
        }

        .beaverly-blog-card .blog-card-description {
            color: ${config.theme === 'dark' ? '#cccccc' : '#718096'};
            margin-bottom: 1.5rem;
            line-height: 1.6;
            font-size: 0.95rem;
        }

        .beaverly-blog-card .blog-card-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            color: ${config.theme === 'dark' ? '#999' : '#a0aec0'};
        }

        .beaverly-blog-card .blog-card-cta {
            color: #00ff88;
            font-weight: 600;
            display: flex;
            align-items: center;
        }

        .beaverly-blog-card .blog-card-cta::after {
            content: '→';
            margin-left: 0.5rem;
            transition: transform 0.3s ease;
        }

        .beaverly-blog-card:hover .blog-card-cta::after {
            transform: translateX(4px);
        }

        .beaverly-blog-card .blog-card-stats {
            display: flex;
            gap: 1rem;
        }

        .beaverly-blog-card .blog-card-stat {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        @media (max-width: 768px) {
            .beaverly-blog-card {
                padding: 1.5rem;
                max-width: 100%;
            }
            
            .beaverly-blog-card .blog-card-title {
                font-size: 1.25rem;
            }
        }
        </style>
    `;
    
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = cardCSS + cardHTML;
    }
}

// Auto-initialization if container exists
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('beaverly-blog-preview')) {
        createBlogPreviewCard('beaverly-blog-preview');
    }
});
