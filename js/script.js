function slideRight() {
  const slider = document.getElementById('productSlider');
  const itemWidth = slider.querySelector('.col-slider').offsetWidth + 24; 
  
  slider.scrollBy({
    left: itemWidth,
    behavior: 'smooth'
  });
}

function slideLeft() {
  const slider = document.getElementById('productSlider');
  const itemWidth = slider.querySelector('.col-slider').offsetWidth + 24;

  slider.scrollBy({
    left: -itemWidth,
    behavior: 'smooth'
  });
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    
    displayFeedback();

    form.onsubmit = function(e) { 
        e.preventDefault();
        
      
        const typeEl = document.getElementById('feedbackType');
        const nameEl = document.getElementById('userName');
        const msgEl = document.getElementById('userMsg');

        if (!nameEl.value.trim() || !msgEl.value.trim()) {
            alert("Please fill in all fields!");
            return;
        }
        const newData = { 
            name: nameEl.value.trim(), 
            msg: msgEl.value.trim(), 
            date: new Date().toLocaleDateString('id-ID') 
        };
        let storageKey = typeEl.value === 'testi' ? 'storage_testi' : 'storage_faq';
        let existingData = JSON.parse(localStorage.getItem(storageKey)) || [];
        
        existingData.unshift(newData);

        localStorage.setItem(storageKey, JSON.stringify(existingData));

        form.reset();

        displayFeedback();
        
        alert('Post successful!');
    };

    function displayFeedback() {
        const testiArea = document.getElementById('testimonialList');
        const faqArea = document.getElementById('faqList');

        if(!testiArea || !faqArea) return; 
        const listTesti = JSON.parse(localStorage.getItem('storage_testi')) || [];
        const listFaq = JSON.parse(localStorage.getItem('storage_faq')) || [];


        testiArea.innerHTML = listTesti.map(item => `
            <div class="feedback-card">
                <h6 class="mb-1 fw-bold">${item.name} <span class="text-muted" style="font-size:10px">${item.date}</span></h6>
                <p class="mb-0 text-muted small">"${item.msg}"</p>
            </div>
        `).join('') || '<p class="text-center text-muted">No testimonials yet.</p>';


        faqArea.innerHTML = listFaq.map(item => `
            <div class="feedback-card" style="border-left-color: #ad1457;">
                <h6 class="mb-1 fw-bold">Q: ${item.msg}</h6>
                <p class="mb-0 text-muted small">Asked by: ${item.name}</p>
            </div>
        `).join('') || '<p class="text-center text-muted">No questions yet.</p>';
    }
});