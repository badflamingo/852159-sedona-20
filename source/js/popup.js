document.addEventListener('DOMContentLoaded', function(){
  var reviewForm = document.querySelector(".form-wrap");
  var sentPopup = document.querySelector(".popup--success");
  var errorPopup = document.querySelector(".popup--fail");
  var closeSent = document.querySelector(".button--sent");
  var closeError = document.querySelector(".button--error");
  var formName = document.querySelector("#name");
  var formSurname = document.querySelector("#last-name");
  var formPhone = document.querySelector("#contact-telefone");
  var formMail = document.querySelector("#contact-email");

  reviewForm.addEventListener("submit", function(evt) {
    if (!formName.value||!formSurname.value||!formPhone.value||!formMail.value) {
      evt.preventDefault ();
      errorPopup.classList.add("popup--show");
    } else {
      evt.preventDefault();
      sentPopup.classList.add("popup--show");
    }
  });

  closeSent.addEventListener ("click", function(evt) {
    evt.preventDefault();
    sentPopup.classList.remove("popup--show");
  });

  closeError.addEventListener ("click", function(evt) {
    evt.preventDefault();
    errorPopup.classList.remove("popup--show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (sentPopup.classList.contains("popup--show")) {
        evt.preventDefault();
        sentPopup.classList.remove("popup--show");
      }

      if (errorPopup.classList.contains("popup--show")) {
        evt.preventDefault();
        errorPopup.classList.remove("popup--show");
      }
    }
  });
}, false);
