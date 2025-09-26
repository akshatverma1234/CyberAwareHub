let cachedCaseStudies = {};

export async function getCaseStudyById(id) {
  if (!id) return null;

  if (cachedCaseStudies[id]) return cachedCaseStudies[id];

  const token = process.env.CASESTUDY_TOKEN;
  const res = await fetch(`/api/admin/caseStudies/${id}`, {
    headers: { "x-token": token },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  cachedCaseStudies[id] = data;
  return data;
}
