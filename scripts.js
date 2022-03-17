let account_list_url = 'http://www.jsonblob.com/api/jsonBlob/953704422299680768';
let pod_list_url = 'http://www.jsonblob.com/api/jsonBlob/953705714636046336';
let post_url = 'https://jsonblob.com/api/jsonBlob';

function addToDatabase(database, form, unwantedFields) {
    var formData = new FormData(form);
    for (var i = 0; i < unwantedFields.length; i++) {
        formData.delete(unwantedFields[i]);
    }
    dataObject = {}
    formData.forEach((value, key) => {
        dataObject[key] = value;
    })
    data = JSON.stringify(dataObject);

    $.ajax({
        url: post_url,
        type:'POST',
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType:'json',
        success: function (response, status, xhr) {
            var resourceLocation =  xhr.getResponseHeader('Location');
            resourceLocation = resourceLocation.replace('http', 'https');
            $.ajax({
                url: database,
                type:'GET',
                contentType: "application/json; charset=utf-8",
                dataType:'json',
                success: function (urls) {
                    var resource_list = urls;
                    resource_list.push(resourceLocation);
                    let new_list = JSON.stringify(resource_list);
                    $.ajax({
                        url: database,
                        type:'PUT',
                        data: new_list,
                        contentType: "application/json; charset=utf-8",
                        dataType:'json',
                        success: function (response, status, xhr) {
                            alert('Form submitted successfully');
                        },
                        error: function (error) {
                            console.log(error);
                            alert('Form submission failed');
                        }
                    });
                },
                error: function (error) {
                    console.log(error);
                    alert('Form submission failed');
                }
            });
        },
        error: function (error) {
            console.log(error);
            alert('Form submission failed');
        }
    });
}