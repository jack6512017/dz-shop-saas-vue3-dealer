const modules = import.meta.globEager('./model/**/*.ts');

let dealerApi = {};

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const	api =  Object.prototype.toString.call(mod) === '[object Object]' ? {...mod} : {mod};
   dealerApi = { ...dealerApi,...api}
});

export default {
	api:dealerApi
}
