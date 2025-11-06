import { neon } from "@neondatabase/serverless";

export async function getSqlVersion() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export async function queryRecipes(query: string, category: string) {
  // needs to be db call
  const allRecipes = [
    { id: 1, title: "Pancakes", description: "Fluffy pancakes", category: "Breakfast" },
    { id: 2, title: "Spaghetti", description: "Classic Italian", category: "Dinner" },
  ];

  console.log(`query + ${query}`)
  console.log(category)

  return allRecipes.filter((r) => {
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || r.category === category;
    return matchesQuery && matchesCategory;
  });
}
