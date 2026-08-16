async function checkURL() {
  const url = 'https://zqrqvhimfqgyxuchtged.supabase.co/storage/v1/object/public/photos/ff7b6c43-11a3-4f31-8906-f60be03dce48/cover-tocq36m6li.jpeg';
  try {
    const res = await fetch(url);
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body:', text);
  } catch (e) {
    console.error(e);
  }
}
checkURL();
