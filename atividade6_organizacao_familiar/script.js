const check = document.querySelectorAll('input[type="checkbox"]');

check.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const listItem = this.parentElement;
    listItem.classList.toggle("check");
  });
});
