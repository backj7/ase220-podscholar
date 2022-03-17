$(document).on('submit', 'form#register_form', (event) => {
    event.preventDefault();
    addToDatabase(account_list_url, event.target, ['pass_confirm', 'tos_accept']);
});