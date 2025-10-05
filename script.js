 async function getUser() {
      const username = document.getElementById("username").value;
      const resultDiv = document.getElementById("result");

      resultDiv.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fas fa-spinner fa-spin"></i> Searching GitHub...</div>';
      resultDiv.style.display = 'block';

      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();

       
        if (data.message === "Not Found") {
          resultDiv.innerHTML = '<div style="text-align:center; color: #da3633; padding: 1rem;"><i class="fas fa-exclamation-circle"></i> User not found</div>';
          return;
        }

        resultDiv.innerHTML = `
          <div class="profile-header">
            <img src="${data.avatar_url}" class="avatar" alt="Profile Picture">
            <div class="user-info">
              <h2>${data.name || data.login}</h2>
              <div class="username">@${data.login}</div>
              <div class="user-id"><i class="fas fa-id-badge"></i> ID: ${data.id}</div>
            </div>
          </div>
          <div class="bio">${data.bio || 'No bio available'}</div>
          <div class="stats">
            <div class="stat">
              <div class="stat-value">${data.followers}</div>
              <div class="stat-label">Followers</div>
            </div>
            <div class="stat">
              <div class="stat-value">${data.following}</div>
              <div class="stat-label">Following</div>
            </div>
            <div class="stat">
              <div class="stat-value">${data.public_repos}</div>
              <div class="stat-label">Public Repos</div>
            </div>
          </div>
        `;
      } catch (error) {
        resultDiv.innerHTML = '<div style="text-align:center; color: #da3633; padding: 1rem;"><i class="fas fa-exclamation-circle"></i> Error fetching user data</div>';
      }
    }