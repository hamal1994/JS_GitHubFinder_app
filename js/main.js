$(document).ready(function() {
  // lets us know when the doc's ready we can proceed
  $('#searchUser').on('keyup', function(e) {
    // The keyup event shows the number of characters entered in the searchbar
    let username = e.target.value; // This event gives us the value of what we type in

    // Make request to GitHub
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        // This is to register the Oauth app to get more requests
        client_id: '23956a7cde81fab34d05',
        client_secret: 'e57d176465cafbc8ae8eb2b7595033309cb20770'
      }
      // Makes a request to the url sending the client credentials, and returns this user object:
    }).done(function(user) {
      // Run again to bring the repo's back this time:
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '23956a7cde81fab34d05',
          client_secret: 'e57d176465cafbc8ae8eb2b7595033309cb20770',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos) {
        // For each loop
        $.each(repos, function(index, repo) {
          // We do .append as we want to keep adding to it
          $('#repos').append(`
          <div class="card">
            <div class="row">
              <div class="col-md-7">
                <strong>${repo.name}</strong>: ${repo.description}
              </div>
              <div class="col-md-3">
                <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                <span class="badge badge-primary">Watchers: ${
                  repo.watchers_count
                }</span>
                <span class="badge badge-success">Stars: ${
                  repo.stargazers_count
                }</span>
              </div>
              <div class="col-md-2">
                <a href="${
                  repo.html_url
                }" target="_blank" class="btn btn-dark">Repo Page</a>
              </div>
            </div>
          </div>
          `);
        });
      });
      //This adds all the html and prints it to the page:
      $('#profile').html(`    
      <div class="card border-primary mb-3" style="max-width: 100rem;">
          <div class="card-header"><h3>${user.name}</h3></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail img-responsive" src="${
                user.avatar_url
              }">
              <a target="_blank" class="btn btn-primary btn-block" href="${
                user.html_url
              }">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-dark">Public Repos: ${
                user.public_repos
              }</span>
              <span class="badge badge-primary">Public Gists: ${
                user.public_gists
              }</span>
              <span class="badge badge-success">Followers: ${
                user.followers
              }</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: <a href="${
                  user.blog
                }" target="_blank">${user.blog}</a></li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${
                  user.created_at
                }</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
  });
});
