$(document).on('submit', 'form#pod_upload_form', (event) => {
    event.preventDefault();
    addToDatabase(pod_list_url, event.target, [])
});