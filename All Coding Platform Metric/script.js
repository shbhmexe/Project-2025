document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.getElementById("stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");
    const statusMessage = document.getElementById("status-message");
    const userProfileContainer = document.getElementById("user-profile");
    const loadingOverlay = document.getElementById("loading-overlay");
    const platformButtons = document.querySelectorAll(".platform-btn");
    const platformSpecificStats = document.querySelectorAll(".platform-specific-stats");

    // Current platform
    let currentPlatform = "leetcode";

    // API endpoints
    const API_ENDPOINTS = {
        leetcode: "https://leetcode-stats-api.herokuapp.com/",
        gfg: "https://geeksforgeeks-api.herokuapp.com/api/geeksforgeeks/",
        codechef: "https://competitive-coding-api.herokuapp.com/api/codechef/",
        codeforces: "https://competitive-coding-api.herokuapp.com/api/codeforces/",
        codestudio: "https://competitive-coding-api.herokuapp.com/api/codingninjas/"
    };

    // Show loading state
    function showLoading() {
        loadingOverlay.classList.add("active");
    }

    // Hide loading state
    function hideLoading() {
        loadingOverlay.classList.remove("active");
    }

    // Display error message
    function showError(message) {
        statusMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        statusMessage.style.color = "#e74c3c";
        statusMessage.style.padding = "10px";
        statusMessage.style.borderRadius = "8px";
        statusMessage.style.background = "rgba(231, 76, 60, 0.1)";
        statusMessage.style.marginTop = "10px";
        statsContainer.classList.add("hidden");
    }

    // Clear error message
    function clearError() {
        statusMessage.textContent = "";
    }

    // Validate username using regex
    function validateUsername(username) {
        if(username.trim() === "") {
            showError("Username should not be empty");
            return false;
        }
        // Different platforms may have different username requirements, so keep it simple
        return true;
    }

    // Format large numbers with commas
    function formatNumber(num) {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
    }

    // Calculate rating color based on rating
    function getRatingColor(rate) {
        if (rate >= 70) return "#2ecc71";
        if (rate >= 50) return "#f39c12";
        return "#e74c3c";
    }

    // Get Codeforces rating color
    function getCodeforcesRatingColor(rating) {
        if (rating >= 2400) return "#FF0000"; // red
        if (rating >= 2100) return "#FFA500"; // orange
        if (rating >= 1900) return "#9932CC"; // violet
        if (rating >= 1600) return "#0000FF"; // blue
        if (rating >= 1400) return "#00BFFF"; // cyan
        if (rating >= 1200) return "#00FF00"; // green
        return "#808080"; // gray
    }

    // Get CodeChef rating color
    function getCodeChefRatingColor(rating) {
        if (rating >= 2500) return "#FF0000"; // red
        if (rating >= 2000) return "#FFA500"; // orange
        if (rating >= 1600) return "#9932CC"; // violet
        if (rating >= 1400) return "#0000FF"; // blue
        if (rating >= 1200) return "#00BFFF"; // cyan
        return "#808080"; // gray
    }

    // Switch between platforms
    function switchPlatform(platform) {
        currentPlatform = platform;
        
        // Update active button
        platformButtons.forEach(btn => {
            if (btn.dataset.platform === platform) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
        
        // Update placeholder text based on platform
        switch(platform) {
            case "leetcode":
                usernameInput.placeholder = "Enter your LeetCode username";
                break;
            case "gfg":
                usernameInput.placeholder = "Enter your GeeksforGeeks username";
                break;
            case "codestudio":
                usernameInput.placeholder = "Enter your CodeStudio username";
                break;
            case "codeforces":
                usernameInput.placeholder = "Enter your Codeforces handle";
                break;
            case "codechef":
                usernameInput.placeholder = "Enter your CodeChef username";
                break;
        }
        
        // Hide all platform specific stats
        platformSpecificStats.forEach(stat => {
            stat.classList.add("hidden");
        });
        
        // Show the current platform's stats if they exist
        const currentStats = document.getElementById(`${platform}-stats`);
        if (currentStats) {
            currentStats.classList.remove("hidden");
        }
    }

    // Fetch user details based on platform
    async function fetchUserDetails(username) {
        clearError();
        showLoading();
        
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            
            let data;
            
            switch(currentPlatform) {
                case "leetcode":
                    data = await fetchLeetCodeData(username);
                    break;
                case "gfg":
                    data = await fetchGFGData(username);
                    break;
                case "codestudio":
                    data = await fetchCodeStudioData(username);
                    break;
                case "codeforces":
                    data = await fetchCodeforcesData(username);
                    break;
                case "codechef":
                    data = await fetchCodeChefData(username);
                    break;
            }
            
            displayUserData(data, username);
            statsContainer.classList.remove("hidden");
            
        } catch (error) {
            showError(error.message);
        } finally {
            searchButton.innerHTML = '<i class="fas fa-search"></i> Search';
            searchButton.disabled = false;
            hideLoading();
        }
    }

    // Fetch LeetCode Data
    async function fetchLeetCodeData(username) {
        const response = await fetch(`${API_ENDPOINTS.leetcode}${username}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`User "${username}" not found on LeetCode`);
            }
            throw new Error("Unable to fetch user details. Please try again later.");
        }
        
        const data = await response.json();
        
        if (data.status === "error") {
            throw new Error(data.message || "Error fetching user data");
        }
        
        return data;
    }

    // Fetch GFG Data
    async function fetchGFGData(username) {
        try {
            const response = await fetch(`${API_ENDPOINTS.gfg}${username}`);
            
            if (!response.ok) {
                throw new Error(`Unable to fetch GFG data for "${username}"`);
            }
            
            const data = await response.json();
            
            if (data.status === "Failed") {
                throw new Error(`User "${username}" not found on GeeksforGeeks`);
            }
            
            return data;
        } catch (error) {
            throw new Error(`GFG API Error: ${error.message}`);
        }
    }

    // Fetch CodeStudio Data (CodingNinjas)
    async function fetchCodeStudioData(username) {
        try {
            const response = await fetch(`${API_ENDPOINTS.codestudio}${username}`);
            
            if (!response.ok) {
                throw new Error(`Unable to fetch CodeStudio data for "${username}"`);
            }
            
            const data = await response.json();
            
            if (data.status === "Failed") {
                throw new Error(`User "${username}" not found on CodeStudio`);
            }
            
            return data;
        } catch (error) {
            throw new Error(`CodeStudio API Error: ${error.message}`);
        }
    }

    // Fetch Codeforces Data
    async function fetchCodeforcesData(username) {
        try {
            const response = await fetch(`${API_ENDPOINTS.codeforces}${username}`);
            
            if (!response.ok) {
                throw new Error(`Unable to fetch Codeforces data for "${username}"`);
            }
            
            const data = await response.json();
            
            if (data.status === "Failed") {
                throw new Error(`User "${username}" not found on Codeforces`);
            }
            
            return data;
        } catch (error) {
            throw new Error(`Codeforces API Error: ${error.message}`);
        }
    }

    // Fetch CodeChef Data
    async function fetchCodeChefData(username) {
        try {
            const response = await fetch(`${API_ENDPOINTS.codechef}${username}`);
            
            if (!response.ok) {
                throw new Error(`Unable to fetch CodeChef data for "${username}"`);
            }
            
            const data = await response.json();
            
            if (data.status === "Failed") {
                throw new Error(`User "${username}" not found on CodeChef`);
            }
            
            return data;
        } catch (error) {
            throw new Error(`CodeChef API Error: ${error.message}`);
        }
    }

    // Update the progress circles
    function updateProgress(solved, total, label, circle) {
        const progressPercentage = Math.floor((solved / total) * 100);
        circle.style.setProperty("--progress-degree", `${progressPercentage}%`);
        label.textContent = `${solved}/${total}`;
    }

    // Display user profile data based on platform
    function displayUserProfile(data, username) {
        let profileHTML = '';
        
        switch(currentPlatform) {
            case "leetcode":
                // Default avatar as LeetCode API doesn't provide profile image
                const userAvatar = `https://ui-avatars.com/api/?name=${username}&background=2d3748&color=fff&size=100`;
                
                profileHTML = `
                    <div class="profile-image-container">
                        <img src="${userAvatar}" alt="${username}" class="profile-image">
                    </div>
                    <div class="profile-info">
                        <h3>${username}</h3>
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <i class="fas fa-chart-line"></i>
                                <span>Ranking: ${data.ranking || "N/A"}</span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-check-circle"></i>
                                <span>Total Solved: ${data.totalSolved || 0} problems</span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-star"></i>
                                <span>Acceptance Rate: <span style="color: ${getRatingColor(data.acceptanceRate)}">${data.acceptanceRate?.toFixed(1) || 0}%</span></span>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case "gfg":
                const gfgAvatar = `https://ui-avatars.com/api/?name=${username}&background=2f8d46&color=fff&size=100`;
                profileHTML = `
                    <div class="profile-image-container">
                        <img src="${gfgAvatar}" alt="${username}" class="profile-image">
                    </div>
                    <div class="profile-info">
                        <h3>${username}</h3>
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <i class="fas fa-trophy"></i>
                                <span>Rank: ${formatNumber(data.rank || "N/A")}</span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-star"></i>
                                <span>Score: ${formatNumber(data.total_score || 0)}</span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-code"></i>
                                <span>Total Problems Solved: ${formatNumber(data.solved?.total || 0)}</span>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case "codestudio":
                const userImg = `https://ui-avatars.com/api/?name=${username}&background=fa7328&color=fff&size=100`;
                profileHTML = `
                    <div class="profile-image-container">
                        <img src="${userImg}" alt="${username}" class="profile-image">
                    </div>
                    <div class="profile-info">
                        <h3>${username} <i class="fas fa-check-circle"></i></h3>
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <i class="fas fa-code"></i>
                                <span>Score: ${formatNumber(data.score || 0)}</span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-chart-line"></i>
                                <span>Rating: ${formatNumber(data.rating || 0)}</span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-trophy"></i>
                                <span>Rank: ${formatNumber(data.rank || "N/A")}</span>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case "codeforces":
                const cfAvatar = `https://ui-avatars.com/api/?name=${username}&background=318ce7&color=fff&size=100`;
                const cfRatingColor = getCodeforcesRatingColor(data.rating || 0);
                profileHTML = `
                    <div class="profile-image-container">
                        <img src="${cfAvatar}" alt="${username}" class="profile-image">
                    </div>
                    <div class="profile-info">
                        <h3>${username}</h3>
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <i class="fas fa-chart-line"></i>
                                <span>Rating: <span style="color: ${cfRatingColor}">${formatNumber(data.rating || 0)}</span></span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-trophy"></i>
                                <span>Rank: <span style="color: ${cfRatingColor}">${data.rank || "Unrated"}</span></span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-medal"></i>
                                <span>Max Rating: ${formatNumber(data.max_rating || 0)}</span>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case "codechef":
                const chefAvatar = `https://ui-avatars.com/api/?name=${username}&background=745d4c&color=fff&size=100`;
                const ratingColor = getCodeChefRatingColor(data.rating || 0);
                profileHTML = `
                    <div class="profile-image-container">
                        <img src="${chefAvatar}" alt="${username}" class="profile-image">
                    </div>
                    <div class="profile-info">
                        <h3>${data.name || username}</h3>
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <i class="fas fa-star"></i>
                                <span>Stars: ${data.stars || 0}</span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-chart-line"></i>
                                <span>Rating: <span style="color: ${ratingColor}">${formatNumber(data.rating || 0)}</span></span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-trophy"></i>
                                <span>Global Rank: ${formatNumber(data.global_rank || 'N/A')}</span>
                            </div>
                            <div class="profile-stat">
                                <i class="fas fa-flag"></i>
                                <span>Country Rank: ${formatNumber(data.country_rank || 'N/A')}</span>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
        
        userProfileContainer.innerHTML = profileHTML;
    }

    // Display platform specific stats
    function displayPlatformSpecificStats(data, username) {
        switch(currentPlatform) {
            case "leetcode":
                // Update progress circles
                updateProgress(data.easySolved, data.totalEasy, easyLabel, easyProgressCircle);
                updateProgress(data.mediumSolved, data.totalMedium, mediumLabel, mediumProgressCircle);
                updateProgress(data.hardSolved, data.totalHard, hardLabel, hardProgressCircle);
                
                // Create stats cards
                const leetcodeCardsData = [
                    {
                        label: "Total Solved",
                        value: formatNumber(data.totalSolved),
                        icon: "fas fa-check-circle",
                        color: "var(--secondary-color)"
                    },
                    {
                        label: "Total Submissions",
                        value: formatNumber(data.totalSubmissions || 0),
                        icon: "fas fa-code",
                        color: "var(--accent-color)"
                    },
                    {
                        label: "Acceptance Rate",
                        value: `${data.acceptanceRate?.toFixed(1) || 0}%`,
                        icon: "fas fa-percentage",
                        color: getRatingColor(data.acceptanceRate || 0)
                    },
                    {
                        label: "Contribution Points",
                        value: formatNumber(data.contributionPoints || 0),
                        icon: "fas fa-award",
                        color: "#e67e22"
                    }
                ];
                
                cardStatsContainer.innerHTML = leetcodeCardsData.map(
                    data => `
                        <div class="card">
                            <h4><i class="${data.icon}" style="color: ${data.color}"></i> ${data.label}</h4>
                            <p>${data.value}</p>
                        </div>`
                ).join("");
                break;
                
            case "gfg":
                const gfgStatsContainer = document.getElementById("gfg-stats");
                
                const gfgStatsHTML = `
                    <div class="platform-info">
                        <img src="https://img.icons8.com/color/48/000000/GeeksforGeeks.png" alt="GFG" class="platform-logo">
                        <div class="platform-details">
                            <h3>GeeksforGeeks</h3>
                            <p>Coding profile for ${username}</p>
                        </div>
                    </div>
                    
                    <h2 class="section-title"><i class="fas fa-code"></i> Coding Stats</h2>
                    <div class="stats-cards">
                        <div class="card">
                            <h4><i class="fas fa-check-circle" style="color: var(--gfg-color)"></i> Problems Solved</h4>
                            <p>${formatNumber(data.solved?.total || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-star" style="color: var(--accent-color)"></i> Overall Score</h4>
                            <p>${formatNumber(data.total_score || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-trophy" style="color: #e67e22"></i> Rank</h4>
                            <p>${formatNumber(data.rank || "N/A")}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-code" style="color: var(--secondary-color)"></i> Streak</h4>
                            <p>${formatNumber(data.streak?.current_streak || 0)} days</p>
                        </div>
                    </div>
                    
                    <h2 class="section-title"><i class="fas fa-list"></i> Problem Categories</h2>
                    <div class="stats-cards">
                        <div class="card">
                            <h4><i class="fas fa-code" style="color: var(--success-color)"></i> School</h4>
                            <p>${formatNumber(data.solved?.school || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-code" style="color: var(--success-color)"></i> Basic</h4>
                            <p>${formatNumber(data.solved?.basic || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-code" style="color: var(--medium-color)"></i> Easy</h4>
                            <p>${formatNumber(data.solved?.easy || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-code" style="color: var(--hard-color)"></i> Medium</h4>
                            <p>${formatNumber(data.solved?.medium || 0)}</p>
                        </div>
                    </div>
                `;
                
                gfgStatsContainer.innerHTML = gfgStatsHTML;
                break;
                
            case "codeforces":
                const cfStatsContainer = document.getElementById("codeforces-stats");
                const cfRatingColor = getCodeforcesRatingColor(data.rating || 0);
                
                const cfStatsHTML = `
                    <div class="platform-info">
                        <img src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-codeforces-programming-competitions-and-contests-programming-community-logo-color-tal-revivo.png" alt="Codeforces" class="platform-logo">
                        <div class="platform-details">
                            <h3>Codeforces</h3>
                            <p>Competitive programming profile for ${username}</p>
                        </div>
                    </div>
                    
                    <h2 class="section-title"><i class="fas fa-chart-line"></i> Rating Stats</h2>
                    <div class="stats-cards">
                        <div class="card">
                            <h4><i class="fas fa-chart-line" style="color: ${cfRatingColor}"></i> Current Rating</h4>
                            <p style="color: ${cfRatingColor}">${formatNumber(data.rating || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-medal" style="color: ${getCodeforcesRatingColor(data.max_rating || 0)}"></i> Max Rating</h4>
                            <p>${formatNumber(data.max_rating || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-trophy" style="color: ${cfRatingColor}"></i> Rank</h4>
                            <p style="color: ${cfRatingColor}">${data.rank || "Unrated"}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-star" style="color: var(--accent-color)"></i> Contest Rating</h4>
                            <p>${formatNumber(data.contest_rating || 0)}</p>
                        </div>
                    </div>
                    
                    <h2 class="section-title"><i class="fas fa-code"></i> Problem Solving</h2>
                    <div class="stats-cards">
                        <div class="card">
                            <h4><i class="fas fa-check-circle" style="color: var(--success-color)"></i> Problems Solved</h4>
                            <p>${formatNumber(data.problems_solved || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-trophy" style="color: var(--accent-color)"></i> Global Rank</h4>
                            <p>${formatNumber(data.global_rank || "N/A")}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-flag" style="color: var(--secondary-color)"></i> Country Rank</h4>
                            <p>${formatNumber(data.country_rank || "N/A")}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-users" style="color: var(--hard-color)"></i> Friend Count</h4>
                            <p>${formatNumber(data.friend_count || 0)}</p>
                        </div>
                    </div>
                `;
                
                cfStatsContainer.innerHTML = cfStatsHTML;
                break;
                
            case "codestudio":
                const csStatsContainer = document.getElementById("codestudio-stats");
                
                const csStatsHTML = `
                    <div class="platform-info">
                        <img src="https://img.icons8.com/color/48/000000/codingninjas.png" alt="CodeStudio" class="platform-logo">
                        <div class="platform-details">
                            <h3>CodeStudio (Coding Ninjas)</h3>
                            <p>Coding profile for ${username}</p>
                        </div>
                    </div>
                    
                    <h2 class="section-title"><i class="fas fa-code"></i> Problem Solving Stats</h2>
                    <div class="stats-cards">
                        <div class="card">
                            <h4><i class="fas fa-check-circle" style="color: var(--codestudio-color)"></i> Score</h4>
                            <p>${formatNumber(data.score || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-star" style="color: var(--accent-color)"></i> Rating</h4>
                            <p>${formatNumber(data.rating || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-trophy" style="color: #e67e22"></i> Rank</h4>
                            <p>${formatNumber(data.rank || "N/A")}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-calendar" style="color: var(--secondary-color)"></i> Streak</h4>
                            <p>${formatNumber(data.current_streak || 0)} days</p>
                        </div>
                    </div>
                    
                    <h2 class="section-title"><i class="fas fa-tasks"></i> Monthly Statistics</h2>
                    <div class="stats-cards">
                        <div class="card">
                            <h4><i class="fas fa-code" style="color: var(--codestudio-color)"></i> Monthly Score</h4>
                            <p>${formatNumber(data.monthly_score || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-trophy" style="color: var(--accent-color)"></i> Monthly Rank</h4>
                            <p>${formatNumber(data.monthly_rank || "N/A")}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-fire" style="color: var(--hard-color)"></i> Max Streak</h4>
                            <p>${formatNumber(data.max_streak || 0)} days</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-users" style="color: var(--success-color)"></i> Institute Rank</h4>
                            <p>${formatNumber(data.institute_rank || "N/A")}</p>
                        </div>
                    </div>
                `;
                
                csStatsContainer.innerHTML = csStatsHTML;
                break;
                
            case "codechef":
                const ccStatsContainer = document.getElementById("codechef-stats");
                const ccRatingColor = getCodeChefRatingColor(data.rating || 0);
                
                const ccStatsHTML = `
                    <div class="platform-info">
                        <img src="https://img.icons8.com/color/48/000000/codechef.png" alt="CodeChef" class="platform-logo">
                        <div class="platform-details">
                            <h3>CodeChef</h3>
                            <p>Competitive programming profile for ${data.name || username}</p>
                        </div>
                    </div>
                    
                    <h2 class="section-title"><i class="fas fa-chart-line"></i> Rating Stats</h2>
                    <div class="stats-cards">
                        <div class="card">
                            <h4><i class="fas fa-chart-line" style="color: ${ccRatingColor}"></i> Current Rating</h4>
                            <p style="color: ${ccRatingColor}">${formatNumber(data.rating || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-medal" style="color: ${ccRatingColor}"></i> Highest Rating</h4>
                            <p>${formatNumber(data.highest_rating || 0)}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-star" style="color: var(--codechef-color)"></i> Stars</h4>
                            <p>${data.stars || 0} ★</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-trophy" style="color: var(--accent-color)"></i> Global Rank</h4>
                            <p>${formatNumber(data.global_rank || "N/A")}</p>
                        </div>
                    </div>
                    
                    <h2 class="section-title"><i class="fas fa-code"></i> Contest Participation</h2>
                    <div class="stats-cards">
                        <div class="card">
                            <h4><i class="fas fa-calendar-check" style="color: var(--secondary-color)"></i> Long Challenge</h4>
                            <p>${data.contest_ratings?.long || "N/A"}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-bolt" style="color: var(--accent-color)"></i> Cook-offs</h4>
                            <p>${data.contest_ratings?.cook || "N/A"}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-clock" style="color: var(--hard-color)"></i> Lunch Time</h4>
                            <p>${data.contest_ratings?.ltime || "N/A"}</p>
                        </div>
                        <div class="card">
                            <h4><i class="fas fa-flag" style="color: var(--gfg-color)"></i> Country</h4>
                            <p>${data.country || "N/A"}</p>
                        </div>
                    </div>
                `;
                
                ccStatsContainer.innerHTML = ccStatsHTML;
                break;
        }
    }

    // Display user data based on platform
    function displayUserData(data, username) {
        displayUserProfile(data, username);
        displayPlatformSpecificStats(data, username);
    }

    // Event listeners for platform buttons
    platformButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            switchPlatform(platform);
        });
    });

    // Event listeners for search button
    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        if (validateUsername(username)) {
            saveUsername(username, currentPlatform);
            fetchUserDetails(username);
        }
    });

    // Allow hitting Enter to search
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const username = usernameInput.value;
            if (validateUsername(username)) {
                saveUsername(username, currentPlatform);
                fetchUserDetails(username);
            }
        }
    });

    // Check for saved username in localStorage
    function loadSavedUserData() {
        const platform = localStorage.getItem('allmetric_platform') || 'leetcode';
        const username = localStorage.getItem(`allmetric_${platform}_username`);
        
        if (platform && username) {
            switchPlatform(platform);
            usernameInput.value = username;
            fetchUserDetails(username);
        }
    }

    // Save username to localStorage
    function saveUsername(username, platform) {
        localStorage.setItem(`allmetric_${platform}_username`, username);
        localStorage.setItem('allmetric_platform', platform);
    }

    // Initialize
    loadSavedUserData();
});