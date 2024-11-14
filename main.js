document.addEventListener("DOMContentLoaded", () => {
    loadJobListings();
});

function saveToLocalStorage(data) {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.push(data);
    localStorage.setItem("cards", JSON.stringify(cards));
}

function addJobListing() {
    const logoUrl = document.getElementById("logo-url").value;
    const companyName = document.getElementById("company-name").value;
    const position = document.getElementById("position").value;
    const time = document.getElementById("time").value;
    const jobType = document.getElementById("job-type").value;
    const location = document.getElementById("location").value;

    if (!validateForm || !logoUrl || !companyName || !position || !time || !jobType || !location) {
        alert("Iltimos barcha ma'lumotlarni kiriting");
        return;
    }

    const isNew = document.getElementById("new-tag").checked;
    const isFeatured = document.getElementById("featured-tag").checked;

    const skills = Array.from(document.querySelectorAll(".skills-group input[type='checkbox']:checked"))
        .map(skill => skill.value);

    const jobListing = {
        logoUrl,
        companyName,
        position,
        time,
        jobType,
        location,
        isNew,
        isFeatured,
        skills
    };

    saveJobListing(jobListing);
    renderJobListing(jobListing);
    clearForm();
}

function validateForm(...fields) {
    return fields.every(field => field.trim() !== "");
}

function saveJobListing(listing) {
    const listings = getJobListings();
    listings.push(listing);
    localStorage.setItem("jobListings", JSON.stringify(listings));
    
    saveToLocalStorage(listing);
}

function getJobListings() {
    return JSON.parse(localStorage.getItem("jobListings")) || [];
}

function loadJobListings() {
    document.getElementById("job-listing-container").innerHTML = '';
    const listings = getJobListings();
    listings.forEach(renderJobListing);
}

function renderJobListing(listing) {
    const jobCardHtml = `
        <div class="job-card">
            <img src="${listing.logoUrl}" alt="${listing.companyName} Logo" class="company-logo">
            <div class="job-details">
                <div class="company-info">
                    <span class="company-name">${listing.companyName}</span>
                    ${listing.isNew ? '<span class="tag new">NEW!</span>' : ''}
                    ${listing.isFeatured ? '<span class="tag featured">FEATURED</span>' : ''}
                </div>
                <h3 class="job-title">${listing.position}</h3>
                <div class="job-meta">
                    <span>${listing.time}</span> • <span>${listing.jobType}</span> • <span>${listing.location}</span>
                </div>
            </div>
            <div class="job-tags">
                ${listing.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
            </div>
            <div class="delete-btn" onclick="deleteJobListing(event)">✖</div>
        </div>
    `;
    document.getElementById("job-listing-container").innerHTML += jobCardHtml;
}

function clearForm() {
    document.getElementById("logo-url").value = '';
    document.getElementById("company-name").value = '';
    document.getElementById("position").value = '';
    document.getElementById("time").selectedIndex = 0;
    document.getElementById("job-type").selectedIndex = 0;
    document.getElementById("location").selectedIndex = 0;
    document.getElementById("new-tag").checked = false;
    document.getElementById("featured-tag").checked = false;
    document.querySelectorAll(".skills-group input[type='checkbox']").forEach(checkbox => checkbox.checked = false);
}

function deleteJobListing(event) {
    const jobCard = event.target.closest(".job-card");
    jobCard.remove();
}
