

(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl + '/background.jpg',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  // const ajaxGetRequest = () => {
  //   $.ajax({
  //     type: 'GET',
  //     url: serverUrl + '/moves',
  //     cache: false,
  //     contentType: 'text',
  //     success: (data) => {
  //       // reload the page
  //       SwimTeam.move(data);
  //       //invoke swimteam.move(data)

  //     },
  //     complete: () => {
  //       setTimeout(ajaxGetRequest, 1000);
  //     }
  //   });
  // };

  // ajaxGetRequest();

  const fetchCommand = () => {
    $.get({
      url: serverUrl,
      success: (direction) => {
        SwimTeam.move(direction);
      },
      complete: () => {
        setTimeout(fetchCommand, 200);
      }
     });
  };
  // fetchCommand();

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUpload(file);
  });

})();
