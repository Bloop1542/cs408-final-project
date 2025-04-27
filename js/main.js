// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('reviewForm')) {
        initializeReviewSystem();
    }
});

let editingId = null;

function initializeReviewSystem() {
    document.getElementById('reviewForm').addEventListener('submit', (e) => {
        e.preventDefault();
        submitReview();
    });
    renderReviews();
}

function submitReview() {
    const nameInput = document.getElementById('reviewName');
    const textInput = document.getElementById('reviewText');
    
    const review = {
        id: editingId || Date.now().toString(),
        name: nameInput.value.trim(),
        text: textInput.value.trim(),
        date: new Date().toISOString()
    };

    if (!review.name || !review.text) return;

    const reviews = getReviews();
    
    if (editingId) {
        const index = reviews.findIndex(r => r.id === editingId);
        reviews[index] = review;
    } else {
        reviews.push(review);
    }

    localStorage.setItem('reviews', JSON.stringify(reviews));
    clearForm();
    renderReviews();
}

function deleteReview(id) {
    const reviews = getReviews().filter(review => review.id !== id);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    renderReviews();
}

function editReview(id) {
    const review = getReviews().find(r => r.id === id);
    document.getElementById('reviewName').value = review.name;
    document.getElementById('reviewText').value = review.text;
    editingId = id;
}

function getReviews() {
    return JSON.parse(localStorage.getItem('reviews')) || [];
}

function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    const reviews = getReviews();
    
    container.innerHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-author">${review.name}</span>
                <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
            </div>
            <div class="review-actions">
                <button onclick="editReview('${review.id}')">Edit</button>
                <button onclick="deleteReview('${review.id}')">Delete</button>
            </div>
            <p>${review.text}</p>
        </div>
    `).join('');
}

function clearForm() {
    document.getElementById('reviewName').value = '';
    document.getElementById('reviewText').value = '';
    editingId = null;
}

// Remove the export statement for browser compatibility
function sayHello() {
    return 'hello';
}