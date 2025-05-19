// DOM Element References
const searchForm = document.getElementById('search-form');
const searchQueryInput = document.getElementById('search-query');
const newsContainer = document.getElementById('news-container');
const loadingIndicator = document.getElementById('loading-indicator');
const errorMessageContainer = document.getElementById('error-message');
const errorTextElement = document.getElementById('error-text');
const initialMessage = document.getElementById('initial-message');

// Advanced Search UI Elements (to be added to HTML)
const advancedSearchToggle = document.getElementById('advanced-search-toggle');
const advancedSearchPanel = document.getElementById('advanced-search-panel');
const langSelect = document.getElementById('language-select');
const sortBySelect = document.getElementById('sort-by');
const fromDateInput = document.getElementById('from-date');
const toDateInput = document.getElementById('to-date');
const sourcesInput = document.getElementById('sources-input');

// NewsAPI Configuration
const API_KEY = '1d735502df214cfdb447b474c1400cef'; // Your NewsAPI Key
const NEWS_API_URL_BASE = 'https://newsapi.org/v2/everything';
const NEWS_API_TOP_HEADLINES = 'https://newsapi.org/v2/top-headlines';

// Event Listener for the Search Form
if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const query = searchQueryInput.value.trim();
        if (query) {
            // Get advanced search parameters (if panel exists)
            const advancedParams = getAdvancedSearchParams();
            fetchNews(query, advancedParams);
        } else {
            showError("Please enter a search term.");
        }
    });
} else {
    console.error("Search form not found. Ensure the HTML element with ID 'search-form' exists.");
}

// Toggle Advanced Search Panel (if UI elements exist)
if (advancedSearchToggle && advancedSearchPanel) {
    advancedSearchToggle.addEventListener('click', function() {
        advancedSearchPanel.classList.toggle('hidden');
        // Update text based on visibility
        advancedSearchToggle.textContent = advancedSearchPanel.classList.contains('hidden') 
            ? 'Show Advanced Options' 
            : 'Hide Advanced Options';
    });
}

// Set default dates for advanced search (if inputs exist)
if (fromDateInput && toDateInput) {
    // Set default "from" date to 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    fromDateInput.valueAsDate = thirtyDaysAgo;
    
    // Set default "to" date to today
    const today = new Date();
    toDateInput.valueAsDate = today;
}

// Function to collect advanced search parameters
function getAdvancedSearchParams() {
    const params = {};
    
    // Add language filter if selected
    if (langSelect && langSelect.value) {
        params.language = langSelect.value;
    } else {
        // Default to English if not specified
        params.language = 'en';
    }
    
    // Add sort method if selected
    if (sortBySelect && sortBySelect.value) {
        params.sortBy = sortBySelect.value;
    } else {
        // Default to relevancy
        params.sortBy = 'relevancy';
    }
    
    // Add date range if specified
    if (fromDateInput && fromDateInput.value) {
        params.from = fromDateInput.value;
    }
    
    if (toDateInput && toDateInput.value) {
        params.to = toDateInput.value;
    }
    
    // Add sources if specified
    if (sourcesInput && sourcesInput.value) {
        // Convert comma-separated sources to API format
        params.sources = sourcesInput.value.split(',')
            .map(source => source.trim())
            .filter(source => source.length > 0)
            .join(',');
    }
    
    return params;
}

// Function to Format Date
function formatDate(isoString) {
    if (!isoString) return 'Date N/A';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        console.error("Error formatting date:", isoString, e);
        return "Invalid Date";
    }
}

