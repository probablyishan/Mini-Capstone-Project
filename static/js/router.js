// router.js — hash-based router
const Router = {
  routes: {},
  current: 'home',

  on(path, handler) { this.routes[path] = handler; },

  go(path) {
    if (location.hash !== '#' + path) location.hash = path;
    else this.render(path);
  },

  render(path) {
    this.current = path;
    const handler = this.routes[path] || this.routes['home'];
    const main = $('#main-content');
    main.innerHTML = '';
    main.classList.remove('fade-in');
    void main.offsetWidth;
    main.classList.add('fade-in');
    handler(main);
    window.scrollTo(0, 0);
  },

  init() {
    const onHash = () => {
      const path = location.hash.slice(1) || 'home';
      this.render(path);
    };
    window.addEventListener('hashchange', onHash);
    onHash();
  },
};
