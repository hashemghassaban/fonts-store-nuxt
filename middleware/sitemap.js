// // const app = require("express")();
//
// app.all("/", (req, res) => {
//   try {
//     // you can loop through some data and build this up
//     let sitemap = `
//       <?xml version="1.0" encoding="UTF-8"?>
//       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         <url>
//           <loc>http://www.example.com/foo.html</loc>
//           <lastmod>2018-06-04</lastmod>
//         </url>
//       </urlset>
//     `
//
//     res.set('Content-Type', 'text/html');
//     res.status(200).send(Buffer.from(sitemap));
//   } catch (error) {
//     res.status(500).send(error.message)
//   }
// })
//
// module.exports = app;