// Function to Create a News Card Element
function createNewsCard(article) {
    // Create the main article card
    const card = document.createElement('article');
    card.className = 'news-card bg-white rounded-xl shadow-lg overflow-hidden'; // Tailwind classes

    // Create image link container
    const imgLink = document.createElement('a');
    imgLink.href = article.url || '#';
    imgLink.target = '_blank';
    imgLink.rel = 'noopener noreferrer';

    // Create image element
    const img = document.createElement('img');
    img.src = article.urlToImage || 'https://placehold.co/600x400/e0e0e0/757575?text=No+Image';
    img.alt = article.title || 'News image';
    img.className = 'w-full h-48 object-cover'; // Tailwind classes
    // Image error handling
    img.onerror = function() {
        this.onerror = null; // Prevent infinite loop if fallback also fails
        this.src = 'https://placehold.co/600x400/e0e0e0/757575?text=Image+Error';
        this.setAttribute('data-failed-src', 'true'); // For CSS targeting
    };
    imgLink.appendChild(img);
    card.appendChild(imgLink);

    // Create content container div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'p-5 news-card-content'; // Tailwind classes + custom for flex
    card.appendChild(contentDiv);

    // Create title heading
    const title = document.createElement('h2');
    title.className = 'text-lg font-semibold text-gray-800 mb-2'; // Tailwind classes
    const titleLink = document.createElement('a');
    titleLink.href = article.url || '#';
    titleLink.textContent = article.title || 'No Title Available';
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    titleLink.className = 'hover:text-blue-600 transition-colors duration-150 line-clamp-3'; // Tailwind classes
    title.appendChild(titleLink);
    contentDiv.appendChild(title);

    // Create description paragraph
    const description = document.createElement('p');
    description.className = 'text-gray-600 text-sm mb-3 news-card-description line-clamp-4'; // Tailwind classes
    description.textContent = article.description || 'No description available.';
    contentDiv.appendChild(description);

    // Create footer div for source and date
    const footerDiv = document.createElement('div');
    footerDiv.className = 'mt-auto pt-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500'; // Tailwind classes
    
    // Create source span
    const source = document.createElement('span');
    source.className = 'font-medium truncate pr-2'; // Tailwind classes for truncation
    source.textContent = article.source?.name || 'Unknown Source';
    source.title = article.source?.name || 'Unknown Source'; // Tooltip for full name if truncated
    footerDiv.appendChild(source);

    // Create published date span
    const publishedAt = document.createElement('span');
    publishedAt.textContent = formatDate(article.publishedAt);
    footerDiv.appendChild(publishedAt);
    
    contentDiv.appendChild(footerDiv);
    return card;
}

// Enhanced Query Processing
function enhanceQuery(query) {
    // Remove excess spaces
    query = query.trim();
    
    // Handle quotes for exact phrase search
    if (!query.includes('"') && query.includes(' ')) {
        // For multi-word queries without quotes, consider making an exact phrase variant
        const words = query.split(' ');
        if (words.length >= 2 && words.length <= 4) {
            // For shorter phrases (2-4 words), it often makes sense to search them as exact phrases
            return `"${query}" OR ${query}`;
        }
    }
    
    return query;
}

