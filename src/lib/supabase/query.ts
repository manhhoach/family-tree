// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function execute(query: any) {
  const { data, error } = await query;
  if (error) {
    throw error;
  }
  return data;
}
