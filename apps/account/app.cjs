const fs=require('fs');const {brand}=require('../../src/brand.cjs');
module.exports={name:'account',render(){const {pages,renderPage}=require('../../src/site-pages.cjs');return {
 register:renderPage('register',pages.register),
 login:fs.readFileSync('src/login.html','utf8').replaceAll('__ROLE__','client').replace('__BRAND__',brand({dark:true})),
 client:fs.readFileSync('src/portal.html','utf8').replaceAll('__ROLE__','client').replace('__BRAND__',brand({dark:true,portal:true})).replace('</body>','<script src="locale-documents.js"></script></body>')
};}};
