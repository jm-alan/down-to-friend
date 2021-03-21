export default function FlashSearchbar () {
  const searchBar = document.querySelector('input.searchbar-input');
  const searchContainer = document.querySelector('div.searchbar-container');
  searchBar.style.backgroundColor = 'darkgrey';
  searchContainer.style.boxShadow = '0px 0px 30px white';
  let cycles = 0;
  const attentionInterval = setInterval(() => {
    (cycles === 2 && clearInterval(attentionInterval)) ?? searchBar.focus();
    if (cycles % 2) {
      searchBar.style.backgroundColor = 'darkgrey';
      searchContainer.style.boxShadow = '0px 0px 20px white';
    } else {
      searchBar.style.backgroundColor = 'white';
      searchContainer.style.boxShadow = 'none';
    }
    cycles++;
  }, 200);
}
