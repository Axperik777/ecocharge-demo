const fs=require('fs');const {brand}=require('../../src/brand.cjs');
module.exports={name:'crm',render(){return {
 team:fs.readFileSync('src/login.html','utf8').replaceAll('__ROLE__','staff').replace('__BRAND__',brand({dark:true})),
 staff:fs.readFileSync('src/portal.html','utf8').replaceAll('__ROLE__','staff').replace('__BRAND__',brand({dark:true,portal:true})).replace('</body>','<script src="locale-documents.js"></script></body>'),
 crm:fs.readFileSync('apps/crm/index.html','utf8').replace('__BRAND__',brand({dark:true}).replace('href="./"','href="crm/"'))
};}};
