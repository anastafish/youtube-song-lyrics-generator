export default async function handler(req, res) {    
    const url = req.body
    console.log(url)
    try {
      const response = await fetch('http://127.0.0.1:5000/api', {
        method:'POST',
        'Content-Type': 'text/html',
        body: url
      })
      const text = await response.json()
      console.log(text)
      res.json(text)
    }
    catch (err) {
      console.log(err)
    }
}
