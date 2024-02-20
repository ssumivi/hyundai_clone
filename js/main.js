window.addEventListener("load", function () {
    // 언어 펼침 기능
    const langWord = document.querySelector(".language-word");
    const language = document.querySelector(".language");
    //   const languageLi = this.document.querySelector(".language li");
    langWord.addEventListener("click", function () {
      language.classList.toggle("language-box-active");
    });
  });
