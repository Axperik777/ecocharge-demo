'use strict';
(()=>{
 const params=new URLSearchParams(location.search),register=location.pathname.includes('/register/');
 let lang=params.get('lang')==='ru'?'ru':'en';
 const $=id=>document.getElementById(id),url=path=>{const u=new URL(path,location.href);for(const [k,v]of params)u.searchParams.set(k,v);u.searchParams.set('lang',lang);return u.href;};
 function render(){const ru=lang==='ru';document.documentElement.lang=ru?'ru':'en-US';document.title='EcoGrid · '+(register?(ru?'Регистрация':'Register'):(ru?'Вход':'Sign in'));
  $('signin-link').textContent=ru?'Войти':'Sign in';$('register-link').textContent=ru?'Регистрация':'Register';$('signin-link').href=url('../login/');$('register-link').href=url('../register/');$(register?'register-link':'signin-link').setAttribute('aria-current','page');
  $('title').textContent=register?(ru?'Начните с Академии':'Start with the Academy'):(ru?'Вход в EcoGrid':'Sign in to EcoGrid');
  $('description').textContent=register?(ru?'Академия покажет проекты и кабинет, ответит на вопросы и поможет пройти регистрацию. Знакомство с проектами не требует вложений.':'The Academy introduces the projects and account, answers your questions and guides registration. No investment is required to explore.'):(ru?'В этом публичном просмотре персональный вход пока не подключён. Можно посмотреть пример кабинета или перейти в Академию для знакомства и регистрации.':'Personal sign-in is not connected in this public preview. You can explore a sample account or visit the Academy to learn more and register.');
  $('primary').textContent=ru?'Перейти в Академию':'Continue to the Academy';$('primary').href=url('../../app/#academy');
  $('secondary').textContent=ru?'Посмотреть пример кабинета':'Explore the account preview';$('secondary').href=url('../client/');
  $('home').textContent=ru?'На сайт':'Back to the website';$('home').href=url('../../');$('language').textContent=ru?'EN':'RU';
 }
 $('language').addEventListener('click',()=>{lang=lang==='ru'?'en':'ru';params.set('lang',lang);history.replaceState(null,'','?'+params.toString());render();});render();
})();
