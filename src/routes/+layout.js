
export async function load({fetch}){
  const res = await fetch("/api/trends");
  const trends = await res.json();

  //console.log("at frontend:", trends);

  return {
    trends
  }
}