// Function to Fetch News from NewsAPI
async function fetchNews(query, advancedParams = {}) {
    // Clear previous state and show loading indicator
    if (newsContainer) newsContainer.innerHTML = '';
    if (errorMessageContainer) errorMessageContainer.classList.add('hidden');
    if (initialMessage) initialMessage.classList.add('hidden');
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');

    // Process and enhance query
    const enhancedQuery = enhanceQuery(query);
    
    // Determine if we should use 'everything' or 'top-headlines' endpoint
    // Top headlines can be more relevant for current news but has limited parameters
    const useTopHeadlines = advancedParams.useTopHeadlines && advancedParams.country;
    const apiUrl = useTopHeadlines ? NEWS_API_TOP_HEADLINES : NEWS_API_URL_BASE;
    
    // Build the API parameters object
    const apiParams = new URLSearchParams();
    apiParams.append('apiKey', API_KEY);
    
    // Add the query
    if (useTopHeadlines) {
        // For top headlines, the q parameter is optional
        if (enhancedQuery) {
            apiParams.append('q', enhancedQuery);
        }
        apiParams.append('country', advancedParams.country);
    } else {
        // For 'everything' endpoint, q is required
        apiParams.append('q', enhancedQuery);
    }
    
    // Add page size (default to 21)
    apiParams.append('pageSize', advancedParams.pageSize || 21);
    
    // Add advanced parameters
    if (advancedParams.language) {
        apiParams.append('language', advancedParams.language);
    }
    
    if (advancedParams.sortBy) {
        apiParams.append('sortBy', advancedParams.sortBy);
    }
    
    if (advancedParams.from) {
        // Ensure date is in ISO format
        apiParams.append('from', new Date(advancedParams.from).toISOString().split('T')[0]);
    }
    
    if (advancedParams.to) {
        // Ensure date is in ISO format
        apiParams.append('to', new Date(advancedParams.to).toISOString().split('T')[0]);
    }
    
    if (advancedParams.sources && !useTopHeadlines) {
        // sources parameter doesn't work with country parameter in top-headlines
        apiParams.append('sources', advancedParams.sources);
    }
    
    if (advancedParams.domains) {
        apiParams.append('domains', advancedParams.domains);
    }
    
    if (advancedParams.excludeDomains) {
        apiParams.append('excludeDomains', advancedParams.excludeDomains);
    }
    
    // Construct the final URL
    const url = `${apiUrl}?${apiParams.toString()}`;
    
    try {
        console.log("Fetching news with URL:", url); // For debugging
        const response = await fetch(url);
        
        // Check if the response is not OK (status code not in 200-299 range)
        if (!response.ok) {
            let errorMsg = `API Error: ${response.status} ${response.statusText}`;
            try {
                const errData = await response.json(); // Try to parse error response from API
                if (errData && errData.message) {
                   errorMsg = `API Error: ${errData.message}`;
                }
            } catch (e) {
                // If error response is not JSON, use the status text
                console.warn("Could not parse error response JSON.", e);
            }
            throw new Error(errorMsg);
        }
        
        const data = await response.json();

        // Process successful response
        if (data.status === "ok" && data.articles && data.articles.length > 0) {
            let articlesAdded = 0;
            
            // Pre-filter to remove duplicate articles (sometimes the API returns duplicates)
            const uniqueArticles = removeDuplicateArticles(data.articles);
            
            // Display articles
            uniqueArticles.forEach(article => {
                // Basic filter for articles: ensure title, description, and URL are present
                if (article.title && article.description && article.url) {
                     const newsCard = createNewsCard(article);
                     if (newsContainer) newsContainer.appendChild(newsCard);
                     articlesAdded++;
                }
            });
            
            if (articlesAdded === 0) { // If all articles were filtered out
                showNoResults(query);
            }
        } else if (data.articles && data.articles.length === 0) {
            showNoResults(query);
        } else {
            // Handle other 'ok' statuses that might not have articles or specific error messages from API
            showError(data.message || "No articles found or an unexpected response from the API.");
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        showError(error.message || 'Could not connect to the news service. Check your internet connection or API key.');
    } finally {
        // Hide loading indicator
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
    }
}

// Function to remove duplicate articles based on URL or title
function removeDuplicateArticles(articles) {
    const seen = new Set();
    return articles.filter(article => {
        // Use URL as primary key for uniqueness
        const key = article.url || article.title;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

// Function to Display "No Results" Message
function showNoResults(query) {
    if (newsContainer) newsContainer.innerHTML = ''; // Clear any potential stray items
    if (initialMessage) {
        initialMessage.innerHTML = `<p>No news articles found for "<strong>${query || searchQueryInput.value}</strong>". Try a different search term or adjust your filters.</p>`;
        initialMessage.classList.remove('hidden');
    }
    if (errorMessageContainer) errorMessageContainer.classList.add('hidden');
}

// Function to Display Error Message
function showError(message) {
    if (errorTextElement) errorTextElement.textContent = message;
    if (errorMessageContainer) errorMessageContainer.classList.remove('hidden');
    if (newsContainer) newsContainer.innerHTML = ''; // Clear news container on error
    if (initialMessage) initialMessage.classList.add('hidden');
}

// Initial call or setup for default view
document.addEventListener('DOMContentLoaded', () => {
    // You could fetch some default news here, for example top headlines
    if (initialMessage) initialMessage.classList.remove('hidden');
});