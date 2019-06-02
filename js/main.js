$(
    (function() {
      "use strict";
      // Search Text
      let userInput = $("#userInput");
      // Search Btn
      let searchBtn = $("#searchBtn");
      // More Images btn
      let moreImagesBtn = $("#moreImagesBtn");
      // Result Image area
      let imageContainer = $(".image-container");
      // Count of returned results
    //   let perPageCount = 20;
      // variable for current page requested so that when the user scrolls, it is increamented and json is requested
    //   let currentPage = 1;
      let n_result = 9; 
  
      // SEARCH BTN EVENT LISTENER
      searchBtn.on("click", function() {
        // Clear exisitng images
        imageContainer.html("");
        validateInput();
      }); // end of SEARCH BTN EVENT LISTENER
  
      //USER SEARCH SUBMIT [ENTER BTN] EVENT LISTENER
      userInput.on("keyup", function(e) {
        if (e.keyCode == 13) {
          // Clear exisitng images
          imageContainer.html("");
          validateInput();
        }
      }); // end of USER SEARCH SUBMIT [ENTER BTN] EVENT LISTENER
  
    //   // MORE IMAGES BTN
    //   moreImagesBtn.on("click", function() {
    //     currentPage++;
    //     console.log(currentPage);
    //     validateInput();
    //   }); // END OF MORE IMAGES BTN
  
      // VALIDATE USER INPUT
      function validateInput() {
        //check if query len is valid
        if (userInput.val().length != 0) {
          // Call the AJAX req passing in the user search
          getImageData(userInput.val());
        } else {
          userInput.focus();
        } // end of validation
      } //end of VALIDATE USER INPUT
  
      // GET JSON FROM FLICKR API
      function getImageData(query) {
        $.ajax({
          type: "GET",
          url: `http://localhost:3000/search?input=${query}&n_result=${n_result}`,
          success: function(data) {
            // Call the handle Data function and pass the response
            handleData(data);
          },
          error: function(e) {
            alert("Failed to load data from API");
            // moreImagesBtn.html("Something Went Wrong");
            console.log(e);
          }
        });
      } // END OF getImageData
  
      // Build urls for the images
      function handleData(data) {
        // console.log(data);
        data.forEach(function(currentPhoto, index, array) {
          // Image URL > Will be built and made an link
          let photoURL = currentPhoto.image_url;
          // alt text
          let title = currentPhoto.title;
          // plug the data to page
          pushImages(photoURL, title);
        });
        //show the more btn
        // moreImagesBtn.slideDown();
      } // END OF handleData
  
      // Built HTML tempate and push the images to the webpage
      function pushImages(url, title) {
        // Build the HTML element
        let htmlText =
          '<div class="img">' +
          '<img data-caption="' +
          title +
          '" src="' +
          url +
          '">' +
          "</div>";
        imageContainer.append(htmlText);
        // Add the Materialize functionality to the images
        // $(".materialboxed").materialbox();
      } // END OF pushImages
    })() // end of self self executing anonymous function
  );
  