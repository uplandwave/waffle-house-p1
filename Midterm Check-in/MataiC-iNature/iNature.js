
        // get the results from the api
        function getResults(search) {
            fetch(`https://api.inaturalist.org/v1/places/autocomplete?q=${search}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let results = document.getElementById('results');
                    results.innerHTML = '';
                    data.results.forEach(result => {
                        let div = document.createElement('div');
                        div.innerHTML = result.preferred_common_name;
                        results.appendChild(div);
                    });
                });
        }

        // get the search term from the form
        document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault();
            let search = document.querySelector('input').value;
            getResults(search);
        });