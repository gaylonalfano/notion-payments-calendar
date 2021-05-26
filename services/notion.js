const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

// Init Client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

// async function listDatabases() {
//   const response = await notion.databases.list();
//   console.log(response);
// }

// listDatabases();

async function getPayments() {
  const payload = {
    path: `databases/${databaseId}/query`,
    method: "POST",
  };
  const { results } = await notion.request(payload);

  // console.log(results);  // Array of 'page' objects

  const payments = results.map((page) => {
    // Let's construct our payment object
    const payment = {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      date: page.properties.Date.date.start,
      tags: page.properties.Tags.multi_select.map((t) => t.name),
      description: page.properties.Description.rich_text[0].plain_text,
    };

    return payment;
  });

  return payments;
}

// Named export (NODE)
module.exports = {
  getPayments,
};

// ES Modules
// export default {
//   getPayments,
// };  // Error
