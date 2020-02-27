var url = "http://api.nytimes.com/svc/semantic/v2/concept/name/nytd_geo/Kansas?fields=all&api-key=Z9dAxv3U1KUhjaAd9xZ74i8IMUhwGlxK";
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.results[0].article_list["results"][0].body)
  })
  .catch(err => {
      console.log(err);
  })