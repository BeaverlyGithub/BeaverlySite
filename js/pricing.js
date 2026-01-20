/**
 * Tier Rendering for BeaverlySite
 * Fetches tier data from backend API and dynamically renders pricing cards
 */

const TIER_API_BASE = 'https://cook.beaverlyai.com/api/tier';
const APP_URL = 'https://chilla.beaverlyai.com';

// Tier order for display
const TIER_ORDER = ["chilla's gift", "chill mode", "deep chill", "peak chill"];

async function loadAndRenderTiers() {
    try {
        const response = await fetch(`${TIER_API_BASE}/available-tiers`);
        if (!response.ok) {
            throw new Error('Failed to fetch tiers');
        }

        const data = await response.json();
        const tiers = data.tiers;

        // Sort tiers by defined order
        const sortedTiers = TIER_ORDER
            .map(name => tiers.find(t => t.name === name))
            .filter(Boolean);

        renderPricingCards(sortedTiers);
    } catch (error) {
        console.error('Error loading tiers:', error);
        // Keep existing hardcoded content as fallback
    }
}

function renderPricingCards(tiers) {
    const pricingGrid = document.querySelector('.pricing-grid');
    if (!pricingGrid) return;

    pricingGrid.innerHTML = tiers.map((tier, index) => {
        const isFree = tier.pricing.monthly === 0;
        const isPopular = tier.name === 'deep chill';
        const cardClass = isPopular ? 'pricing-card pricing-card-featured' : 'pricing-card';
        const buttonClass = isPopular ? 'btn btn-primary' : 'btn btn-outline';
        const buttonText = isFree ? 'Start Free' : 
                          tier.name === 'chill mode' ? 'Get Started' :
                          tier.name === 'deep chill' ? 'Go Deeper' :
                          'Unlock Peak';

        return `
            <div class="${cardClass}">
                ${isPopular ? '<div class="popular-badge">Most Popular</div>' : ''}
                <div class="plan-header">
                    <h3>${tier.display_name}</h3>
                    <div class="plan-price">
                        ${isFree ? 'Free' : `$${tier.pricing.monthly}`}
                        <span>${isFree ? '' : '/month'}</span>
                    </div>
                </div>
                <div class="plan-features">
                    ${tier.features.map(feature => `
                        <div class="feature">✓ ${feature}</div>
                    `).join('')}
                </div>
                <div class="plan-note">${tier.tagline}</div>
                <a href="${APP_URL}" class="${buttonClass}" target="_blank" rel="noopener noreferrer">
                    ${buttonText}
                </a>
            </div>
        `;
    }).join('');
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAndRenderTiers);
} else {
    loadAndRenderTiers();
}
